import React, {useState, useCallback, useEffect} from 'react';
import {EmptyState, Button, Page, Modal, Heading, Filters, ResourceList,TextStyle,Avatar,Icon,Toast} from '@shopify/polaris';
import {useParams} from 'react-router-dom';
import {HashtagMajorMonotone,CustomersMajorMonotone,PlayCircleMajorMonotone,DeleteMinor,RefreshMinor} from '@shopify/polaris-icons';
import {Social, ConnectList, Resource} from '../styles';
import {UserStore, FrameStore} from "../../../Context/store";
import instagram from '../../Icons/instagram.png'

export const ConnectAccount = () => {
  const {accountId} = useParams();
  const {user} = React.useContext(UserStore);
  const {setIsLoading, unsetIsLoading} = React.useContext(FrameStore)
  const userId = user.id
  const [active, setActive] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteModalActive, setDeletemodalActive] = useState(false);
  const handleDeleteChange = useCallback((id) =>{ setDeleteId(id); setDeletemodalActive(!deleteModalActive)}, [deleteModalActive]);
  const handleChange = useCallback(() => setActive(!active), [active]);
  const [connectedAccount, setConnectedAccount] = useState([]);
  const [queryValue, setQueryValue] = useState(null);
  const [filtered, setFiltered] = useState([]);
  const [successActive, setSuccessActive] = useState(false);
  const [failedActive, setFailedActive] = useState(false);
  const [deleteActive, setDeleteActive] = useState(false);
  const toggleToastDeleteActive = () => setDeleteActive((deleteActive) => !deleteActive)
  const toggleToastSuccessActive = () => setSuccessActive((successActive) => !successActive)
  const toggleToastFailedActive = () => setFailedActive((failedActive) => !failedActive)
  const handleFiltersQueryChange =
    (value) => {
      setQueryValue(value)
      const filter  = connectedAccount.filter((item)=> item.data.includes(value, 0))
      setFiltered(filter)
    }

  const handleQueryValueRemove = () =>{ 
    setQueryValue(null)
    setFiltered(connectedAccount)
  };

  const handleDelete = (id) => {
    handleDeleteChange()
    setIsLoading()
    fetch(`${process.env.REACT_APP_API_HOST}/admin/user/id/${userId}/account/id/${accountId}/connected/id/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((json) => {
        if (json.success) {
          const filter  = filtered.filter((item)=> item.id !== id)
          setFiltered(filter)
          toggleToastDeleteActive()
          setConnectedAccount(filter)
          unsetIsLoading()
        }else{
          unsetIsLoading()
          throw new Error('Network response was not ok');
        }
       
      })
      .catch((ex) => {
       
      });
  }

  const startImport = (id) => {
    setIsLoading()
    try{
    fetch(`${process.env.REACT_APP_API_HOST}/admin/user/id/${userId}/account/id/${accountId}/connected/id/${id}/start`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((json) => {
        if (json.success) {
          fetch(`${process.env.REACT_APP_API_HOST}/admin/user/id/${userId}/account/id/${accountId}/connected/list`, {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then((json) => {
              if (json.importers) {
                setConnectedAccount(json.importers)
                setFiltered(json.importers)
                unsetIsLoading()
                toggleToastSuccessActive();
              }
              throw new Error('Network response was not ok');
            })
            .catch((ex) => {
             
            });
        }else{
          toggleToastFailedActive();
          unsetIsLoading();
        }
      })
    }catch(ex){
        toggleToastFailedActive();
        unsetIsLoading();
    }
  }

  useEffect(() => {
    setIsLoading()
    fetch(`${process.env.REACT_APP_API_HOST}/admin/user/id/${userId}/account/id/${accountId}/connected/list`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((json) => {
        if (json.importers) {
          setConnectedAccount(json.importers)
          setFiltered(json.importers)
          unsetIsLoading()
        }
        throw new Error('Network response was not ok');
      })
      .catch((ex) => {
       
      });
  }, [])

  const activator = (
    <Button primary onClick={handleChange}>
      {' '}
      Connect Account
    </Button>
  );

  const Tiktok = useCallback(
    () => (
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.2172 0C22.3382 0 37.4687 0 52.5897 0C52.6179 0.0281834 52.6555 0.0751556 52.6837 0.0751556C55.999 0.573061 58.2343 2.44256 59.4834 5.51454C59.7182 6.0876 59.8309 6.70764 60 7.30888C60 7.43101 60 7.56253 60 7.68466C59.8497 7.80679 59.9061 7.97589 59.9061 8.11681C59.9061 22.7064 59.9061 37.2866 59.9061 51.8762C59.9061 52.0265 59.8497 52.1956 60 52.3083C60 52.468 60 52.6183 60 52.778C59.8685 52.8062 59.9155 52.9189 59.8967 53.0035C59.0326 57.1464 55.736 59.993 51.7163 59.993C37.2339 60.0023 22.7609 60.0023 8.27849 59.993C3.77035 59.993 0.0135662 56.207 0.0041742 51.6977C-0.00521775 37.2302 0.0041742 22.7628 0.0041742 8.2953C-0.00521775 4.89451 2.17372 1.79434 5.36698 0.554273C5.97746 0.319411 6.61611 0.244256 7.2172 0ZM41.3382 17.8119C41.3382 17.7179 41.263 17.7179 41.2067 17.7085C41.1222 17.6334 41.0376 17.5676 40.9625 17.4925C40.9249 17.4173 40.8968 17.314 40.7747 17.3422H40.784C40.784 17.314 40.8028 17.2764 40.784 17.2576C39.4598 15.5666 38.6521 13.6783 38.699 11.4894C38.699 11.2921 38.5957 11.2546 38.4361 11.2639C37.9101 11.2733 37.3748 11.2827 36.8488 11.2921L36.8113 11.2639C36.8206 11.2546 36.83 11.2358 36.8206 11.2264C36.8113 11.1982 36.8019 11.1794 36.7925 11.1512C36.7737 10.7942 36.7173 10.4372 36.7361 10.0802C36.7549 9.72326 36.6422 9.63871 36.2947 9.63871C34.36 9.65749 32.4252 9.66689 30.4905 9.63871C30.049 9.62931 29.9645 9.77023 29.9645 10.1836C29.9739 18.7607 29.9739 27.3285 29.9739 35.9056C29.9739 36.3283 29.9551 36.7511 29.9082 37.1644C29.6076 39.9546 26.8088 42.2093 24.0194 41.9744C23.3338 41.918 22.6858 41.702 22.0283 41.5517C22.0189 41.4671 21.9532 41.4577 21.8874 41.4671C21.8217 41.4013 21.7559 41.345 21.6996 41.2792C21.6339 41.1759 21.5775 41.0631 21.5118 40.9598C20.1217 38.7239 20.4505 35.8022 22.3476 33.9703C23.8316 32.533 25.6254 32.0633 27.6353 32.5236C27.9452 32.5987 28.0486 32.533 28.0298 32.2042C28.0016 31.772 28.0204 31.3305 28.0204 30.8983C28.0204 29.3107 28.0204 27.7136 28.0204 26.126C28.0204 25.9569 28.0955 25.7314 27.7856 25.7126C27.2127 25.6844 26.6398 25.5623 26.0575 25.6468L26.0293 25.6187C26.0387 25.3086 26.0105 24.9892 26.0575 24.6886C26.142 24.1719 25.8884 24.0592 25.447 24.0404C23.2962 23.9183 21.2206 24.2001 19.2577 25.102C11.9977 28.4276 9.69667 37.4557 14.496 43.8627C15.2191 44.8209 16.0269 45.704 17.0694 46.3334H17.06C17.0788 46.4368 17.1633 46.4556 17.2478 46.4837C17.3699 46.5777 17.492 46.681 17.6141 46.775C17.708 46.9159 17.7925 47.0756 17.9992 47.085C17.9804 47.1789 18.0555 47.2165 18.1119 47.2635C20.8637 49.6403 24.0382 50.6643 27.6635 50.2885C30.4435 49.9973 32.8479 48.8699 34.8577 46.9347C37.4405 44.4545 38.6896 41.3825 38.699 37.8033C38.7084 33.5382 38.699 29.2731 38.699 25.008C38.699 24.8483 38.6521 24.6698 38.746 24.4913C39.3565 24.8389 39.9482 25.2053 40.5586 25.5341C42.7376 26.7084 45.0856 27.2533 47.5463 27.366C47.7435 27.3754 47.9971 27.4694 47.9971 27.0936C47.9877 25.0268 47.9877 22.9694 47.9877 20.9027C47.9877 20.7805 48.0065 20.6396 47.8092 20.649C47.2175 20.6678 46.6352 20.4987 46.0435 20.4705L46.006 20.4423C46.0154 20.1041 46.006 19.7565 46.0342 19.4183C46.0623 19.0989 45.9496 18.9768 45.6303 18.9768C44.6629 18.9768 43.7237 18.7701 42.8221 18.4319C42.3243 18.244 41.836 18.0186 41.3382 17.8119Z"
          fill="#010101"
        />
        <path
          d="M59.9905 52.3253C59.8402 52.2032 59.8966 52.0341 59.8966 51.8932C59.8966 37.3036 59.8966 22.7234 59.8966 8.1338C59.8966 7.98349 59.8402 7.81439 59.9905 7.70166C59.9905 22.5637 59.9905 37.4445 59.9905 52.3253Z"
          fill="#121212"
        />
        <path
          d="M17.6235 46.7549C17.5014 46.661 17.3793 46.5576 17.2572 46.4637C17.2384 46.3603 17.1915 46.2946 17.0694 46.3134H17.0788C17.1163 46.1349 16.9567 46.0691 16.8721 45.9752C14.5993 43.1944 13.6131 40.0191 14.0639 36.4398C14.5148 32.9169 16.2241 30.108 19.0605 27.9942C21.1267 26.4629 23.4841 25.7583 26.0293 25.608L26.0575 25.6362C26.0575 27.4024 26.0575 29.1591 26.0575 30.9441C25.5879 30.8689 25.1652 30.7562 24.7332 30.728C20.535 30.4649 17.539 34.5703 19.1074 38.469C19.6146 39.7185 20.4317 40.7143 21.6902 41.278C21.7559 41.3437 21.8217 41.4001 21.878 41.4658C21.9062 41.5222 21.925 41.5974 22.0189 41.5504C21.972 41.7477 22.141 41.8228 22.2443 41.9262C23.8222 43.5608 26.2829 44.0775 28.4148 43.2226C30.528 42.3771 31.9462 40.2821 31.9462 37.9993C31.9462 29.3 31.9462 20.6008 31.9462 11.9015C31.9462 11.6948 31.9556 11.4976 31.965 11.2909C33.5804 11.2815 35.1864 11.2721 36.8019 11.2627L36.8394 11.2909C37.0085 12.4558 37.4311 13.5362 38.051 14.532C38.7554 15.6687 39.6101 16.6551 40.7747 17.3503H40.7653C40.7934 17.4536 40.878 17.463 40.9531 17.5006C41.0376 17.5758 41.1222 17.6415 41.1973 17.7167C41.2161 17.7824 41.2443 17.8294 41.3288 17.82C41.357 17.9891 41.5072 18.0643 41.6199 18.1676C42.8785 19.3231 44.3342 20.0841 46.006 20.4411L46.0435 20.4693C46.0342 22.0945 46.0248 23.7197 46.0342 25.345C46.0342 25.6174 45.9872 25.7395 45.6773 25.7114C45.1983 25.6644 44.7193 25.702 44.2403 25.6362C42.4746 25.4107 40.7934 24.9504 39.1874 24.1988C38.3421 23.8043 37.5532 23.3252 36.7267 22.7709C36.7267 23.0058 36.7267 23.1749 36.7267 23.3346C36.7267 27.6748 36.7267 32.015 36.7267 36.3647C36.7267 37.135 36.6516 37.896 36.5201 38.6475C35.0925 46.304 26.9873 50.7569 19.7555 47.8729C19.1544 47.638 18.6284 47.2528 17.9992 47.0931C17.9616 46.8489 17.7456 46.8583 17.6235 46.7549Z"
          fill="#FEFDFD"
        />
        <path
          d="M17.9988 47.0663C18.6281 47.226 19.1634 47.6111 19.7551 47.846C26.9775 50.7301 35.0828 46.2865 36.5197 38.6206C36.6606 37.8691 36.7357 37.1081 36.7264 36.3378C36.717 31.9976 36.7264 27.6573 36.7264 23.3077C36.7264 23.1386 36.7264 22.9789 36.7264 22.744C37.5528 23.3077 38.3512 23.7774 39.187 24.172C40.7931 24.9235 42.4742 25.3839 44.2399 25.6093C44.7283 25.6751 45.2073 25.6375 45.6769 25.6845C45.9868 25.7127 46.0338 25.5905 46.0338 25.3181C46.0244 23.6929 46.0432 22.0676 46.0432 20.4424C46.6349 20.4612 47.2078 20.6397 47.8089 20.6209C47.9967 20.6115 47.9873 20.7524 47.9873 20.8745C47.9873 22.9413 47.9779 24.9987 47.9967 27.0655C47.9967 27.4506 47.7431 27.3473 47.5459 27.3379C45.0852 27.2252 42.7372 26.6803 40.5583 25.506C39.9478 25.1772 39.3561 24.8108 38.7456 24.4632C38.6517 24.6417 38.6987 24.8108 38.6987 24.9799C38.6987 29.245 38.6987 33.5101 38.6987 37.7751C38.6893 41.3544 37.4401 44.417 34.8574 46.9065C32.8475 48.8324 30.4525 49.9691 27.6631 50.2604C24.0378 50.6361 20.8633 49.6122 18.1115 47.2354C18.0551 47.1978 17.98 47.1602 17.9988 47.0663Z"
          fill="#FC014C"
        />
        <path
          d="M31.9744 11.2813C31.965 11.488 31.9556 11.6853 31.9556 11.8919C31.9556 20.5912 31.9556 29.2905 31.9556 37.9897C31.9556 40.282 30.5374 42.3675 28.4243 43.213C26.2923 44.0679 23.8316 43.5512 22.2537 41.9166C22.1504 41.8133 21.9814 41.7381 22.0283 41.5408C22.6858 41.6911 23.3338 41.8978 24.0194 41.9636C26.8088 42.1984 29.6076 39.9438 29.9082 37.1536C29.9551 36.7403 29.9739 36.3175 29.9739 35.8948C29.9739 27.3176 29.9833 18.7499 29.9645 10.1728C29.9645 9.7594 30.0397 9.61848 30.4905 9.62788C32.4252 9.65606 34.36 9.64667 36.2947 9.62788C36.6422 9.62788 36.7643 9.70303 36.7361 10.0694C36.7173 10.4264 36.7643 10.7834 36.7925 11.1404C35.3555 11.1404 33.9092 11.1498 32.4722 11.1592C32.3031 11.1592 32.0965 11.0746 31.9744 11.2813Z"
          fill="#3DCBD1"
        />
        <path
          d="M26.0386 25.6006C23.4933 25.7415 21.1266 26.4461 19.0697 27.9868C16.224 30.1005 14.5146 32.9095 14.0732 36.4324C13.6224 40.0117 14.6085 43.187 16.8814 45.9678C16.9659 46.0711 17.1256 46.1369 17.088 46.306C16.0455 45.6765 15.2284 44.7934 14.5146 43.8352C9.71534 37.4376 12.0164 28.4001 19.2764 25.0745C21.2487 24.1726 23.3149 23.8814 25.4657 24.0129C25.9071 24.0411 26.1607 24.1538 26.0761 24.6611C26.0198 24.9712 26.0386 25.2906 26.0386 25.6006Z"
          fill="#3BCAD0"
        />
        <path
          d="M21.6993 41.2701C20.4408 40.6971 19.6237 39.7013 19.1165 38.4612C17.5387 34.5719 20.5441 30.4665 24.7423 30.7202C25.1837 30.7484 25.597 30.8611 26.0666 30.9362C26.0666 29.1513 26.0666 27.3851 26.0666 25.6284C26.6489 25.5438 27.2124 25.6566 27.7947 25.6941C28.1046 25.7129 28.0295 25.929 28.0295 26.1075C28.0295 27.6952 28.0295 29.2922 28.0295 30.8799C28.0295 31.3214 28.0107 31.7536 28.0389 32.1857C28.0577 32.5145 27.9544 32.5709 27.6444 32.5051C25.6252 32.0448 23.8407 32.5145 22.3568 33.9519C20.4596 35.7932 20.1309 38.7149 21.5209 40.9413C21.5772 41.0541 21.6336 41.1668 21.6993 41.2701Z"
          fill="#FC014C"
        />
        <path
          d="M40.7841 17.3415C39.6195 16.6463 38.7648 15.6599 38.0604 14.5232C37.4406 13.5274 37.0179 12.447 36.8489 11.2821C37.3748 11.2727 37.9102 11.2633 38.4361 11.2539C38.5958 11.2539 38.7085 11.2915 38.6991 11.4794C38.6521 13.6683 39.4598 15.5472 40.7841 17.2476C40.8029 17.2757 40.7841 17.3133 40.7841 17.3415Z"
          fill="#FC014C"
        />
        <path
          d="M46.0153 20.4336C44.3436 20.086 42.8878 19.3156 41.6293 18.1601C41.5166 18.0568 41.3663 17.9816 41.3381 17.8125C41.8359 18.0192 42.3243 18.2446 42.8221 18.4325C43.7237 18.7707 44.6629 18.9774 45.6303 18.9774C45.959 18.9774 46.0623 19.0901 46.0341 19.4189C46.0153 19.7478 46.0247 20.086 46.0153 20.4336Z"
          fill="#3BCAD0"
        />
        <path
          d="M31.9746 11.2825C32.1061 11.0759 32.3127 11.1604 32.4818 11.1604C33.9187 11.151 35.3651 11.151 36.8021 11.1416C36.8115 11.1698 36.8209 11.1886 36.8303 11.2167C36.8303 11.2261 36.8209 11.2449 36.8209 11.2543C35.1961 11.2637 33.5806 11.2731 31.9746 11.2825Z"
          fill="#3BCAD0"
        />
        <path
          d="M17.6235 46.7559C17.755 46.8592 17.971 46.8592 18.0086 47.0658C17.802 47.0564 17.7175 46.8967 17.6235 46.7559Z"
          fill="#FC014C"
        />
        <path
          d="M40.9625 17.4933C40.8874 17.4557 40.7934 17.4463 40.7747 17.343C40.8968 17.3148 40.9249 17.4087 40.9625 17.4933Z"
          fill="#FC014C"
        />
        <path
          d="M17.0693 46.304C17.1914 46.2852 17.2384 46.3509 17.2572 46.4542C17.1726 46.4355 17.0881 46.4073 17.0693 46.304Z"
          fill="#3BCAD0"
        />
        <path
          d="M41.3383 17.8103C41.2537 17.8197 41.2256 17.7634 41.2068 17.707C41.2725 17.7164 41.3477 17.7164 41.3383 17.8103Z"
          fill="#3BCAD0"
        />
        <path
          d="M22.0283 41.544C21.9344 41.591 21.9156 41.5158 21.8875 41.4595C21.9532 41.4595 22.0189 41.4595 22.0283 41.544Z"
          fill="#3DCBD1"
        />
      </svg>
    ),
    [],
  );

  const Snapchat = useCallback(
    () => (
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.479056 10.0754C0.737009 8.857 1.17921 7.70548 1.80567 6.63568C2.46898 5.49902 3.28706 4.46637 4.25254 3.5823C5.14432 2.76509 6.12454 2.04447 7.22269 1.52443C7.43642 1.42042 7.64278 1.31641 7.85652 1.2124C7.98918 1.23469 8.09236 1.19011 8.17343 1.07868L8.16606 1.08611C8.50508 1.07868 8.78515 0.855802 9.10943 0.811228C9.36738 0.677503 9.64008 0.625499 9.92014 0.625499L9.91277 0.632928C9.93488 0.603211 9.96436 0.573495 9.98647 0.551207C10.4803 0.462057 10.9667 0.372908 11.4605 0.283758C11.6374 0.26147 11.8143 0.246612 11.9985 0.231754C12.1164 0.157462 12.2565 0.17975 12.3891 0.17975C13.4062 0.135175 14.4233 0.0906 15.4477 0.0460251C16.4943 -0.0356956 17.5408 0.0163085 18.5874 0.0163085C23.599 0.00887932 28.6033 0.0311668 33.615 0.0311668C37.2632 0.0311668 40.9114 0.00887932 44.5596 0.0237376C46.1294 0.0311668 47.6992 0.0311668 49.2543 0.320904C50.0871 0.476916 50.9126 0.684932 51.7012 0.989527C53.5953 1.72501 55.2388 2.85424 56.617 4.37722C57.7594 5.6476 58.6364 7.074 59.1966 8.68613C59.4545 9.40675 59.6314 10.1645 59.7641 10.9297C59.8378 11.3458 59.8746 11.7544 59.8967 12.1704C60.0073 12.2744 59.9999 12.4156 59.9999 12.5493C59.9925 13.0545 59.9852 13.5596 59.9852 14.0648C59.9852 18.4852 59.9925 22.9055 59.9925 27.3259C59.9557 31.5159 59.9115 35.7059 59.8746 39.896C59.8525 41.9613 59.8304 44.0266 59.8009 46.0845C59.8378 46.6491 59.5577 47.2063 59.7346 47.7783C59.7714 47.8972 59.6167 47.9343 59.6167 48.0458C59.5798 48.8258 59.4324 49.5985 59.2113 50.3265C58.9681 51.1437 58.7175 51.9609 58.3121 52.741C57.8257 53.6771 57.2582 54.5388 56.5949 55.3412C55.8653 56.2327 54.9809 56.9682 54.0375 57.6368C53.3963 58.09 52.6961 58.4243 52.0034 58.7735C51.6864 58.9369 51.3253 59.0632 50.9642 59.1449C50.8536 59.1598 50.7431 59.1672 50.6399 59.1969C49.9324 59.4049 49.2101 59.5684 48.4804 59.6947C48.3036 59.7021 48.1488 59.769 47.994 59.8581C47.7803 59.7912 47.5592 59.7764 47.3455 59.821C46.5863 59.977 45.8051 59.9324 45.046 59.9695C43.8226 60.029 42.5917 59.9844 41.3683 59.977C31.9051 59.9101 22.4346 60.0736 12.9714 59.8878C12.1975 59.873 11.4236 59.7318 10.6572 59.5832C10.1928 59.4941 9.75063 59.2935 9.27157 59.2935C5.24013 58.0751 2.53531 55.4452 0.972852 51.5597C0.79597 51.1214 0.611717 50.6831 0.560127 50.2002C0.434835 49.5242 0.309544 48.8481 0.184252 48.1721C-0.0294804 47.0948 0.0589607 46.0027 0.0589607 44.9181C0.0442205 39.6285 0.0515906 34.339 0.0442205 29.0494C0.0442205 27.6082 0 26.1595 0 24.7182C0 20.9517 0.0221103 17.1851 0.0294804 13.4185C0.0294804 13.3665 0.0442205 13.3219 0.0515906 13.2699C0.191622 12.2075 0.257953 11.1377 0.479056 10.0754ZM42.2822 21.7169C42.3559 21.4123 42.3043 21.1225 42.2969 20.8402C42.2748 19.607 42.2527 18.3663 41.8842 17.1776C41.641 16.3679 41.2651 15.625 40.8303 14.8895C40.2259 13.8642 39.4595 12.9727 38.6193 12.163C36.8726 10.484 34.7058 9.59991 32.3547 9.22102C30.6522 8.94615 28.935 8.97586 27.2325 9.31017C25.928 9.56277 24.6677 9.94165 23.518 10.6177C20.2235 12.5493 18.1083 15.2906 17.7103 19.2207C17.4819 21.4717 17.6735 23.7153 17.8282 25.9589C17.8651 26.4789 17.8135 26.5904 17.2534 26.6275C16.5385 26.6721 15.8825 26.4344 15.234 26.1595C14.2316 25.7286 13.3178 25.9812 12.5218 26.6201C11.8511 27.155 11.8585 28.2174 12.4923 28.8934C13.0082 29.4432 13.6641 29.7626 14.3496 30.0375C15.0497 30.3124 15.8088 30.4535 16.4795 30.8176C17.5334 31.3896 17.7619 32.0805 17.2608 33.18C16.5753 34.6807 15.6762 36.0254 14.5486 37.2289C12.8461 39.0491 10.834 40.2897 8.36505 40.7206C7.67963 40.8395 7.36272 41.4412 7.57645 42.1099C7.76807 42.6968 8.22502 43.0237 8.71882 43.2985C10.1118 44.0563 11.6447 44.3015 13.1777 44.5689C13.4283 44.6135 13.5536 44.7175 13.6052 44.9329C13.701 45.3267 13.7968 45.7204 13.8779 46.1142C14.1432 47.3623 14.578 47.652 15.8604 47.4217C16.4058 47.3251 16.9512 47.2286 17.4966 47.1691C18.639 47.0428 19.7813 47.0503 20.8868 47.3994C21.8892 47.7114 22.722 48.3578 23.5622 48.967C25.2057 50.1408 26.9303 51.1066 29.0013 51.2329C30.07 51.2923 31.1313 51.27 32.1778 50.9951C33.4086 50.6683 34.5215 50.0739 35.5681 49.3607C36.4377 48.7664 37.2632 48.0978 38.2213 47.6446C39.5332 47.028 40.9335 47.0428 42.3338 47.184C42.9824 47.2508 43.6162 47.3846 44.2648 47.4589C45.1197 47.5629 45.6061 47.184 45.783 46.3296C45.8714 45.8987 45.9672 45.4604 46.0852 45.037C46.1368 44.8438 46.1736 44.6209 46.4463 44.5838C46.9032 44.5169 47.3676 44.4426 47.8171 44.3386C48.9816 44.086 50.1461 43.8334 51.1705 43.1945C51.5833 42.9419 52.0107 42.6968 52.1729 42.1767C52.394 41.471 52.0697 40.8543 51.3622 40.728C50.9863 40.6612 50.6251 40.5646 50.264 40.4606C48.7384 40.0446 47.4118 39.2571 46.2399 38.217C44.6627 36.8203 43.454 35.1413 42.5844 33.2172C42.0906 32.1177 42.1938 31.4862 43.3803 30.825C43.9184 30.5278 44.5153 30.3718 45.0976 30.1861C45.8862 29.9335 46.6379 29.5992 47.2349 29.0197C48.1709 28.1208 48.0014 27.0436 46.9622 26.3749C46.1589 25.8623 45.2892 25.7955 44.3974 26.1669C43.8078 26.4121 43.2182 26.6572 42.5623 26.6424C42.1274 26.6275 42.0537 26.5384 42.0685 26.1149C42.1422 24.6291 42.3117 23.1655 42.2822 21.7169Z"
          fill="#F6E600"
        />
      </svg>
    ),
    [],
  );

  const toastSuccessMarkup = successActive ? (
    <Toast content="Import started successfully" onDismiss={toggleToastSuccessActive} />
  ) : null

  const toastDeleteMarkup = deleteActive ? (
    <Toast content="Successfully Deleted" onDismiss={toggleToastDeleteActive} />
  ) : null

  const toastFailedMarkup = failedActive ? (
    <Toast content="Something went wrong, please try again" onDismiss={toggleToastFailedActive} />
  ) : null;

  return (
    <Page fullWidth title="Connect Account"  primaryAction={ connectedAccount.length > 0 ? {content: 'Add a new account', onAction: handleChange}: ""}>
      {connectedAccount && connectedAccount.length !== 0 ? <Resource>
        <ResourceList
          resourceName={{singular: 'social account', plural: 'social accounts'}}
          filterControl={
            <Filters
              filters={[]}
              queryValue={queryValue}
              onQueryChange={handleFiltersQueryChange}
              onQueryClear={handleQueryValueRemove}
              onClearAll={handleQueryValueRemove}
            />
          }
          totalItemsCount={filtered.length}
          items={filtered}

          renderItem={(item) => {
            const {id, platform, type, data, status, last_finished_at} = item;
            const media = <Avatar customer size="medium" name={platform} />;

            return (
              <ResourceList.Item
                id={id}
                url={""}
              >
                <ConnectList>
                  <div className="list-item">
                    {platform === "tiktok" ? 
                    <> 
                    <Tiktok /> 
                    <h3>
                       <TextStyle variation="strong"> &nbsp; &nbsp;Tiktok</TextStyle>
                    </h3>
                     </> : platform === "instagram" ? 
                      <> 
                     <img src={instagram} alt="instagram connect" />
                      <h3>
                         <TextStyle variation="strong"> &nbsp; &nbsp;Instagram</TextStyle>
                      </h3>
                       </> 
                    :null
                   }
                </div>
                  <div className="list-item">
                    {type == "tag" ? 
                  <>
                  <Icon source={HashtagMajorMonotone}/> HashTag</> : 
                  type ==="username" ?
                  <> <Icon source={CustomersMajorMonotone}/> Username</>: type==="ig_business_id" ? <> <Icon source={CustomersMajorMonotone}/> Instagram</>:null
                  }
                  </div>

                  <div className="list-item">
                    {type == "tag" ? 
                  <>#{data}</> : 
                  type ==="username" ?
                <>@{data}</>:type ==="ig_business_id" ? <>@{data}</>:null
                  }
                  </div>
                  <div className="list-item">
                  <Icon source={PlayCircleMajorMonotone}/>
                    Video
                  </div>
                  <div className="list-item">
                    {status === "completed" ? <span className="complete">Complete</span>: status === "importing" ? <span className="progress">Import in progress</span>: <span  className="inactive">Inactive</span>}
                  </div>
                  <div className="list-item drop">  
                  <div className="dropdown">
                    <span>Actions</span>
                  </div>
                   <div className="dropdown-content">
                     <div style={{marginBottom:"5px"}}>
                        <Button plain icon={RefreshMinor} onClick={()=>{startImport(id)}}>Start Import</Button>
                      </div>
                      <Button plain destructive icon={DeleteMinor} onClick={() => handleDeleteChange(id)}>
                        Delete
                      </Button>
                    </div>
                 </div>
                </ConnectList>
               
              </ResourceList.Item>
            );
          }}
        />
      </Resource> :
      <EmptyState
        heading="Pull Content from your existing social media account"
        image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
      >
        <p>Connect your social accounts.</p>
        <br />
        {activator}
      </EmptyState>}

      <Modal
        open={active}
        onClose={handleChange}
        title="Add new social accounts"
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: handleChange,
          },
        ]}
      >
        <Modal.Section>
          <Social>
            <div style={{display: 'flex'}}>
              <Tiktok />
              <div style={{marginLeft: '20px'}}>
                {' '}
                <Heading>Tiktok</Heading> <p> Connect your Tiktok Account</p>{' '}
              </div>
            </div>
            <div>
              {' '}
              <Button
                primary
                url={`/account/id/${accountId}/connect/tiktok`}
              >
                {' '}
                Connect Account
              </Button>
            </div>
          </Social>
          <Social>
            <div style={{display: 'flex'}}>
              <img src={instagram} alt="instagram logo"/>
              <div style={{marginLeft: '20px'}}>
                {' '}
                <Heading>Instagram</Heading>{' '}
                <p> Connect your Instagram Account</p>{' '}
              </div>
            </div>
            <div>
              {' '}
              <Button primary  url={`/account/id/${accountId}/connect/instagram`}>
                {' '}
                Connect Account
              </Button>
            </div>
          </Social>
        </Modal.Section>
      </Modal>

      <Modal
        open={deleteModalActive}
        onClose={handleDeleteChange}
        title="Are you sure you want to delete"
        primaryAction={
          {
            content: 'Yes',
            onAction: ()=>{handleDelete(deleteId)},
          }
        }
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: handleDeleteChange,
          },
        ]}
      >
      </Modal>
      {toastSuccessMarkup}
      {toastFailedMarkup}
      {toastDeleteMarkup}
    </Page>
  );
};
