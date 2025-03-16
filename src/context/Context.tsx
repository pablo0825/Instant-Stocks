import { useContext, useReducer, createContext, ReactNode } from "react";
import { StockItem, AppState } from "../types";
import { REMOVE, ADD_ITEM } from "./actions";
import reducer from "./reducer";
import axios from "axios";

interface AppContextProps extends AppState {
  remove: (id: string) => void;
  addToList: (item: StockItem) => void;
  fetchData: (code: string) => Promise<StockItem | null>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

const initialState = {
  loading: false,
  stock: new Map<string, StockItem>(),
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = async (code: string): Promise<StockItem | null> => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/stock?code=${code}`
      );

      if (!response.data?.msgArray || response.data.msgArray.length === 0) {
        return null;
      }

      return response.data.msgArray[0];
    } catch (err) {
      console.error("載入失敗", err);
      return null;
    }
  };

  /* 行為 */
  const remove = (id: string) => dispatch({ type: REMOVE, payload: { id } });
  const addToList = (item: StockItem) =>
    dispatch({ type: ADD_ITEM, payload: { item } });

  return (
    <AppContext.Provider
      value={{
        ...state,
        fetchData,
        remove,
        addToList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within an AppProvider");
  }
  return context;
};
