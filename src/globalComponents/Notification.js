// src/utils/toastUtils.ts
import { toast, Bounce,Flip } from "react-toastify";

// ✅ Toast de succès
export const messageSucces = (message) => {
 
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    theme: "colored",
    transition: Flip,
    className: "toast-3d",
  });
};

// ❌ Toast d'erreur
export const messageErreur = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    theme: "colored",
    transition: Flip,
    className: "toast-3d",
  });
};

export const messageInfo = (message) => {
  toast.info(message, {
    position: "top-right",
    autoClose: 5000,
    theme: "colored",
    transition: Flip,
    className: "toast-3d",
  });
};

export const messageWarning = (message) => {
  toast.warning(message, {
    position: "top-right",
    autoClose: 5000,
    theme: "colored",
    transition: Flip,
    className: "toast-3d",
  });
};

export const messageSuppression = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    theme: "colored",
    transition: Flip,
    className: "toast-3d",
  });
};
