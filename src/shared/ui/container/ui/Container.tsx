import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "full";
  className?: string;
}

const Container = ({
  children,
  size = "xl",
  className = "",
}: ContainerProps) => {
  const sizeClasses = {
    xs: "max-w-[480px]",
    sm: "max-w-screen-sm", // 640px
    md: "max-w-screen-md", // 768px
    lg: "max-w-screen-lg", // 1024px
    xl: "max-w-screen-xl", // 1280px
    xxl: "max-w-screen-2xl", // 1536px
    full: "max-w-full", // 100%
  };

  return (
    <div
      className={`mx-auto w-full px-x sm:px-3 lg:px-5 ${sizeClasses[size]} ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
