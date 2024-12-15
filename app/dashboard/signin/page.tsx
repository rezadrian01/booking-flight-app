
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Metadata } from 'next'
import React, { FC } from 'react'
import SigninForm from './form'

interface SignInPageProps {

}

export const metadata: Metadata = {
    title: "Dashboard | Signin"
}

const SignInPage: FC<SignInPageProps> = () => {



    return (
        <div className='w-full h-screen'>
            <SigninForm />
        </div>
    )
}

export default SignInPage