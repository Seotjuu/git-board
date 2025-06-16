"use client";

import { useSession } from "next-auth/react";
import DashboardContainer from "./DashboardContainer";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  IReposData,
  dashboardContentData,
} from "@/constants/dashboardContentData";
import DashboardCommit from "./DashboardCommit";

const DashboardWrapContent = () => {
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
    <DashboardContainer repo={repo} data={data}>
      {contentData.map((content, index_st) => (
        <div
          key={index_st}
          className={`w-full border border-gray-300 rounded-lg p-5 `}
        >
          <h1 className="flex items-center gap-5">
            {content.icon} {content.title}
          </h1>
          <div className="h-[300px] overflow-y-auto">
            {content.component === "RecentCommits" ? (
              <DashboardCommit repo={repo} />
            ) : null}
          </div>
        </div>
      ))}
    </DashboardContainer>
  );
};

export default DashboardWrapContent;
