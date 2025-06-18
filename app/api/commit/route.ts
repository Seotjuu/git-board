import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

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

    const codeRes = await Promise.all(
        data.map(async (commit: any) => {
            const commitRes = await fetch(`https://api.github.com/repos/${session?.user?.name}/${repo}/commits/${commit.sha}`, {
                headers: {
                    Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
                    Accept: 'application/vnd.github.v3+json',
                },
            });
            const commitData = await commitRes.json();
            
            return {
                sha: commitData.sha,
                html_url: commitData.html_url,
                author: commitData.commit.author,
                message: commitData.commit.message,
                stats: commitData.stats,
            };
        })
    )
    const fs = require('fs');
    const jsonPath = path.join(process.cwd(), 'commits.json');
    fs.writeFile(jsonPath, JSON.stringify(codeRes, null, 2), (err:any) => {
        if (err) {
            console.error('Error writing commits.json:', err);
        }
    });
    
    return NextResponse.json(codeRes, { status: res.status });
}