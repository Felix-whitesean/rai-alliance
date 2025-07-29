"use client"

import React, {useState} from 'react'
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {z} from "zod";
import {DefaultValues, FieldValues, Path, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {FIELD_TYPES, FIELD_NAMES} from "@/constants";
import eventFormSchema from "@/lib/events";
import {useRouter} from "next/navigation";
import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectLabel, SelectGroup,} from "@/components/ui/select"

interface Props <T extends FieldValues> {
    type: "events";
    defaultValues: T;
}


const CreationForm = <T extends FieldValues>({type, defaultValues}: Props<T>) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const eventSchema = z.object({
        event_id: z.string().optional(),
        guest: z.string().optional(),
        event_title: z.string().min(5),
        event_theme: z.string().min(5),
        event_link: z.string().optional(),
        event_location: z.string().optional(),
        target_group: z.string().min(1),
        editor_group: z.string().min(1),
        poster_id: z.string().min(5),
        event_date: z.coerce.date().refine((date: Date) => date > new Date(), {
            message: "Event date must be in the future",
        }),
        linkedin_post: z.string().optional(),
        displayed: z.string().optional(),
        recording: z.string().optional(),
        presentation_slides: z.string().optional(),
    })

    const form = useForm<z.infer<typeof eventFormSchema>>({
        resolver: zodResolver(eventSchema),
        defaultValues: {...defaultValues as object} as unknown as DefaultValues<T>,
    });

    const onSubmit = async (data: z.infer<typeof eventFormSchema>) => {
        if (isLoading) return;
        setIsLoading(true);
        setError("");

        const MIN_WAIT = 3 * 1000; // 3 seconds
        const start = Date.now();

        const res = await fetch("/api/register_event", {
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
            router.push("/events");
        } else {

            try {
                const contentType = res.headers.get("Content-Type");
                let errorMessage = "Failed to edit event";
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
                        <h1 className="text-foreground w-fit m-auto text-[1rem] font-bold">Schedule an event</h1>
                        <div className="form-elements flex flex-col pt-4">
                            <div  className="w-full flex flex-row flex-wrap p-2 gap-4 justify-between sm:self-center">
                                {Object.keys(defaultValues).map((fieldKey) => {
                                    const fieldType = FIELD_TYPES[fieldKey as keyof typeof FIELD_TYPES];
                                    const isSelectGroup = fieldType === "select";
                                    const isHidden  = fieldType === "hidden";
                                    const isTargetGroup = fieldKey === "target_group";
                                    const isEditorGroup = fieldKey === "editor_group";
                                    const hasThree = isTargetGroup || isEditorGroup;
                                    const isDisplay = fieldKey === "displayed";
                                    return (
                                        <FormField
                                            name={fieldKey as Path<T>}
                                            key={fieldKey}
                                            render={({field}) => {
                                                return (
                                                    <FormItem className={isHidden ? "hidden": "block sm:w-[40%] w-[300px]"}>
                                                        <FormLabel> {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}:</FormLabel>
                                                        <FormControl>
                                                            {isSelectGroup ? (
                                                                <Select onValueChange={(value: string) => field.onChange(value)} value={field.value?.toString() ?? ""}>
                                                                    <SelectTrigger className="w-[200px]">
                                                                        <SelectValue placeholder="Select user group" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectGroup>
                                                                            <SelectLabel>{ isDisplay ? "Display options" : "User group"}</SelectLabel>
                                                                            <SelectItem value={isDisplay ? "0" : "1"}>{isDisplay ? "Hidden" :  ( isTargetGroup ? "public" : "anyone") }</SelectItem>
                                                                            <SelectItem value={isDisplay ? "1" : "2"}>{isDisplay ? "Displayed" :  ( isTargetGroup ? "registered users" : "regular users")}</SelectItem>
                                                                            {hasThree ? <SelectItem value="3">{isTargetGroup ? "ambassadors" : "admin"}</SelectItem> : null }
                                                                        </SelectGroup>
                                                                    </SelectContent>
                                                                </Select>
                                                            ) : (
                                                                <Input {...field} type={fieldType} className="" />
                                                            )}
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
                                {isLoading ? "Scheduling..." : "Schedule event"}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    )
}
export default CreationForm
