import React from "react";

interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor?: (item: T, index: number) => string | number;
  onItemClick?: (item: T) => void;
  className?: string;
  itemClassName?: string;
  emptyContent?: React.ReactNode;
  gap?: "xs" | "sm" | "md" | "lg" | "none";
  divided?: boolean;
}

const List = <T,>({
  items,
  renderItem,
  keyExtractor,
  onItemClick,
  className = "",
  itemClassName = "",
  emptyContent = (
    <p className="text-slate-500 py-4 text-center">No data available.</p>
  ),
  gap = "none",
  divided = false,
}: ListProps<T>) => {
  if (!items || items.length === 0) return <>{emptyContent}</>;

  const gapClasses = {
    none: "gap-0",
    xs: "gap-1",
    sm: "gap-1.5",
    md: "gap-2",
    lg: "gap-4",
  };

  return (
    <ul className={`flex flex-col ${gapClasses[gap]} ${className}`}>
      {items.map((item, index) => {
        const key = keyExtractor ? keyExtractor(item, index) : index;

        return (
          <li
            key={key}
            onClick={() => onItemClick?.(item)}
            className={`
              list-none transition-all duration-200
              ${onItemClick ? "cursor-pointer hover:bg-white/5 active:scale-[0.98]" : ""}
              ${divided && index !== items.length - 1 ? "border-b border-white/10" : ""}
              ${itemClassName}
            `}
          >
            {renderItem(item, index)}
          </li>
        );
      })}
    </ul>
  );
};

export default List;
