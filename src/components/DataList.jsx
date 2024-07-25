import React from "react";

export default function DataList({ address, dataAddress }) {
  return (
    <div className="flex-1 text-center">
      <h2>Address {address}</h2>
      <p>{dataAddress ?? "Loading..."}</p>
    </div>
  );
}
