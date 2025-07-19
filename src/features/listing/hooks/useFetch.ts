import { useEffect, useRef, useState } from "react"
// @ts-expect-error import from js file
import api from "@/api"
import type { AxiosInstance } from "axios"
import axios from "axios"

const typedApi = api as AxiosInstance

const useFetch = <T>(path: string, params?: unknown, deps?: unknown[]) => {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const [data, setData] = useState<T>()

    const abortController = useRef<AbortController>(null)

    useEffect(() => {
        abortController.current = new AbortController()

        const fetchData = () => {
            setIsLoading(true)
            setError(null)

            return typedApi.get<T>(path, {
                params: params,
                signal: abortController.current?.signal
            })
                .then(res => {
                    setData(res.data)
                    if (Math.random() > 0.8) {
                        throw new Error("Something went wrong")
                    }
                })
                .catch((err) => {
                    if (axios.isCancel(err)) {
                        return
                    }

                    setError(err.message || err)
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }

        fetchData()

        return () => abortController.current?.abort()
    }, [
        ...(deps ? deps : []),
        path,
        params
    ])

    return {
        isLoading,
        error,
        data
    }
}

export default useFetch