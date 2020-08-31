import React, {useEffect} from 'react';
import {
  Switch,
  Route,
  useHistory,
  useLocation,
  Redirect,
} from 'react-router-dom';
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider, Loading, Frame} from '@shopify/polaris';
import {Login} from './Components/Login';
import {EmailConfirm} from './Components/EmailConfirm';
import {Create, Account} from './Components/Signup';

import {Invite} from './Components/Invite';
import {PasswordReset} from './Components/PasswordReset';
import {User} from './Components/User';
import {UserStore, VideoStore} from './Context/store';
import {getUsers, getVideos} from './services';

import '@shopify/polaris/dist/styles.css';
import 'tailwindcss/dist/base.min.css';

const App = () => {
  const [v, setVideoState] = React.useState({
    videos: {},
    loading: false,
    error: false,
  });

  const [u, setUserState] = React.useState({
    users: [],
    loading: true,
    error: false,
  });

  const fetchVideoDataAsync = async (
    lastVideo,
    status,
    hasTags,
    query,
    userId,
    accountId,
  ) => {
    try {
      const videos = await getVideos(
        lastVideo,
        status,
        hasTags,
        query,
        userId,
        accountId,
      );
      setVideoState({videos, loading: false, error: false});
    } catch (error) {
      setVideoState({videos: [], loading: true, error: true});
    }
  };

  const fetchUserDataAsync = async () => {
    try {
      const users = await getUsers();
      setUserState({users, loading: false, error: false});
    } catch (error) {
      setUserState({loading: false, users: [], error: true});
    }
  };

  useEffect(() => {
    fetchUserDataAsync();
  }, []);

  const theme = {
    colors: {
      topBar: {
        background: '#212B36',
      },
    },
  };

  return u.loading ? (
    <AppProvider theme={theme} i18n={enTranslations}>
      <Frame>
        <Loading />
      </Frame>
    </AppProvider>
  ) : (
    <UserStore.Provider value={{...u, fetchUserDataAsync}}>
      <VideoStore.Provider value={{...v, fetchVideoDataAsync}}>
        <AppProvider theme={theme} i18n={enTranslations}>
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
                <User />
              </Route>
              <Route exact path="/">
                <Redirect to="/user" />
              </Route>
            </Switch>
          </div>
        </AppProvider>
      </VideoStore.Provider>
    </UserStore.Provider>
  );
};

export default App;
