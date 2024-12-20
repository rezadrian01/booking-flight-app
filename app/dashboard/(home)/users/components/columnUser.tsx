"use client";

import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";


export const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'name',
        header: "Name",

    },
    {
        accessorKey: 'email',
        header: 'Email'
    },
    {
        accessorKey: 'passport',
        header: "Passport"
    }
]