import React, { FC } from 'react'
import FormAirplane from '../components/formAirplane'

const CreateAirplanePage: FC = () => {
    return (
        <div>
            <div className='flex flex-row items-center justify-between'>
                <div className='my-5 text-2xl font-bold'>Create Airplane Data</div>
            </div>
            <FormAirplane type='ADD' />
        </div>
    )
}

export default CreateAirplanePage