import AppRouter from "./routers/AppRouter";
import AuthProvider from "./middlewares/AuthProvider";
import FirestoreProvider from "./firebase/FirestoreProvider";

function App() {
    //window.addEventListener("contextmenu", e => e.preventDefault());
    return (
        <AuthProvider>
                <AppRouter/>
        </AuthProvider>


    );
}

export default App;
