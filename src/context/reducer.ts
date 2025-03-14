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
      const item = action.payload.item;

      if (!newStock.has(item.c)) {
        newStock.set(item.c, item);
      }
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
