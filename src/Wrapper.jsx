import React from "react";

export const Wrapper = ({ children, className }) => {
  return <div className={`w-full max-w-screen-xl mx-auto ${className}`}>{children}</div>;
};
