import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import React, { FC } from 'react'
import { useFormStatus } from 'react-dom'
import { deleteAirplane } from '../lib/actions'

interface DeleteAirplanePageProps {
    id: string
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return <Button size={'sm'} disabled={pending} type='submit' variant={'destructive'}>
        <Trash className='mr-2 w-4 h-4' />
        Delete
    </Button>
}

const DeleteAirplane: FC<DeleteAirplanePageProps> = ({ id }) => {

    const deleteAirplaneById = deleteAirplane.bind(null, id);


    return (
        <form action={deleteAirplaneById}>
            <SubmitButton />
        </form>
    )
}

export default DeleteAirplane