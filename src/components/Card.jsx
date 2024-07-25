"use client";

import React, { useEffect, useState } from "react";
import DataList from "@/components/DataList";
import { io } from "socket.io-client";

export default function Card() {
  const [dataAddress0, setDataAddress0] = useState(null);
  const [dataAddress1, setDataAddress1] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("modbusData", (data) => {
      setDataAddress0(data[0]);
      setDataAddress1(data[9]);
    });

    return () => {
      socket.off("modbusData");
      socket.off("connect");
    };
  }, []);

  return (
    <div className="flex flex-grow">
      <DataList address={0} dataAddress={dataAddress0} />
      <DataList address={9} dataAddress={dataAddress1} />
    </div>
  );
}
