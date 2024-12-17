import React, { FC } from 'react'
import FormFlight from '../../components/formFlight'
import { Metadata } from 'next'
import { getAirplanes } from '../../../airplanes/lib/data'
import { getFlightById } from '../../lib/data'

export const metadata: Metadata = {
    title: "Dashboard | Edit flight data",
}

interface EditFlightPageProps {
    params: Promise<{
        id: string
    }>
}

const EditFlightPage: FC<EditFlightPageProps> = async ({ params }) => {

    const airplanes = await getAirplanes();
    const { id } = await params;
    const flight = await getFlightById(id);

    return (
        <div>
            <div className='flex flex-row items-center justify-between'>
                <div className='my-5 text-2xl font-bold'>Edit Flight Data</div>
            </div>
            <FormFlight type='EDIT' defaultValues={flight} airplanes={airplanes} />
        </div>
    )
}

export default EditFlightPage