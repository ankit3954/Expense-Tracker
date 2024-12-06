import { createContext, useContext, useState } from "react";

interface TokenContextType {
    updateToken: (token : string) => void,
    getToken : () => void,
    deleteToken : () => void
}


interface TokenProviderProps {
    children: React.ReactNode;
}

export const TokenContext = createContext<TokenContextType | null>(null);

export const TokenProvider: React.FC<TokenProviderProps> = ({ children }) => {

    const updateToken = (accessToken: string) => localStorage.setItem("accessToken", accessToken)
    const getToken = () => localStorage.getItem("accessToken")
    const deleteToken = () => localStorage.removeItem("accessToken")

    return (
        <TokenContext.Provider value={{ updateToken, getToken, deleteToken }}>
            {children}
        </TokenContext.Provider>
    )
}


export const useTokenContext = () => {
    const context = useContext(TokenContext);
    if (!context) {
        throw new Error("useTokenContext must be used within an TokenProvider");
    }
    return context;
};
