import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const session = await auth();

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const repo = request.nextUrl.searchParams.get('repo');

    const res = await fetch(`https://api.github.com/repos/${session?.user?.name}/${repo}/commits`, {
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
            Accept: 'application/vnd.github.v3+json',
        },
        next: { revalidate: 60 }, // Cache for 60 seconds
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
}