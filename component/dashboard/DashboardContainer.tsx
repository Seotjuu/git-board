import { IReposData } from "@/constants/dashboardContentData";
import Link from "next/link";
import RepositoryModal from "../RepositoryModal";
import { Session } from "next-auth";

interface IProps {
    children: React.ReactNode;
    repo: IReposData | null;
    data: Session | null
}

const DashboardContainer = ({ children, repo, data }: IProps) => {
    return (
        <>
            <div className="flex items-center py-5 gap-2">
                {
                    data === undefined ?
                        <div className="size-7 bg-gray-200 rounded-full animate-pulse"></div>
                        :
                        <Link href={`https://github.com/${repo?.full_name}`}>
                            {data?.user?.image && <img src={data.user.image} className="size-7 rounded-full hover:shadow-lg" />}
                        </Link>
                }
                {
                    repo === null ?
                        <div className="h-7 w-20 bg-gray-200 rounded-xl animate-pulse"></div>
                        :
                        <h1 className="text-xl font-bold">{repo.name}</h1>
                }

                <div className={`h-7 border border-gray-400 rounded-full py-1 px-2 text-xs ${repo?.visibility ? "" : "bg-gray-200 w-12 border-0 animate-pulse"}`}>{repo?.visibility}</div>
                <RepositoryModal />
            </div>
            <div className="grid grid-cols-3 gap-5">
                {children}
            </div>
        </>
    );
}
export default DashboardContainer;