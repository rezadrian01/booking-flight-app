import React, { FC } from 'react'
import FormAirplane from '../../components/formAirplane'
import { getAirplaneById } from '../../lib/actions'

type Params = {
    id: string
}

interface EditAirplanePageProps {
    params: Params
}

const EditAirplanePage: FC<EditAirplanePageProps> = async ({ params }) => {
    const { id } = params;
    const data = await getAirplaneById(id);
    return (
        <div>
            <div className='flex flex-row items-center justify-between'>
                <div className='my-5 text-2xl font-bold'>Edit Airplane Data</div>
            </div>
            <FormAirplane type='EDIT' defaultValues={data} />
        </div>
    )
}

export default EditAirplanePage