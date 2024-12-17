import { Flight } from '@prisma/client'
import React, { FC, useMemo } from 'react'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { mappingSeats, rupiahFormat } from '@/lib/utils'
import { FlightColumn } from './columnsTable'


interface ColumnSeatPriceProps {
    flight: FlightColumn
}

const ColumnSeatPrice: FC<ColumnSeatPriceProps> = ({ flight }) => {

    const
        { totalBookedEconomy,
            totalBookedBusiness,
            totalBookedFirst,
            totalSeatEconomy,
            totalSeatBusiness,
            totalSeatFirst
        }
            = useMemo(() => mappingSeats(flight.seats), [flight])

    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className='w-full'>
                <AccordionTrigger>Economy Class</AccordionTrigger>
                <AccordionContent>
                    <div className='space-y-2'>
                        <div className='font-medium'>
                            <span className='text-primary'>Ticket Price: {rupiahFormat(flight.price)}</span>
                        </div>
                        <div className='font-medium'>
                            <span className='text-primary'>Taken Seats: {totalBookedEconomy}/{totalSeatEconomy}</span>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className='w-full'>
                <AccordionTrigger>Business Class</AccordionTrigger>
                <AccordionContent>
                    <div className='space-y-2'>
                        <div className='font-medium'>
                            <span className='text-primary'>Ticket Price: {rupiahFormat(flight.price + 500000)}</span>
                        </div>
                        <div className='font-medium'>
                            <span className='text-primary'>Taken Seats: {totalBookedBusiness}/{totalSeatBusiness}</span>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className='w-full'>
                <AccordionTrigger>First Class</AccordionTrigger>
                <AccordionContent>
                    <div className='space-y-2'>
                        <div className='font-medium'>
                            <span className='text-primary'>Ticket Price: {rupiahFormat(flight.price + 750000)}</span>
                        </div>
                        <div className='font-medium'>
                            <span className='text-primary'>Taken Seats: {totalBookedFirst}/{totalSeatFirst}</span>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>

    )
}

export default ColumnSeatPrice
