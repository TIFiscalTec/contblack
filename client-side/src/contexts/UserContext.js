import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    const fetchUser = async () => {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");
        if (!token) return;
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/dashboard`, {
            email
        }, {
            headers: { Authorization: token }
        });
        console.log(response)
        if (response.data.status === 200) {
            setUser(response.data.objeto);
        } else {
            console.error("Failed to fetch user data:", response.data);
            setUser(null);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, fetchUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
