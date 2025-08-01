import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Card, CardContent, CardHeader, Separator, Spinner } from "@/components/ui"
// @ts-expect-error import from js file
import api from "@/api"
import type { AxiosError, AxiosInstance } from "axios"
import { useAuthContext } from "../contexts/AuthProvider"
import TextInput from "@/components/ui/TextInput"

const typedApi = api as AxiosInstance

const signInFormSchema = z.object({
    email: z.email(),
    password: z.string().min(8)
})

const SignInForm: React.FC = () => {
    const { setToken } = useAuthContext()

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        control,
        setError
    } = useForm({
        resolver: zodResolver(signInFormSchema)
    })

    const onSubmit = handleSubmit(data => {
        return typedApi.post<{
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
                        <TextInput<z.output<typeof signInFormSchema>>
                            name="email"
                            control={control}
                            placeholder="name@example.com"
                        />
                        <TextInput<z.output<typeof signInFormSchema>>
                            name="password"
                            type="password"
                            control={control}
                            placeholder="********"
                        />
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {
                                isSubmitting
                                    ? <Spinner size={"sm"} />
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