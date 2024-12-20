"use client";

import { FlighSeat, Flight, Ticket, User } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import ColumnRouteFlight from '../../flights/components/columnRouteFlight'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type TicketType = Ticket & {
    flight: Flight,
    customer: User,
    seat: FlighSeat
}

export const columns: ColumnDef<TicketType>[] = [
    {
        accessorKey: 'customerId',
        header: "Pasengger Name",
        cell: ({ row }) => {
            const ticket = row.original;

            return ticket.customer.name
        }
    },
    {
        accessorKey: 'flightId',
        header: 'Flight Detail',
        cell: ({ row }) => {
            const ticket = row.original;

            return <ColumnRouteFlight flight={ticket.flight} />
        }
    },
    {
        accessorKey: 'seatId',
        header: "Seat Number",
        cell: ({ row }) => {
            const ticket = row.original;
            return <Badge>{ticket.seat.seatNumber}</Badge>
        }
    },
    {
        id: 'status_transaction',
        header: "Transaction Status",
        cell: ({ row }) => {
            const ticket = row.original;
            return (
                <div className="space-y-1">
                    <Badge className={cn(
                        ticket.status === "SUCCESS" ? "bg-green-500" : ticket.status === "PENDING" ? "bg-yellow-500" : "bg-red-500"
                    )}>
                        {ticket.status}
                    </Badge>
                </div>
            )
        }
    }
]