import prisma from "@/lib/prisma";

export async function getFlights() {
    try {
        const flights = await prisma.flight.findMany({
            include: {
                plane: true,
                seats: true
            }
        })

        return flights;
    } catch (err) {
        console.log(`Database Error: ${err}`);
        return []
    }
}