import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Club = () => {
  const router = useRouter();
  const { club } = router.query;

  return (
    <div>
      <h1>{club}</h1>
    </div>
  );
};

export default Club;
