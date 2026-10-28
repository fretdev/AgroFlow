import { NextRequest } from "next/server";
import { handleAuthRouting } from "./lib/auth-guard";

export async function proxy(request: NextRequest){
 return await handleAuthRouting(request);
}

export const config = {
  matcher: ['/dashboard/:path*']
}