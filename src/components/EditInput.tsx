import { StockItem } from "../types";
import { useGlobalContext } from "../context/Context";

interface EditInputProps {
  code: string;
  item: StockItem;
  editItem: string | null;
  editAskPrice: number | undefined;
  setEditItem: (value: string | null) => void;
  setEditAskPrice: (value: number | undefined) => void;
}

const EditInput = ({
  code,
  item,
  editItem,
  editAskPrice,
  setEditItem,
  setEditAskPrice,
}: EditInputProps) => {
  const { stock, addToList } = useGlobalContext();

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
    <div className="flex-1 flex">
      {editItem === code ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitEdit(code);
          }}
          className="space-x-2"
        >
          <input
            type="number"
            value={editAskPrice ?? ""}
            onChange={(e) => setEditAskPrice(Number(e.target.value))}
            className="max-w-[80px]"
          />
          <button
            type="submit"
            className="hover:underline underline-offset-2 hover:text-[#FD90A3]"
          >
            送出
          </button>
          <button
            type="submit"
            className="hover:underline underline-offset-2 hover:text-[#FD90A3]"
            onClick={() => setEditItem("")}
          >
            取消
          </button>
        </form>
      ) : (
        <p className="text-lg font-bold">
          心動價：
          {item.askPrice != null && !isNaN(item.askPrice)
            ? item.askPrice.toFixed(2)
            : ""}
        </p>
      )}
    </div>
  );
};

export default EditInput;
