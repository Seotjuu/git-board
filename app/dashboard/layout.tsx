'use client';

import CommitPdfDownloadButton from "@/component/CommitPdfDownloadButton";
import { signOut, useSession } from "next-auth/react";
import { BsGithub } from "react-icons/bs";
import { HiChartBar } from "react-icons/hi";

const layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const { data } = useSession();
    return (
        <>
            <nav className="bg-gray-800 text-white p-4 flex items-center justify-between">
                <div className="text-xl flex items-center gap-2">
                    <HiChartBar size={30} />
                    <span>Git-Board</span>
                </div>

                <div className="flex items-center gap-5">
                    <div className="flex items-center gap-2">
                        {
                            data?.user?.image ?
                                <img src={data?.user?.image || ""} width={20} height={20} className="border rounded-full " />
                                :
                                <BsGithub size={20} className="text-gray-200" />
                        }

                        <span className="text-sm">
                            {data?.user?.name || "Guest"}
                        </span>
                    </div>

                    <span className="cursor-pointer hover:underline"
                        onClick={() => {
                            signOut({
                                callbackUrl: "/",
                            });
                            localStorage.removeItem("repo");
                        }
                        }
                    >
                        Log Out
                    </span>

                </div>
            </nav>
            <div className="px-10">
                {children}
            </div>
            <CommitPdfDownloadButton />
        </>
    );
};

export default layout;