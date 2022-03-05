import React, { useState } from "react";
import { ToolTip } from "./ToolTip";

export const CopyText = ({ children, tooltip }) => {
  const [isCopied, setIsCopied] = useState(false);

  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  const handleCopyClick = () => {
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
