"use client"

import { Button } from '@/components/ui/button'
import { getUrlFile } from '@/lib/supabase'
import { Airplane } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { Pencil } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import DeleteAirplane from './deleteAirplane'

export const columns: ColumnDef<Airplane>[] = [
    {
        accessorKey: 'image',
        header: 'Image',
        cell: ({ row }) => {
            const plane = row.original;

            return (
                <Image draggable={false} src={getUrlFile(plane.image)} alt='Airplane Image' width={180} height={180} />
            )
        }
    },
    {
        accessorKey: 'code',
        header: 'Code'
    },
    {
        accessorKey: 'name',
        header: 'Name'
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const plane = row.original;
            return (
                <div className='inline-flex gap-5 items-center'>
                    <Button variant={'secondary'} size='sm' asChild>
                        <Link href={`/dashboard/airplanes/edit/${plane.id}`}>
                            <Pencil className='mr-2 w-4 h-4' />
                            Edit
                        </Link>
                    </Button>
                    <DeleteAirplane id={plane.id} />
                </div>
            )
        }
    },
]

