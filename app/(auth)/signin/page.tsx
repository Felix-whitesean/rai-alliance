import AuthForm from "@/components/AuthForm";
import Navbar from "@/components/NavBar";

export default function SignInPage() {
    return (
        <>
            <div className="bg-[#C4C4C496] min-h-screen">
                <Navbar />
                <AuthForm type="signin" defaultValues={{
                    email:"",
                    password:"",
                }}/>
            </div>
        </>
    );
}
