import React, { useMemo } from "react";
import { Table } from "../../../general/Table";

export const AdminClubsTable = ({ data }) => {
  const columns = useMemo(
    () => [
      { Header: "Date Created", accessor: "createdAt" },
      { Header: "Name", accessor: "name" },
      { Header: "President", accessor: "president" },
      { Header: "Teacher", accessor: "teacher" },
      { Header: "Availability", accessor: "availability" },
      { Header: "Application", accessor: "id" },
    ],
    []
  );
  return (
    <div>
      <Table columns={columns} data={data} />
    </div>
  );
};
