import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const getJwtSecretKey = ()=>{
  const secret = process.env.JWT_SECRET_KEY;
  if(!secret){
    throw new Error("JWT SECRET KEY is not present in the environment variable");
  }
  return new TextEncoder().encode(secret);
}

const getUserWorkspace = (role:string):string=>{
  switch(role){
    case 'FARMER': return '/dashboard/farmer';
    case 'TRADER': return '/dashboard/trader';
    case 'TRANSPORTER': return '/dashboard/transporter';
    case 'MARKETER': return '/dashboard/marketer';
    case 'ADMIN': return '/dashboard/admin';
    default: return '/auth/login';
  }
}

export  async function handleAuthRouting(request:NextRequest){
  const requestCookie = request.cookies.get('agroflow-token');
  const token = requestCookie?.value;
  const currentPath = request.nextUrl.pathname;

  if(!token){
    return NextResponse.redirect(new URL('/auth/login',request.url));
  }
  try{
    const { payload } = await jwtVerify(token,getJwtSecretKey());
    const role = payload.role as string;

    const userWorkspace = getUserWorkspace(role);

    if(currentPath == "/dashboard" || currentPath == '/dashboard/'){
      return NextResponse.redirect(new URL(userWorkspace,request.url));
    }

    if(currentPath.startsWith('/dashboard/admin') && role != 'ADMIN'){
      return NextResponse.redirect(new URL(userWorkspace,request.url));
    }
    if(currentPath.startsWith('/dashboard/farmer') && role != 'FARMER'){
      return NextResponse.redirect(new URL(userWorkspace,request.url));
    }
    if(currentPath.startsWith('/dashboard/trader') && role != 'TRADER'){
      return NextResponse.redirect(new URL(userWorkspace,request.url));
    }
    if(currentPath.startsWith('/dashboard/transporter') && role != 'TRANSPORTER'){
      return NextResponse.redirect(new URL(userWorkspace,request.url));
    }
    if(currentPath.startsWith('/dashboard/marketer') && role != 'MARKETER'){
      return NextResponse.redirect(new URL(userWorkspace,request.url));
    }
    return NextResponse.next();
  }catch(err){
    console.log("JWT Verification failed at proxy boundary:",err)
    const response = NextResponse.redirect(new URL('/auth/login',request.url));
    response.cookies.delete('agroflow-token');
    return response;
  }
}