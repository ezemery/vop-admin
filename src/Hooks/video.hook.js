import {getVideos} from "../services";
import React, {useState} from 'react';

export const useVideoFetch = () => {

    const [v, setVideoState] = React.useState({
        videos: {},
        loading: false,
        error: false,
    });

    const fetchVideoDataAsync = async (
        lastVideo,
        status,
        hasTags,
        query,
        userId,
        accountId,
        nextVideo
    ) => {
        try {
            const videos = await getVideos(
                lastVideo,
                status,
                hasTags,
                query,
                userId,
                accountId,
                nextVideo
            );
            setVideoState({videos, loading: false, error: false});
        } catch (error) {
            setVideoState({videos: [], loading: true, error: true});
        }
    };

    return {
        ...v,
        fetchVideoDataAsync
    };
};
