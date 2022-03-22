import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export const AdminWrapper = ({ title, links, children }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-8 p-6">
      <h4 className="text-2xl font-semibold">{title}</h4>
      <div>
        <div className="flex gap-4 border-b-4 text-lg">
          {links.map((link, i) => (
            <Link href={link.link} key={i}>
              <a
                className={`  ${
                  router.pathname === link.link
                    ? "text-black underline decoration-cc decoration-4 underline-offset-8"
                    : "text-ccGreyLight hover:text-black"
                }`}
              >
                {link.label}
              </a>
            </Link>
          ))}
        </div>
        {children}
      </div>
    </div>
  );
};
