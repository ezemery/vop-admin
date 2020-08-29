import React, {useEffect} from 'react';
import {Switch, Route, useHistory, useLocation, Redirect} from 'react-router-dom';
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider,Loading,Frame} from '@shopify/polaris';
import {Login} from './Components/Login';
import {EmailConfirm} from './Components/EmailConfirm';
import {Create} from './Components/Signup';
import {Account} from './Components/Signup';
import {Invite} from './Components/Invite';
import {PasswordReset} from './Components/PasswordReset';
import {User} from "./Components/User";
import {UserStore, VideoStore} from './Context/store';
import {getUsers} from './services';
import {getVideos} from './services';
import '@shopify/polaris/dist/styles.css';
import 'tailwindcss/dist/base.min.css';
const App = () => {

  const [v, setVideoState] = React.useState({
    videos:{},
    loading: false,
    error:false
  })

  const [u, setUserState] = React.useState({
    users: [],
    loading: true,
    error:false
  })

  const fetchVideoDataAsync = async (lastVideo, status, hasTags, query, userId, accountId) => {
    setVideoState({...v, loading:true});
    try{
      const videos  =  await getVideos(lastVideo, status, hasTags, query, userId, accountId);
      setVideoState({...v, videos:videos, loading:false, error:false});
    }catch(error){
      setVideoState({...v,error:true});
    }
  }

  const fetchUserDataAsync = async () => {
    setUserState({loading:true, users: [], error: false});
    try{
      const users  =  await getUsers();
      setUserState({users:users, loading:false, error:false});
    } catch(error){
      setUserState({loading:false, users: [],  error:true});
    }
  };

  useEffect( () => {
   fetchUserDataAsync();
  }, []);


  const theme = {
    colors: {
      topBar: {
        background: '#212B36',
      },
    },
  };

  return u.loading ?  <AppProvider theme={theme} i18n={enTranslations}><Frame><Loading /></Frame></AppProvider>: (
    <AppProvider theme={theme} i18n={enTranslations}>
      <UserStore.Provider value={{...u, fetchUserDataAsync }}>
        <VideoStore.Provider value={{...v,fetchVideoDataAsync}}>
          <div
            className="App"
            style={{
              minHeight: '100vh',
              width: '100vw',
              backgroundColor: '#EEE',
            }}
          >
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/email/confirm">
                <EmailConfirm />
              </Route>
              <Route path="/password/reset/">
                <PasswordReset />
              </Route>
              <Route path="/create">
                <Create />
              </Route>
              <Route path="/account">
                <Account />
              </Route>
              <Route path="/invite">
                <Invite />
              </Route> 
              <Route path="/user">
                  <User/>
              </Route>
              <Route exact path="/">
                <Redirect to="/user" />
              </Route>
            </Switch>
          </div>
        </VideoStore.Provider>
      </UserStore.Provider>
    </AppProvider>
  );
};

export default App;
