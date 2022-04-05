import React, { useMemo, useState, forwardRef, useRef, useEffect } from "react";
import { Switch } from "@headlessui/react";
import Link from "next/link";
import {
  useTable,
  useRowSelect,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  usePagination,
} from "react-table";

import {
  BiChevronDown,
  BiChevronUp,
  BiLastPage,
  BiFirstPage,
  BiChevronRight,
  BiChevronLeft,
} from "react-icons/bi";
import { BsTrashFill } from "react-icons/bs";
import { IoMdLock, IoMdUnlock } from "react-icons/io";
import { AdminDeleteModal } from "../pages/dashboard/admin/AdminDeleteModal";
import { AdminAccountsApproveModal } from "../pages/dashboard/admin/accounts/AdminAccountsApproveModal";
import { clubs } from "../../lib/db";

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input type="checkbox" ref={resolvedRef} {...rest} />
    </>
  );
});

IndeterminateCheckbox.displayName = "IndeterminateCheckbox";

const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <div className="flex justify-between">
      <span className="flex items-center gap-4">
        Search:
        <input
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder="Search all items..."
          className="rounded-lg border py-1 px-2"
        />
      </span>
    </div>
  );
};

export const Table = ({ columns, data, checkbox, refetch }) => {
  const [deleting, setDeleting] = useState(false);

  const filterTypes = useMemo(
    () => ({
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      filterTypes,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      {
        checkbox &&
          hooks.visibleColumns.push((columns) => [
            {
              id: "selection",
              Header: ({ getToggleAllRowsSelectedProps }) => (
                <div>
                  <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                </div>
              ),
              Cell: ({ row }) => (
                <div>
                  <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                </div>
              ),
            },
            ...columns,
          ]);
      }
    }
  );

  const selected = useMemo(() => {
    if (selectedFlatRows.length > 0) {
      return selectedFlatRows.map((row) => data[row.index]);
    }
  }, [selectedFlatRows, data]);

  return (
    <>
      <table
        {...getTableProps()}
        className="w-full border-separate"
        style={{ borderSpacing: "0 10px" }}>
        <thead>
          {checkbox && (
            <tr>
              <th colSpan={visibleColumns.length}>
                <div className="flex justify-end gap-2">
                  <AdminAccountsApproveModal
                    reject
                    selectedRowIds={selectedRowIds}
                    selected={selected}
                    refetch={refetch}
                  />
                  <AdminAccountsApproveModal
                    selectedRowIds={selectedRowIds}
                    selected={selected}
                    refetch={refetch}
                  />
                </div>
              </th>
            </tr>
          )}
          <tr>
            <th colSpan={visibleColumns.length}>
              <div className="flex justify-between">
                <GlobalFilter
                  preGlobalFilteredRows={preGlobalFilteredRows}
                  globalFilter={state.globalFilter}
                  setGlobalFilter={setGlobalFilter}
                />

                <span className="font-normal text-ccGreyLight">
                  {preGlobalFilteredRows.length} total items
                </span>
              </div>
            </th>
          </tr>
          {headerGroups.map((headerGroup, i) => (
            <tr key={i} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, i) => (
                <th
                  key={i}
                  {...(!["slug", "id", "delete"].includes(column.id) && {
                    ...column.getHeaderProps(column.getSortByToggleProps()),
                  })}
                  className="text-left first:pl-4"
                  title="">
                  <span className="flex items-center gap-2 text-ccGreyLight">
                    {["delete"].includes(column.id) ? (
                      <ToggleComponent
                        enabled={deleting}
                        setEnabled={setDeleting}
                      />
                    ) : (
                      column.render("Header")
                    )}
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <BiChevronDown className="translate-y-[1px]" />
                      ) : (
                        <BiChevronUp className="translate-y-[1px]" />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr key={i} {...row.getRowProps()}>
                {row.cells.map((cell, i) => {
                  return (
                    <td
                      key={i}
                      {...cell.getCellProps()}
                      className="border-b-2 border-t-2 py-2 first:rounded-l-lg first:border-l-2 first:pl-4 last:rounded-r-lg last:border-r-2">
                      {["slug", "id"].includes(cell.column.id) && cell.value ? (
                        <Link
                          href={
                            cell.column.id === "id"
                              ? `/admin/club/${cell.value}`
                              : `/club/${cell.value}`
                          }>
                          <a className="rounded-md bg-cc py-1 px-4 text-sm font-semibold text-white">
                            {cell.column.id === "id" ? "Review" : "View"}
                          </a>
                        </Link>
                      ) : ["delete"].includes(cell.column.id) ? (
                        <div className="flex justify-center">
                          <AdminDeleteModal
                            refetch={refetch}
                            deleting={deleting}
                            value={cell.value}
                          />
                        </div>
                      ) : (
                        cell.render("Cell")
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-between">
        <div className="flex gap-2 text-2xl">
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className={!canPreviousPage && "text-gray-300"}>
            <BiFirstPage />
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className={!canPreviousPage && "text-gray-300"}>
            <BiChevronLeft />
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className={!canNextPage && "text-gray-300"}>
            <BiChevronRight />
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className={!canNextPage && "text-gray-300"}>
            <BiLastPage />
          </button>
        </div>
        <div className="flex gap-2">
          Page
          <span className="flex font-semibold">
            <input
              type="number"
              value={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              max={pageOptions.length}
              className="w-8 font-semibold"
            />{" "}
            of {pageOptions.length}
          </span>
        </div>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}>
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

const ToggleComponent = ({ enabled, setEnabled }) => {
  return (
    <div className="mx-auto">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${enabled ? "bg-red-500" : "bg-gray-300"}
      relative inline-flex h-[22px] w-[42px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}>
        <span className="sr-only">Toggle delete unlock</span>
        <span
          aria-hidden="true"
          className={`${
            enabled
              ? "translate-x-[20px] text-red-500"
              : "translate-x-0 text-gray-300"
          }
        pointer-events-none flex h-[18px] w-[18px] transform items-center justify-center rounded-full bg-white text-xs shadow-lg ring-0 transition duration-200 ease-in-out`}>
          {enabled ? <IoMdUnlock /> : <IoMdLock />}
        </span>
      </Switch>
    </div>
  );
};
