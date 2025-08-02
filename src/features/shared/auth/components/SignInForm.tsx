import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Card, CardContent, CardHeader, Separator, Spinner } from "@/components/ui"
// @ts-expect-error import from js file
import api from "@/api"
import type { AxiosError, AxiosInstance } from "axios"
import { useAuthContext } from "../contexts/AuthProvider"
import TextInput from "@/components/ui/TextInput"
import Form from "@/components/ui/Form"

const typedApi = api as AxiosInstance

const signInFormSchema = z.object({
    email: z.email(),
    password: z.string().min(8)
})

const SignInForm: React.FC = () => {
    const { setToken } = useAuthContext()

    const form = useForm({
        resolver: zodResolver(signInFormSchema)
    })

    const onSubmit = form.handleSubmit(data => {
        return typedApi.post<{
            accessToken: string
        }>("/api/signin", data)
            .then(res => {
                setToken(res.data.accessToken)
            })
            .catch((err: AxiosError<{ message: string }>) => {
                form.setError("root", {
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
                    <Form
                        form={form}
                        className="flex flex-col gap-4"
                        onSubmit={onSubmit}
                    >
                        <TextInput
                            name="email"
                            control={form.control}
                            placeholder="name@example.com"
                        />
                        <TextInput
                            name="password"
                            type="password"
                            control={form.control}
                            placeholder="********"
                        />
                        <Button
                            type="submit"
                            disabled={form.formState.isSubmitting}
                        >
                            {
                                form.formState.isSubmitting
                                    ? <Spinner size={"sm"} />
                                    : "Sign In"
                            }
                        </Button>
                    </Form>
                </CardContent>
            </Card>
        </>
    )
}

export default SignInForm;