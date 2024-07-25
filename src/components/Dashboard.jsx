// components/Dashboard.js
import MonitoringView from "./Monitoring/MonitoringView";
import HistoricalView from "./Historical/HistoricalView";

export default function Dashboard() {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <MonitoringView />
      <HistoricalView />
    </div>
  );
}
