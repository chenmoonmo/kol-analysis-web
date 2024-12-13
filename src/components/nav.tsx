"use client";

import { Link as RadixLink } from "@radix-ui/themes";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-2 h-screen sticky top-0 py-10 pl-4 pr-2 text-l text-nowrap">
      <RadixLink
        className={`!block py-2 px-4 hover:bg-gray-800 rounded-md cursor-pointer ${
          pathname === "/" ? "bg-gray-800" : ""
        }`}
        weight="medium"
        color="gray"
        href="/"
      >
        KOL Analysis
      </RadixLink>
      <RadixLink
        className={`!block py-2 px-4 hover:bg-gray-800 rounded-md cursor-pointer ${
          pathname === "/ai-analysis" ? "bg-gray-800" : ""
        }`}
        weight="medium"
        color="gray"
        href="/ai-analysis"
      >
        AI Analysis
      </RadixLink>
      <RadixLink
        className={`!block py-2 px-4 hover:bg-gray-800 rounded-md cursor-pointer ${
          pathname === "/kol-tweets" ? "bg-gray-800" : ""
        }`}
        weight="medium"
        color="gray"
        href="/kol-tweets"
      >
        KOL Tweets
      </RadixLink>

      <RadixLink
        className={`!block py-2 px-4 hover:bg-gray-800 rounded-md cursor-pointer ${
          pathname === "/kol-list" ? "bg-gray-800" : ""
        }`}
        weight="medium"
        color="gray"
        href="/kol-list"
      >
        KOL List
      </RadixLink>
    </div>
  );
}
