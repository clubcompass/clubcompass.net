import React, { useMemo } from "react";
import { Table } from "../../../../general/Table";

export const AdminAccountsTable = ({ data }) => {
  // const data = useMemo(
  //   () => [
  //     {
  //       name: "fake name!!",
  //       email: "andrew.z.hale1@gmail.com",
  //       studentId: "1911233",
  //       grade: "12",
  //     },
  //     {
  //       name: "Joe Balls",
  //       email: "joeballsack@gmail.com",
  //       studentId: "1846217",
  //       grade: "12",
  //     },
  //     {
  //       name: "Idiot McGee",
  //       email: "abhinav.palacharla@gmail.com",
  //       studentId: "1914187",
  //       grade: "9",
  //     },
  //   ],
  //   []
  // );

  const columns = useMemo(
    () => [
      { Header: "Name", accessor: "fullname" },
      { Header: "Email", accessor: "email" },
      { Header: "Student ID", accessor: "studentId" },
      { Header: "Grade", accessor: "grade" },
    ],
    []
  );
  return (
    <div>
      <Table columns={columns} data={data} checkbox />
    </div>
  );
};
