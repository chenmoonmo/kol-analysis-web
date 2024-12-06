"use client";

import { Table } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";

type AnalysisItem = {
  symbol: string;
  mint: string;
  analysis: string;
  updated_at: string;
};

const fetchData = async (): Promise<AnalysisItem[]> => {
  const data = await fetch(
    "https://dq.shuyuchain.com/kol/ai_analysis?page_size=1000"
  ).then((res) => res.json());
  return data.data;
};

export default function AiAnalysis() {
    
  const { data } = useQuery({
    queryKey: ["ai-analysis"],
    queryFn: fetchData,
  });

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Symbol</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Mint</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Analysis</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data?.map((item) => (
            <Table.Row key={item.mint}>
              <Table.Cell>{item.symbol}</Table.Cell>
              <Table.Cell>{item.mint}</Table.Cell>
              <Table.Cell>
                <div>
                  {item.analysis.split("\n").map((line, index) => (
                    <p key={index} className="mb-2">
                      {line}
                    </p>
                  ))}
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
