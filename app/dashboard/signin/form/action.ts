"use server";

import { redirect } from "next/navigation";
import { formSchema } from "./validation";
import prisma from "@/lib/prisma";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
const bcrypt = require('bcrypt');

export interface ActionResult {
    errorTitle: string | null
    errorDesc: string[] | null
}

export async function handleSignin(prevState: any, formData: FormData): Promise<ActionResult> {
    console.log(formData.get('email'));

    const values = formSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password')
    });

    if (!values.success) {
        const errorDesc = values.error.issues.map(issue => issue.message);
        return {
            errorTitle: "Error Validation",
            errorDesc
        }
    }

    const existingUser = await prisma.user.findFirst({
        where: {
            email: values.data.email
        }
    })
    if (!existingUser) {
        return {
            errorTitle: "User Not Found",
            errorDesc: ["Account with that email is not found"]
        }
    }

    const validPassword = await bcrypt.compare(values.data.password, existingUser.password);
    if (!validPassword) {
        return {
            errorTitle: "Wrong Password",
            errorDesc: ["Wrong password for this account"]
        }
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = await lucia.createSessionCookie(session.id);
    const nextCookies = await cookies();
    nextCookies.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    );

    return redirect('/dashboard');
}