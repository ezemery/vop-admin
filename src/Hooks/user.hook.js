import {getUsers} from "../services";
import React, {useReducer, useState} from 'react';

const usersInitial = {
    users: [],
    user: null,
    loading: true,
    error: false,
};

function usersReducer(state, action) {
    switch (action.type) {
        case 'setUser':
            return {...state, user: action.user}
        case 'setUsers':
            let existingUser = null;
            if (state.user) {
                existingUser = action.users.find(element => element.id === state.user.id);
            }
            return {...state, users: action.users, user: existingUser}
        case 'loadingComplete':
            return {...state, loading:false}
        case 'loadingStart':
            return {...state, loading:true}
        case 'error':
            return {...state, error:true}
        case 'setActiveUser':
            const activeUser = state.users.find(element => element.id === action.id);
            return {...state, user: activeUser}
        default:
            return state
    }
} 

export const useUsers = () => {

    const [u, setUserState] = useReducer(usersReducer, usersInitial);

    const fetchUserDataAsync = async () => {
        setUserState({type: 'loadingStart'})
        try {
            const users = await getUsers();
            setUserState({type: 'setUsers', users})
            if (users.length === 1) {
                setUserState({type: 'setUser', user: users[0]})
            }
            setUserState({type: 'loadingComplete'})
        } catch (error) {
            setUserState({type: 'error'})
            setUserState({type: 'loadingComplete'})
        }
    };

    const setActiveUser = async (id) => {
        setUserState({type: 'setActiveUser', id})
    };

    return {
        ...u,
        fetchUserDataAsync,
        setActiveUser
    };
};
