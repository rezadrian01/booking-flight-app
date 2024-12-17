import { Button } from '@/components/ui/button'
import React from 'react'
import { useFormStatus } from 'react-dom'

const SubmitFormButton = () => {
    const { pending } = useFormStatus();
    return (
        <>
            <Button disabled={pending} className='w-full'>{pending ? 'Loading...' : 'Submit'}</Button>
        </>
    )
}

export default SubmitFormButton