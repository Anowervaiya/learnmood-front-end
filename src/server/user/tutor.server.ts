'use server'

import { serverFetch } from "@/utils/serverFetch"


export const createBooking = async (entityId:string , entityType:string)=> {
    try {
           
           const res = await serverFetch.post(`/booking`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ entityId, entityType })
        })
        const result = await res.json()
        return result;

    } catch (error: any) {
      
        console.log(error);
        return { error: "Failed to create booking" };
    }
}

export async function getMyTutors(queryString?: string) {
    try {
        const response = await serverFetch.get(
            `/mentor/my-purchased-mentors${queryString ? `?${queryString}` : ""}`
        );
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Error fetching tutors:", error);
        return {
            success: false,
            data: [],
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to fetch tutors",
        };
    }
}