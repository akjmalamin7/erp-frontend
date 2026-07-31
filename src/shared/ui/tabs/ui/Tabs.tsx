import React from "react";
import Button from "../../button/Button";

interface TabOption<T extends string> {
  key: T;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps<T extends string> {
  tabs: TabOption<T>[];
  activeTab: T;
  onChange: (key: T) => void;
  className?: string;
}

const Tabs = <T extends string>({
  tabs,
  activeTab,
  onChange,
  className = "",
}: TabsProps<T>) => {
  return (
    <div
      className={`flex gap-1 rounded-xl bg-white/5 p-1 w-fit border border-white/5 ${className}`}
    >
      {tabs.map((t) => {
        const isActive = activeTab === t.key;
        return (
          <Button
            key={t.key}
            onClick={() => onChange(t.key)}
            className={`
              flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200
              ${
                isActive
                  ? "bg-white text-ink-950 shadow-md scale-[1.02]"
                  : "text-slate-400 bg-transparent"
              }
            `}
          >
            {t.icon && <span>{t.icon}</span>}
            {t.label}
          </Button>
        );
      })}
    </div>
  );
};

export default Tabs;
