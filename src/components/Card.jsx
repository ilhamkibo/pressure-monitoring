"use client";

import React, { useEffect, useState } from "react";
import DataList from "@/components/DataList";
import { io } from "socket.io-client";

export default function Card() {
  const [dataAddress0, setDataAddress0] = useState(null);
  const [dataAddress1, setDataAddress1] = useState(null);

  useEffect(() => {
    // Create a single socket instance
    const socket = io("http://localhost:5000");

    // Log the connection ID for debugging
    socket.on("connect", () => {
      console.log("Connected with socket ID:", socket.id);
    });

    // Handle incoming modbus data
    socket.on("modbusData", (data) => {
      console.log("Received data from server");
      console.log("Connected with socket ID:", socket.id);

      setDataAddress0(data[0]);
      setDataAddress1(data[1]); // Assuming the data index is 1
    });

    // Clean up socket connection when component unmounts
    return () => {
      socket.off("modbusData");
      socket.off("connect");
      socket.disconnect(); // Properly close the socket connection
    };
  }, []);

  return (
    <div className="flex">
      <DataList address={0} dataAddress={dataAddress0} />
      <DataList address={1} dataAddress={dataAddress1} />
    </div>
  );
}
