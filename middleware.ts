import { NextRequest } from "next/server"
export { auth as middleware } from "@/auth"

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

export default function middleware(req: NextRequest) {
  let cookie = req.cookies.get("nextjs");
  console.log(cookie);
  const allCookies = req.cookies.getAll();
  console.log(allCookies);
}