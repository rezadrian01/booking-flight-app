"use client";

import { Button } from "@/components/ui/button";
import { getUrlFile } from "@/lib/supabase";
import { Airplane, FlighSeat, Flight } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type FlightColumn = Flight & {
    plane: Airplane,
    seats: FlighSeat[]
}

export const columns: ColumnDef<FlightColumn>[] = [
    {
        accessorKey: 'planeId',
        header: "Plane",
        cell: ({ row }) => {
            const flight = row.original;
            const planeImgUrl = getUrlFile(flight.plane.image);

            return <div className="inline-flex items-center gap-5">
                <Image src={planeImgUrl} alt="Image Plane" width={120} height={120} className="rounded-xl" />
                <div className="font-bold">
                    {flight.plane.name}
                </div>
            </div>
        }
    },
    {
        accessorKey: 'departureCity',
        header: "Destination",
        cell: ({ row }) => {
            const flight = row.original;

            return flight.destinationCity
        }
    },
    {
        accessorKey: 'price',
        header: "Price",
        cell: ({ row }) => {
            const flight = row.original;

            return flight.price
        }
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const flight = row.original;
            return (
                <div className='inline-flex gap-5 items-center'>
                    <Button variant={'secondary'} size='sm' asChild>
                        <Link href={`/dashboard/flights/edit/${flight.id}`}>
                            <Pencil className='mr-2 w-4 h-4' />
                            Edit
                        </Link>
                    </Button>
                    {/* <DeleteAirplane id={plane.id} /> */}
                </div>
            )
        }
    },
]