import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const initialState = {
    clientId: '',
    form: '',
    video: '',
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    const getClientId = (client) => {
        dispatch({
            type: 'GET_CLIENT_ID',
            payload: client,
        });
    }
    const getClientVideo = (client) => {
        dispatch({
            type: 'GET_CLIENT_VIDEO',
            payload: client,
        })
    }
    const getClientForm = (client) => {
        dispatch({
            type: 'GET_CLIENT_FORM',
            payload: client,
        })
    }
    return <GlobalContext.Provider value={{
        clientId: state.clientId,
        form: state.form,
        video: state.video,
        getClientId,
        getClientVideo,
        getClientForm,
    }}>
        {children}
    </GlobalContext.Provider>
}