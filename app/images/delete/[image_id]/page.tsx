'use client'

import {useRouter, useParams} from "next/navigation";
import {useEffect, useState} from "react";

export default function Create() {
    const params = useParams();
    const image_id = params?.image_id as string | undefined;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            if (!image_id) {
                setLoading(false);
                return;
            }
            setError("");

            try {
                const res = await fetch(`/api/images/delete/`, {
                    method: "POST",
                    body: JSON.stringify({image_id}),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (res.ok) {
                    router.push("/images");
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
                    } finally {
                        setLoading(false);
                    }
                }
            } catch (err) {
                console.error("Unexpected error:", err);
                setError("Unexpected error occurred");
            } finally {
                setLoading(false);
            }
        }
        fetchData()
    }, [image_id, router])
    return (
        <div>
            {loading ? (
                <div>Deleting image...</div>
            ) : error ? (
                <div className="text-red-500">Error: {error}</div>
            ) : (
                <div className="text-green-600">Image deleted successfully, redirecting ...</div>
            )}
        </div>
    );

}
