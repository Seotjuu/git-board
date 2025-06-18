'use client';

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { BsGithub } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { HiChartBar } from "react-icons/hi";

const layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const [loading, setLoading] = useState(false)
    const [url, setUrl] = useState("")
    const { data } = useSession();

    const downloadPDF = async () => {
        const res = await fetch('/api/report');
        const blob = await res.blob();
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Status of commit data by date.pdf';
        a.click();
        setUrl(url)
    };

    useEffect(() => {
        if(url) {
            setLoading(false)
            setUrl("")
        }
    }, [loading, url]);

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

                <button className="absolute bottom-5 right-5 rounded-full shadow-xl p-2 text-white bg-blue-500 hover:bg-blue-800 cursor-pointer"
                    onClick={() => {
                        downloadPDF();
                        setLoading(true);
                    }}
                >
                    PDF
                </button>
            </div>

            
                    
            {loading ?
                <>
                    <div className="absolute top-0 w-screen h-screen opacity-25 bg-black flex items-center justify-center"></div>
                    <div className="absolute w-screen h-screen top-0 flex flex-col items-center gap-2">
                        
                        <div className="font-bold h-screen flex flex-col items-center justify-center gap-5 text-white">
                            PDF 다운로드 중...
                            <CgSpinner size={50} className=" animate-spin" />
                        </div>
                    </div>
                </>
            :
                null
            }
        </>
    );
};

export default layout;