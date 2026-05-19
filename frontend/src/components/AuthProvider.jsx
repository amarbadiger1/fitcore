import React, { useEffect, useState } from 'react'
import API from '../services/api';
const AuthProvider = ({ children }) => {

    const getMe = () => {
        try {
            const res = API.get("/user/getMe");
          
        } catch (error) {
        
        } finally {
          
        }
    }
    useEffect(() => {
        getMe();
    }, [])


    return children
}

export default AuthProvider
