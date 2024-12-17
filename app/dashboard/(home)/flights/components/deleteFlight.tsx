"use client";

import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import React, { FC } from 'react'
import { useFormStatus } from 'react-dom';
import { deleteFlight } from '../lib/actions';

interface DeleteFlightButtonProps {
    id: string
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return <Button size={'sm'} disabled={pending} type='submit' variant={'destructive'}>
        <Trash className='mr-2 w-4 h-4' />
        Delete
    </Button>
}

const DeleteFlightButton: FC<DeleteFlightButtonProps> = ({ id }) => {

    const deleteFlightById = deleteFlight.bind(null, id);

    return (
        <form action={deleteFlightById}>
            <SubmitButton />
        </form>
    )
}
export default DeleteFlightButton