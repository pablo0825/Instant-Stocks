import { useEffect, useRef } from "react";
import { useGlobalContext } from "../context/Context";

const usePriceNoti = () => {
  const { stock } = useGlobalContext();

  const lastNotifiedRef = useRef<Map<string, number>>(new Map());

  const priceNoti = () => {
    const now = Date.now();

    stock.forEach((item) => {
      const currentPrice = Number(item.z);
      const askPrice = Number(item.askPrice);

      if (item.askPrice !== undefined && currentPrice <= askPrice) {
        const lastNotifiedTime = lastNotifiedRef.current.get(item.c);
        // ✅ 若未曾通知過，或距離上次通知已超過30分鐘
        if (!lastNotifiedTime || now - lastNotifiedTime >= 30 * 60 * 1000) {
          alert(`${item.c} 價格已跌至 ${currentPrice.toFixed(2)}`);
          lastNotifiedRef.current.set(item.c, now); // ✅ 記錄本次通知時間
        }
      }
    });
  };

  useEffect(() => {
    /* 可能有一個問題，就是每次stock有改動，都會刷新一下次，對效能可能不太好 */
    priceNoti();
  }, [stock]);
};

export default usePriceNoti;
