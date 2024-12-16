import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png'
]

const MAX_FILE_SIZE = 2000000

export const airplaneFormSchema = z.object({
    name: z.string({ required_error: "Invalid airplane name" })
        .min(4, { message: "Minimum length is 4" }),
    code: z.string({ required_error: "Invalid airplane code" })
        .regex(/^[A-Z]{3}-[0-9]{3}$/, { message: "Format code must be [XXX-111]" }),

    image: z.any()
        .refine((file: File) => ACCEPTED_IMAGE_TYPES.includes(file.type), "Image must be a type jpg, jpeg, and png")
        .refine((file: File) => file.size <= MAX_FILE_SIZE, "Image must be lower than equal 2MB")

})