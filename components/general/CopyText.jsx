import React, { useState } from "react";
import { ToolTip } from "./ToolTip";

export const CopyText = ({ children, tooltip }) => {
  const [isCopied, setIsCopied] = useState(false);

  // copyTextToClipboard should take param as text not children, and should be function not react component
  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  const handleCopyClick = () => {
    // use useEffect to setIsCopied to false; (Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function at CopyText)
    copyTextToClipboard(children).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    });
  };

  return (
    <div>
      <button
        onClick={handleCopyClick}
        className="flex items-center font-semibold w-full break-all text-left"
      >
        {tooltip ? (
          <ToolTip content={isCopied ? "Copied!" : "Copy"}>{children}</ToolTip>
        ) : (
          <>{children}</>
        )}
      </button>
    </div>
  );
};
