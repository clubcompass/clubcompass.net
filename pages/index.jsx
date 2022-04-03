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
  return (
    <div>
      <h1>Homepage</h1>
      <button
        onClick={() => {
          addToast({
            type: "info",
            title: "Registration successful",
            message:
              "Before you can login, you need to confirm your email and be activated by ASB.",
            duration: 5000,
          });
        }}
      >
        Add toast
      </button>
    </div>
  );
}
