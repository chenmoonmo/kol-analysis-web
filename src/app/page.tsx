"use client";
import { Checkbox, TabNav, Table, Text } from "@radix-ui/themes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type DataItem = {
  screen_name: string;
  tweet_count: number;
  "10_win_count": number;
  "10_lose_count": number;
  "15_win_count": number;
  "15_lose_count": number;
  "30_win_count": number;
  "30_lose_count": number;
  "10_rate": number;
  "15_rate": number;
  "30_rate": number;
  kol: {
    name: string;
    favourites_count: number;
    followers_count: number;
    friends_count: number;
    verified: boolean;
    rest_id: string;
    avatar: string;
    description: string;
  };
};

const fetchData = async ({
  queryKey,
}: {
  queryKey: [
    string,
    { level: string; key: string; optimal: boolean; desc: boolean }
  ];
}): Promise<DataItem[]> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, { level, key, desc, optimal }] = queryKey;
  const data = await fetch(
    `https://api.xdog.pro/kol/win_rate?level=${level}&key=${key}&desc=${desc}&limit=1000&optimal=${optimal}`
  ).then((res) => res.json());

  return data.data;
};

export default function Home() {
  const searchParams = useSearchParams();

  const [level, setLevel] = useState(searchParams.get("level") || "3day");
  const [key, setKey] = useState(searchParams.get("key") || "tweet_count");
  const [desc, setDesc] = useState<boolean>(
    searchParams.get("desc") === "true" || true
  );
  const [optimal, setOptimal] = useState<boolean>(
    searchParams.get("optimal") === "true" || true
  );

  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["kol/win_rate", { level, key, optimal, desc }],
    queryFn: fetchData,
  });

  const sortKeyChangeHandler = useCallback((key: string) => {
    setKey(key);
    setDesc(true);
    const url = new URL(window.location.href);
    url.searchParams.set("key", key);
    url.searchParams.set("desc", desc.toString());
    url.searchParams.set("optimal", optimal.toString());
    window.history.pushState(null, "", url.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const levelChangeHandler = useCallback((level: string) => {
    setLevel(level);
    setDesc(true);
    const url = new URL(window.location.href);
    url.searchParams.set("level", level);
    url.searchParams.set("desc", desc.toString());
    url.searchParams.set("optimal", optimal.toString());
    window.history.pushState(null, "", url.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const optimalSortChangeHandler = useCallback((value: boolean) => {
    setOptimal(value);
    const url = new URL(window.location.href);
    url.searchParams.set("optimal", value.toString());
    window.history.pushState(null, "", url.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("level", level);
    url.searchParams.set("desc", desc.toString());
    window.history.pushState(null, "", url.toString());
    queryClient.prefetchQuery({
      queryKey: ["kol/win_rate", { level: "1day", key, optimal, desc }],
      queryFn: fetchData,
    });
    queryClient.prefetchQuery({
      queryKey: ["kol/win_rate", { level: "2day", key, optimal, desc }],
      queryFn: fetchData,
    });
    queryClient.prefetchQuery({
      queryKey: ["kol/win_rate", { level: "3day", key, optimal, desc }],
      queryFn: fetchData,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <div className="flex items-center">
        <TabNav.Root>
          <TabNav.Link
            onClick={() => levelChangeHandler("1day")}
            active={level === "1day"}
            className="!cursor-pointer"
          >
            1 days
          </TabNav.Link>
          <TabNav.Link
            onClick={() => levelChangeHandler("2day")}
            active={level === "2day"}
            className="!cursor-pointer"
          >
            2 days
          </TabNav.Link>
          <TabNav.Link
            onClick={() => levelChangeHandler("3day")}
            active={level === "3day"}
            className="!cursor-pointer"
          >
            3 days
          </TabNav.Link>
        </TabNav.Root>
        <label className="flex items-center gap-2 pl-4 cursor-pointer">
          <Text size="2">optimal sort</Text>
          <Checkbox
            checked={optimal}
            onCheckedChange={optimalSortChangeHandler}
          />
        </label>
      </div>

      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>KOL name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>followers</Table.ColumnHeaderCell>

            <Table.ColumnHeaderCell>
              <div
                onClick={() => sortKeyChangeHandler("tweet_count")}
                className="flex items-center cursor-pointer"
              >
                <span>Tweets count</span>
                {key === "tweet_count" && (
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.14645 2.14645C7.34171 1.95118 7.65829 1.95118 7.85355 2.14645L11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355C11.6583 7.04882 11.3417 7.04882 11.1464 6.85355L8 3.70711L8 12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5L7 3.70711L3.85355 6.85355C3.65829 7.04882 3.34171 7.04882 3.14645 6.85355C2.95118 6.65829 2.95118 6.34171 3.14645 6.14645L7.14645 2.14645Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                )}
              </div>
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>10 mins win count</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>10 mins lose count</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>15 mins win count</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>15 mins lose count</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>30 mins win count</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>30 mins lose count</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              <div
                onClick={() => sortKeyChangeHandler("10_rate")}
                className="flex items-center cursor-pointer"
              >
                <span>10 mins rate</span>
                {key === "10_rate" && (
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.14645 2.14645C7.34171 1.95118 7.65829 1.95118 7.85355 2.14645L11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355C11.6583 7.04882 11.3417 7.04882 11.1464 6.85355L8 3.70711L8 12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5L7 3.70711L3.85355 6.85355C3.65829 7.04882 3.34171 7.04882 3.14645 6.85355C2.95118 6.65829 2.95118 6.34171 3.14645 6.14645L7.14645 2.14645Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                )}
              </div>
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              <div
                onClick={() => sortKeyChangeHandler("15_rate")}
                className="flex items-center cursor-pointer"
              >
                <span>15 mins rate</span>
                {key === "15_rate" && (
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.14645 2.14645C7.34171 1.95118 7.65829 1.95118 7.85355 2.14645L11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355C11.6583 7.04882 11.3417 7.04882 11.1464 6.85355L8 3.70711L8 12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5L7 3.70711L3.85355 6.85355C3.65829 7.04882 3.34171 7.04882 3.14645 6.85355C2.95118 6.65829 2.95118 6.34171 3.14645 6.14645L7.14645 2.14645Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                )}
              </div>
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              <div
                onClick={() => setKey("30_rate")}
                className="flex items-center cursor-pointer"
              >
                <span>30 mins rate</span>
                {key === "30_rate" && (
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.14645 2.14645C7.34171 1.95118 7.65829 1.95118 7.85355 2.14645L11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355C11.6583 7.04882 11.3417 7.04882 11.1464 6.85355L8 3.70711L8 12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5L7 3.70711L3.85355 6.85355C3.65829 7.04882 3.34171 7.04882 3.14645 6.85355C2.95118 6.65829 2.95118 6.34171 3.14645 6.14645L7.14645 2.14645Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                )}
              </div>
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {query.isLoading ? (
            <Table.Row>
              <Table.Cell colSpan={12} className="text-center py-10">
                Loading...
              </Table.Cell>
            </Table.Row>
          ) : (
            query.data?.map((item) => (
              <Table.Row key={item.screen_name}>
                <Table.Cell>
                  <Link
                    href={`https://twitter.com/${item.screen_name}`}
                    target="_blank"
                  >
                    @{item.screen_name}
                  </Link>
                </Table.Cell>
                <Table.Cell>{item?.kol?.followers_count}</Table.Cell>
                <Table.Cell>{item.tweet_count}</Table.Cell>
                <Table.Cell>{item["10_win_count"]}</Table.Cell>
                <Table.Cell>{item["10_lose_count"]}</Table.Cell>
                <Table.Cell>{item["15_win_count"]}</Table.Cell>
                <Table.Cell>{item["15_lose_count"]}</Table.Cell>
                <Table.Cell>{item["30_win_count"]}</Table.Cell>
                <Table.Cell>{item["30_lose_count"]}</Table.Cell>
                <Table.Cell>{`${(item["10_rate"] * 100).toFixed(
                  2
                )}%`}</Table.Cell>
                <Table.Cell>{`${(item["15_rate"] * 100).toFixed(
                  2
                )}%`}</Table.Cell>
                <Table.Cell>{`${(item["30_rate"] * 100).toFixed(
                  2
                )}%`}</Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
