import { useState } from "react";
import { useGlobalContext } from "../context/Context";
import { StockItem } from "../types";
import usePriceNoti from "../hooks/usePriceNoti";
import useAutoUpdateStock from "../hooks/useAutoUpdateStock ";
import StockItemList from "./StockItem";

const StockContainer = () => {
  const { stock, fetchData, addToList } = useGlobalContext();
  const [stockCode, setStockCode] = useState<string>("");
  const [stockData, setStockData] = useState<StockItem | null>(null);
  const [askPrice, setAskPrice] = useState<number | undefined>();

  const handleSearch = async () => {
    if (!stockCode || stockCode.trim() === "") {
      alert("請輸入股票代碼");
      setStockCode("");
      return;
    }

    if (stock.has(stockCode)) {
      alert(`股票代碼 ${stockCode} 已經在列表中！`);
      setStockCode("");
      return;
    }

    const result = await fetchData(stockCode);

    if (result?.c === "") {
      alert("查無此股票資料");
      setStockCode("");
      return;
    } else {
      setStockData(result);
    }
  };

  const handleAddToList = () => {
    if (!stockData) return;
    if (stock.has(stockData.c)) {
      alert("已存在清單中");
      return;
    }
    const newItem = { ...stockData, askPrice };
    addToList(newItem);

    setStockData(null);
    setAskPrice(undefined);
    setStockCode("");
  };

  /* 價格通知 */
  usePriceNoti();

  /* 10分鐘更新 */
  useAutoUpdateStock();

  return (
    <div className="m-4">
      <h2>股票查詢</h2>
      <input
        type="text"
        value={stockCode}
        onChange={(e) => setStockCode(e.target.value)}
      />
      <button onClick={handleSearch}>查詢</button>
      {stockData ? (
        <div>
          <h3>
            {stockData.n}（{stockData.c}）
          </h3>
          <p>最新成交價：{stockData.z}</p>
          {/*          <p>開盤價：{stockData.o}</p>
          <p>成交時間：{stockData.t}</p>
          <input
            type="number"
            placeholder="輸入目標價格"
            value={askPrice ?? ""}
            onChange={(e) => setAskPrice(Number(e.target.value))}
          /> */}
          <button onClick={handleAddToList}>增加</button>
        </div>
      ) : (
        <p>請輸入股票代碼並查詢</p>
      )}
      <div className="space-y-4">
        <StockItemList />
      </div>
    </div>
  );
};

export default StockContainer;
