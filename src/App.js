import React from 'react';
import Frame from "./Components/Frame/Frame";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import TikTokList from "./Components/TikTok/TikTokList";
import Login from "./Components/LoginForm/LoginForm";
import SetupScreen from "./Components/Setup/SetupScreen";
import Embed from "./Components/Embed/Embed";
import Settings from "./Components/Settings/Settings";
import EmailConfirm from "./Components/EmailConfirm/EmailConfirm";
import PasswordReset from "./Components/PasswordReset/PasswordReset";
import {UserStore, VideoStore} from "./Context/store";
import {getUser} from "./services"
import {getVideos} from "./services"

const App = () => {
    const fetchVideoDataAsync = async (lastVideo, status, hasTags, query) => {
      setVideoState({...v, loading:true});
      try{
         const videos  =  await getVideos(lastVideo, status, hasTags, query);
         setVideoState({...v, videos:videos, loading:false, error:false});
      }catch(error){
        setVideoState({...v,error:true});
      }
  }

  const fetchUserDataAsync = async () => {
    setUserState({...u, loading:true});
      try{
         const user  =  await getUser();
         setUserState({...u, user:user, loading:false, error:false});
      }catch(error){
        setUserState({...u, error:true});
      }
  }

  const [v, setVideoState] = React.useState({ 
    videos:{},
    loading: false,
    error:false,
    fetchVideoDataAsync: fetchVideoDataAsync,
   
  })

  const [u, setUserState] = React.useState({
      user: {},
      loading: false,
      error:false,
      fetchUserDataAsync: fetchUserDataAsync
  })

  return (
    <UserStore.Provider value={u}>
      <VideoStore.Provider value={v}>
        <Router>
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
              <Route path="/setup">
                <SetupScreen/>
              </Route>
              <Route path="/manage">
                <Frame>
                  <TikTokList defaultStatus="approve" key="manage" />
                </Frame>
              </Route>
              <Route path="/settings">
                <Frame>
                  <Settings/>
                </Frame>
              </Route>
              <Route path="/embed">
                <Frame>
                  <Embed/>
                </Frame>
              </Route>
              <Route exact path="/">
                <Frame>
                  <TikTokList defaultStatus="new" key="index" hideSearch={true} approvalScreen={true}/>
                </Frame>
              </Route>
            </Switch>
          </div>
        </Router>
    </VideoStore.Provider>
  </UserStore.Provider>
  );
};

export default App;