/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { GENDER } from "@/constants/user.constant";
import z from "zod";
import { loginUser } from "./login.server";
import { redirect } from "next/navigation";

const registerValidationZodSchema = z
    .object({
        name: z.string().min(1, { message: "Name is required" }),
        address: z.string().optional(),
        email: z.email({ message: "Valid email is required" }),
        password: z
            .string()
            .min(6, { message: "Password must be at least 6 characters long" })
            .max(100, { message: "Password must be at most 100 characters long" }),
        dob: z.string().optional(),
        phone: z.string().optional(),
        bloodGroup: z.string().optional(),
        gender: z.enum(GENDER).optional(),
        profile: z.any().optional(), // file
        banner: z.any().optional(),  // file
    })





export const registerUser = async (_currentState: any, formData: any): Promise<any> => {
    try {
      
        // Collect all fields from FormData
        const signupData = {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
            dob: formData.get("dob"),
            phone: formData.get("phone"),
            bloodGroup: formData.get("bloodGroup"),
            gender: formData.get("gender"),
          
        };
      
        // Zod validation
        const validatedFields = registerValidationZodSchema.safeParse(signupData);
        if (!validatedFields.success) {
            return {
                success: false,
                errors: validatedFields.error.issues.map((issue) => ({
                    field: issue.path[0],
                    message: issue.message,
                })),
            };
        }
    

        const res = await fetch("http://localhost:5000/api/v1/user/register", {
            method: "POST",
            body: JSON.stringify(signupData),
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