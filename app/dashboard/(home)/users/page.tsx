import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/dataTable'
import { Plus } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
import React, { FC } from 'react'
import { columns } from './components/columnUser'
import { getCustomers } from './lib/data'

export const metadata: Metadata = {
    title: "Dashboard | Users"
}

const UserPage: FC = async () => {
    const users = await getCustomers();

    return (
        <>
            <div className='flex flex-row items-center justify-between'>
                <div className='my-5 text-2xl font-bold'>Users</div>
                <Button asChild>
                    <Link href='/dashboard/flights/create'>
                        <Plus className='mr-2 h-4 w-4' />
                        Add
                    </Link>
                </Button>
            </div>
            <DataTable columns={columns} data={users} />
        </>
    )
}

export default UserPage