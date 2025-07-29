"use client"

import React, {useState} from 'react'
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {z} from "zod";
import {DefaultValues, FieldValues, Path, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {GUEST_FIELD_TYPES, GUEST_FIELD_NAMES} from "@/constants";
import {useRouter} from "next/navigation";
import guestFormSchema from "@/lib/guests";

interface Props <T extends FieldValues> {
    defaultValues: T;
}

const GuestForm = <T extends FieldValues>({defaultValues}: Props<T>) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const guestSchema = z.object({
        guest_id: z.string().optional(),
        guest_name: z.string().min(5),
        email: z.string().email().optional(),
        company: z.string().optional(),
        linkedin: z.string().optional(),
        country_of_residence: z.string().min(2),
        position_in_company: z.string().optional(),
        company_website_url: z.string().optional(),
    });

    const form = useForm<z.infer<typeof guestFormSchema>>({
        resolver: zodResolver(guestSchema),
        defaultValues: {...defaultValues as object} as unknown as DefaultValues<T>,
    });

    const onSubmit = async (data: z.infer<typeof guestFormSchema>) => {
        if (isLoading) return;
        setIsLoading(true);
        setError("");

        const MIN_WAIT = 3 * 1000;
        const start = Date.now();

        const res = await fetch("/api/register_guest", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const elapsed = Date.now() - start;
        const waitTime = MIN_WAIT - elapsed;
        if (waitTime > 0) {
            await new Promise((resolve) => setTimeout(resolve, waitTime));
        }

        if (res.ok) {
            router.push("/team");
        } else {

            try {
                const contentType = res.headers.get("Content-Type");
                let errorMessage = "Failed to add guest";
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
            finally {
                setIsLoading(false);
            }
        }

    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="w-full h-full bg-[#1E1E1EB] lg:p-32 lg:pt-8 md:p-12 sm:p-4 text-foreground">
                    <div className="bg-background rounded-md p-8">
                        <h1 className="text-foreground w-fit m-auto text-[1rem] font-bold">Sign up - guest</h1>
                        <div className="form-elements flex flex-col pt-4">
                            <div  className="w-full flex flex-row flex-wrap p-2 gap-4 justify-between sm:self-center">
                                {Object.keys(defaultValues).map((fieldKey) => {
                                    const fieldType = GUEST_FIELD_TYPES[fieldKey as keyof typeof GUEST_FIELD_TYPES];
                                    const isHidden  = fieldType === "hidden";
                                    return (
                                        <FormField
                                            name={fieldKey as Path<T>}
                                            key={fieldKey}
                                            render={({field}) => {
                                                return (
                                                    <FormItem className={isHidden ? "hidden": "block sm:w-[40%] w-[300px]"}>
                                                        <FormLabel> {GUEST_FIELD_NAMES[field.name as keyof typeof GUEST_FIELD_NAMES]}:</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} type={fieldType} className="" />
                                                        </FormControl>
                                                    </FormItem>
                                                )
                                            }}
                                        />

                                    )

                                })}
                            </div>
                            {error && <p className="text-red-500">{error}</p>}
                            <Button type="submit" className="w-24 px-24 rounded-md mr-0 bg-[var(--prim-color)] text-background text-[0.8rem] font-semibold py-4 lg:self-end self-center mt-4" disabled={isLoading}>
                                {isLoading ? "signing up..." : "Sign up"}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    )
}
export default GuestForm
