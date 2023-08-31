import {createContext, useEffect, useState} from 'react';
import {onAuthStateChanged} from "firebase/auth";
import {Auth} from "../firebase/firebaseConfig";
import authProvider from "../firebase/AuthProvider";
export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [logged,setLogged]=useState(true);
    const [user,setUser]=useState(null);

    useEffect(() => {
        authProvider.authState(setUser,setLogged)
    },[]);

    const contextValue = {
        user,
        setUser,
        isLogged() {
            return logged;
        }
    }
    return <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>

};

export default AuthProvider;