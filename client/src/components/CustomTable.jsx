import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../features/DataSlice";
const OrdersTable = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.data);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchData());
    }
  }, [dispatch, status]);

  const [viewMode, setViewMode] = useState("Ürünlere Göre"); // Varsayılan mod
  const [sortColumn, setSortColumn] = useState(null); // Sıralanacak sütun
  const [sortDirection, setSortDirection] = useState("asc"); // "asc" veya "desc"
  const totalNetProfit = items?.reduce((acc, order) => {
    const netProfit =
      order.subtotal * order.primary_rate -
      (JSON.parse(order.products)[0].stocklogs[0].shipment_cost +
        JSON.parse(order.products)[0].stocklogs[0].stock_cost) *
        JSON.parse(order.products)[0].stocklogs[0].stock_quantity;
    return acc + netProfit;
  }, 0);

  // Sıralama işlevi
  const sortedOrders = [...items].sort((a, b) => {
    if (!sortColumn) return 0;

    // Hesaplanmış sütunlar için sıralama
    const aValue =
      sortColumn === "total_price"
        ? a.subtotal * a.primary_rate
        : sortColumn === "total_cost"
        ? (JSON.parse(a.products)[0].stocklogs[0].shipment_cost +
            JSON.parse(a.products)[0].stocklogs[0].stock_cost) *
          JSON.parse(a.products)[0].stocklogs[0].stock_quantity
        : a[sortColumn];

    const bValue =
      sortColumn === "total_price"
        ? b.subtotal * b.primary_rate
        : sortColumn === "total_cost"
        ? (JSON.parse(b.products)[0].stocklogs[0].shipment_cost +
            JSON.parse(b.products)[0].stocklogs[0].stock_cost) *
          JSON.parse(b.products)[0].stocklogs[0].stock_quantity
        : b[sortColumn];

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Sütun Başlıklarına Tıklayınca Sıralama Değiştirme
  const handleSort = (column) => {
    if (sortColumn === column) {
      // Aynı sütuna tıklanırsa sıralama yönünü değiştir
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Yeni sütuna tıklanırsa sıralama yönünü "asc" yap
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  return (
    <div className="p-4">
      {/* Dropdown Menü */}
      <div className="flex flex-col items-center justify-center w-full !no-underline">
        <span>📓</span>
        <span className="!no-underline">
          {" "}
          {(totalNetProfit + 100000).toFixed(2)} USD
        </span>
      </div>
      <div className="mb-4 text-sm">
        <label htmlFor="viewMode" className="mr-2 font-semibold">
          Görünüm Seç:
        </label>
        <select
          id="viewMode"
          value={viewMode}
          onChange={(e) => setViewMode(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="Ürünlere Göre">Ürünlere Göre</option>
          <option value="Siparişe Göre">Siparişe Göre</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-100 text-sm">
            <tr>
              {viewMode === "Ürünlere Göre" && (
                <th
                  className="px-4 py-2 border cursor-pointer"
                  onClick={() => handleSort("product_name")}
                >
                  Ürün{" "}
                  {sortColumn === "product_name" &&
                    (sortDirection === "asc" ? "↑" : "↓")}
                </th>
              )}
              <th
                className="px-4 py-2 border cursor-pointer"
                onClick={() => handleSort("invoice_number")}
              >
                Fatura Numarası{" "}
                {sortColumn === "invoice_number" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="px-4 py-2 border cursor-pointer"
                onClick={() => handleSort("total_quantity")}
              >
                Toplam Miktar{" "}
                {sortColumn === "total_quantity" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="px-4 py-2 border cursor-pointer"
                onClick={() => handleSort("total_price")}
              >
                Toplam Tutar{" "}
                {sortColumn === "total_price" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="px-4 py-2 border cursor-pointer"
                onClick={() => handleSort("total_cost")}
              >
                Toplam Maliyet{" "}
                {sortColumn === "total_cost" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="px-4 py-2 border cursor-pointer"
                onClick={() => handleSort("total_profit")}
              >
                Toplam Kâr{" "}
                {sortColumn === "total_profit" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {sortedOrders.map((order, index) => (
              <tr key={index}>
                {viewMode === "Ürünlere Göre" && (
                  <td className="px-4 py-2 ">
                    <span className="border border-indigo-700 px-2 py-1 bg-purple-100 text-purple-600	no-underline">
                      {JSON.parse(order.products)[0].product_name}
                    </span>
                  </td>
                )}
                <td className="px-4 py-2 border">{order.invoice_number}</td>
                <td className="px-4 py-2 border">
                  {JSON.parse(order.products)[0].quantity.toFixed(4)}
                </td>
                <td className="px-4 py-2 border">
                  {order.subtotal * order.primary_rate}
                </td>
                <td className="px-4 py-2 border">
                  {" "}
                  {(
                    (JSON.parse(order.products)[0].stocklogs[0].shipment_cost +
                      JSON.parse(order.products)[0].stocklogs[0].stock_cost) *
                    JSON.parse(order.products)[0].stocklogs[0].stock_quantity
                  ).toFixed(2)}{" "}
                  USD
                </td>
                <td className="px-4 py-2 border ">
                  <span
                    className={`px-2 py-1 border ${
                      order.subtotal * order.primary_rate -
                        (JSON.parse(order.products)[0].stocklogs[0]
                          .shipment_cost +
                          JSON.parse(order.products)[0].stocklogs[0]
                            .stock_cost) *
                          JSON.parse(order.products)[0].stocklogs[0]
                            .stock_quantity >
                      0
                        ? "bg-green-100"
                        : "bg-red-100"
                    }`}
                  >
                    {(
                      order.subtotal * order.primary_rate -
                      (JSON.parse(order.products)[0].stocklogs[0]
                        .shipment_cost +
                        JSON.parse(order.products)[0].stocklogs[0].stock_cost) *
                        JSON.parse(order.products)[0].stocklogs[0]
                          .stock_quantity
                    ).toFixed(2)}{" "}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
