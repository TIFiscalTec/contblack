import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const LoginContext = createContext();

export function LoginProvider({ children }) {
    const [login, setLogin] = useState(null);

    const fetchLogin = async () => {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");
        if (!token) return;
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/getUserByEmail/${email}`, {
            headers: { Authorization: token }
        });
        console.log("Fetched user data:", response.data);
        setLogin(response.data.usuario);
    };

    useEffect(() => {
        fetchLogin();
    }, []);

    return (
        <LoginContext.Provider value={{ login, setLogin, fetchLogin }}>
            {children}
        </LoginContext.Provider>
    );
}

export function useLogin() {
    return useContext(LoginContext);
}
