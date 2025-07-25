import { createContext, useContext, useState, type ReactNode } from "react";

interface AuthContext {
    user: object | null
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
    const [auth] = useState<AuthContext>()

    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    )
}

export default AuthProvider;