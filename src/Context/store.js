import React from 'react';
import UserState from "./states/user"
import VideoState from "./states/videos"
export const UserStore = React.createContext(UserState);
export const VideoStore = React.createContext(VideoState);
