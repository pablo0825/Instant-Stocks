import usePriceNoti from "../hooks/usePriceNoti";
import useAutoUpdateStock from "../hooks/useAutoUpdateStock ";
import StockItemList from "./StockItem";
import StockInput from "./StockInput";

const StockContainer = () => {
  /* 價格通知 */
  usePriceNoti();

  /* 10分鐘更新 */
  useAutoUpdateStock();

  return (
    <div className="m-4 max-w-[336px]">
      <StockInput />
      <div className="space-y-4">
        <StockItemList />
      </div>
    </div>
  );
};

export default StockContainer;
