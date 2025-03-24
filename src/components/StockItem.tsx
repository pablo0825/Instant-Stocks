import { useState } from "react";
import { useGlobalContext } from "../context/Context";
import { BiCaretDown } from "react-icons/bi";
import RemoveBtn from "./RemoveBtn";
import EditBtn from "./EditBtn";
import EditInput from "./EditInput";

const StockItem = () => {
  const { stock } = useGlobalContext();
  const [editItem, setEditItem] = useState<string | null>(null);
  const [editAskPrice, setEditAskPrice] = useState<number | undefined>();
  const [changeItem, setChangeItem] = useState<string | null>(null);

  /*   const [changeItem, setChangeItem] = useState<Set<string>>(new Set()); //唯一值，不能重複
   */

  const toggleExpand = (code: string) => {
    setChangeItem((prev) => (prev === code ? null : code));
    setEditItem("");
  };

  /* 允許多打開 */
  /*   const toggleExpand = (code: string) => {
    setChangeItem((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(code)) {
        newSet.delete(code);
      } else {
        newSet.add(code);
      }
      return newSet;
    });
  };
 */
  const handlePriceColor = (currentPrice: string, referencePrice: string) => {
    if (currentPrice > referencePrice) {
      return "red";
    } else if (currentPrice < referencePrice) {
      return "#32C759";
    } else {
      return "black";
    }
  };

  return (
    <>
      {Array.from(stock.entries()).map(([code, item]) => {
        /*  const isExpanded = changeItem.has(code); */
        const isExpanded = changeItem === code;
        return (
          <div
            key={code}
            className="bg-[#F5F5F5] py-2 px-3 min-w-xs flex flex-col rounded-lg space-y-2 overflow-hidden transition-all duration-300 ease-in-out"
            style={{ height: isExpanded ? "9.6rem" : "4rem" }}
          >
            {/* 主要資訊 */}
            <div className="flex flex-1 gap-4 items-center">
              <div className="flex flex-col flex-1">
                <strong className="text-xl">{item.c}</strong>
                <strong className="text-sm text-neutral-400">{item.n}</strong>
              </div>
              <p
                className="flex text-4xl font-bold"
                style={{ color: handlePriceColor(item.z, item.y) }}
              >
                {isNaN(Number(item.z)) ? "_" : Number(item.z).toFixed(2)}
              </p>
              <button
                onClick={() => toggleExpand(code)}
                className="flex items-center justify-center w-[2rem] h-[2rem] bg-[#D9D9D9] rounded-full hover:bg-[#cbcbcb]"
              >
                <BiCaretDown
                  className={`text-white text-xl transition-transform duration-500 ease-in-out ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
            {/* 分隔線 */}
            <div className="border-t-2"></div>
            {/* 次要資訊 */}
            <div>
              {/* 次要-第一層 */}
              <div className="flex justify-between mb-4">
                <p className="text-sm">
                  昨收價：
                  {isNaN(Number(item.y)) ? "_" : Number(item.y).toFixed(2)}
                </p>
                <p className="text-sm">
                  當日最低價：
                  {isNaN(Number(item.l)) ? "_" : Number(item.l).toFixed(2)}
                </p>
              </div>
              {/* 次要-第二層 */}
              <div className="flex flex-row items-center">
                <EditInput
                  code={code}
                  item={item}
                  editItem={editItem}
                  editAskPrice={editAskPrice}
                  setEditItem={setEditItem}
                  setEditAskPrice={setEditAskPrice}
                />
                <div className="space-x-2">
                  <EditBtn
                    code={code}
                    item={item}
                    editItem={editItem}
                    setEditItem={setEditItem}
                    setEditAskPrice={setEditAskPrice}
                  />
                  <RemoveBtn code={code} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default StockItem;
