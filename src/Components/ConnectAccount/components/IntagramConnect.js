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

  const FacebookIcon = useCallback(() => (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.48986 0C29.8218 0 50.1537 0 70.5101 0C70.6577 0.0736648 70.7806 0.19644 70.9281 0.220994C76.976 1.66974 80 5.47575 80 11.639C80 30.6937 80 49.7483 80 68.803C80 75.3591 75.4026 79.9754 68.8384 79.9754C63.7738 79.9754 58.7093 79.9754 53.6447 79.9754C53.2022 79.9754 52.7597 79.9754 52.268 79.9754C52.268 70.4236 52.268 61.019 52.268 51.4917C52.7843 51.4917 53.2268 51.4917 53.6447 51.4917C56.3491 51.4917 59.0289 51.4917 61.7333 51.4917C63.11 51.4917 63.7492 50.9024 63.9213 49.5519C64.2655 46.8508 64.5851 44.1498 64.9047 41.4242C65.1506 39.4352 64.4376 38.6249 62.4216 38.6004C59.4714 38.6004 56.5458 38.6004 53.5956 38.6004C53.153 38.6004 52.7351 38.5513 52.2434 38.5267C52.2434 35.4328 52.0959 32.4371 52.2926 29.4905C52.4892 26.7158 54.1119 25.3653 56.9146 25.267C58.6601 25.1934 60.4302 25.2425 62.1758 25.2179C63.8722 25.1934 64.5851 24.5304 64.6097 22.8607C64.6343 20.577 64.6343 18.2934 64.6097 16.0098C64.5851 14.3646 63.9459 13.7017 62.2741 13.7262C59.2256 13.7262 56.1524 13.7017 53.1039 13.8735C46.1955 14.2419 40.6884 19.202 39.9017 26.0773C39.4837 29.7115 39.6558 33.3947 39.5821 37.0534C39.5821 37.52 39.5821 37.9865 39.5821 38.5758C37.1235 38.5758 34.8371 38.5513 32.5507 38.5758C31.2231 38.5758 30.3626 39.2634 30.338 40.5157C30.3135 43.585 30.338 46.6298 30.4364 49.6992C30.4856 50.9269 31.1985 51.4426 32.477 51.4672C34.3946 51.4917 36.3122 51.4672 38.2299 51.4672C38.6478 51.4672 39.0904 51.5163 39.4591 51.5163C39.4591 61.0681 39.4591 70.4727 39.4591 79.8772C39.1395 79.9018 38.9428 79.9263 38.7462 79.9263C29.2809 79.9263 19.791 79.9754 10.3258 79.9018C4.64659 79.9018 0 75.0154 0 69.2941C0 49.7974 0 30.3008 0 10.8042C0 5.86863 3.34358 1.59607 8.08851 0.392879C8.55562 0.294659 9.02274 0.14733 9.48986 0Z" fill="#445897"/>
    </svg>
  ),[])
  
  const connectionError = () => (
    <svg width="81" height="81" viewBox="0 0 81 81" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40.5" cy="40.5" r="40.5" fill="#DFE3E8"/>
      <path d="M30.1499 38.4493C30.544 38.4992 30.9422 38.3946 31.2571 38.1585C31.5719 37.9224 31.7776 37.5741 31.8288 37.1903C31.8801 36.8066 31.7726 36.4187 31.5302 36.112C31.2878 35.8054 30.9303 35.6051 30.5362 35.5552L27.9212 34.9184C27.7306 34.8615 27.5301 34.8426 27.3318 34.8627C27.1335 34.8828 26.9414 34.9416 26.7668 35.0356C26.5923 35.1295 26.439 35.2568 26.3161 35.4097C26.1931 35.5626 26.103 35.738 26.0512 35.9255C25.9993 36.113 25.9867 36.3088 26.0141 36.5012C26.0416 36.6935 26.1085 36.8785 26.2109 37.0452C26.3133 37.2118 26.4491 37.3567 26.6102 37.4711C26.7713 37.5855 26.9544 37.6672 27.1486 37.7113L29.7636 38.3914C29.8881 38.4319 30.0187 38.4514 30.1499 38.4493ZM35.885 30.3602C35.9721 30.6759 36.1663 30.9535 36.4361 31.148C36.7059 31.3424 37.0353 31.4422 37.3708 31.431C37.4987 31.451 37.6291 31.451 37.7571 31.431C38.1342 31.3294 38.4549 31.087 38.6496 30.7565C38.8444 30.4259 38.8973 30.0339 38.7971 29.6656L38.0988 27.1187C38.0535 26.9296 37.9697 26.7512 37.8522 26.5943C37.7347 26.4374 37.5859 26.3052 37.4148 26.2054C37.2438 26.1057 37.0538 26.0405 36.8563 26.0138C36.6588 25.987 36.4578 25.9993 36.2652 26.0498C36.0727 26.1004 35.8926 26.1881 35.7356 26.3079C35.5786 26.4276 35.448 26.5769 35.3515 26.7469C35.255 26.9168 35.1947 27.104 35.174 27.2971C35.1533 27.4903 35.1728 27.6855 35.2313 27.8712L35.885 30.3602ZM43.0613 44.8309C42.9225 44.6886 42.7554 44.5753 42.5702 44.4978C42.385 44.4204 42.1856 44.3805 41.9841 44.3805C41.7826 44.3805 41.5831 44.4204 41.398 44.4978C41.2128 44.5753 41.0457 44.6886 40.9069 44.8309L35.7067 49.9825C35.0953 50.5538 34.2808 50.8728 33.4335 50.8728C32.5862 50.8728 31.7717 50.5538 31.1602 49.9825C30.8593 49.6931 30.6203 49.3483 30.4572 48.9683C30.2941 48.5882 30.2101 48.1804 30.2101 47.7684C30.2101 47.3565 30.2941 46.9487 30.4572 46.5686C30.6203 46.1886 30.8593 45.8438 31.1602 45.5544L36.4496 40.4897C36.6051 40.3599 36.7314 40.2003 36.8206 40.0208C36.9098 39.8412 36.9599 39.6457 36.9678 39.4464C36.9757 39.2471 36.9412 39.0484 36.8665 38.8627C36.7919 38.677 36.6785 38.5083 36.5338 38.3673C36.389 38.2263 36.2158 38.1159 36.0251 38.0432C35.8345 37.9704 35.6304 37.9369 35.4258 37.9446C35.2212 37.9523 35.0204 38.0011 34.8361 38.0879C34.6517 38.1748 34.4878 38.2978 34.3546 38.4493L29.0207 43.4996C28.4432 44.0621 27.9851 44.7299 27.6725 45.4648C27.3599 46.1997 27.1991 46.9874 27.1991 47.7829C27.1991 48.5784 27.3599 49.3661 27.6725 50.101C27.9851 50.836 28.4432 51.5037 29.0207 52.0662C29.5983 52.6287 30.2839 53.0749 31.0385 53.3794C31.7931 53.6838 32.6018 53.8405 33.4186 53.8405C34.2354 53.8405 35.0441 53.6838 35.7987 53.3794C36.5533 53.0749 37.239 52.6287 37.8165 52.0662L43.0613 46.9581C43.2121 46.8226 43.3324 46.6581 43.4148 46.4751C43.4971 46.292 43.5396 46.0943 43.5396 45.8945C43.5396 45.6946 43.4971 45.497 43.4148 45.3139C43.3324 45.1309 43.2121 44.9664 43.0613 44.8309ZM30.7739 32.661C31.0507 32.9284 31.4242 33.0791 31.814 33.0807C32.0095 33.0818 32.2033 33.0453 32.3844 32.9733C32.5654 32.9012 32.73 32.7951 32.8689 32.661C33.1456 32.3899 33.3009 32.0231 33.3009 31.6408C33.3009 31.2585 33.1456 30.8918 32.8689 30.6206L30.9522 28.7539C30.668 28.5169 30.3024 28.393 29.9284 28.407C29.5545 28.4211 29.1998 28.5721 28.9352 28.8298C28.6706 29.0875 28.5156 29.433 28.5011 29.7972C28.4867 30.1614 28.6139 30.5175 28.8573 30.7943L30.7739 32.661ZM54.6652 43.268L52.0502 42.5879C51.8564 42.5227 51.6509 42.4972 51.4465 42.5131C51.2421 42.529 51.0433 42.586 50.8626 42.6803C50.6819 42.7747 50.5233 42.9045 50.3966 43.0615C50.2699 43.2185 50.1779 43.3994 50.1265 43.5927C50.0751 43.786 50.0653 43.9876 50.0978 44.1848C50.1303 44.3819 50.2043 44.5704 50.3152 44.7384C50.4261 44.9063 50.5715 45.0501 50.7422 45.1607C50.913 45.2712 51.1054 45.3462 51.3073 45.3808L53.9223 46.0609H54.3086C54.7026 46.1108 55.1009 46.0062 55.4157 45.7701C55.7306 45.534 55.9363 45.1857 55.9875 44.8019C56.0387 44.4182 55.9313 44.0303 55.6889 43.7236C55.4465 43.417 55.0889 43.2166 54.6949 43.1668L54.6652 43.268ZM45.9288 50.6192C45.8772 50.4357 45.789 50.264 45.6692 50.1137C45.5494 49.9635 45.4004 49.8378 45.2307 49.7437C45.0609 49.6496 44.8738 49.589 44.68 49.5655C44.4863 49.5419 44.2896 49.5557 44.1013 49.6062C43.7242 49.7078 43.4035 49.9502 43.2087 50.2807C43.014 50.6113 42.961 51.0033 43.0613 51.3717L43.7596 53.9185C43.8467 54.2342 44.0409 54.5119 44.3107 54.7063C44.5805 54.9008 44.9099 55.0005 45.2454 54.9893C45.3737 55.0036 45.5033 55.0036 45.6317 54.9893C45.8214 54.9406 45.9993 54.8559 46.1552 54.7399C46.311 54.6238 46.4418 54.4789 46.5399 54.3134C46.6379 54.148 46.7014 53.9652 46.7266 53.7757C46.7518 53.5862 46.7382 53.3938 46.6866 53.2094L45.9288 50.6192ZM51.0399 48.3473C50.7556 48.1102 50.39 47.9863 50.0161 48.0004C49.6422 48.0145 49.2874 48.1654 49.0228 48.4232C48.7582 48.6809 48.6032 49.0263 48.5888 49.3905C48.5743 49.7547 48.7015 50.1108 48.9449 50.3876L50.8616 52.2544C51.14 52.5239 51.5165 52.6752 51.909 52.6752C52.3016 52.6752 52.6781 52.5239 52.9565 52.2544C53.2332 51.9832 53.3886 51.6165 53.3886 51.2342C53.3886 50.8519 53.2332 50.4851 52.9565 50.214L51.0399 48.3473ZM54.576 33.2543C54.5991 32.051 54.2513 30.8685 53.5775 29.8596C52.9038 28.8507 51.935 28.0617 50.7962 27.5944C49.6574 27.127 48.401 27.0029 47.1891 27.238C45.9771 27.473 44.8654 28.0565 43.9973 28.9131L38.7525 34.0647C38.612 34.2024 38.5008 34.3658 38.4251 34.5455C38.3495 34.7251 38.3109 34.9175 38.3116 35.1117C38.3123 35.3059 38.3522 35.498 38.4292 35.6771C38.5061 35.8562 38.6185 36.0189 38.76 36.1557C38.9014 36.2925 39.0692 36.4009 39.2536 36.4745C39.4381 36.5482 39.6356 36.5858 39.835 36.5851C40.0343 36.5845 40.2316 36.5456 40.4155 36.4706C40.5995 36.3957 40.7664 36.2862 40.9069 36.1485L46.1071 30.9969C46.7185 30.4256 47.533 30.1066 48.3803 30.1066C49.2276 30.1066 50.0422 30.4256 50.6536 30.9969C50.9545 31.2863 51.1935 31.631 51.3566 32.0111C51.5197 32.3911 51.6037 32.799 51.6037 33.2109C51.6037 33.6228 51.5197 34.0307 51.3566 34.4107C51.1935 34.7908 50.9545 35.1355 50.6536 35.4249L45.3642 40.4897C45.0875 40.7608 44.9322 41.1276 44.9322 41.5099C44.9322 41.8922 45.0875 42.2589 45.3642 42.53C45.6426 42.7996 46.0192 42.9508 46.4117 42.9508C46.8042 42.9508 47.1808 42.7996 47.4592 42.53L52.7931 37.4798C53.9303 36.3515 54.5701 34.8353 54.576 33.2543Z" fill="#637381"/>
    </svg>
  )

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
            justifyContent: 'center',
            margin: '30px',
            alignItems: 'center',
          }}
        >
          <connectionError />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection:"column",
            justifyContent: 'center',
            margin: '30px',
            alignItems: 'center',
          }}
        >
          <DisplayText size="medium">
          Connection Failed
          </DisplayText>
          <p>{professionalAccountError}</p>
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
            Retry
          </Button>
        </div>
      </FormField>
    );

    const IGAccountError = () => (
      <FormField>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '30px',
            alignItems: 'center',
          }}
        >
           <connectionError />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection:"column",
            justifyContent: 'center',
            margin: '30px',
            alignItems: 'center',
          }}
        >
          <DisplayText size="medium">
          Connection Failed
          </DisplayText>
          <p style={{textAlign:"center"}}>
           There was an error in connecting your instagram account, please check if your instagram account is a professional account
          </p>
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
            Retry
          </Button>
        </div>
      </FormField>
    );

    const PersonalAccountError = () => (
      <FormField>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '30px',
            alignItems: 'center',
          }}
        >
          <connectionError />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection:"column",
            justifyContent: 'center',
            margin: '30px',
            alignItems: 'center',
          }}
        >
          <DisplayText size="medium">
          Connection Failed
          </DisplayText>
          <p style={{textAlign:"center"}}>
           {personalAccountError}
          </p>
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
