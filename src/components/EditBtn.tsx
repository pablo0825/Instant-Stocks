import { StockItem } from "../types";

interface EditBtnProps {
  code: string;
  item: StockItem;
  editItem: string | null;
  setEditItem: (value: string) => void;
  setEditAskPrice: (value: number | undefined) => void;
}

const EditBtn = ({
  code,
  item,
  editItem,
  setEditItem,
  setEditAskPrice,
}: EditBtnProps) => {
  return (
    <>
      {" "}
      {editItem !== code ? (
        <button
          onClick={() => {
            setEditItem(code);
            setEditAskPrice(item.askPrice ?? undefined);
          }}
          className="py-1 px-4 bg-[#D9D9D9] rounded-2xl hover:bg-[#c8c8c8]"
        >
          修改
        </button>
      ) : (
        ""
      )}
    </>
  );
};

export default EditBtn;
