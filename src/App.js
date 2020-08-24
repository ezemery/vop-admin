import React from 'react';
import {Switch, Route, useHistory, useLocation, Redirect} from 'react-router-dom';
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider} from '@shopify/polaris';
import {AppFrame} from './Components/Frame';
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

  
  const history = useHistory();
  let location = useLocation();

  const fetchVideoDataAsync = async (lastVideo, status, hasTags, query) => {
    setVideoState({...v, loading: true});
    try {
      const videos = await getVideos(lastVideo, status, hasTags, query);
      setVideoState({...v, videos: videos, loading: false, error: false});
    } catch (error) {
      setVideoState({...v, error: true});
    }
  };

  const fetchUserDataAsync = async () => {
    setUserState({...u, loading: true});
    try {
      const user = await getUsers();
      setUserState({...u, user: user, loading: false, error: false});
    } catch (error) {
      setUserState({...u, error: true});
    }
  };
  
  const [v, setVideoState] = React.useState({
    videos: {},
    loading: false,
    error: false,
    fetchVideoDataAsync: fetchVideoDataAsync,
  });

  const [u, setUserState] = React.useState({
    user: {},
    loading: false,
    error: false,
    fetchUserDataAsync: fetchUserDataAsync,
  });
  const theme = {
    colors: {
      topBar: {
        background: '#000',
      },
    },
  };

  return (
    <AppProvider theme={theme} i18n={enTranslations}>
      <UserStore.Provider value={u}>
        <VideoStore.Provider value={v}>
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
<<<<<<< Updated upstream
              <Route path="/manage">
                <Frame>
                  <TikTokList defaultStatus="approve" key="manage" />
                </Frame>
=======
              <Route path="/setup">
                <Create />
>>>>>>> Stashed changes
              </Route>
              <Route path="/account">
                <Account />
              </Route>
              <Route path="/invite">
                <Invite />
              </Route> 
              <Route exact path="/user">
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
