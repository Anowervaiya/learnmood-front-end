'use server'
import { serverFetch } from "@/utils/serverFetch";

export async function getPostDetailsInfo(postId:string) {
    try {
        const response = await serverFetch.get(`/post/${postId}`);
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
