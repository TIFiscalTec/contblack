import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const DiscountContext = createContext();

export function DiscountProvider({ children }) {
    const [discount, setDiscount] = useState(null);

    const fetchDiscount = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/getDiscount`);
        setDiscount(response.data.objeto);
    };

    useEffect(() => {
        fetchDiscount();
    }, []);

    return (
        <DiscountContext.Provider value={{ discount, setDiscount, fetchDiscount }}>
            {children}
        </DiscountContext.Provider>
    );
}

export function useDiscount() {
    return useContext(DiscountContext);
}
