"use client";

import { TweetCard } from "@/components";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button, TextField, Link } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";

const fetchSpeAnalyse = async (): Promise<{
  address: string[];
  at: string[];
  dollar: string[];
}> => {
  const res = await fetch(
    "https://api.xdog.pro/tweet/spe_analyse?dist=1h&show_ids=true&min_count=5"
  );
  return res.json();
};

function KolList() {
  const { data } = useQuery({
    queryKey: ["spe-analyse"],
    queryFn: fetchSpeAnalyse,
  });

  console.log(data);

  return (
    <div className="px-20 pt-20 flex flex-col items-start">
      <div className="flex items-center gap-2">
        <TextField.Root>
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
        <Button>Search</Button>
      </div>
      <div className="mt-3 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          {
            data?.address.map((item, index) => (
              <Link key={index}>{item}</Link>
            ))
          }
        </div>
        <div className="flex items-center gap-2">
          {data?.at.map((item, index) => (
            <Link key={index}>@{item}</Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {data?.dollar.map((item, index) => (
            <Link key={index}>${item}</Link>
          ))}
        </div>
      </div>
      <TweetCard />
    </div>
  );
}

export default KolList;
