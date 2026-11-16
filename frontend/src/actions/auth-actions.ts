"use server";
import { cookies } from "next/headers"
import { loginSchema, signUpSchema } from "../lib/validators/zodAuthValidator";


const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080/api/v1/auth';

type AuthActionResult = {
    success:boolean;
    error: string | null;
};
async function submitAuthRequest(endpoint: "/register" | "/authenticate",payload:Record<string,unknown>,fallbackError:string):Promise<AuthActionResult>{
    try{
        const response = await fetch(`${BACKEND_URL}${endpoint}`,{
            method:"POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(payload),
            signal: AbortSignal.timeout(10000)
        });
        const textResponse = await response.text();
        if(!response.ok){
            console.error(`Backend ${endpoint} failed ${response.status}:`,textResponse);
            return{
                success: false,
                error: formatBackendErrors(response.status,textResponse,fallbackError)
            };
        }
        const data = JSON.parse(textResponse);
        const token = data.token || data.accessToken;

        if(!token){
            console.error(`Token missing from ${endpoint} payload:`,data);
            return{
                success:false,
                error: "Something went wrong on our end while processing your request. Please try again shortly."
            };
        }
        const cookieStore = await cookies();
        cookieStore.set({
            name: "agroflow-token",
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "lax"
        });
        return{
            success: true,
            error: null
        }
    }catch(err){
        console.error(`Auth request error on ${endpoint}:`,err)
        const isTimeout = err instanceof Error && err.name === "TimeoutError";
        return{
            success: false,
            error: isTimeout ? "The request took too long. Please check your connection and try again.":"Our servers are temporarily unavailable. Please try again in a moment."
        }
    }
};
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
    return submitAuthRequest(
        "/register",
        validatedData.data,
        "Registration failed. Please check your details and try again");
}

export async function login(prevState: unknown, formData: FormData) {
    const rawData = {
        email: formData.get('email'),
        password: formData.get('password')
    };

    const validatedData = loginSchema.safeParse(rawData);
    if (!validatedData.success) {
        return {
            success: false,
            error: validatedData.error.issues[0].message
        };
    }

    return submitAuthRequest(
        "/authenticate",
        validatedData.data,
        "Sign in failed. Please check your details and try again."
    )
}

function formatBackendErrors(status:number,rawText:string,fallback:string){
    if(status === 401 || status === 403){
        return "Invalid email or password. Please check your credentials and try again.";
    }
    if(status >= 500){
        return "Our servers are temporarily unavailable. Please try again in a moment";
    }
    if(rawText){
        try{
            const parsed = JSON.parse(rawText);
            
            if (typeof parsed.errors === "object" && parsed.errors) {
                const firstFieldError = Object.values(parsed.errors).find((v) => typeof v === "string");
                if (typeof firstFieldError === "string") {
                 return firstFieldError;
                }   
            }
            if(typeof parsed.message === "string" && parsed.message.trim()){
                return parsed.message;
            }
        } catch {
            if (rawText.length < 120 && !rawText.includes("{")) {
                return rawText;
            }
        }
    } 

    return fallback;
}