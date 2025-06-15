import DashboardCommit from "@/component/dashboard/DashboardCommit";
import { FaCodeBranch, FaExclamationTriangle, FaHistory, FaSeedling, FaUsers } from "react-icons/fa";
import { FaCodeMerge } from "react-icons/fa6";

export interface IReposData {
    name: string;
    user_name: string;
    full_name: string;
    visibility: string;
}

export const dashboardContentData = [
    {
        id: 1,
        title: "최근 커밋 내역",
        description: "최근 커밋 내역을 확인할 수 있습니다.",
        component: "RecentCommits",
        icon: <FaHistory size={20} />,
        isActive: true
    },
    {
        id: 2,
        title: "브랜치 현황",
        description: "현재 브랜치의 상태를 확인할 수 있습니다.",
        component: "BranchStatus",
        icon: <FaCodeBranch size={20} />,
        isActive: false
    },
    {
        id: 3,
        title: "이슈 목록",
        description: "프로젝트의 이슈 목록을 확인할 수 있습니다.",
        component: "IssueList",
        icon: <FaExclamationTriangle size={20} />,
        isActive: false
    },
    {
        id: 4,
        title: "머지 내역",
        description: "최근 머지된 내역을 확인할 수 있습니다.",
        component: "MergeHistory",
        icon: <FaCodeMerge size={20} />,
        isActive: false
    },
    {
        id: 5,
        title: "참여 멤버별 커밋 횟수",
        description: "각 멤버의 커밋 횟수를 확인할 수 있습니다.",
        component: "MemberCommitCount",
        icon: <FaUsers size={20} />,
        isActive: false
    },
    {
        id: 6,
        title: "잔디밭 1년",
        description: "지난 1년간의 잔디밭 현황을 확인할 수 있습니다.",
        component: "YearlyGrassPlot",
        icon: <FaSeedling size={20} />,
        isActive: false
    }
]