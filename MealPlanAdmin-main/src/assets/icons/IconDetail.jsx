import React from "react";

const IconDetail = () => {
  return (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth={2}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="12px"
      width="12px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx={11} cy={11} r={8} />
      <line x1={21} y1={21} x2="16.65" y2="16.65" />
      <line x1={11} y1={8} x2={11} y2={14} />
      <line x1={8} y1={11} x2={14} y2={11} />
    </svg>
  );
};

export default IconDetail;
