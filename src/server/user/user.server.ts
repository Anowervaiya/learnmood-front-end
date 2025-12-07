/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/utils/serverFetch";



export const getUserProfile = async (profileId:string)=> {
    try {
     
           const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user?_id=${profileId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const result = await res.json();
    
        return result;



    } catch (error: any) {
      
        console.log(error);
        return { error: "Failed to fetch user profile" };
    }
}

export const getUserPost = async (page:string, limit:string, userId:string)=> {
    try {
     
           const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/post?page=${page}&limit=${limit}&user=${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const result = await res.json();
    
        return result;



    } catch (error: any) {
      
        console.log(error);
        return { error: "Failed to fetch user profile" };
    }
}

    export async function getUserInfo() {
        try {
            const response = await serverFetch.get(`/user/me`);
            const result = await response.json();
            return result;
        } catch (error: any) {
            console.log(error);
            return {
                success: false,
                message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
            };
        }
    }

export async function updateProfile(entityType:string, userId: string, formData: FormData) {

    try {

       const response = await serverFetch.patch(`/${entityType}/${userId}`, {
            body: formData,
        })
        const result = await response.json();
        console.log(result)
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }   
}   
