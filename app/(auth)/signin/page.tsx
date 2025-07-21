import AuthForm from "@/components/AuthForm";

export default function SignInPage() {
    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl mb-4">Sign In</h1>
            <AuthForm type="signin" defaultValues={{
                email:"",
                password:"",
            }}/>
        </div>
    );
}
