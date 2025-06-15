"use client";

import { useEffect, useState } from "react";

interface IProps {
    repo: string | null;
}

const DashboardCommit = ({ repo }: IProps) => {
    const [commitList, setCommitList] = useState<any[]>([])
    const repoData = repo ? JSON.parse(repo) : null;

    const getCommitList = async () => {
        try {
            await fetch(`/api/commit?repo=${repoData?.name}`).then((res) => {
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
        getCommitList();
    }, [repo])

    return (
        <div>
            {
                commitList.length ? commitList.map((commit, index_st) => (
                    <div key={index_st}>
                        {commit.commit.message}
                    </div>
                )) : <div>커밋 내역이 없습니다.</div>
            }
        </div>
    )
}

export default DashboardCommit;