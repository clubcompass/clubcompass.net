import React, { useMemo } from "react";
import { Table } from "../../../../general/Table";

export const AdminAccountsManage = ({ data, refetch }) => {
  const columns = useMemo(
    () => [
      { Header: "Name", accessor: "fullname" },
      { Header: "Email", accessor: "email" },
      { Header: "Student ID", accessor: "studentId" },
      { Header: "Grade", accessor: "grade" },
      { Header: "Remove", accessor: "delete" },
    ],
    []
  );
  return (
    <div>
      <Table columns={columns} data={data} refetch={refetch} />
    </div>
  );
};
