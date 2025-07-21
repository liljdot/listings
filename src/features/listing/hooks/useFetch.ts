import { useEffect, useMemo, useRef, useState } from "react"
// @ts-expect-error import from js file
import api from "@/api"
// @ts-expect-error import from js file
import { getItem, setItem } from "@/lib/utils/localStorage"
import type { AxiosInstance } from "axios"
import axios from "axios"

const typedApi = api as AxiosInstance
const typedGetItem = getItem as <T>(key: string) => { lastFetched: number, data: T } | undefined
const typedSetItem = setItem as <T>(key: string, value: { lastFetched: number, data: T }) => void

const useFetch = <T>(path: string, params: object, deps?: unknown[]) => {
    const STALE_TIME = 1000 * 60 * 5 // 5 minutes
    const storageKey = useMemo(() => {
        if (!params) {
            return path
        }

        return `${path}?${JSON.stringify(params)}`
    }, [path, params]) // memoize storage key based on path and params to avoid unnecessary recomputations because functions are not stable in JavaScript

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [data, setData] = useState<T>() // set states for data, isLoading, and error for fetch

    const abortController = useRef<AbortController>(null) // useRef to store the AbortController instance to cancel the fetch request if the component unmounts or if the dependencies change

    useEffect(() => {
        const now = new Date().getTime()
        const cachedData = typedGetItem<T>(storageKey) // retrieve cached data from localStorage

        if (cachedData &&
            now - cachedData.lastFetched < STALE_TIME // check if the cached data is still fresh based on the STALE_TIME
        ) {
            setData(cachedData.data)
            setIsLoading(false)
            return
        } // if cached data exists and is fresh, set the data and loading state and return early

        abortController.current = new AbortController() // create a new AbortController instance to manage the fetch request
        // proceed to fetch data from the API
        const fetchData = () => {
            setIsLoading(true)
            setError(null)

            return typedApi.get<T>(path, { // the T here is passed down from the generic type of the hook
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
    }, [data, storageKey]) // update cached data in localStorage whenever the data changes

    return {
        isLoading,
        error,
        data
    }
}

export default useFetch