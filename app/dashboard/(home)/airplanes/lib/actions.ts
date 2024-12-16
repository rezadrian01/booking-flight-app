"use server";

import { ActionResult } from "@/app/dashboard/(auth)/signin/form/action";
import { airplaneFormSchema } from "./validation";
import { redirect } from "next/navigation";
import { uploadFile } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function saveAirplane(prevState: ActionResult, formData: FormData): Promise<ActionResult> {
    const values = airplaneFormSchema.safeParse({
        name: formData.get('name'),
        code: formData.get('code'),
        image: formData.get('image')
    })

    if (!values.success) {
        const errorDesc = values.error.issues.map(issue => issue.message)
        return {
            errorTitle: "Error Validation",
            errorDesc
        }
    }

    const uploadedFile = await uploadFile(values.data.image);

    if (uploadedFile instanceof Error) {
        return {
            errorTitle: "Failed to Upload File",
            errorDesc: ["Problem on supabase service. Please try again later"]
        }
    }

    try {
        const data = await prisma.airplane.create({
            data: {
                name: values.data.name,
                code: values.data.code,
                image: uploadedFile as string
            }
        })
    } catch (error) {
        return {
            errorTitle: "Failed to Insert Data",
            errorDesc: ["Problem on database. Please try again later"]
        }
    }

    revalidatePath('/dashboard/airplanes');
    redirect('/dashboard/airplanes');
}