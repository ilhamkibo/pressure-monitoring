import React, { useState, useEffect } from "react";

export default function MonitoringList({
  topic,
  value1,
  value2,
  type1,
  type2,
}) {
  // Initialize difference state
  const [difference, setDifference] = useState(value1 - value2);
  const [status, setStatus] = useState(difference < 5 ? "Alarm" : "Normal");

  // Update difference and status whenever value1 or value2 changes
  useEffect(() => {
    const newDifference = Math.abs(value1 - value2);
    setDifference(newDifference);
    setStatus(newDifference < 5 ? "Alarm" : "Normal");
  }, [value1, value2]);

  return (
    <div
      className={`text-center ${
        status.toLowerCase() === "alarm" ? "bg-red-300" : "bg-green-300"
      } rounded-md`}
    >
      <h2 className="font-bold mt-4">{topic}</h2>
      <div className="p-4 2xl:p-16">
        <h3 className="font-semibold mb-2">Status: {status}</h3>
        <p className="text-xl">
          {type1} <span className="font-bold">{value1}</span> &gt; {type2}
          <span className="font-bold">{value2}</span>
        </p>
        <h1 className="font-bold text-6xl">{difference.toFixed(2)} Pa</h1>
      </div>
    </div>
  );
}
