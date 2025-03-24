export interface StockItem {
  c: string; //股票名稱
  n: string; //股票代號
  z: string; //最新成交價
  t: string; //成交時間
  o: string; //開盤價
  h: string; //當日最高價
  l: string; //當日最低價
  y: string; //昨收價
  askPrice?: number; //預計購買價格
}

export interface AppState {
  loading: boolean;
  stock: Map<string, StockItem>;
}
