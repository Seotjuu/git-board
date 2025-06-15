
interface IProps {
  children: React.ReactNode;
  className?: string;
}

const DashboardWrapContent = ({ children, className }: IProps) => {
  return (
    <div className={`w-full border border-gray-300 rounded-lg p-5 ${className}`}>
      {children}
    </div>
  );
}

export default DashboardWrapContent;