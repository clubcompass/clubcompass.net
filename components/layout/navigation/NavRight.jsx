import Link from "next/link";

export const NavRight = () => {
  const Button =
    "px-7 py-[.3rem] rounded-lg border-2 font-semibold border-cc items-center justify-center";
  return (
    <div className="flex gap-4 items-center">
      <Link href="/login">
        <a className={`${Button} hover:bg-[#EAF0FF] text-cc`}>Log in</a>
      </Link>
      <Link href="/register">
        <a
          className={`${Button} bg-cc hover:bg-ccDark hover:border-ccDark text-white`}
        >
          Register
        </a>
      </Link>
    </div>
  );
};
