import React from 'react';
import UserState from "./states/user"
import VideoState from "./states/videos"
import FrameState from "./states/frame"
export const UserStore = React.createContext(UserState);
export const VideoStore = React.createContext(VideoState);
export const FrameStore = React.createContext(FrameState);
