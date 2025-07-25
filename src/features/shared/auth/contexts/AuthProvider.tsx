import { createContext, useContext, useState, type ReactNode } from "react";

interface AuthContext {
    token: string | null,
    setToken: React.Dispatch<React.SetStateAction<string | null>>
}

interface Props {
    children: ReactNode
}

const authContext = createContext<AuthContext | undefined>(undefined)

export const useAuthContext: () => AuthContext = () => {
    const context = useContext(authContext)

    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider")
    }

    return context
}

const AuthProvider: React.FC<Props> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null)

    return (
        <authContext.Provider value={{ token, setToken }}>
            {children}
        </authContext.Provider>
    )
}

export default AuthProvider;