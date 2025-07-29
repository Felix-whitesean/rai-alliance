import AuthForm from "@/components/AuthForm";
import Navbar from "@/components/NavBar";

export default function SignUpPage() {
    return (
        <>
            <div className="bg-[#C4C4C496] h-screen">
                <Navbar />
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
