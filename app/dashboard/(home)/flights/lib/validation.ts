import { z } from "zod";

export const formFlightSchema = z.object({
    planeId: z.string({ required_error: "Plane ID must be provided" }),
    price: z.string({ required_error: "Flight price must be provided" }),
    departureCity: z.string({ required_error: "Departure city must be provided" }),
    departureDate: z.date(),
    departureCityCode: z.string({ required_error: "Departure city code must be provided" }).min(3, { message: "Minimum departure city code is 3" }).max(3, { message: "Maximum departure city code is 3" }),
    destinationCity: z.string({ required_error: "Destination city must be provided" }),
    arrivalDate: z.date(),
    destinationCityCode: z.string({ required_error: "Destination city code must be provided" }).min(3, { message: "Minimum destination city code is 3" }).max(3, { message: "Maximum destination city code is 3" }),


})