import AuthForm from "@/components/AuthForm";

export default function SignUpPage() {
    return (
        <>
            <div className="bg-[#C4C4C496] h-screen">
                <AuthForm type="signup" defaultValues={{
                    first_name: "",
                    last_name:"",
                    username: "",
                    email:"",
                    password:"",

                }}/>
        </div>

        </>
    );
}
