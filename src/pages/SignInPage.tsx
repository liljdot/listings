import SignInForm from "@/features/shared/auth/components/SignInForm";
import { useAuthContext } from "@/features/shared/auth/contexts/AuthProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignInPage: React.FC = () => {
    const { token } = useAuthContext();
    const navigate = useNavigate()

    useEffect(() => {
        if (token) {
            navigate("/", { replace: true })
        }
    }, [token, navigate])

    return (
        <>
            <div className='container flex h-screen items-center justify-center py-4'>
                <SignInForm />
            </div>
        </>
    );
};

export default SignInPage;