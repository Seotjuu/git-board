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
        component: "RecentCommits",
        icon: <FaHistory size={20} />,
    },
    {
        id: 2,
        title: "브랜치 현황",
        component: "BranchStatus",
        icon: <FaCodeBranch size={20} />,
    },
    {
        id: 3,
        title: "이슈 목록",
        component: "IssueList",
        icon: <FaExclamationTriangle size={20} />,
    },
    {
        id: 4,
        title: "머지 내역",
        component: "MergeHistory",
        icon: <FaCodeMerge size={20} />,
    },
    {
        id: 5,
        title: "참여 멤버별 커밋 횟수",
        component: "MemberCommitCount",
        icon: <FaUsers size={20} />,
    },
    {
        id: 6,
        title: "잔디밭 1년",
        component: "YearlyGrassPlot",
        icon: <FaSeedling size={20} />,
    }
]