"use client";
import {
  AlertDialog,
  Button,
  Dialog,
  Link,
  Table,
  TextField,
} from "@radix-ui/themes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useState } from "react";

const fetchData = async (): Promise<
  {
    mint: string;
    update_time: number;
  }[]
> => {
  const data = await fetch("https://api.xdog.pro/kol/monit_mints").then((res) =>
    res.json()
  );
  return data.data;
};

export default function KolList() {
  const queryClient = useQueryClient();

  const [mint, setMint] = useState<string>();

  const { data } = useQuery({
    queryKey: ["kol/monit_mints"],
    queryFn: fetchData,
  });

  const onAddMint = async () => {
    try {
      // TODO: 错误提示
      const mintWithdrawInfo = (
        await fetch(
          `https://api.xdog.pro/kol/pump_withdraw_by_mint?mint=${mint}`
        ).then((res) => res.json())
      ).data[0] as {
        timestamp: number;
      };

      if (!mintWithdrawInfo) return;

      await fetch("https://api.xdog.pro/kol/monit_mint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mint,
          update_time: Math.floor(mintWithdrawInfo.timestamp / 1000),
        }),
      });

      setMint("");

      // Refresh data
      queryClient.invalidateQueries({
        queryKey: ["kol/monit_mints"],
      });
    } catch (e) {
      console.error(e);
    }
  };

  const onDeleteMint = async (mint: string) => {
    try {
      await fetch(`https://api.xdog.pro/kol/monit_mint/${mint}`, {
        method: "DELETE",
      });

      // Refresh data
      queryClient.invalidateQueries({
        queryKey: ["kol/monit_mints"],
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="p-20 flex flex-col items-start">
      <div>
        <Dialog.Root>
          <Dialog.Trigger>
            <Button>Add mint</Button>
          </Dialog.Trigger>
          <Dialog.Content maxWidth="450px">
            <Dialog.Title>Add mint</Dialog.Title>
            <label>
              <TextField.Root
                placeholder="Enter mint address"
                value={mint}
                onChange={(e) => setMint(e.target.value)}
              />
            </label>
            <div className="mt-3 flex justify-end items-center gap-3">
              <Dialog.Close>
                <Button variant="soft" color="gray" onClick={() => setMint("")}>
                  Cancel
                </Button>
              </Dialog.Close>
              <Dialog.Close>
                <Button onClick={onAddMint}>Confirm</Button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Root>
      </div>

      <Table.Root className="w-full">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Address</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Update At</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data?.map((item, index) => (
            <Table.Row key={index}>
              <Table.Cell>
                <Link key={index} href={`/holder-watch/${item.mint}`}>
                  {item.mint}
                </Link>
              </Table.Cell>
              <Table.Cell>
                {dayjs(item.update_time * 1000).format("YYYY-MM-DD HH:mm")}
              </Table.Cell>
              <Table.Cell>
                <AlertDialog.Root>
                  <AlertDialog.Trigger>
                    <Button variant="ghost" color="red">
                      Delete
                    </Button>
                  </AlertDialog.Trigger>
                  <AlertDialog.Content maxWidth="450px">
                    <AlertDialog.Title>Stop Monitoring Mint?</AlertDialog.Title>
                    <div className="mt-3 flex justify-end items-center gap-3">
                      <AlertDialog.Cancel>
                        <Button variant="soft" color="gray">
                          Cancel
                        </Button>
                      </AlertDialog.Cancel>
                      <AlertDialog.Action>
                        <Button
                          variant="solid"
                          color="red"
                          onClick={() => onDeleteMint(item.mint)}
                        >
                          Confirm
                        </Button>
                      </AlertDialog.Action>
                    </div>
                  </AlertDialog.Content>
                </AlertDialog.Root>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
