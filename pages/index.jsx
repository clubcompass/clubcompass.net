import React, { useEffect, useMemo } from "react";
import { useToastContext } from "../context";
export default function Home() {
  const { addToast } = useToastContext();

  const toast = {
    type: "error",
    duration: null,
  };
  return (
    <div>
      <h1>Homepage</h1>
      <button
        onClick={() => {
          addToast(toast);
        }}
      >
        Add toast
      </button>
    </div>
  );
}
