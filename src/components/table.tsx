import { ReactNode, memo, forwardRef } from "react";
import { Link, Table, Text } from "@radix-ui/themes";
import dayjs from "dayjs";

import { NoData } from "./no-data";
// import { Address } from "./address";
import { formatPrice } from "@/utils/format";
// import { EllipsisName } from "./ellipsis-name";

type TableProps = {
  columns: {
    key: string;
    title: ReactNode;
    render?: (value: any, item: any, index: number) => ReactNode;
  }[];
  data: any[];
  className?: string;
};

export const DataTable = forwardRef<HTMLDivElement, TableProps>(
  ({ columns = [], data=[], className }, ref) => {
    
    return (
      <Table.Root
        className={`min-h-0 bg-[#17181C] px-[30px] rounded-[14px] ${className}`}
        ref={ref}
      >
        <Table.Header>
          <Table.Row className="sticky top-0 z-10">
            {columns.map((column) => {
              return (
                <Table.ColumnHeaderCell
                  key={column.key}
                  className="whitespace-nowrap"
                >
                  {column.title}
                </Table.ColumnHeaderCell>
              );
            })}
          </Table.Row>
        </Table.Header>
        <Table.Body className="pb-80">
          {data.map((item, index) => (
            <Table.Row
              key={index}
              style={{
                contentVisibility: "auto",
              }}
            >
              {columns.map((column, j) => {
                const CurrentCell = j === 0 ? Table.RowHeaderCell : Table.Cell;
                const currentValue = item[column.key];
                return (
                  <CurrentCell key={column.key}>
                    {column.render ? (
                      column.render(currentValue, item, index)
                    ) : (
                      <span>{currentValue}</span>
                    )}
                  </CurrentCell>
                );
              })}
            </Table.Row>
          ))}
          {data.length === 0 && (
            <Table.Row>
              <Table.Cell colSpan={columns.length} className="!shadow-none">
                <NoData />
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    );
  }
);

DataTable.displayName = "DataTable";

// export const renderDate = (value: any) => {
//   return <span>{dayjs(value).format("YYYY-MM-DD")}</span>;
// };

// export const renderDateTime = (value: any) => {
//   return <span>{dayjs(value * 1000).format("YYYY-MM-DD HH:mm:ss")}</span>;
// };

// export const renderAddress = (value: any) => {
//   return <Address extra="address">{value}</Address>;
// };

// export const renderPool = (value: any) => {
//   return (
//     <Link href={`/pair-datail?pair=${value}`} target="_blank">
//       <Address extra="pool">{value}</Address>
//     </Link>
//   );
// };

// export const renderToken = (value: any) => {
//   return (
//     <Address type="token" extra="contract">
//       {value}
//     </Address>
//   );
// };

// export const renderPNL = (value: any) => {
//   return (
//     <Text
//       className={value > 0 ? "text-[var(--red-9)]" : "text-[var(--green-9)]"}
//       weight="medium"
//     >
//       {formatPrice(value)}
//     </Text>
//   );
// };

// export const renderAmount = (value: any) => {
//   return <Text>{formatPrice(value)}</Text>;
// };

// export const renderEllipsisName = (value: any) => {
//   return <EllipsisName>{value}</EllipsisName>;
// };
