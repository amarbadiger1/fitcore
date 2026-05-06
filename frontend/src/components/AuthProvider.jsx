import React, { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { userAtom } from "../store/userAtom"
import API from '../services/api';
const AuthProvider = ({ children }) => {

    const setUser = useSetRecoilState(userAtom);
    const [loading, setLoding] = useState(true);

    const getMe = () => {
        try {
            const res = API.get("/user/getMe");
            setUser(res.data.user)
        } catch (error) {
            setUser(null);
        } finally {
            setLoding(false);
        }
    }
    useEffect(() => {
        getMe();
    }, [])

    if (loading) return <div>Loading</div>

    return children
}

export default AuthProvider
