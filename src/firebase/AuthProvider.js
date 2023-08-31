import {Auth} from "../firebase/firebaseConfig";
import {onAuthStateChanged,signOut,GoogleAuthProvider, signInWithPopup} from "firebase/auth";

const authState=(setUser,setLogged)=>{
    onAuthStateChanged(Auth, (user) => {
        if (user) {
            setUser(user);
            setLogged(true);
        } else {
            setUser(null);
            setLogged(false);
        }
    });
};

const logout =(setUser)=>{
    signOut(Auth).then(()=>{
        setUser(null);
    });
}

const login=()=> {
    const provider = new GoogleAuthProvider();
    signInWithPopup(Auth, provider)
        .then((result) => {
            console.log(result)
        }).catch((error) => {
        console.log(error.message);
    });

}

const authProvider={
    login,
    authState,
    logout
}
export default authProvider;