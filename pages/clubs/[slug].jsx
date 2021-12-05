import { useRouter } from "next/router";

const Club = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div>
      <p>Club: {slug}</p>
    </div>
  );
};

export default Club;
