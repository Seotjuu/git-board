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
                <Link href={`https://github.com/${repo?.full_name}`}>
                    <img src={data?.user?.image || ''} width={30} className="rounded-full hover:shadow-lg" />
                </Link>
                <h1 className="text-xl font-bold">{repo?.name || "null"}</h1>
                <div className=" border rounded-full p-1 text-xs">{repo?.visibility}</div>
                <RepositoryModal />
            </div>
            <div className="grid grid-cols-3 gap-5">
                {children}
            </div>
        </>
    );
}
export default DashboardContainer;