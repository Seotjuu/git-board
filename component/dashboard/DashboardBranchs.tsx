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

const DashboardBranchs = ({ repo }: IProps) => {
    const [branchList, setBranchList] = useState<any[] | null>(null)

    const getBranchList = async () => {
        try {
            await fetch(`/api/branch?repo=${repo.name}`).then((res) => {
                res.json().then((data) => {
                    setBranchList(data);
                    console.log(data);
                })
            })
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        repo && getBranchList();
    }, [repo])

    return (
        <div className="flex flex-col gap-1 py-1">
            {
                branchList === null ?
                    <LoadingContent />
                    : branchList!.length ? branchList!.map((branch, index_st) => (
                        <div key={index_st} className="flex justify-between gap-10 p-1 text-xs border rounded-lg border-gray-300 shadow-sm bg-gray-50">
                            {branch.name} 
                            <div className="flex gap-3">
                                <Link href={branch.commit.html_url} className="bg-gray-200 rounded-lg px-1 text-gray">
                                    {branch.commit.sha.slice(0,7)}
                                </Link> 
                                <span className="text-green-600 font-bold">+{branch.commit.stats.additions}</span>
                                <span className="text-red-500 font-bold">-{branch.commit.stats.deletions}</span>
                            </div>
                        </div>
                    )) : <div>커밋 내역이 없습니다.</div>
            }
        </div>
    )
}

export default DashboardBranchs;