import { dateFormat } from '@/lib/utils'
import { Flight } from '@prisma/client'
import { ArrowRight } from 'lucide-react'
import React, { FC } from 'react'

interface ColumnRouteFlightProps {
    flight: Flight
}

const ColumnRouteFlight: FC<ColumnRouteFlightProps> = ({ flight }) => {
    return (
        <div className='flex flex-row gap-5 items-center'>
            <div className='text-center'>
                <div className='font-bold'>{flight.departureCityCode}</div>
                <div className='font-medium'>{flight.departureCity}</div>
                <div className='text-xs text-gray-500'>{dateFormat(flight.departureDate)}</div>
            </div>
            <ArrowRight className='h-5 w-5' />
            <div className='text-center'>
                <div className='font-bold'>{flight.destinationCityCode}</div>
                <div className='font-medium'>{flight.destinationCity}</div>
                <div className='text-xs text-gray-500'>{dateFormat(flight.arrivalDate)}</div>
            </div>
        </div>
    )
}

export default ColumnRouteFlight