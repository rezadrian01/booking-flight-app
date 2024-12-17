import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/dataTable'
import { Plus } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
import React, { FC } from 'react'
import { columns } from './components/columnsTable'
import { getFlights } from './lib/data'

export const metadata: Metadata = {
    title: "Dashboard | Flights"
}

const FlightPage: FC = async () => {

    const data = await getFlights();

    return (
        <>
            <div className='flex flex-row items-center justify-between'>
                <div className='my-5 text-2xl font-bold'>Flights</div>
                <Button asChild>
                    <Link href='/dashboard/flights/create'>
                        <Plus className='mr-2 h-4 w-4' />
                        Add
                    </Link>
                </Button>
            </div>
            <DataTable columns={columns} data={data} />
        </>
    )
}

export default FlightPage