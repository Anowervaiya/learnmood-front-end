'use server'
export const getPageInfo = async (pageId:string)=> {
    try {
     
           const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/page?_id=${pageId}`, {
            method: "GET",
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
