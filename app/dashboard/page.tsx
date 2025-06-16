"use client";

import DashboardCommit from "@/component/dashboard/DashboardCommit";
import DashboardContainer from "@/component/dashboard/DashboardContainer";
import DashboardWrapContent from "@/component/dashboard/DashboardWrapContent";
import {
  dashboardContentData,
  IReposData,
} from "@/constants/dashboardContentData";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
//: 최근 커밋 내역: 메시지 + 이름
// : 브랜치 현황
// : 이슈 목록
// : 머지 내역
// : 참여 멤버별 커밋 횟수 등등
// : 잔디밭 1년

const DashboardPage = () => {
  const { data } = useSession();
  const param = useSearchParams();
  const [repo, setRepo] = useState<IReposData | null>(null);
  const [contentData, setContentData] = useState<any[]>(dashboardContentData);

  useEffect(() => {
    // 선택한 Repository가 있을 경우
    const repoData = localStorage.getItem("repo");
    if (repoData) {
      setRepo(JSON.parse(repoData));
    } else {
      setRepo(null);
    }

    setContentData(
      dashboardContentData.map((content) => {
        return {
          ...content,
          content:
            content.component === "RecentCommits" ? (
              <DashboardCommit repo={repoData} />
            ) : (
              ""
            ),
        };
      })
    );
  }, [param]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContainer repo={repo} data={data}>
        {contentData.map((content, index_st) => (
          <DashboardWrapContent key={index_st}>
            <h1 className="flex items-center gap-5">
              {content.icon} {content.title}
            </h1>
            <div className="h-[300px] overflow-y-auto">
              {content.component === "RecentCommits" ? (
                <DashboardCommit repo={repo} />
              ) : null}
            </div>
          </DashboardWrapContent>
        ))}
      </DashboardContainer>
    </Suspense>
  );
};

export default DashboardPage;
