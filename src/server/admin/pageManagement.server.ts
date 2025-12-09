/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { zodValidator } from "@/lib/zodValidators";
import { serverFetch } from "@/utils/serverFetch";


export async function getPages(queryString?: string) {
    try {
        const response = await serverFetch.get(`/page${queryString ? `?${queryString}` : ""}`);
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

export async function getPageById(id: string) {
    try {
        const response = await serverFetch.get(`/user?_id=${id}`)
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

// export async function updateUser(id: string, _prevState: any, formData: FormData) {
//     try {
//         const payload: Partial<IUser> = {
//             name: formData.get("name") as string,
//             phone: formData.get("phone") as string,
//             address: formData.get("address") as string,
//             gender: formData.get("gender") as GENDER,
//             bio: formData.get("bio") as string,
//             nickname: formData.get("nickname") as string,
//             dob: formData.get("dob") ? new Date(formData.get("dob") as string) : undefined,
//             bloodGroup: formData.get("bloodGroup") as BLOOD_GROUP,
//             pronoun: formData.get("pronoun") as PRONOUN,
//             image: {
//                 profile: formData.get("profileImage") as string,
//                 banner: formData.get("bannerImage") as string,
//             }
//         }
//         const validatedPayload = zodValidator(payload, updateUserZodSchema).data;

//         const response = await serverFetch.patch(`/user/${id}`, {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(validatedPayload),
//         })
//         const result = await response.json();
//         return result;
//     } catch (error: any) {
//         console.log(error);
//         return { success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}` }
//     }
// }

// export async function softDeleteUser(id: string) {
//     try {
//         const response = await serverFetch.delete(`/User/soft/${id}`)
//         const result = await response.json();

//         return result;
//     } catch (error: any) {
//         console.log(error);
//         return {
//             success: false,
//             message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
//         };
//     }
// }
// export async function deleteUser(id: string) {
//     try {
//         const response = await serverFetch.delete(`/User/${id}`)
//         const result = await response.json();

//         return result;
//     } catch (error: any) {
//         console.log(error);
//         return {
//             success: false,
//             message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
//         };
//     }
// }