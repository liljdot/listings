import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Card, CardContent, CardHeader, Input, Separator, Spinner } from "@/components/ui"
// @ts-expect-error import from js file
import api from "@/api"
import type { AxiosError, AxiosInstance } from "axios"
import { useAuthContext } from "../contexts/AuthProvider"

const typedApi = api as AxiosInstance

const signInFormSchema = z.object({
    email: z.email(),
    password: z.string().min(8)
})

const SignInForm: React.FC = () => {
    const { setToken } = useAuthContext()

    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm({
        resolver: zodResolver(signInFormSchema)
    })

    const onSubmit = handleSubmit(data => {
        typedApi.post<{
            accessToken: string
        }>("/api/signin", data)
            .then(res => {
                setToken(res.data.accessToken)
            })
            .catch((err: AxiosError<{ message: string }>) => {
                setError("root", {
                    message: err.response?.data.message
                })
            })
    })

    return (
        <>
            <Card className="mx-auto w-[500px]">
                <CardHeader>
                    <h2 className="text-center text-2xl">
                        Sign In
                    </h2>
                    <p className='text-center text-muted-foreground'>
                        Sign in using your email and password
                    </p>
                    <Separator />
                </CardHeader>
                <CardContent>
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={onSubmit}
                    >
                        <div>
                            <Input
                                {...register("email")}
                                placeholder="name@example.com"
                            />
                            {
                                errors.email && (
                                    <div className='mt-2 text-sm text-red-500'>
                                        {errors.email.message}
                                    </div>
                                )
                            }
                        </div>
                        <div>
                            <Input
                                {...register("password")}
                                type="password"
                            />
                            {
                                errors.password && (
                                    <div className='mt-2 text-sm text-red-500'>
                                        {errors.password.message}
                                    </div>
                                )
                            }
                        </div>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {
                                isSubmitting
                                    ? <Spinner size={"sm"}/>
                                    : "Sign In"
                            }
                        </Button>
                        {errors.root && (
                            <div className='text-center text-sm text-red-500'>
                                {errors.root.message}
                            </div>
                        )}
                    </form>
                </CardContent>
            </Card>
        </>
    )
}

export default SignInForm;