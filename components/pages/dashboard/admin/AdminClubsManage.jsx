import React, { useMemo } from "react";
import { Table } from "../../../general/Table";

export const AdminClubsManage = ({ data }) => {
  // const data = useMemo(() => [
  //   {
  //     name: "Gaming club",
  //     president: "Andrew Hale",
  //     teacher: "Mr. Liao",
  //     members: "Count",
  //     slug: "ace-club",
  //     delete: {
  //       name: "Gaming Club",
  //       members: "9",
  //       id: "al0vvnc1701263pxmg4j7tc1w",
  //     },
  //   },
  //   {
  //     name: "Gaming club",
  //     president: "Andrew Hale",
  //     teacher: "Mr. Liao",
  //     members: "Count",
  //     slug: "gaming-club",
  //     delete: {
  //       name: "Gaming Club",
  //       members: "9",
  //       id: "al0vvnc1701263pxmg4j7tc1w",
  //     },
  //   },
  // ]);

  const columns = useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "President", accessor: "president" },
      { Header: "Teacher", accessor: "teacher" },
      { Header: "Members", accessor: "members" },
      { Header: "Club", accessor: "slug" },
      { Header: "Remove", accessor: "delete" },
    ],
    []
  );

  return (
    <div>
      <Table columns={columns} data={data} />
    </div>
  );
};
