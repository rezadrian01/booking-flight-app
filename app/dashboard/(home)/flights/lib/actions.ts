"use server";

import { ActionResult } from "@/app/dashboard/(auth)/signin/form/action";
import { redirect } from "next/navigation";
import { formFlightSchema } from "./validation";
import prisma from "@/lib/prisma";
import { generateSeatPerClass } from '../../../../../lib/utils';
import { revalidatePath } from "next/cache";


export async function saveFlight(
    prevState: ActionResult,
    formData: FormData,
): Promise<ActionResult> {

    const departureDate = new Date(formData.get('departureDate') as string);
    const arrivalDate = new Date(formData.get('arrivalDate') as string);

    const values = formFlightSchema.safeParse({
        planeId: formData.get('planeId'),
        price: formData.get('price'),
        departureCity: formData.get('departureCity'),
        departureCityCode: formData.get('departureCityCode'),
        departureDate,
        destinationCity: formData.get('destinationCity'),
        destinationCityCode: formData.get('destinationCityCode'),
        arrivalDate,
    })

    if (!values.success) {
        return {
            errorTitle: "Error Validation",
            errorDesc: values.error.issues.map(issue => issue.message)
        }
    }

    const data = await prisma.flight.create({
        data: {
            ...values.data,
            price: Number.parseInt(values.data.price)
        }
    })

    const seats = generateSeatPerClass(data.id);

    await prisma.flighSeat.createMany({
        data: seats
    })

    revalidatePath('/dashboard/flights')
    redirect('/dashboard/flights');
}

export async function updateFlight(prevState: ActionResult, id: string, formData: FormData): Promise<ActionResult> {
    const departureDate = new Date(formData.get('departureDate') as string);
    const arrivalDate = new Date(formData.get('arrivalDate') as string);

    const values = formFlightSchema.safeParse({
        planeId: formData.get('planeId'),
        price: formData.get('price'),
        departureCity: formData.get('departureCity'),
        departureCityCode: formData.get('departureCityCode'),
        departureDate,
        destinationCity: formData.get('destinationCity'),
        destinationCityCode: formData.get('destinationCityCode'),
        arrivalDate,
    })

    if (!values.success) {
        return {
            errorTitle: "Error Validation",
            errorDesc: values.error.issues.map(issue => issue.message)
        }
    }

    await prisma.flight.update({
        where: {
            id: id
        },
        data: {
            ...values.data,
            price: Number.parseInt(values.data.price)
        }
    })

    revalidatePath('/dashboard/flights')
    redirect('/dashboard/flights');
}

export async function deleteFlight(id: string) {
    try {
        await prisma.flighSeat.deleteMany({
            where: {
                flightId: id
            }
        })

        await prisma.flight.delete({
            where: {
                id: id
            }
        })
    } catch (error) {
        console.log(error);

    }

    revalidatePath('/dashboard/flights')
}