"use client";

// import { TweetCard } from "@/components";
// import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
// import { Button, TextField, Link, Select } from "@radix-ui/themes";
import { Link, Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const fetchSpeAnalyse = async (
  dist: string,
  minCount: string
): Promise<{
  address: { key: string; count: number }[];
  at: { key: string; count: number }[];
  dollar: { key: string; count: number }[];
}> => {
  const res = await fetch(
    `https://api.xdog.pro/tweet/spe_analyse?chain=solana&list_id=1867510230386606091&dist=${dist}&show_ids=false&min_count=${minCount}`
  );
  return res.json();
};

function KolList() {
  const [dist, setDist] = useState("3d");
  const [minCount, setMinCount] = useState("5");

  const { data } = useQuery({
    queryKey: ["spe-analyse", dist, minCount],
    queryFn: () => fetchSpeAnalyse(dist, minCount),
  });

  console.log(data);

  const nodata = data === undefined
    ? false
    : data!.address.length === 0 &&
      data!.at.length === 0 &&
      data!.dollar.length === 0;

  return (
    <div className="px-20 pt-20 flex flex-col items-start">
      <div className="flex items-center gap-2">
        <Select.Root value={dist} onValueChange={setDist}>
          <Select.Trigger />
          <Select.Content>
            <Select.Group>
              <Select.Label>dist</Select.Label>
              <Select.Item value="1h">1 hour</Select.Item>
              <Select.Item value="1d">1 day</Select.Item>
              <Select.Item value="3d">3 days</Select.Item>
              <Select.Item value="7d">7 days</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
        <Select.Root value={minCount} onValueChange={setMinCount}>
          <Select.Trigger />
          <Select.Content>
            <Select.Group>
              <Select.Label>min count</Select.Label>
              <Select.Item value="2">2</Select.Item>
              <Select.Item value="3">3</Select.Item>
              <Select.Item value="4">4</Select.Item>
              <Select.Item value="5">5</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </div>
      {/* <div className="flex items-center gap-2">
        <TextField.Root>
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
        <Button>Search</Button>
      </div> */}
      <div className="mt-3 flex flex-col gap-4 w-full">
        {data?.address && data?.address.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {data?.address.map((item, index) => (
              <Link
                key={index}
                href={`https://x.com/search?q=${item.key}&src=typed_query`}
                target="_blank"
              >
                {item.key}
              </Link>
            ))}
          </div>
        )}
        {data?.at && data?.at.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {data?.at.map((item, index) => (
              <Link
                key={index}
                href={`https://x.com/${item.key}`}
                target="_blank"
              >
                @{item.key}
              </Link>
            ))}
          </div>
        )}
        {data?.dollar && data?.dollar.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {data?.dollar.map((item, index) => (
              <Link
                key={index}
                href={`https://x.com/search?q=${item.key}&src=typed_query`}
                target="_blank"
              >
                ${item.key}
              </Link>
            ))}
          </div>
        )}
        {nodata && <div className="text-gray-500">No data</div>}
      </div>
      {/* <TweetCard /> */}
    </div>
  );
}

export default KolList;
