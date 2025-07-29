import { createContext, useContext, useEffect, useLayoutEffect, useState, type ReactNode } from "react";
// @ts-expect-error import from js file
import api from "@/api";
import type { AxiosError, AxiosInstance } from "axios";

const typedApi = api as AxiosInstance

interface AuthContext {
    token?: string | null,
    setToken: React.Dispatch<React.SetStateAction<string | null | undefined>>
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
    const [token, setToken] = useState<string | null>()

    useLayoutEffect(() => {
        const authInterceptor = typedApi.interceptors.request.use(config => {
            config.headers.Authorization = token
                ? `Bearer ${token}`
                : config.headers.Authorization

            return config
        })

        return () => typedApi.interceptors.request.eject(authInterceptor)
    }, [token]) // runs every time the token changes to add the Authorization header to the api object and hence every request made using the api object

    useLayoutEffect(() => {
        const refreshInterceptor = typedApi.interceptors.response.use(
            res => res,
            (error: AxiosError<{ message: string }>) => {
                const originalRequest = error.config

                if (error.response?.status === 403 && error.response.data.message === "Unauthorized") {
                    return typedApi.get<{ accessToken: string }>("/api/refreshToken")
                        .then(res => {
                            setToken(res.data.accessToken)

                            return typedApi(originalRequest!)
                        })
                        .catch(() => {
                            setToken(null)
                            return Promise.reject(error)
                        })
                }

                return Promise.reject(error)
            }
        )

        return () => typedApi.interceptors.response.eject(refreshInterceptor)
    }, [])

    useEffect(() => {
        const fetchMe = () => {
            typedApi.get<{
                accessToken: string | null
                user: object
            }>("/api/me")
                .then(res => {
                    setToken(res.data.accessToken)
                })
                .catch(err => {
                    console.error("Failed to fetch user data:", err)
                    setToken(null) // Clear token on error
                })
        }

        fetchMe()
    }, [])

    return (
        <authContext.Provider value={{ token, setToken }}>
            {children}
        </authContext.Provider>
    )
}

export default AuthProvider;