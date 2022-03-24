import React, { useEffect, useMemo } from "react";
import { useToastContext } from "../context";
export default function Home() {
  const { addToast } = useToastContext();

  // const toast = {
  //   id: 1,
  //   title: "Error",
  //   body: "This is a toast message",
  // };

  const toast = {
    title: "Internal Server Error",
    message: "An error has occurred in the application please open a ticket.",
    options: {
      type: "error",
      duration: null,
    },
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
