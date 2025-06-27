import React from "react";

type AlertProps = {
  type?: "success" | "error" | "info";
  message: string;
};

const color = {
  success: "bg-green-100 text-green-700 border-green-400",
  error: "bg-red-100 text-red-700 border-red-400",
  info: "bg-blue-100 text-blue-700 border-blue-400",
};

const Alert = ({ type = "info", message }: AlertProps) => (
  <div className={`border-l-4 p-4 mb-4 ${color[type]}`}>{message}</div>
);

export default Alert;
