/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { GENDER } from "@/constants/user.constant";
import z from "zod";
import { loginUser } from "./login.server";
import { redirect } from "next/navigation";
import { registerValidationZodSchema } from "@/zod/user.validation";
import { serverFetch } from "@/utils/serverFetch";



export const registerUser = async (_currentState: any, formData: any): Promise<any> => {
    try {
      
        // Collect all fields from FormData
        const payload = {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
            dob: formData.get("dob"),
            phone: formData.get("phone"),
            bloodGroup: formData.get("bloodGroup"),
            gender: formData.get("gender"),
        };

        // Zod validation
        const validatedFields = registerValidationZodSchema.safeParse(payload);
        if (!validatedFields.success) {
            return {
                success: false,
                errors: validatedFields.error.issues.map((issue) => ({
                    field: issue.path[0],
                    message: issue.message,
                })),
            };
        }
    

        const res = await serverFetch.post("/user/register", {
            body: JSON.stringify(validatedFields.data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const result = await res.json();
      if (result.success) {
            await loginUser(_currentState, formData);
            redirect(`/profile/${result.data._id}`);
        }

        return result;



    } catch (error: any) {
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.log(error);
        return { error: "Registration failed" };
    }
}