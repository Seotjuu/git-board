'use client';

import DashboardContainer from "@/component/dashboard/DashboardContainer";
import DashboardWrapContent from "@/component/dashboard/DashboardWrapContent";
import RepositoryModal from "@/component/RepositoryModal";
import { dashboardContentData } from "@/constants/dashboardContentData";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
//: 최근 커밋 내역: 메시지 + 이름
// : 브랜치 현황
// : 이슈 목록
// : 머지 내역
// : 참여 멤버별 커밋 횟수 등등
// : 잔디밭 1년

const DashboardPage = () => {
    const searchParams = useSearchParams()

    const [contentData, setContentData] = useState<any[]>(dashboardContentData);

    useEffect(() => {
        // 선택한 Repository가 있을 경우
        if(searchParams.has("repo")) {
            const repo = searchParams.get("repo");
            
        }
    }, [])

    return (
        <>
            <RepositoryModal />
            <DashboardContainer>
                {
                    contentData && contentData.map((content, index_st) => (
                        <DashboardWrapContent key={index_st} className="animate-pulse">
                            <h1 className="flex items-center gap-5">{content.icon} {content.title}</h1>
                        </DashboardWrapContent>
                    ))
                }
            </DashboardContainer>
        </>
    )
}

export default DashboardPage;