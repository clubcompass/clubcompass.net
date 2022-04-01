import React, { useEffect, useMemo } from "react";
import { useToastContext } from "../context";

// export const getServerSideProps = async ({ req, res }) => {
//   console.log(req.cookies.token);
//   console.log(req.cookies);

//   return {
//     props: {
//       cookies: req.cookies,
//     },
//   };
// };

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
