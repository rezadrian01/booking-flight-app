"use client";

import { ActionResult } from '@/app/dashboard/(auth)/signin/form/action';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { FC, useActionState } from 'react'
import { saveAirplane, updateAirplane } from '../lib/actions';
import { useFormStatus } from 'react-dom';
import { Airplane } from '@prisma/client';

interface FormAirplanePageProps {
    type?: "ADD" | "EDIT",
    defaultValues?: Airplane | null
}

const SubmitButton = () => {
    const { pending } = useFormStatus();
    return <>
        <Button disabled={pending} className='w-full'>{pending ? 'Loading...' : 'Submit'}</Button>
    </>
}

const FormAirplane: FC<FormAirplanePageProps> = ({ type, defaultValues }) => {

    const initialFormState: ActionResult = {
        errorTitle: null,
        errorDesc: []
    }

    const updateAirplaneById = (_state: ActionResult, formData: FormData) => updateAirplane(initialFormState, defaultValues?.id!, formData);


    const [state, formAction] = useActionState(type === 'ADD' ? saveAirplane : updateAirplaneById, initialFormState)
    return (
        <form action={formAction} className='w-[40%] space-y-4'>

            {state.errorTitle && <div className='my-7 bg-red-500/95 p-4 rounded-lg text-white'>
                <div className='text-lg font-bold'>{state.errorTitle}</div>
                <ul className='list-disc list-inside'>
                    {state.errorDesc?.map((error, index) => {
                        return <li key={index + error}>{error}</li>
                    })}
                </ul>
            </div>}

            <div className='space-y-2'>
                <Label htmlFor='code'>Airplane Code</Label>
                <Input id='code' name='code' type='text' placeholder='Airplane Code...' required
                    defaultValue={defaultValues?.code}
                />
            </div>
            <div className='space-y-2'>
                <Label htmlFor='name'>Airplane Name</Label>
                <Input id='name' name='name' type='text' placeholder='Airplane Name...' required
                    defaultValue={defaultValues?.name}
                />
            </div>
            <div className='space-y-2'>
                <Label htmlFor='name'>Airplane Photo</Label>
                <Input id='image' name='image' type='file' placeholder='Airplane Photo...' required />
            </div>

            <SubmitButton />
        </form>
    )
}

export default FormAirplane