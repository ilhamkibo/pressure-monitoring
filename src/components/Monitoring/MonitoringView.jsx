// components/MonitoringView.js
"use client";

import MonitoringList from "./MonitoringList";
import { io } from "socket.io-client";
import React, { useEffect, useState } from "react";

export default function MonitoringView() {
  const [dataFilling, setDataFilling] = useState("-");
  const [dataBuffer, setDataBuffer] = useState("-");
  const [dataCorridor, setDataCorridor] = useState("-");

  useEffect(() => {
    // Create a single socket instance
    const socket = io("http://localhost:5000");

    // Log the connection ID for debugging
    socket.on("connect", () => {
      console.log("Connected with socket ID:", socket.id);
    });

    // Handle incoming modbus data
    socket.on("modbusData", (data) => {
      setDataFilling(data[0]);
      setDataBuffer(data[1]); // Assuming the data index is 1
      setDataCorridor(data[2]); // Assuming the data index is 1
    });

    // Clean up socket connection when component unmounts
    return () => {
      socket.off("modbusData");
      socket.off("connect");
      socket.disconnect(); // Properly close the socket connection
    };
  }, []);

  return (
    <div className="flex flex-col justify-center  border-gray-300 h-1/2 rounded-md m-4 bg-white">
      <div className="border border-gray-300">
        <h1 className="font-bold p-2 text-xl">Monitoring View</h1>
      </div>
      <div className="flex justify-around h-full items-center p-4 border-x border-b border-gray-300 ">
        <MonitoringList
          topic={"Actual Data"}
          status={"Normal"}
          value1={dataFilling}
          value2={dataBuffer}
          type1={"Filling 1: "}
          type2={"Buffer 1: "}
        />
        <MonitoringList
          topic={"Dummy Data"}
          status={"Alarm"}
          value1={dataBuffer}
          value2={dataCorridor}
          type1={"Buffer 1: "}
          type2={"Corridor 1: "}
        />
      </div>
    </div>
  );
}
