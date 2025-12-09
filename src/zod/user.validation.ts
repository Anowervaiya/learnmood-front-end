import { BLOOD_GROUP } from "@/constants/blood.constant";
import { GENDER, PRONOUN } from "@/constants/user.constant";
import { profile } from "console";
import z from "zod";

export const registerValidationZodSchema = z
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
        bloodGroup: z.enum(BLOOD_GROUP).optional(),
        gender: z.enum(GENDER).optional(),
        profile: z.any().optional(), // file
        banner: z.any().optional(),  // file
    })


// router.patch(
//   '/:id',
//   checkAuth(...Object.values(Role)),
//   multerUpload.fields([
//     { name: 'profile', maxCount: 1 },
//     { name: 'banner', maxCount: 1 },
//   ]),
//   validateRequest(updateUserZodValidation),
//   UserControllers.updateUser
// );



export const updateUserZodSchema = z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    gender: z.enum(GENDER).optional(),
    bio: z.string().optional(),
    nickname: z.string().optional(),
    dob: z.date().optional(),
    bloodGroup: z.enum(BLOOD_GROUP).optional(),
    pronoun: z.enum(PRONOUN).optional(),
    profile: z.any().optional(), // file
    banner: z.any().optional(),  // file
});