"use client";

import { ArrowLeftIcon, Link1Icon } from "@radix-ui/react-icons";
import { IconButton, Link, Table } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

type HolderItem = {
  address: string;
  amount: number;
  mint: string;
  owner: string;
  precents: number;
};

const fetchData = async (mint: string): Promise<HolderItem[]> => {
  const result = await fetch(
    `https://api.xdog.pro/kol/docs_in_pump_hold?mint=${mint}&decimals=6&reverse=false`
  ).then((res) => res.json());

  const data = result.data;

  const total = data.reduce((acc: number, item: HolderItem) => {
    return acc + item.amount;
  }, 0);

  data.data = data.map((item: HolderItem) => {
    item.precents = (item.amount / total) * 100;
    return item;
  });

  return data.sort((a: HolderItem, b: HolderItem) => b.amount - a.amount);
};

export default function Holder() {
  const { mint } = useParams<{ mint: string }>();

  const { data } = useQuery({
    queryKey: ["holders", mint],
    queryFn: () => fetchData(mint),
  });

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <div className="flex items-center gap-3 pr-10 pt-10 pb-5">
        <IconButton variant="soft" asChild>
          <Link href="/holders">
            <ArrowLeftIcon />
          </Link>
        </IconButton>
        <div className="text-xl font-bold">{mint}</div>
      </div>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Address</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Owner</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data?.map((item) => (
            <Table.Row key={item.address}>
              <Table.Cell>
                <Link
                  href={`https://solscan.io/address/${item.address}`}
                  target="_blank"
                >
                  {item.address}
                </Link>
              </Table.Cell>
              <Table.Cell>
                <Link
                  href={`https://solscan.io/address/${item.owner}`}
                  target="_blank"
                >
                  {item.owner}
                </Link>
              </Table.Cell>
              <Table.Cell>
                {item.amount.toFixed(2)} ({item.precents.toFixed(2)}%)
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
