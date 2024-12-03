import { createContext, useContext, useState } from "react";

interface TokenContextType {
    updateToken: (token : string) => void,
    accessToken : string
}


interface TokenProviderProps {
    children: React.ReactNode;
}

export const TokenContext = createContext<TokenContextType | null>(null);

export const TokenProvider: React.FC<TokenProviderProps> = ({ children }) => {
    const [accessToken, setAccessToken] = useState('');

    const updateToken = (accessToken: string) => setAccessToken(accessToken)

    return (
        <TokenContext.Provider value={{ updateToken, accessToken }}>
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
