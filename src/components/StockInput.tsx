import { useState } from "react";
import { useGlobalContext } from "../context/Context";

const StockInput = () => {
  const { stock, fetchData, addToList } = useGlobalContext();
  const [stockCode, setStockCode] = useState<string>("");
  const [error, setError] = useState<string | null>(null); // 錯誤提示

  const handleAddToList = async () => {
    if (!stockCode || stockCode.trim() === "") {
      setError("請輸入股票代碼");
      setStockCode("");
      return;
    }

    if (stock.has(stockCode)) {
      setError(`股票代碼 ${stockCode} 已經在列表中！`);
      setStockCode("");
      return;
    }

    const result = await fetchData(stockCode);

    if (!result || result.c === "") {
      setError("查無此股票資料");
      setStockCode("");
      return;
    }

    const newItem = result;
    addToList(newItem);
    alert(`股票 ${newItem.c} 已加入清單`); // ✅ 成功提示

    setError(null);
    setStockCode("");
  };

  return (
    <div className="pb-4">
      {/* input */}
      <div className="flex">
        <input
          type="text"
          placeholder="請輸入股票代號"
          value={stockCode}
          onChange={(e) => setStockCode(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddToList();
          }}
          className="p-2 rounded-l-lg border border-gray-300 flex-1"
        />
        <button
          onClick={handleAddToList}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 "
        >
          增加
        </button>
      </div>
      {/* error */}
      <div>{error && <p className="pt-2 pb-2 text-red-500">{error}</p>}</div>
    </div>
  );
};

export default StockInput;
