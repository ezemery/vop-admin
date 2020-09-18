import {getAccounts} from "../services";
import React, {useReducer, useState} from 'react';

const accountsInitial = {
    accounts: [],
    account: null,
    loading: true,
    error: false,
};

function accountsReducer(state, action) {
    switch (action.type) {
        case 'setAccounts':
            return {...state, account: action.account,  accounts: action.accounts}
        case 'setActiveAccount':
            const activeAccount = state.accounts.find(element => element.id === action.id);
            return {...state, account: activeAccount}
        case 'loadingComplete':
            return {...state, loading:false}
        case 'loadingStart':
            return {...state, loading:true}
        case 'error':
            return {...state, error:true}
        default:
            return state
    }
}

export const useAccounts= () => {

    const [a, setAccountState] = useReducer(accountsReducer, accountsInitial);

    const fetchAccountDataAsync = async (userId) => {
        setAccountState({type: 'loadingStart'})
        try {
            const accounts = await getAccounts(userId);
            if (accounts.length === 1) {
                setAccountState({type: 'setAccounts', account: accounts[0], accounts: accounts})
            }
            setAccountState({type: 'loadingComplete'})
        } catch (error) {
            setAccountState({type: 'error'})
            setAccountState({type: 'loadingComplete'})
        }
    };

    const setActiveAccount = async (id) => {
        setAccountState({type: 'setActiveAccount', id})
    };

    return {
        ...a,
        fetchAccountDataAsync,
        setActiveAccount
    };
};