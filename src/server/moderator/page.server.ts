'use server'

import { serverFetch } from "@/utils/serverFetch";

export const getPageInfo = async (pageId:string)=> {
    try {
     
           const res = await serverFetch.get(`/page?_id=${pageId}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        const result = await res.json();
        return result;
    } catch (error: any) {
      
        console.log(error);
        return { error: "Failed to fetch page info" };
    }
}
