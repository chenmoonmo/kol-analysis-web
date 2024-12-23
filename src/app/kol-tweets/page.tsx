"use client";

import { TweetCard } from "@/components";
import { Tweet } from "@/types";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button, TextField, Link, Select } from "@radix-ui/themes";
// import { Link, Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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

const fetchTweets = async (q: string): Promise<Tweet[]> => {
  if (q.length === 0) return [];
  const res = await fetch(
    `https://api.xdog.pro/tweet/search-v2?q=${q}&only_count=false`
  );
  return res.json();
};

function KolList() {
  const searchParams = useSearchParams();

  const [searchResult, setSearchResult] = useState<Tweet[]>([]);

  const onSearch = async (q: string) => {
    setSearchResult([]);
    const res = await fetchTweets(q);
    setSearchResult(res);
  };

  const [dist, setDist] = useState(searchParams.get("dist") || "1h");
  const [minCount, setMinCount] = useState(searchParams.get("minCount") || "2");

  const [q, setQ] = useState(searchParams.get("q") || "");

  const onDistChange = (dist: string) => {
    setDist(dist);
    const url = new URL(window.location.href);
    url.searchParams.set("dist", dist);
    url.searchParams.set("minCount", minCount);
    url.searchParams.set("q", q);
    window.history.pushState({}, "", url);
  };

  const onMinCountChange = (minCount: string) => {
    setMinCount(minCount);
    const url = new URL(window.location.href);
    url.searchParams.set("dist", dist);
    url.searchParams.set("minCount", minCount);
    url.searchParams.set("q", q);
    window.history.pushState({}, "", url);
  };

  const onQChange = (q: string) => {
    setQ(q);
    const url = new URL(window.location.href);
    url.searchParams.set("dist", dist);
    url.searchParams.set("minCount", minCount);
    url.searchParams.set("q", q);
    window.history.pushState({}, "", url);
  };

  const { data } = useQuery({
    queryKey: ["spe-analyse", dist, minCount],
    queryFn: () => fetchSpeAnalyse(dist, minCount),
  });

  const onWordClicked = (word: string) => {
    onQChange(word);
    onSearch(word);
  };

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      onSearch(q);
    }
  }, []);

  const nodata =
    data === undefined
      ? false
      : data!.address.length === 0 &&
        data!.at.length === 0 &&
        data!.dollar.length === 0;

  return (
    <div className="p-20 flex flex-col items-start">
      <div className="flex items-center gap-2">
        <Select.Root value={dist} onValueChange={onDistChange}>
          <Select.Trigger />
          <Select.Content>
            <Select.Group>
              <Select.Label>dist</Select.Label>
              <Select.Item value="1h">1 hour</Select.Item>
              <Select.Item value="2h">2 hours</Select.Item>
              <Select.Item value="3h">3 hours</Select.Item>
              <Select.Item value="6h">6 hours</Select.Item>
              <Select.Item value="12h">12 hours</Select.Item>
              <Select.Item value="1d">1 day</Select.Item>
              <Select.Item value="3d">3 days</Select.Item>
              <Select.Item value="7d">7 days</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
        <Select.Root value={minCount} onValueChange={onMinCountChange}>
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

      <div className="mt-3 flex flex-col gap-4 w-full">
        {data?.address && data?.address.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            {data?.address.map((item, index) => (
              // <Link
              //   key={index}
              //   href={`https://x.com/search?q=${item.key}&src=typed_query`}
              //   target="_blank"
              // >
              //   {item.key}
              // </Link>
              <div
                key={index}
                onClick={() => onWordClicked(`${item.key}`)}
                className="cursor-pointer hover:underline"
              >
                {item.key}
              </div>
            ))}
          </div>
        )}
        {data?.at && data?.at.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
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
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            {data?.dollar.map((item, index) => (
              // <Link
              //   key={index}
              //   href={`https://x.com/search?q=${item.key}&src=typed_query`}
              //   target="_blank"
              // >
              //   ${item.key}
              // </Link>
              <div
                key={index}
                onClick={() => onWordClicked(`${item.key}`)}
                className="cursor-pointer hover:underline"
              >
                ${item.key}
              </div>
            ))}
          </div>
        )}
        {nodata && <div className="text-gray-500">No data</div>}
      </div>
      <div className="flex items-center gap-2 mt-5">
        <TextField.Root
          value={q}
          onChange={(e) => onQChange(e.target.value)}
          className="w-[500px]"
          size="2"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch(q);
            }
          }}
        >
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
        <Button size="2" onClick={() => onSearch(q)}>
          Search
        </Button>
      </div>
      {/* <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 mt-5 w-full"> */}
      <div className="mt-5 columns-1 min-[950px]:columns-2 min-[1300px]:columns-3 min-[1700px]:columns-4 space-y-4">
        {searchResult.map((item) => (
          <TweetCard key={item.tweet_id} tweet={item} />
        ))}
      </div>
    </div>
  );
}

export default KolList;
