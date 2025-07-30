import AuthForm from "@/components/AuthForm";

export default function SignInPage() {
    return (
        <>
            <div className="bg-[#C4C4C496] min-h-screen">
                <AuthForm type="signin" defaultValues={{
                    email:"",
                    password:"",
                }}/>
            </div>
        </>
    );
}
