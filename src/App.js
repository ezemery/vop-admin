import React, {useEffect} from 'react';
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./Components/LoginForm/LoginForm";
import EmailConfirm from "./Components/EmailConfirm/EmailConfirm";
import PasswordReset from "./Components/PasswordReset/PasswordReset";
import {UserStore, VideoStore} from "./Context/store";
import {getUsers} from "./services"
import {getVideos} from "./services"
import User from "./Components/User/User";

const App = () => {

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

  return u.loading ? <>Loading</> : (
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
  );
};

export default App;
