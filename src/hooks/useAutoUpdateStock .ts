import { useEffect, useRef } from "react";
import { useGlobalContext } from "../context/Context";
import { StockItem } from "../types";

const useAutoUpdateStock = () => {
  const { stock, fetchData, addToList } = useGlobalContext();

  const stockRef = useRef<Map<string, StockItem>>(stock);

  useEffect(() => {
    stockRef.current = stock;
  }, [stock]);

  const updateStock = async () => {
    const currentStock = stockRef.current;

    for (const [code, oldItem] of currentStock.entries()) {
      console.log("更新股票", code);

      const newItem = await fetchData(code);

      if (newItem) {
        const updatedItem = { ...newItem, askPrice: oldItem.askPrice };
        addToList(updatedItem);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateStock();
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);
};

export default useAutoUpdateStock;
