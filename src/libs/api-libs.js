export async function getModbusData(req, res) {
  const response0 = await fetch("http://localhost:5000/api/modbus/address0");
  const data0 = await response0.json();

  const response1 = await fetch("http://localhost:5000/api/modbus/address1");
  const data1 = await response1.json();

  res.status(200).json({ address0: data0, address1: data1 });
}
