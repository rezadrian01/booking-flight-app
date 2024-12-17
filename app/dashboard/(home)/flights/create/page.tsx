import React, { FC } from 'react'
import FormFlight from '../components/formFlight'
import { getAirplanes } from '../../airplanes/lib/data'

const CreateFlightPage: FC = async () => {

    const airplanes = await getAirplanes();

    return (
        <div>
            <div className='flex flex-row items-center justify-between'>
                <div className='my-5 text-2xl font-bold'>Create Flight Data</div>
            </div>
            <FormFlight type='ADD' airplanes={airplanes} />
        </div>
    )
}

export default CreateFlightPage