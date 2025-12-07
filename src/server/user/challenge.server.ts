'use server'
import { serverFetch } from "@/utils/serverFetch";

export async function getChallengeDetailsInfo(challengeId:string) {
    try {
        const response = await serverFetch.get(`/challenge/${challengeId}`);
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
