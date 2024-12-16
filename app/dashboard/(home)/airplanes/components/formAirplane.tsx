"use client";

import { ActionResult } from '@/app/dashboard/(auth)/signin/form/action';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useActionState } from 'react'
import { saveAirplane } from '../lib/actions';
import { useFormStatus } from 'react-dom';


const SubmitButton = () => {
    const { pending } = useFormStatus();
    return <>
        <Button disabled={pending} className='w-full'>{pending ? 'Loading...' : 'Submit'}</Button>
    </>
}

const FormAirplane = () => {

    const initialFormState: ActionResult = {
        errorTitle: null,
        errorDesc: []
    }
    const [state, formAction] = useActionState(saveAirplane, initialFormState)
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
                <Input id='code' name='code' type='text' placeholder='Airplane Code...' required />
            </div>
            <div className='space-y-2'>
                <Label htmlFor='name'>Airplane Name</Label>
                <Input id='name' name='name' type='text' placeholder='Airplane Name...' required />
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