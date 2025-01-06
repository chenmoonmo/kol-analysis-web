"use client";

import { Link } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";

const fetchData = async (): Promise<string[]> => {
  const data = await fetch("https://api.xdog.pro/kol/mints_by_pump_hold").then(
    (res) => res.json()
  );
  return data.data;
};

export default function Holder() {
  const { data } = useQuery({
    queryKey: ["pump-mints"],
    queryFn: fetchData,
  });

  return (
    <div className="p-20 flex flex-col items-start">
      <div className="mt-3 flex flex-wrap gap-4 w-full">
        {data?.map((item, index) => (
          <Link key={index} href={`/holders/${item}`}>
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
}
