import React, {useCallback, useState, useEffect, useContext} from 'react';
import {
  EmptyState,
  Button,
  Page,
  Modal,
  Heading,
  DisplayText,
  Form,
  FormLayout,
  TextField,
  Icon,
  Loading,
  Tag,
  TextContainer,
  Stack,
  Checkbox
} from '@shopify/polaris';
import {MentionMajorMonotone,HashtagMajorMonotone} from '@shopify/polaris-icons';
import {useForm, Controller} from 'react-hook-form';
import {Switch, Route, useRouteMatch,useHistory, useParams} from 'react-router-dom';
import {Container, FormField} from '../styles';
import {UserStore,FrameStore} from "../../../Context/store";
import instagram from '../../Icons/instagram.png'
import {loadFB} from '../../../services'

export const InstagramConnect = () => {
  const {accountId} = useParams();
  const {user} = React.useContext(UserStore);
  const userId = user.id
  const history = useHistory();
  const [form, setForm] = useState('');
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [personalAccountError, setPersonalAccountError] = useState("");
  const [professionalAccountError, setProfessionalAccountError] = useState("");
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const {register, handleSubmit, control} = useForm();
  const [type, setType] = useState("personal")
  const [import_type, setImportType] = useState("posts")
  const [fbId, setFbId] = useState("")
  const [token, setToken] = useState("")
  const [professionalInstagramId, setProfessionalInstagramId] = useState("");
  const handleChange = useCallback((_checked, newValue) => setType(newValue), []);
  const handleImportChange = useCallback((_checked, newValue) => setImportType(newValue), []);
  const handleFbChange = useCallback((_checked, newValue) => {console.log(newValue); return setFbId(newValue)}, []);
  const { unsetIsLoading, setIsLoading, isLoading } = useContext(FrameStore);

  useEffect(() => {
    loadFB(() => {
      setLoaded(true);
    });

    const sendCode = async () => {
      const url = window.location.href;
      const splitCode = url.split("code=");
      const redirectURL = url.split("?")
      if(splitCode.length > 1){
          const response = await connectPersonal(splitCode[1], redirectURL[0])
          console.log(response)
          if(response.status  === "fail"){
            setPersonalAccountError(response.message)
            nextScreen("personal_account_error")
            
          }else{
            nextScreen("connected")
          }
      }
    }
    sendCode();
    
  },[]);

  const FacebookIcon = useCallback(() => (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.48986 0C29.8218 0 50.1537 0 70.5101 0C70.6577 0.0736648 70.7806 0.19644 70.9281 0.220994C76.976 1.66974 80 5.47575 80 11.639C80 30.6937 80 49.7483 80 68.803C80 75.3591 75.4026 79.9754 68.8384 79.9754C63.7738 79.9754 58.7093 79.9754 53.6447 79.9754C53.2022 79.9754 52.7597 79.9754 52.268 79.9754C52.268 70.4236 52.268 61.019 52.268 51.4917C52.7843 51.4917 53.2268 51.4917 53.6447 51.4917C56.3491 51.4917 59.0289 51.4917 61.7333 51.4917C63.11 51.4917 63.7492 50.9024 63.9213 49.5519C64.2655 46.8508 64.5851 44.1498 64.9047 41.4242C65.1506 39.4352 64.4376 38.6249 62.4216 38.6004C59.4714 38.6004 56.5458 38.6004 53.5956 38.6004C53.153 38.6004 52.7351 38.5513 52.2434 38.5267C52.2434 35.4328 52.0959 32.4371 52.2926 29.4905C52.4892 26.7158 54.1119 25.3653 56.9146 25.267C58.6601 25.1934 60.4302 25.2425 62.1758 25.2179C63.8722 25.1934 64.5851 24.5304 64.6097 22.8607C64.6343 20.577 64.6343 18.2934 64.6097 16.0098C64.5851 14.3646 63.9459 13.7017 62.2741 13.7262C59.2256 13.7262 56.1524 13.7017 53.1039 13.8735C46.1955 14.2419 40.6884 19.202 39.9017 26.0773C39.4837 29.7115 39.6558 33.3947 39.5821 37.0534C39.5821 37.52 39.5821 37.9865 39.5821 38.5758C37.1235 38.5758 34.8371 38.5513 32.5507 38.5758C31.2231 38.5758 30.3626 39.2634 30.338 40.5157C30.3135 43.585 30.338 46.6298 30.4364 49.6992C30.4856 50.9269 31.1985 51.4426 32.477 51.4672C34.3946 51.4917 36.3122 51.4672 38.2299 51.4672C38.6478 51.4672 39.0904 51.5163 39.4591 51.5163C39.4591 61.0681 39.4591 70.4727 39.4591 79.8772C39.1395 79.9018 38.9428 79.9263 38.7462 79.9263C29.2809 79.9263 19.791 79.9754 10.3258 79.9018C4.64659 79.9018 0 75.0154 0 69.2941C0 49.7974 0 30.3008 0 10.8042C0 5.86863 3.34358 1.59607 8.08851 0.392879C8.55562 0.294659 9.02274 0.14733 9.48986 0Z" fill="#445897"/>
    </svg>
  ),[])

  const loadSDK = useCallback(() => {
    window.fbAsyncInit = function() {
        window.FB.init({
          appId            : process.env.REACT_APP_FBID,
          autoLogAppEvents : true,
          xfbml            : true,
          version          : 'v9.0'
        });
      }
  },[loaded])

  loadSDK();


  const setDefault = () => {
    setForm('');
    history.push(`/account/id/${accountId}/connect`)
  };


  const IGAuthUrl = (redirect_url) => {
    setIsLoading()
      const data = {
        "redirect_url":redirect_url
    }
    return fetch(`${process.env.REACT_APP_API_HOST}/admin/connect/instagram/auth`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then((response)=>{
          return response.json();
      }).then((json)=>{
        unsetIsLoading()
          return json;
      })
  }

  const fetchProfIG = (access_token,fb_page_id ) => {
    setIsLoading()
    const data = {
      "access_token": access_token,
      "fb_page_id": fb_page_id
  }
  return fetch(`${process.env.REACT_APP_API_HOST}/admin/connect/instagram/professional-instagram-id`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response)=>{
        return response.json();
    }).then((json)=>{
        unsetIsLoading()
        return json;
    })
  }

  const connectProfessional = (ig_business_id,access_token,import_type) => {
    setIsLoading()
    const data = {
      "platform":"instagram",
      "type": "ig_business_id",
      "data": ig_business_id,
      "import_option":import_type,
      "platform_data": {
          "account_type": "professional",
          "auth_code": access_token
      }
    }
  return fetch(`${process.env.REACT_APP_API_HOST}/admin/user/id/${userId}/account/id/${accountId}/connected/create`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response)=>{
        return response.json();
    }).then((json)=>{
        unsetIsLoading()
        return json;
    })
  }

  const connectPersonal = async (code, redirect_url) => {
    const length = code.length;
    const newCode = code.slice(0,length - 2)
      const data = {
        "platform":"instagram",
        "type":"username",
        "import_option":"posts",
        "platform_data": {
            "account_type": "personal",
            "auth_code": newCode,
            "redirect_url": redirect_url
        }
      }
      setIsLoading()
    return fetch(`${process.env.REACT_APP_API_HOST}/admin/user/id/${userId}/account/id/${accountId}/connected/create`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then((response)=>{
          return response.json();
      }).then((json)=> {
          unsetIsLoading()
          return json;
      })
  } 

  const fetchFBPages = (access_token) => {
    const data = {
        "access_token": access_token
    }
    setIsLoading()
    return fetch(`${process.env.REACT_APP_API_HOST}/admin/connect/instagram/fb-pages`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then((response)=>{
        if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
      }).then((json)=>{
          unsetIsLoading();
          return json;
      })
  }

  const fBCallback =  async (response) => {
    const FBPages = await fetchFBPages(response.authResponse.accessToken);
    if(FBPages.pages.length > 0){
      setPages(FBPages.pages)
      nextScreen("list_pages")
    }else{
      nextScreen("zero_pages")
      setProfessionalAccountError("There was an error in connecting your facebook account")
    }
   
  }

  const setFbPage = async () => {
    const IGPage = await fetchProfIG(token,fbId)
    if(IGPage.data.professional_instagram_id !== null){
      nextScreen("import_type")
      setProfessionalInstagramId(IGPage.data.professional_instagram_id)
    }else{
      nextScreen("ig_connect_error")
    }
  }

  const setConnectProfessional = async () => {
      const connectProf = await connectProfessional(professionalInstagramId, token, import_type)
      if(connectProf.success){
        nextScreen("connected")
      }else{
        setProfessionalAccountError(connectProf.message)
        nextScreen("professional_account_error")
      }
  }

  const setUsername = async () => {
    setInvalidUsername(false);
    setLoading(true);

    if(type === "professional"){
        setLoading(false);
        window.FB.getLoginStatus(function(response) {
            if(response.status === 'connected'){
                setToken(response.authResponse.accessToken)
                fBCallback(response)
            }else{
                window.FB.login(function(response) {
                    if (response.status === 'connected') {
                      // Logged into your webpage and Facebook.
                      fBCallback(response)
                    } 
                  },{scope:'instagram_basic,pages_show_list'});
            }
        });
    }else if(type === "personal"){
        const location = window.location.href; 
        console.log(location);
        const redirect = await IGAuthUrl(location); 
        setLoading(false);
        window.open(redirect.url);
       
    }

  }

  const nextScreen = (value) => {
    setForm(value);
  }
  

  const Check = useCallback(
    () => (
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 0C3.13438 0 0 3.13438 0 7C0 10.8656 3.13438 14 7 14C10.8656 14 14 10.8656 14 7C14 3.13438 10.8656 0 7 0ZM10.0234 4.71406L6.73281 9.27656C6.68682 9.34076 6.62619 9.39306 6.55595 9.42914C6.48571 9.46523 6.40787 9.48405 6.32891 9.48405C6.24994 9.48405 6.17211 9.46523 6.10186 9.42914C6.03162 9.39306 5.97099 9.34076 5.925 9.27656L3.97656 6.57656C3.91719 6.49375 3.97656 6.37813 4.07812 6.37813H4.81094C4.97031 6.37813 5.12187 6.45469 5.21562 6.58594L6.32812 8.12969L8.78438 4.72344C8.87813 4.59375 9.02812 4.51562 9.18906 4.51562H9.92188C10.0234 4.51562 10.0828 4.63125 10.0234 4.71406Z"
          fill="#B3BCF5"
        />
      </svg>
    ),
    [],
  );

  const Logo = useCallback(
    () => (
      <svg
        width="90"
        height="39"
        viewBox="0 0 90 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M75.7587 0.104982C72.0547 0.103275 68.4956 1.48497 65.8356 3.95725C63.1755 6.42952 61.6236 9.79809 61.5088 13.3491V34.1606H61.5895C61.7509 35.2466 62.3152 36.2404 63.1791 36.9592C64.043 37.6781 65.1483 38.0738 66.292 38.0738C67.4358 38.0738 68.5409 37.6781 69.4048 36.9592C70.2687 36.2404 70.8331 35.2466 70.9945 34.1606V26.657C72.9512 27.3214 75.0358 27.5678 77.1021 27.3789C79.1687 27.1901 81.1671 26.5705 82.9578 25.5633C84.7485 24.5563 86.2881 23.1862 87.4691 21.5489C88.6501 19.9115 89.4438 18.0465 89.7949 16.0842C90.146 14.122 90.0458 12.1097 89.5013 10.1884C88.957 8.26713 87.9816 6.48309 86.6433 4.96113C85.3051 3.43915 83.6363 2.21598 81.7538 1.37717C79.8711 0.538367 77.8203 0.104182 75.7445 0.104982H75.7587ZM75.7587 18.2968C74.8193 18.2968 73.901 18.0297 73.1198 17.529C72.3387 17.0284 71.7298 16.3168 71.3703 15.4844C71.0108 14.6519 70.9167 13.7358 71.1 12.852C71.2834 11.9683 71.7357 11.1565 72.4 10.5194C73.0643 9.88221 73.9107 9.44829 74.832 9.2725C75.7534 9.09671 76.7085 9.18694 77.5765 9.53177C78.4444 9.87659 79.1863 10.4605 79.7082 11.2098C80.2301 11.959 80.5087 12.8398 80.5087 13.7409C80.5087 14.9493 80.0083 16.108 79.1175 16.9624C78.2267 17.8168 77.0185 18.2968 75.7587 18.2968Z"
          fill="black"
        />
        <path
          d="M27.4599 0.943066C25.9618 0.111515 24.1808 -0.115649 22.5082 0.311481C20.8356 0.738608 19.4082 1.78508 18.5394 3.22104L9.73777 18.0461C9.16822 18.9892 8.86545 20.0586 8.85947 21.1484C8.85348 22.2383 9.14447 23.3108 9.70363 24.2596C10.2628 25.2083 11.0707 26.0006 12.0473 26.5576C13.024 27.1148 14.1353 27.4175 15.2715 27.4358H15.623H15.7798H15.9698C16.2364 27.4138 16.5014 27.3758 16.763 27.322C17.4302 27.1882 18.0715 26.9545 18.6629 26.6294L18.7865 26.5519L18.8672 26.5018C19.0192 26.4107 19.1665 26.3151 19.3137 26.2103C20.0845 25.6522 20.7158 24.9362 21.1615 24.1145L29.8729 9.49911C30.3006 8.78545 30.5775 7.99792 30.6877 7.18157C30.798 6.36522 30.7393 5.53604 30.5152 4.74143C30.2912 3.94681 29.9059 3.20235 29.3817 2.5506C28.8575 1.89886 28.2045 1.3526 27.4599 0.943066Z"
          fill="black"
        />
        <path
          d="M12.248 3.23498C11.8281 2.50617 11.2611 1.86495 10.5799 1.34881C9.89868 0.832654 9.11704 0.451943 8.28066 0.228908C7.44428 0.00588168 6.56993 -0.0549845 5.70873 0.0498725C4.84754 0.154728 4.01678 0.423197 3.26503 0.839601C2.51327 1.25599 1.8556 1.81195 1.33048 2.47498C0.805348 3.138 0.423283 3.89478 0.206647 4.70109C-0.00999386 5.50738 -0.056877 6.34701 0.0687399 7.17088C0.194357 7.99477 0.489955 8.78636 0.938246 9.49939L7.51222 20.5611C7.51543 19.4686 7.81674 18.3958 8.38622 17.4495L14.5612 7.09385L12.248 3.23498Z"
          fill="black"
        />
        <path
          d="M45.4452 0.34668C42.627 0.34668 39.8718 1.14829 37.5284 2.65012C35.1851 4.15196 33.3587 6.28658 32.28 8.78405C31.2016 11.2815 30.9193 14.0297 31.4691 16.6809C32.019 19.3322 33.3761 21.7675 35.3691 23.6792C37.362 25.5906 39.901 26.8923 42.6653 27.4197C45.4295 27.947 48.2946 27.6764 50.8986 26.6419C53.5023 25.6074 55.7278 23.8556 57.2936 21.6079C58.8595 19.3602 59.6952 16.7177 59.6952 14.0145C59.6952 10.3896 58.1939 6.9131 55.5215 4.34989C52.8492 1.78668 49.2246 0.34668 45.4452 0.34668ZM45.4452 18.5704C44.5058 18.5704 43.5875 18.3033 42.8064 17.8026C42.0252 17.302 41.4163 16.5904 41.0568 15.758C40.6973 14.9255 40.6032 14.0094 40.7866 13.1256C40.9699 12.2419 41.4223 11.4301 42.0866 10.793C42.7509 10.1558 43.5973 9.72189 44.5187 9.5461C45.4401 9.3703 46.3951 9.46052 47.263 9.80535C48.1309 10.1502 48.8728 10.7341 49.3948 11.4834C49.9166 12.2326 50.1953 13.1134 50.1953 14.0145C50.1953 15.2227 49.6948 16.3816 48.804 17.236C47.9132 18.0904 46.705 18.5704 45.4452 18.5704Z"
          fill="black"
        />
      </svg>
    ),
    [],
  );

  const Shape = useCallback(
    () => (
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24.2006 14.6001C25.0854 14.6001 25.8006 15.3169 25.8006 16.2001C25.8006 18.8465 23.647 21.0001 21.0006 21.0001H5.66299L7.73179 23.0689C8.3574 23.6945 8.3574 24.7057 7.73179 25.3313C7.4198 25.6433 7.01019 25.8001 6.60059 25.8001C6.19099 25.8001 5.78139 25.6433 5.4694 25.3313L0.669395 20.5313C0.0437953 19.9057 0.0437953 18.8945 0.669395 18.2689L5.4694 13.4689C6.095 12.8433 7.10619 12.8433 7.73179 13.4689C8.3574 14.0945 8.3574 15.1057 7.73179 15.7313L5.66299 17.8001H21.0006C21.8838 17.8001 22.6006 17.0817 22.6006 16.2001C22.6006 15.3169 23.3158 14.6001 24.2006 14.6001ZM1.80059 11.4001C0.915792 11.4001 0.200592 10.6833 0.200592 9.80011C0.200592 7.15371 2.35419 5.00011 5.00059 5.00011H20.3382L18.2694 2.93131C17.6438 2.30571 17.6438 1.29451 18.2694 0.668907C18.895 0.043307 19.9062 0.043307 20.5318 0.668907L25.3318 5.46891C25.9574 6.09451 25.9574 7.10571 25.3318 7.73131L20.5318 12.5313C20.2198 12.8433 19.8102 13.0001 19.4006 13.0001C18.991 13.0001 18.5814 12.8433 18.2694 12.5313C17.6438 11.9057 17.6438 10.8945 18.2694 10.2689L20.3382 8.20011H5.00059C4.11739 8.20011 3.40059 8.91851 3.40059 9.80011C3.40059 10.6833 2.68539 11.4001 1.80059 11.4001Z"
          fill="#637381"
        />
      </svg>
    ),
    [],
  );
  
  const Selection = () => (
      <FormField>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '30px',
            alignItems: 'center',
          }}
        >
          <Logo />
          <Shape />
          <img src={instagram} alt="instagram connect" />
        </div>
        <Heading>Here are a few things this integration will do</Heading>
        <div
          style={{
            display: 'flex',
            justifyContent: 'start',
            margin: '10px',
            alignItems: 'center',
          }}
        >
          <Check />
          <p style={{marginLeft: '10px'}}> Connect your instagram stories</p>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'start',
            margin: '10px',
            alignItems: 'center',
          }}
        >
          <Check />
          <p style={{marginLeft: '10px'}}> Connect your instagram videos</p>
        </div>
        <div 
        style={{
            display: 'flex',
            flexDirection:'column',
            justifyContent: 'center',
            marginTop: '30px',
            alignItems: 'center',
          }}
        >
            <p>What kind of account do you want to connect</p>
            <div style={{padding:"20px"}}>
            <Checkbox
                id="personal"
                name="instagram"
                label="Personal"
                checked={type==="personal"}
                onChange={handleChange}
                />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <Checkbox
             id="professional"
             name="instagram"
             label="Professional"
             checked={type==="professional"}
             onChange={handleChange}
            />
            </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '30px',
            alignItems: 'center',
          }}
        >
          <Button onClick={setDefault}> Cancel</Button>
          <Button loading={loading}  primary onClick={()=> setUsername()}>
           Continue
          </Button>
        </div>
      </FormField>
    )

    const ListImportType = () => (
      <FormField>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '30px',
            alignItems: 'center',
          }}
        >
          <img src={instagram} alt="instagram connect" />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '30px',
            alignItems: 'center',
          }}
        >
         <Heading>Choose what to import</Heading>
        </div>
      
        <div 
        style={{
            display: 'flex',
            flexDirection:'column',
            justifyContent: 'center',
            marginTop: '30px',
            alignItems: 'center',
          }}
        >
            <p>Select what content you’ll like to import</p>
            <div style={{padding:"20px"}}>
            <Checkbox
                id="posts"
                name="instagram"
                label="Posts"
                checked={import_type==="posts"}
                onChange={handleImportChange}
                />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <Checkbox
             id="stories"
             name="instagram"
             label="Stories"
             checked={import_type==="stories"}
             onChange={handleImportChange}
            />
            </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '30px',
            alignItems: 'center',
          }}
        >
          <Button onClick={setDefault}> Cancel</Button>
          <Button loading={loading}  primary onClick={()=> setConnectProfessional()}>
           Continue
          </Button>
        </div>
      </FormField>
    )

  const Connected = () => (
      <FormField>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '30px',
            alignItems: 'center',
          }}
        >
          <Logo />
          <Shape />
          <img src={instagram} alt="instagram connect" />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '30px',
            alignItems: 'center',
          }}
        >
          <DisplayText size="medium">
            Your account has been connected
          </DisplayText>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '30px',
            alignItems: 'center',
          }}
        >
          <Button
            primary
            onClick={setDefault}
          >
            {' '}
            Finish
          </Button>
        </div>
      </FormField>
    );

    const ProfessionalAccountError = () => (
      <FormField>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '30px',
            alignItems: 'center',
          }}
        >
          <Logo />
          <Shape />
          <img src={instagram} alt="instagram connect" />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '30px',
            alignItems: 'center',
          }}
        >
          <DisplayText size="medium">
          {professionalAccountError}
          </DisplayText>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '30px',
            alignItems: 'center',
          }}
        >
          <Button
            primary
            onClick={setDefault}
          >
            {' '}
            Finish
          </Button>
        </div>
      </FormField>
    );

    const IGAccountError = () => (
      <FormField>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '30px',
            alignItems: 'center',
          }}
        >
          <Logo />
          <Shape />
          <img src={instagram} alt="instagram connect" />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '30px',
            alignItems: 'center',
          }}
        >
          <h2 style={{textAlign:"center"}}>
           There was an error in connecting your instagram account, please check if your instagram account is a professional account
          </h2>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '30px',
            alignItems: 'center',
          }}
        >
          <Button
            primary
            onClick={setDefault}
          >
            {' '}
            Finish
          </Button>
        </div>
      </FormField>
    );

    const PersonalAccountError = () => (
      <FormField>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '30px',
            alignItems: 'center',
          }}
        >
          <Logo />
          <Shape />
          <img src={instagram} alt="instagram connect" />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '30px',
            alignItems: 'center',
          }}
        >
          <h2 style={{textAlign:"center"}}>
           {personalAccountError}
          </h2>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '30px',
            alignItems: 'center',
          }}
        >
          <Button
            primary
            onClick={setDefault}
          >
            {' '}
            Finish
          </Button>
        </div>
      </FormField>
    );

    const ListProfessionalPages = () => (
      <FormField>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '30px',
            alignItems: 'center',
          }}
        >
          <FacebookIcon />
        </div>
        <Heading>Select which facebook page to connect</Heading>
        
        <div 
        style={{
            display: 'flex',
            flexDirection:'column',
            justifyContent: 'start',
            marginTop: '30px',
            alignItems: 'center',
          }}
        >
            <p>What kind of account do you want to connect</p>
            {pages.map((item, indx)=>(
                <div
                key={indx}
                style={{
                  display: 'flex',
                  justifyContent: 'start',
                  margin: '10px',
                  alignItems: 'center',
                  background:"white",
                  width:"100%"
                }}
              >
              <Checkbox
                id={item.id}
                name="facebook_pages"
                label={item.name}
                checked={fbId === item.id}
                onChange={handleFbChange}
                />
            </div>
            ))}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '30px',
            alignItems: 'center',
          }}
        >
          <Button onClick={setDefault}> Cancel</Button>
          <Button loading={loading}  primary onClick={()=> setFbPage()}>
           Continue
          </Button>
        </div>
      </FormField>
    )

  const Username = () => (
      <FormField>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '30px',
            alignItems: 'center',
          }}
        >
          <img src={instagram} alt="instagram logo" />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection:'column',
            justifyContent: 'center',
            margin: '30px',
            alignItems: 'center',
          }}
        >
          <DisplayText size="medium">Instagram username</DisplayText>
          <p style={{padding:"10px"}}>Enter your instagram username below</p>
        </div>
        <Form onSubmit={handleSubmit(setUsername)}>
          <FormLayout>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '10px',
                alignItems: 'center',
              }}
            >
              <Controller
                as={TextField}
                control={control}
                prefix={<Icon source={MentionMajorMonotone} />}
                error={invalidUsername ? 'Username is invalid' : null}
                label="Username"
                placeholder="Instagram Username"
                labelHidden
                type="text"
                name="username"
               
              />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '30px',
                alignItems: 'center',
              }}
            >
              <Button onClick={setDefault}> Cancel</Button>
              <Button primary submit loading={loading}>
                {' '}
                Continue{' '}
              </Button>
            </div>
          </FormLayout>
        </Form>
      </FormField>
    )

  const View = () => {
    switch (form) {
      case 'connected':
        return <Connected />;
      case 'zero_pages':
        return <ProfessionalAccountError />;
      case 'ig_connect_error':
        return <IGAccountError />;
      case 'personal_account_error':
        return <PersonalAccountError />;
      case 'professional_account_error':
        return <ProfessionalAccountError />;
      case 'list_pages':
        return <ListProfessionalPages />;
      case 'import_type':
        return <ListImportType />;
      default:
        return <Selection />;
    }
  };

  return (
    <Page
      fullWidth
      title="Connect Instagram"
      breadcrumbs={[
        {
          content: 'Connected Accounts',
          url: `/account/id/${accountId}/connect`,
        },
      ]}
    >
      <Container>
        <View />
      </Container>
    </Page>
  );
};
