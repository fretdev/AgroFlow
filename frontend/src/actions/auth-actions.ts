"use server"
import { cookies } from "next/headers"
import { loginSchema, signUpSchema } from "../lib/validators/zodAuthValidator";
import { success } from "zod";


const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080/api/v1/auth';

export  async function register(prevState: unknown ,formData: FormData){
    const rawData = {
        fullName:formData.get('fullName'),
        email:formData.get('email'),
        password:formData.get('password'),
        phoneNumber:formData.get('phoneNumber'),
        systemRole:formData.get('systemRole')
    }
    const validatedData = signUpSchema.safeParse(rawData);
    if(!validatedData.success){
        return{
            success:false,
            error:validatedData.error.issues[0].message
        }
    }
    try{
        const response = await fetch(`${BACKEND_URL}/register`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(validatedData.data)
        });
        if(!response.ok){
            const errorText = await response.text();
            return {success:false,error:errorText || "Registration Failed"};
        }

        const data = await response.json();
        const cookiesStore = await cookies();

        cookiesStore.set({
            name:'agroflow-token',
            value:data.token,
            httpOnly: true,
            secure:process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
            sameSite: 'strict'
        });
        return{
            success:true,
            error:null
        }
    }catch(err){
        console.error("Registration endpoint crash:", err);
        return{
            success:false,
            error:"Network error or backend is unreachable"
        }
    }
}

export async function login(prevState:unknown,formData:FormData){
    const rawData = {
        email:formData.get('email'),
        password:formData.get('password')
    }
    const validatedData = loginSchema.safeParse(rawData);
    if(!validatedData.success){
        return{
            success:false,
            error:validatedData.error.issues[0].message
        }
    }
    try{
        const response = await fetch(`${BACKEND_URL}/authenticate`,{
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(validatedData.data)
        });
        if(!response.ok){
            const errorText = await response.text();
            return{
                success:false,error: errorText || "Authentication Failed"
            }
        }
        const data = await response.json();
        const cookiesStore = await cookies();

        cookiesStore.set({
            name: "agroflow-token",
            value:data.token,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
            sameSite: 'strict'
        })
        return{
            success: true,
            error: null
        }
    }catch(err){
        console.log("Authentication Failed",err);
        return{
            success: false,
            error: "Network error or backend is unreachable"
        }
    }

}