import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { StockItem } from "./types";

function App() {
  const [stockData, setStockData] = useState<StockItem | null>(null);
  const [stockCode, setStockCode] = useState<string>("");

  const [stockList, setStockList] = useState<Map<string, StockItem>>(new Map());

  const [askPrice, setAskPrice] = useState<number>();

  const [notifiedCodes, setNotifiedCodes] = useState<Set<string>>(new Set());

  const [editingItemCode, setEditingItemCode] = useState<string | null>(null);

  const fetchData = async () => {
    if (!stockCode || stockCode.trim() === "") {
      alert("請輸入股票代碼");
      return;
    }

    if (stockList.has(stockCode)) {
      alert(`股票代碼 ${stockCode} 已經在列表中！`);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:3001/api/stock?code=${stockCode}`
      );

      if (!response.data?.msgArray || response.data.msgArray.length === 0) {
        console.error("資料格式錯誤:", response.data);
        return;
      }

      const item: StockItem = response.data.msgArray[0];
      setStockData(item);
    } catch (error) {
      console.error("載入資料失敗:", error);
    }
  };

  const handleSearch = () => {
    setAskPrice(undefined);
    fetchData();
  };

  const handleAddToList = (item: StockItem) => {
    const updateItem = {
      ...item,
      askPrice: askPrice ? Number(askPrice) : undefined,
    };

    setStockList((pre) => {
      const newMap = new Map(pre);
      newMap.set(stockCode, updateItem);
      return newMap;
    });

    setStockData(null);
    setAskPrice(undefined);
  };

  const handleRemoveToList = (code: string) => {
    setStockList((pre) => {
      const newMap = new Map(pre);
      newMap.delete(code);
      return newMap;
    });

    setNotifiedCodes((pre) => {
      const newSet = new Set(pre);
      newSet.delete(code);
      return newSet;
    });

    // 如果當前顯示的是被刪除的股票，清空
    if (stockData?.c === code) {
      setStockData(null);
    }
  };

  useEffect(() => {
    const newSet = new Set(notifiedCodes);
    stockList.forEach((item) => {
      const currentPrice = Number(item.z);
      const askPrice = Number(item.askPrice);

      if (
        item.askPrice !== undefined &&
        currentPrice <= askPrice &&
        !newSet.has(item.c)
      ) {
        alert(`${item.c} 價格已跌至 ${currentPrice.toFixed(2)}`);
        newSet.add(item.c);
      }
    });
    setNotifiedCodes(newSet);
  }, [stockList]);

  return (
    <div>
      <div>
        <h2>股票查詢</h2>
        <input
          type="text"
          value={stockCode}
          onChange={(e) => setStockCode(e.target.value)}
        />
        <button onClick={handleSearch}>查詢</button>
      </div>
      {stockData ? (
        <div>
          <h2>
            {stockData.n}（{stockData.c}）
          </h2>
          <p>最新成交價：{stockData.z}</p>
          <p>當日開盤價：{stockData.o}</p>
          <p>成交時間：{stockData.t}</p>
          <input
            type="number"
            value={askPrice ?? ""}
            onChange={(e) => setAskPrice(Number(e.target.value))}
          />
          <button onClick={() => handleAddToList(stockData)}>增加</button>
        </div>
      ) : (
        <p>請輸入股票代碼並查詢...</p>
      )}
      {/* 股票列表 */}
      <div>
        {Array.from(stockList.entries()).map(([code, item]) => (
          <div key={code}>
            <h2>
              {item.n}（{item.c}）
            </h2>
            <p>最新成交價：{item.z}</p>
            <p>當日開盤價：{item.o}</p>
            <p>當日最高價：{item.h}</p>
            <p>當日最低價：{item.l}</p>
            <p>成交時間：{item.t}</p>
            <div>
              {editingItemCode === code ? (
                <input
                  type="number"
                  value={askPrice ?? ""}
                  onChange={(e) => setAskPrice(Number(e.target.value))}
                />
              ) : (
                item.askPrice !== undefined && (
                  <p>目標價格（Ask Price）：{item.askPrice.toFixed(2)}</p>
                )
              )}
            </div>
            <button onClick={() => handleRemoveToList(code)}>刪除</button>
            <button onClick={() => setEditingItemCode(code)}>修改</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
