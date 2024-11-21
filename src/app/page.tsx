import { Table } from "@radix-ui/themes";
import Link from "next/link";

type SearchParams = Promise<{
  level: string;
  key: string;
}>;

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  // http://64.130.51.53:5014/kol/win_rate?level=1day&key=30_rate&desc=true&limit=1000&optimal=true

  let { level, key } = await searchParams;

  level = level || "3day";
  key = key || "tweet_count";

  console.log(level, key);

  const data = (
    (await fetch(
      `http://64.130.51.53:5014/kol/win_rate?level=${level}&key=${key}&desc=true&limit=1000&optimal=true`
    ).then((res) => res.json())) as {
      data: {
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
        "kol": {
          name: string;
          favourites_count: number;
          followers_count: number;
          friends_count: number;
          verified: boolean;
          rest_id: string;
          avatar: string;
          description: string;
        }
      }[];
    }
  ).data;

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      {/* <DataTable columns={columns} data={[data.data]}></DataTable> */}
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>KOL name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>followers</Table.ColumnHeaderCell>

            <Table.ColumnHeaderCell>
              <Link
                href={`?level=${level}&key=tweet_count`}
                className="flex items-center"
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
              </Link>
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>10 mins win count</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>10 mins lose count</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>15 mins win count</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>15 mins lose count</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>30 mins win count</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>30 mins lose count</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              <Link
                href={`?level=${level}&key=10_rate`}
                className="flex items-center"
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
              </Link>
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              <Link
                href={`?level=${level}&key=15_rate`}
                className="flex items-center"
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
              </Link>
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              <Link
                href={`?level=${level}&key=30_rate`}
                className="flex items-center"
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
              </Link>
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map((item) => (
            <Table.Row key={item.screen_name}>
              <Table.Cell>
                <Link
                  href={`https://twitter.com/${item.screen_name}`}
                  target="_blank"
                >
                  @{item.screen_name}
                </Link>
              </Table.Cell>
              <Table.Cell>{item.kol.followers_count}</Table.Cell>
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
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
