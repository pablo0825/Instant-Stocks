/* import { useEffect, useState } from "react"; */
import "./App.css";
import StockContainer from "./components/StockContainer";
import { AppProvider } from "./context/Context";

function App() {
  /*   const { stock, remove, increase, fetchData } = useGlobalContext();

  const [stockData, setStockData] = useState<StockItem | null>(null);
  const [stockCode, setStockCode] = useState<string>("");

  const [stockList, setStockList] = useState<Map<string, StockItem>>(new Map());

  const [askPrice, setAskPrice] = useState<number>();

  const [notifiedCodes, setNotifiedCodes] = useState<Set<string>>(new Set());

  const [editingItemCode, setEditingItemCode] = useState<string | null>(null);

  const [editAskPrice, setEditAskPrice] = useState<number | undefined>();

  const handleSearch = () => {
    setAskPrice(undefined);
    fetchData(stockCode);
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

  const handleSubmitEdit = (code: string) => {
    if (editAskPrice === undefined || isNaN(editAskPrice)) {
      alert("請輸入有效價格");
      return;
    }

    setStockList((pre) => {
      const newMap = new Map(pre);
      const item = newMap.get(code);
      if (item) {
        const updateItem = {
          ...item,
          askPrice: editAskPrice,
        };
        newMap.set(code, updateItem);
      }
      return newMap;
    });

    setEditingItemCode(null);
    setEditAskPrice(undefined);
  }; */
  /* 
  const updateAllStockList = async () => {
    setStockList((prevStockList) => {
      const updatedMap = new Map(prevStockList);

      for (const [code, oldItem] of prevStockList.entries()) {
        axios
          .get(`http://localhost:3001/api/stock?code=${code}`)
          .then((response) => {
            if (response.data?.msgArray?.length > 0) {
              const newItem = response.data.msgArray[0];
              updatedMap.set(code, {
                ...newItem,
                askPrice: oldItem.askPrice, // 保留原來的 askPrice
              });
              setStockList(new Map(updatedMap)); // ✅ 更新每一筆成功才 set
            }
          })
          .catch((err) => {
            console.error(`更新 ${code} 失敗`, err);
          });
      }

      return prevStockList; // 不直接覆蓋
    });
  };
 */
  // 🔁 股票定時更新
  /*   useEffect(() => {
    const interval = setInterval(() => {
      console.log("執行股票更新...");
      updateAllStockList();
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, []); // ← 只執行一次 */

  // 🔔 每次 stockList 更新 → 比對價格是否低於設定值
  /*   useEffect(() => {
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
  }, [stockList]); */

  return (
    <AppProvider>
      <StockContainer />
    </AppProvider>
  );
}

export default App;
