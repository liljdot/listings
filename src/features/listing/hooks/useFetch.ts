import { useEffect, useRef, useState } from "react"
// @ts-expect-error import from js file
import api from "@/api"
// @ts-expect-error import from js file
import { getItem, setItem } from "@/lib/utils/localStorage"
import type { AxiosInstance } from "axios"
import axios from "axios"

const typedApi = api as AxiosInstance
const typedGetItem = getItem as <T>(key: string) => { lastFetched: number, data: T } | undefined
const typedSetItem = setItem as <T>(key: string, value: { lastFetched: number, data: T }) => void

const useFetch = <T>(path: string, params?: unknown, deps?: unknown[]) => {
    const STALE_TIME = 1000 * 60 * 5 // 5 minutes

    const getStorageKey = () => {
        if (!params) {
            return path
        }

        return `${path}?${JSON.stringify(params)}`
    }

    const storageKey = getStorageKey()

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const [data, setData] = useState<T>()

    const abortController = useRef<AbortController>(null)

    useEffect(() => {
        const now = new Date().getTime()
        const cachedData = typedGetItem<T>(storageKey)

        if (cachedData &&
            now - cachedData.lastFetched < STALE_TIME
        ) {
            setData(cachedData.data)
            setIsLoading(false)
            return
        }

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

    useEffect(() => {
        if (!data) {
            return
        }

        typedSetItem(storageKey, {
            lastFetched: new Date().getTime(),
            data
        })
    }, [data, storageKey])

    return {
        isLoading,
        error,
        data
    }
}

export default useFetch