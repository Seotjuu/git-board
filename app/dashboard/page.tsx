import DashboardWrapContent from "@/component/dashboard/DashboardWrapContent";
import { Suspense } from "react";
//: 최근 커밋 내역: 메시지 + 이름
// : 브랜치 현황
// : 이슈 목록
// : 머지 내역
// : 참여 멤버별 커밋 횟수 등등
// : 잔디밭 1년

const DashboardPage = () => {
  return (
    <Suspense>
      <DashboardWrapContent />
    </Suspense>
  );
};

export default DashboardPage;
