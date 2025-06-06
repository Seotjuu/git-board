import { HiChartBar } from "react-icons/hi";

const layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className="">
            <nav className="bg-gray-800 text-white p-4 flex items-center gap-2 text-xl">
                <HiChartBar size={30} />
                <span>Git-Board</span>

            </nav>
            <div className="px-10 py-5">
                {children}
            </div>
        </div>
    );
};

export default layout;