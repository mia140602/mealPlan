import React from "react";

const IconThisMonth = () => {
  return (
    <svg
      stroke="#fff"
      fill="none"
      strokeWidth={2}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="2em"
      width="2em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx={9} cy={21} r={1} />
      <circle cx={20} cy={21} r={1} />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
};

export default IconThisMonth;
