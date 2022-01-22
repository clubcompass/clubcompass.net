import Link from "next/link";

export const NavLogin = () => {
  const Button =
    "z-10 px-2 md:px-7 py-[.3rem] text-sm lg:text-md rounded-lg border-2 font-semibold border-cc items-center justify-center";
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
