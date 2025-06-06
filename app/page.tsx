import { HiChartBar } from "react-icons/hi";

import GithubOauth from "@/component/GIthubOauth";

const page = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border-2 border-gray-200 rounded px-20 py-10 shadow-lg flex flex-col gap-10 justify-center items-center">
        <div className="flex flex-col items-center gap-2">
          <div className="border border-gray-100   rounded-full shadow-lg p-3">
            <HiChartBar size={50} />
          </div>
          <h1 className="text-2xl font-bold">Git Board</h1>
          <span className="text-sm">Welcome to Git board !</span>
        </div>

        <GithubOauth />
      </div>
    </div>
  )
}

export default page;