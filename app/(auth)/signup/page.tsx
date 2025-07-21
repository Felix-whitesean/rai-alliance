import AuthForm from "@/components/AuthForm";

export default function SignUpPage() {
    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl mb-4">Sign Up</h1>
            <AuthForm type="signup" defaultValues={{
                first_name: "",
                last_name:"",
                username: "",
                email:"",
                password:"",

            }}/>
        </div>
    );
}
