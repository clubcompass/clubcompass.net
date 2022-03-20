import React, { useMemo } from "react";
import { Table } from "../../../../general/Table";

export const AdminAccountsManage = () => {
  const data = useMemo(
    () => [
      {
        name: "Abhinav Poopenson",
        email: "andrew.z.hale1@gmail.com",
        studentId: "1911233",
        grade: "12",
        delete: {
          name: "Abhinav Poopenson",
          id: "al0vvnc1701263pxmg4j7tc1w",
          type: "ACCOUNT",
        },
      },
      {
        name: "Joeseph Ballsack",
        email: "joeballsack@gmail.com",
        studentId: "1846217",
        grade: "12",
        delete: {
          name: "Joeseph Ballsack",
          id: "al0vvnc1701263pxmg4j7tc1w",
          type: "ACCOUNT",
        },
      },
      {
        name: "Stinky McGee",
        email: "abhinav.palacharla@gmail.com",
        studentId: "1914187",
        grade: "9",
        delete: {
          name: "Stinky McGee",
          id: "al0vvnc1701263pxmg4j7tc1w",
          type: "ACCOUNT",
        },
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Email", accessor: "email" },
      { Header: "Student ID", accessor: "studentId" },
      { Header: "Grade", accessor: "grade" },
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
