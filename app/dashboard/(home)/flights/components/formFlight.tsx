"use client";

import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import React, { FC, useActionState } from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import SubmitFormButton from '../../components/submitFormButton';
import { Airplane } from '@prisma/client';
import { ActionResult } from '@/app/dashboard/(auth)/signin/form/action';
import { saveFlight } from '../lib/actions';

interface FormFlightProps {
    airplanes: Airplane[],

}

const FormFlight: FC<FormFlightProps> = ({ airplanes }) => {
    const initialState: ActionResult = {
        errorTitle: null,
        errorDesc: []
    }
    const [state, formAction] = useActionState(saveFlight, initialState);
    return (
        <form action={formAction} className='space-y-6'>

            {state?.errorTitle && <div className='my-7 bg-red-500/95 p-4 rounded-lg text-white'>
                <div className='text-lg font-bold'>{state.errorTitle}</div>
                <ul className='list-disc list-inside'>
                    {state.errorDesc?.map((error, index) => {
                        return <li key={index + error}>{error}</li>
                    })}
                </ul>
            </div>}

            <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                    <Label htmlFor='planeId'>Choose Airplane</Label>
                    <Select name='planeId'>
                        <SelectTrigger id='planeId' >
                            <SelectValue placeholder="Choose Airplane" />
                        </SelectTrigger>
                        <SelectContent>
                            {airplanes.map(airplane => {
                                return <SelectItem key={airplane.id} value={airplane.id}>{airplane.name}</SelectItem>
                            })}

                        </SelectContent>
                    </Select>

                </div>
                <div className='space-y-2'>
                    <Label htmlFor='price'>Price</Label>
                    <Input
                        id='price'
                        name='price'
                        type='number'
                        min={0}
                        placeholder='Flight Price...'
                        required
                    />
                    <span className='text-xs text-gray-900'>
                        Price for Bussines Class is increased by Rp. 500.000 and First Class is increased by Rp. 750.000
                    </span>
                </div>
            </div>
            <div className='grid grid-cols-3 gap-4'>
                <div className='space-y-2'>
                    <Label htmlFor='departureCity'>Departure City</Label>
                    <Input
                        id='departureCity'
                        name='departureCity'
                        type='text'
                        placeholder='Departure City...'
                        required
                    />
                </div>
                <div className='space-y-2'>
                    <Label htmlFor='departureCityCode'>City Code</Label>
                    <Input
                        id='departureCityCode'
                        name='departureCityCode'
                        type='text'
                        placeholder='Departure City Code...'
                        required
                    />
                </div>
                <div className='space-y-2'>
                    <Label htmlFor='departureDate'>Departure Date</Label>
                    <Input
                        id='departureDate'
                        name='departureDate'
                        type='datetime-local'
                        placeholder='Departure Date...'
                        className='block'
                        required
                    />
                </div>
            </div>
            <div className='grid grid-cols-3 gap-4'>
                <div className='space-y-2'>
                    <Label htmlFor='destinationCity'>Destination City</Label>
                    <Input
                        id='destinationCity'
                        name='destinationCity'
                        type='text'
                        placeholder='Destination City...'
                        required
                    />
                </div>
                <div className='space-y-2'>
                    <Label htmlFor='destinationCityCode'>City Code</Label>
                    <Input
                        id='destinationCityCode'
                        name='destinationCityCode'
                        type='text'
                        placeholder='Arrival City Code...'
                        required
                    />
                </div>
                <div className='space-y-2'>
                    <Label htmlFor='arrivalDate'>Arrival Date</Label>
                    <Input
                        id='arrivalDate'
                        name='arrivalDate'
                        type='datetime-local'
                        placeholder='Arrival Date...'
                        className='block'
                        required
                    />
                </div>
            </div>
            <SubmitFormButton />
        </form >
    )
}

export default FormFlight