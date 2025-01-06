"use client";

import { Link as RadixLink } from "@radix-ui/themes";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  const links = [
    { href: "/", text: "KOL Analysis" },
    { href: "/ai-analysis", text: "AI Analysis" },
    { href: "/kol-tweets", text: "KOL Tweets" },
    { href: "/kol-list", text: "KOL List" },
    { href: "/holders", text: "Pump Holders" },
  ];

  return (
    <div className="flex flex-col gap-2 h-screen sticky top-0 py-10 pl-4 pr-2 text-l text-nowrap">
      {links.map(({ href, text }) => (
        <RadixLink
          key={href}
          className={`!block py-2 px-4 hover:bg-gray-800 rounded-md cursor-pointer ${
            (href === "/" ? pathname === href : pathname.startsWith(href))
              ? "bg-gray-800"
              : ""
          }`}
          weight="medium"
          color="gray"
          href={href}
        >
          {text}
        </RadixLink>
      ))}
    </div>
  );
}
