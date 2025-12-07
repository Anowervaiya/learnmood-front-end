'use server'

import { serverFetch } from "@/utils/serverFetch";


export const handleFollowing = async (followingId:string)=> {
    try {
           const res = await serverFetch.post(`/follow/create-follow`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ followingId , followerType:'User' })
        })
        const result = await res.json()
        return result;

    } catch (error: any) {
      
        console.log(error);
        return { error: "Failed to follow" };
    }
}


export const handleUnFollowing = async (followingId:string)=> {
    try {
           const res = await serverFetch.post(`/follow/create-unfollow`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ followingId , followerType: 'User' })
        })
        const result = await res.json()
        return result;
    } catch (error: any) {
      
        console.log(error);
        return { error: "Failed to unfollow" };
    }
}

export const getFollowStatus = async (followingId:string)=> {
    try {
           const res = await serverFetch.get(`/follow/status?followingId=${followingId}`)
        const result = await res.json()
        return result;
    } catch (error: any) {
        console.log(error);
        return { error: "Failed to fetch follow status" };
    }
}
