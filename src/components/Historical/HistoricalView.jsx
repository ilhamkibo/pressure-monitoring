// components/HistoricalView.js
"use client";
import { getLogResponse } from "@/libs/api-libs";
import { useEffect, useState } from "react";

export default function HistoricalView() {
  const [dataLog, setDataLog] = useState([]);

  const fetchApi = async (req, query) => {
    try {
      const logValues = await getLogResponse(req, query); // Pass the endpoint directly
      console.log("🚀 ~ fetchApi ~ logValues:", logValues);
      setDataLog(logValues);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Fetch data initially
    fetchApi("/alarm");

    // Set up an interval to fetch data every second
    const intervalId = setInterval(() => {
      fetchApi("/alarm");
    }, 5000); // 1000 milliseconds = 1 second

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="flex flex-col justify-center border-gray-300 h-1/2 rounded-md m-4 bg-white">
      <div className="border border-gray-300">
        <h1 className="font-bold p-2 text-xl">Historical View</h1>
      </div>
      <div className="flex flex-col justify-center h-full items-center p-4 border-x border-b border-gray-300">
        <div className="overflow-y-auto max-h-[25vh] border border-gray-300 rounded-md w-full">
          <table className="w-full border border-gray-300 bg-white">
            <thead className="sticky top-0 bg-gray-100">
              <tr>
                <th
                  colSpan={5}
                  className="bg-blue-500 py-2 px-4 border-b text-center"
                >
                  History Table
                </th>
              </tr>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b text-center">Number</th>
                <th className="py-2 px-4 border-b text-center">Trigger Date</th>
                <th className="py-2 px-4 border-b text-center">Trigger Time</th>
                <th className="py-2 px-4 border-b text-center">Value</th>
                <th className="py-2 px-4 border-b text-center">
                  Recovery Time
                </th>
              </tr>
            </thead>
            <tbody>
              {dataLog.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-2 px-4 border-b text-center">
                    No data available
                  </td>
                </tr>
              ) : (
                dataLog.data.map((log, index) => {
                  const createdAt = new Date(log.createdAt);
                  const updatedAt = log.updatedAt
                    ? new Date(log.updatedAt)
                    : null;

                  return (
                    <tr key={log.id}>
                      <td className="py-2 px-4 border-b text-center">
                        {index + 1}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {createdAt.toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {createdAt.toLocaleTimeString()}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {log.value.toFixed(2)}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {updatedAt ? updatedAt.toLocaleTimeString() : "-"}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
