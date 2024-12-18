import Swal from "sweetalert2";

export const successAlert = (title, text) => {
  Swal.fire({
    icon: "success",
    title: title,
    text: text,
  });
};

export const errorAlert = (title, text) => {
  Swal.fire({
    icon: "error",
    title: title,
    text: text,
  });
};
export const warningAlert = (title, text) => {
  Swal.fire({
    icon: "warning",
    title: title,
    text: text,
  });
};

export const infoAlert = (title, text) => {
  Swal.fire({
    icon: "info",
    title: title,
    text: text,
  });
};

export const questionAlert = (title, text) => {
  Swal.fire({
    icon: "question",
    title: title,
    text: text,
  });
};

export const confirmAlert = (title, text, confirmButtonText, cancelButtonText) => {
  return Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText,
  });
};