import React from "react";
import { useState } from "react/cjs/react.development";
import { ToolTip } from "./ToolTip";

export const CopyText = ({ copyText }) => {
  const [isCopied, setIsCopied] = useState(false);

  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  const handleCopyClick = () => {
    copyTextToClipboard(copyText).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    });
  };

  return (
    <div>
      <ToolTip content={isCopied ? "Copied!" : "Copy"}>
        <button onClick={handleCopyClick}>
          <span>{copyText}</span>
        </button>
      </ToolTip>
    </div>
  );
};
