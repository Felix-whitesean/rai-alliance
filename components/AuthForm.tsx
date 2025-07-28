"use client";

import {DefaultValues, FieldValues, Path, useForm} from "react-hook-form";
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
            console.log("Submitted data:", data);
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
            console.log("Sending to server:", data);
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

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {Object.keys(defaultValues).map((fieldKey) => {
                    const fieldType = FIELD_TYPES[fieldKey as keyof typeof FIELD_TYPES];
                    const isPassword = fieldType === "password";

                    return (
                        <FormField
                            key={fieldKey}
                            control={form.control}
                            name={fieldKey as Path<T>}
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>
                                            {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}:
                                        </FormLabel>
                                        <div className="relative">
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type={isPassword ? (showPassword ? "text" : "password") : fieldType}
                                                    className={isPassword ? "pr-10" : ""}
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
                    );
                })}
                {error && <p className="text-red-500">{error}</p>}
                <Button type="submit" className="w-24 px-24 rounded-sm">{isSignIn ? "Sign In" : "Sign Up"}</Button>
                <div className="text-[14px]">
                    <span>{isSignIn ? "Don't have an account, start with " : "Already have an account? Please "}</span>
                    <Link href={isSignIn ? '/signup' : '/signin' } className="text-blue-500 underline">{isSignIn ? "sign up" : "sign in"}</Link>
                </div>
            </form>
        </Form>
    )
}
export default AuthForm
