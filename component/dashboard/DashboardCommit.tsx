"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface IProps {
    repo: any | null;
}

// TODO: Data Loading 
const LoadingContent = () => {
    return (
        <div className="flex flex-col animate-pulse space-x-4 relative">
            <div className="flex-1 space-y-1 py-1">
                {
                    Array(10).fill(true).map((_, i) => (
                        <div key={i} className="grid grid-cols-4 gap-2">
                            <div className="col-span-3 h-6 rounded bg-gray-200"></div>
                            <div className="col-span-1 h-6 rounded bg-gray-200"></div>
                        </div>
                    ))
                }
            </div>
            <div className="absolute top-0 w-full h-full bg-gradient-to-b from-transparent to-white">
            </div>
        </div>
    )
}

const DashboardCommit = ({ repo }: IProps) => {
    const [commitList, setCommitList] = useState<any[] | null>(null)

    const getCommitList = async () => {
        try {
            await fetch(`/api/commit?repo=${repo.name}`).then((res) => {
                res.json().then((data) => {
                    setCommitList(data);
                })
            })
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        repo && getCommitList();
    }, [repo])

    return (
        <div className="flex flex-col gap-1 py-1">
            {
                commitList === null ?
                    <LoadingContent />
                    : commitList!.length ? commitList!.map((commit, index_st) => (
                        <div key={index_st} className="flex justify-between gap-10 p-1 text-xs border rounded-lg border-gray-300 shadow-sm bg-gray-50">
                            <div className="flex gap-2">
                                <span className="font-bold">{commit.author?.name}</span>

                                {commit.message}
                                <Link href={commit.html_url} className="bg-gray-200 rounded-lg px-1 text-gray">
                                    {commit.sha.slice(0,7)}
                                </Link>
                                <span className="text-green-600 font-bold">+{commit.stats.additions}</span>
                                <span className="text-red-500 font-bold">-{commit.stats.deletions}</span>
                            </div>
                             
                            
                             
                            <span className="text-gray-500">{new Date(commit.author?.date).toLocaleDateString()}</span>
                        </div>
                    )) : <div>커밋 내역이 없습니다.</div>
            }
        </div>
    )
}

export default DashboardCommit;