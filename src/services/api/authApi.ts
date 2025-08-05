import { createApi, type BaseQueryFn } from "@reduxjs/toolkit/query/react";
// @ts-expect-error import from js file
import api from "@/api"
import type { AxiosError, AxiosInstance } from "axios";

interface CustomBaseQueryArgs {
    email: string;
    password: string;
}

const typedApi = api as AxiosInstance

const customBaseQuery: BaseQueryFn<CustomBaseQueryArgs | undefined, unknown, unknown> = (data) => {
    if (!data) {
        return typedApi.post<{
            accessToken: string
        }>("/api/signout", data)
            .then(res => ({
                data: res.data,
                status: res.status
            }))
            .catch((err: AxiosError<{ message: string }>) => {
                return {
                    error: err.response?.data.message,
                    status: err.status
                }
            })
    }

    return typedApi.post<{
        accessToken: string
    }>("/api/signin", data)
        .then(res => ({
            data: res.data,
            status: res.status
        }))
        .catch((err: AxiosError<{ message: string }>) => {
            return {
                error: err.response?.data.message,
                status: err.status
            }
        })
}

export const authApi = createApi({
    reducerPath: "api/authApi",
    baseQuery: customBaseQuery,
    endpoints: builder => ({
        signIn: builder.mutation<{ accessToken: string }, CustomBaseQueryArgs>({
            query: data => data
        }),
        signOut: builder.mutation<{ acccessToken: string }, undefined>({
            query: () => undefined
        })
    })
})

export const { useSignInMutation, useSignOutMutation } = authApi