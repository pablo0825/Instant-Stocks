import { useState } from "react";
import { useGlobalContext } from "../context/Context";
import { BiCaretDown } from "react-icons/bi";

const StockItem = () => {
  const { stock, addToList, remove } = useGlobalContext();
  const [editItem, setEditItem] = useState<string | null>(null);
  const [editAskPrice, setEditAskPrice] = useState<number | undefined>();
  const [changeItem, setChangeItem] = useState<Set<string>>(new Set());

  const toggleExpand = (code: string) => {
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

    addToList(updatedItem);
    setEditAskPrice(undefined);
    setEditItem(null);
  };

  return (
    <>
      {Array.from(stock.entries()).map(([code, item]) => {
        const isExpanded = changeItem.has(code);
        return (
          <div
            key={code}
            className="bg-[#F5F5F5] p-4 flex flex-col rounded-lg space-y-4 overflow-hidden transition-all duration-300 ease-in-out"
            style={{ height: isExpanded ? "12.76rem" : "5rem" }}
          >
            {/* 主要資訊 */}
            <div className="flex flex-1 gap-4 items-center">
              <div className="flex flex-col flex-1">
                <strong className="text-xl">{item.c}</strong>
                <strong className="text-sm">{item.n}</strong>
              </div>
              <p className="flex text-4xl font-bold">
                {isNaN(Number(item.z)) ? "_" : Number(item.z).toFixed(2)}
              </p>
              <button
                onClick={() => toggleExpand(code)}
                className="flex items-center justify-center w-[2rem] h-[2rem] bg-[#D9D9D9] rounded-full"
              >
                <BiCaretDown
                  className={`text-white text-xl transition-transform duration-500 ease-in-out ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            <div className="border-t-2"></div>

            {/* 次要資訊 */}
            <div>
              <div className="flex justify-between mb-4">
                <p>
                  開盤價：
                  {isNaN(Number(item.o)) ? "_" : Number(item.o).toFixed(2)}
                </p>
                <p>
                  最高價：
                  {isNaN(Number(item.h)) ? "_" : Number(item.h).toFixed(2)}
                </p>
                <p>
                  最低價：
                  {isNaN(Number(item.l)) ? "_" : Number(item.l).toFixed(2)}
                </p>
              </div>

              <div className="flex flex-row items-center">
                <div className="flex-1 flex">
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
                        onChange={(e) =>
                          setEditAskPrice(Number(e.target.value))
                        }
                      />
                      <button type="submit">送出</button>
                    </form>
                  ) : (
                    <p className="text-xl font-bold">
                      心動價：
                      {item.askPrice != null && !isNaN(item.askPrice)
                        ? item.askPrice.toFixed(2)
                        : "_"}
                    </p>
                  )}
                </div>
                <div className="space-x-4">
                  <button
                    onClick={() => {
                      setEditItem(code);
                      setEditAskPrice(item.askPrice ?? undefined);
                    }}
                    className="py-1 px-4 bg-[#D9D9D9] rounded-2xl"
                  >
                    修改
                  </button>
                  <button
                    onClick={() => remove(code)}
                    className="py-1 px-4 bg-[#FD90A3] rounded-2xl"
                  >
                    刪除
                  </button>
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
