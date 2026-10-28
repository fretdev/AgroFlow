"use server"
import { cookies } from "next/headers"

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080/api/v1/auth';

export  async function register(prevState: unknown ,formData: FormData){
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const phoneNumber = formData.get('phoneNumber') as string;
    const systemRole = formData.get('systemRole') as string;

    try{
        const response = await fetch(`${BACKEND_URL}/register`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({fullName,email,password,phoneNumber,systemRole})
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
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try{
        const response = await fetch(`${BACKEND_URL}/authenticate`,{
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({email,password})
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