interface IProps {
    children: React.ReactNode;
}

const DashboardContainer = ({ children }: IProps) => {
    return (
        <div className="grid grid-cols-3 gap-5">
            {children}
        </div>
    );
}
export default DashboardContainer;