import React, { useMemo } from "react";
import { Table } from "../../../general/Table";

export const AdminClubsTable = () => {
  const data = useMemo(
    () => [
      {
        name: "Gaming club",
        president: "Andrew Hale",
        teacher: "Mr. Liao",
        availability: "Open",
        id: "id",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
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
