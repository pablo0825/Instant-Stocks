import { useState } from "react";
import { useGlobalContext } from "../context/Context";
import { StockItem } from "../types";

const StockContainer = () => {
  const { stock, fetchData, addToList, remove } = useGlobalContext();
  const [stockCode, setStockCode] = useState<string>("");
  const [stockData, setStockData] = useState<StockItem | null>(null);
  const [askPrice, setAskPrice] = useState<number | undefined>();
  const [editItem, setEditITem] = useState<string | null>(null);
  const [editAskPrice, setEditAskPrice] = useState<number | undefined>();

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
      alert("股票代碼不存在");
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

  const handleSubmitEdit = (code: string) => {
    if (editAskPrice === undefined || isNaN(editAskPrice)) {
      alert("請輸入有效價格");
      return;
    }

    const existingItem = stock.get(code);
    if (!existingItem) return;

    const updatedItem = {
      ...existingItem,
      askPrice: editAskPrice,
    };

    addToList(updatedItem); // dispatch 更新
    setEditAskPrice(undefined);
    setEditITem(null);
  };

  return (
    <div>
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
          <p>開盤價：{stockData.o}</p>
          <p>成交時間：{stockData.t}</p>
          <input
            type="number"
            placeholder="輸入目標價格"
            value={askPrice ?? ""}
            onChange={(e) => setAskPrice(Number(e.target.value))}
          />
          <button onClick={handleAddToList}>增加</button>
        </div>
      ) : (
        <p>請輸入股票代碼並查詢</p>
      )}
      <div>
        {Array.from(stock.entries()).map(([code, item]) => (
          <div key={code}>
            <strong>
              {item.n}（{item.c}）
            </strong>
            <p>現價：{item.z}</p>
            {editItem === code ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmitEdit(code);
                }}
              >
                <input
                  type="number"
                  value={editAskPrice ?? ""}
                  onChange={(e) => setEditAskPrice(Number(e.target.value))}
                />
                <button type="submit">送出</button>
              </form>
            ) : (
              <p>目標價：{item.askPrice?.toFixed(2)}</p>
            )}
            <button onClick={() => remove(code)}>刪除</button>
            <button onClick={() => setEditITem(code)}>修改</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockContainer;
