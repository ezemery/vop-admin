import React, {useEffect} from 'react';
import Frame from "./Components/Frame/Frame";
import {
  Switch,
  Route,
  useHistory,
  useLocation,
} from "react-router-dom";
import TikTokList from "./Components/TikTok/TikTokList";
import Login from "./Components/LoginForm/LoginForm";
import SetupScreen from "./Components/Setup/SetupScreen";
import Embed from "./Components/Embed/Embed";
import Settings from "./Components/Settings/Settings";
import EmailConfirm from "./Components/EmailConfirm/EmailConfirm";
import PasswordReset from "./Components/PasswordReset/PasswordReset";
import {UserStore, VideoStore} from "./Context/store";
import {getUsers} from "./services"
import {getVideos} from "./services"

const App = () => {
  const history = useHistory();
  let location = useLocation()

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

  const [v, setVideoState] = React.useState({
    videos:{},
    loading: false,
    error:false,
    fetchVideoDataAsync: fetchVideoDataAsync,
  })

  const [u, setUserState] = React.useState({
    users: [],
    loading: true,
    error:false
  })

  useEffect( () => {
   fetchUserDataAsync();
  }, []);

  useEffect( () => {
    if (location.pathname === "/" && u.loading === false) {
      const users = u.users;
      if (users.length > 1 || users.length < 1) {
        history.push("/login");
      } else {
        history.push("/user/id/"+users[0].id+"/account/id/"+users[0].id+"/");
      }
    }

  }, [u, location, history]);

  return (
    <UserStore.Provider value={{...u, fetchUserDataAsync }}>
      <VideoStore.Provider value={v}>
          <div className="App" style={{minHeight: "100vh", width: "100vw", backgroundColor: "#EEE"}}>
            <Switch>
              <Route path="/login">
                <Login/>
              </Route>
              <Route path="/email/confirm">
                  <EmailConfirm/>
              </Route>
              <Route path="/password/reset/">
                  <PasswordReset/>
              </Route>
              <Route path="/user/id/:userId/account/id/:accountId/setup">
                <SetupScreen/>
              </Route>
              <Route path="/user/id/:userId/account/id/:accountId/manage">
                <Frame>
                  <TikTokList defaultStatus="approve" key="manage" />
                </Frame>
              </Route>
              <Route path="/user/id/:userId/account/id/:accountId/settings">
                <Frame>
                  <Settings/>
                </Frame>
              </Route>
              <Route path="/user/id/:userId/account/id/:accountId/embed">
                <Frame>
                  <Embed/>
                </Frame>
              </Route>
              <Route exact path="/user/id/:userId/account/id/:accountId/">
                <Frame>
                  <TikTokList defaultStatus="new" key="index" hideSearch={true} approvalScreen={true}/>
                </Frame>
              </Route>
            </Switch>
          </div>

    </VideoStore.Provider>
  </UserStore.Provider>
  );
};

export default App;
