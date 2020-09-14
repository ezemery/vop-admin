import React from 'react';
import UserState from "./states/user"
import VideoState from "./states/videos"
import FrameState from "./states/frame"
import AccountState from "./states/account"
export const UserStore = React.createContext(UserState);
export const VideoStore = React.createContext(VideoState);
export const FrameStore = React.createContext(FrameState);
export const AccountStore = React.createContext(AccountState);
