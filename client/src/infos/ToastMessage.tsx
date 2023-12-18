import { toast } from "react-toastify";

export interface ToastProps {
  message: string;
  type: string;
}

export function ShowToast({ message, type }: ToastProps) {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "loading":
      toast.loading(message);
      break;
    default:
      toast.info(message);
      break;
  }
}
