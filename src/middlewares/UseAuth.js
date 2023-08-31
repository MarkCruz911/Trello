import {React,useContext} from 'react';
import {AuthContext} from "./AuthProvider";

function UseAuth() {
    return useContext(AuthContext);
}

export default UseAuth;