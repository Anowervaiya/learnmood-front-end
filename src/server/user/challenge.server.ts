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

export async function getMyChallenge(queryString?: string) {
    try {
        const response = await serverFetch.get(
            `/challenge/my-purchased-challenges${queryString ? `?${queryString}` : ""}`
        );
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Error fetching prescriptions:", error);
        return {
            success: false,
            data: [],
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to fetch prescriptions",
        };
    }
}

export async function getUpcommingChallenge(queryString?: string) {
    try {
        const response = await serverFetch.get(
            `/challenge?page=1&limit=10`
        );
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Error fetching prescriptions:", error);
        return {
            success: false,
            data: [],
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to fetch prescriptions",
        };
    }
}

