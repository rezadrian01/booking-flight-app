"use server";

import { ActionResult } from "@/app/dashboard/(auth)/signin/form/action";
import { airplaneFormSchema } from "./validation";
import { redirect } from "next/navigation";
import { uploadFile } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";


export async function getAirplaneById(id: string) {
    try {
        const data = await prisma.airplane.findFirst({
            where: {
                id: id
            }
        })
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

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

export async function updateAirplane(prevState: ActionResult, id: string, formData: FormData): Promise<ActionResult> {
    const image = formData.get('image') as File;

    let airplaneFormSchemaUpdate;
    if (image.size === 0) {
        airplaneFormSchemaUpdate = airplaneFormSchema.omit({ image: true });
    } else {
        airplaneFormSchemaUpdate = airplaneFormSchema;
    }

    const values = airplaneFormSchemaUpdate.safeParse({
        name: formData.get('name'),
        code: formData.get('code'),
        image: formData.get('image')
    })

    if (!values.success) {
        return {
            errorTitle: "Error Validation",
            errorDesc: values.error.issues.map(issue => issue.message)
        }
    }

    let filename: unknown;

    if (image.size > 0) {
        const uploadedFile = await uploadFile(image);
        if (uploadedFile instanceof Error) {
            return {
                errorTitle: "Failed to Upload File",
                errorDesc: ["Problem on supabase service. Please try again later"]
            }

        }
        filename = uploadedFile as string;
    } else {
        const airplane = await prisma.airplane.findFirst({
            where: {
                id: id
            },
            select: {
                image: true
            }
        })
        filename = airplane?.image;
    }

    try {
        await prisma.airplane.update({
            where: {
                id: id
            },
            data: {
                name: values.data.name,
                code: values.data.code,
                image: filename as string
            }
        })
    } catch (error) {
        return {
            errorTitle: "Failed to Update Data",
            errorDesc: ["Problem on database. Please try again later"]
        }
    }

    revalidatePath('/dashboard/airplanes');
    redirect('/dashboard/airplanes');
}