"use client";

import { useQuery } from "@tanstack/react-query";

const fetchDate = async (): Promise<{
  kols: {
    screen_name: string;
  }[];
}> => {
  const res = await fetch(
    "https://api.xdog.pro/kol/super_kol?level=3day&min_rate=0.5&min_tweet_count=5"
  );
  return res.json();
};

export default function KolList() {
  const { data } = useQuery({
    queryKey: ["kol-list"],
    queryFn: fetchDate,
  });



  return (
    <div className="px-20 py-10 flex flex-col items-start">
      {data?.kols.map((kol) => (
        <div key={kol.screen_name}>{kol.screen_name}</div>
      ))}
    </div>
  );
}
