
interface IProps {
    children: React.ReactNode;
    className?: string;
}

const DashboardWrapContent = ({ children, className }: IProps) => {
  return (
    <div className={`w-full border rounded-lg p-5 ${className}`}>
        {children}
    </div>
  );
}

export default DashboardWrapContent;