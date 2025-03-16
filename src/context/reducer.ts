import { AppState, StockItem } from "../types";
import { REMOVE, ADD_ITEM, DISPLAY_ITEMS } from "./actions";

type Action =
  | { type: typeof REMOVE; payload: { id: string } }
  | { type: typeof ADD_ITEM; payload: { item: StockItem } }
  | { type: typeof DISPLAY_ITEMS; payload: { stock: Map<string, StockItem> } };

const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case REMOVE: {
      const newStock = new Map(state.stock);
      newStock.delete(action.payload.id);
      return { ...state, stock: newStock };
    }
    case ADD_ITEM: {
      const newStock = new Map(state.stock);
      newStock.set(action.payload.item.c, action.payload.item); // ✅ 總是覆蓋
      return { ...state, stock: newStock };
    }

    case DISPLAY_ITEMS: {
      return { ...state, stock: action.payload.stock, loading: false };
    }
    default:
      return state;
  }
};

export default reducer;
