import { NextRequest } from "next/server"

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

export default function middleware(req: NextRequest) {
    let cookie = req.cookies
    console.log(cookie);
}

