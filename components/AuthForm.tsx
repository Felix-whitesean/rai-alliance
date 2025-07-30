"use client";

import {DefaultValues, FieldValues, useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import {FIELD_NAMES, FIELD_TYPES} from "@/constants";
import formSchema from "@/lib/validations";
import Image from "next/image";

interface Props <T extends FieldValues> {
    type: "signin" | "signup";
    defaultValues: T;
}

const AuthForm = <T extends FieldValues>({type, defaultValues}: Props<T>) => {
    const router = useRouter();
    const  isSignIn = type === "signin";
    const [error, setError] = useState("");

    const signInSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    });

    const signUpSchema = z.object({
        username: z.string().min(5),
        email: z.string().email(),
        first_name: z.string().min(1),
        last_name: z.string().min(1),
        password: z.string().min(6),
    });
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(isSignIn ? signInSchema : signUpSchema),
        defaultValues: defaultValues as DefaultValues<T>,
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        if (isSignIn) {
            const res = await signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password,
            });
            if (res?.error) {
                console.log(res?.error);
                setError(res.error);
            }
            else {
                router.push("/");
            }
        } else {
            const res = await fetch("/api/register", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (res.ok) {
                router.push("/signin");
            } else {
                try {
                    const contentType = res.headers.get("Content-Type");
                    let errorMessage = "Failed to register";

                    if (contentType && contentType.includes("application/json")) {
                        const data = await res.json();
                        console.log("Server error data:", data);
                        errorMessage = data?.error || errorMessage;
                    } else {
                        const text = await res.text();
                        console.log("Server raw error text:", text);
                        if (text) errorMessage = text;
                    }

                    setError(errorMessage);
                } catch (err) {
                    console.error("Error parsing error response:", err);
                    setError("Failed to parse error response");
                }
            }


        }
    }
    const fieldKeys = Object.keys(defaultValues) as Array<
        keyof z.infer<typeof formSchema>
    >;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="w-full h-screen px-8 mt-16 m-auto">
                    <div className="bg-background w-fit m-auto rounded-mg px-16 py-4 rounded-lg flex flex-col gap-4 items-center" >
                        <div className="w-fit m-auto flex flex-col gap-4">
                            <Image src="/logo.png" alt="LOGO" width={30} height={20} className="self-center" />
                            <h1 className="text-prim-color bg-[var(--prim-color-4)] px-12 py-2 rounded-sm">{ isSignIn ? "Sign in" : "Sign up"} </h1>
                        </div>
                        {fieldKeys.map((fieldKey) => {
                            const fieldType = FIELD_TYPES[fieldKey as keyof typeof FIELD_TYPES];
                            const isPassword = fieldType === "password";
                            return (
                                <div key={fieldKey} className="">
                                <FormField
                                    control={form.control}
                                    name={fieldKey}
                                    render={({ field }) => {
                                        return (
                                            <FormItem>
                                                <FormLabel>
                                                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}:
                                                </FormLabel>
                                                <div className="relative ">
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            type={isPassword ? (showPassword ? "text" : "password") : fieldType}
                                                            className={`${isPassword ? "pr-10" : ""} border-1 border-black rounded-sm sm:w-[400px] w-80%`}
                                                        />
                                                    </FormControl>

                                                    {isPassword && (
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowPassword((prev) => !prev)}
                                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                                                        >
                                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                        </button>
                                                    )}
                                                </div>
                                            </FormItem>
                                        );
                                    }}
                                />
                                </div>
                            );
                        })}
                        {error && <p className="text-red-500">{error}</p>}
                        <div className="w-full px-8 flex flex-col mt-4 gap-4">
                            <Button type="submit" className="w-full py-6 rounded-sm bg-[var(--prim-color)] border-2 border-transparent text-background hover:bg-transparent hover:border-[var(--prim-color)] hover:text-foreground">{isSignIn ? "Sign In" : "Sign Up"}</Button>
                            <div className="text-[14px]">
                                <span>{isSignIn ? "Don't have an account, start with " : "Already have an account? Please "}</span>
                                <Link href={isSignIn ? '/signup' : '/signin' } className="text-prim-color underline hover:no-underline hover:bg-[var(--sec-color-4)] p-2 rounded-sm">{isSignIn ? "sign up" : "sign in"}</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    )
}
export default AuthForm
