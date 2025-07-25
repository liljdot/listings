import SignInForm from "@/features/shared/auth/components/SignInForm";

const SignInPage: React.FC = () => {
    return (
        <>
            <div className='container flex h-screen items-center justify-center py-4'>
                <SignInForm />
            </div>
        </>
    );
};

export default SignInPage;