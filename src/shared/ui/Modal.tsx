import { Plus, X } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Button from "./button/Button";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  buttonText?: string;
  widthClass?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
  buttonSize?: "xs" | "sm" | "md" | "lg" | "xl";
}
const modalSizes = {
  xs: "md:max-w-xs",
  sm: "md:max-w-sm",
  md: "md:max-w-lg",
  lg: "md:max-w-2xl",
  xl: "md:max-w-4xl",
  "2xl": "md:max-w-6xl",
  full: "md:max-w-[95vw]",
};

const Modal = ({
  open,
  onClose,
  title,
  children,
  footer,
  buttonText,
  widthClass = "",
  size = "lg",
  buttonSize = "lg",
}: Props) => {
  const modalSize = modalSizes[size];

  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);
  return (
    <>
      {buttonText && (
        <Button onClick={onClose} size={buttonSize}>
          <Plus size={16} /> {buttonText}
        </Button>
      )}
      {open &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-end md:items-center justify-start md:justify-center md:p-4">
            <div className="absolute inset-0 bg-ink-950/50" onClick={onClose} />
            <div
              className={`relative w-full ${widthClass} ${modalSize} max-h-[90vh] md:rounded-2xl overflow-hidden bg-white shadow-panel`}
            >
              <div className="h-15.75 sticky top-0 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4">
                <h3 className="text-base font-bold text-ink-900">{title}</h3>
                <Button onClick={onClose} variant="close">
                  <X size={18} />
                </Button>
              </div>
              <div className="p-5 max-h-[calc(90dvh-126px)] overflow-y-auto">
                {children}
              </div>
              <div className="px-5 h-15.75 flex items-center w-full! border-t border-slate-100 bg-white ">
                {footer}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};
export default Modal;
