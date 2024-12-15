"use client";

import { Button } from '@/components/ui/button'
import React, { useActionState } from 'react'
import { ActionResult, handleSignin } from './action'
import { Input } from '@/components/ui/input'
import { useFormStatus } from 'react-dom';

const SigninForm = () => {

    const initialFormState: ActionResult = {
        errorTitle: null,
        errorDesc: [],
    }
    const [state, formAction] = useActionState(handleSignin, initialFormState);
    const { pending } = useFormStatus();
    return (

        <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                    Sign in to your account
                </h2>
            </div>

            {state.errorTitle && <div className='mx-auto my-7 bg-red-500/95 w-[400px] p-4 rounded-lg text-white'>
                <div className='text-lg font-bold'>{state.errorTitle}</div>
                <ul className='list-disc list-inside'>
                    {state.errorDesc?.map((error, index) => {
                        return <li key={index}>{error}</li>
                    })}
                </ul>
            </div>}
            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                <form action={formAction} className='space-y-6'>
                    <Input type='text' placeholder='Email...' name='email' />
                    <Input type='password' placeholder='Password...' name='password' />
                    <Button disabled={pending} className='w-full' type='submit'>{pending ? `Loading...` : `Submit`}</Button>
                </form>
            </div>
        </div>

    )
}

export default SigninForm