'use client';

import { signOut, useSession } from "next-auth/react";
import { HiChartBar } from "react-icons/hi";

const layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const session = useSession();
    console.log(session);

    return (
        <div className="">
            <nav className="bg-gray-800 text-white p-4 flex items-center justify-between">
                <div className="text-xl flex items-center gap-2">
                    <HiChartBar size={30} />
                    <span>Git-Board</span>
                </div>

                <span className="cursor-pointer hover:underline"
                    onClick={() => signOut({
                        callbackUrl: "/",
                    })}
                >
                    Log Out
                </span>
            </nav>
            <div className="px-10 py-5">
                {children}
            </div>
        </div>
    );
};

export default layout;