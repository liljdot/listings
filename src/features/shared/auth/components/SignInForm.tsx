import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Card, CardContent, CardHeader, Input, Separator } from "@/components/ui"

const signInFormSchema = z.object({
    email: z.email(),
    password: z.string().min(8)
})

const SignInForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(signInFormSchema)
    })

    const onSubmit = handleSubmit(data => console.log(data))

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
                        <Button type="submit">
                            Sign In
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </>
    )
}

export default SignInForm;