import { cookies } from "next/headers";

export async function POST(requset: Request) {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("next-auth.session-token");

    if (!cookie) {
        return new Response("Unauthorized", { status: 401 });
    }

    const res = await fetch("https://api.github.com/user", {
        headers: {
            "Authorization": `Bearer ${cookie.value}`,
        },
    });

    if (!res.ok) {
        return new Response("Failed to fetch user data", { status: 500 });
    }

    const userData = await res.json();
    return new Response(JSON.stringify(userData), {
        headers: { "Content-Type": "application/json" },
    });
}