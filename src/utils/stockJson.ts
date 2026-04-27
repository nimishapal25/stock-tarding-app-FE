export interface StockItem {
  id: number;
  symbol: string;
  name: string;
  exchange: string;
  sector: string;
  price: string;
  changePercent: number;
  changeAmount: string;
  volume: string;
}

export const stocks: StockItem[] = [
  {
    id: 1,
    symbol: "REL",
    name: "Reliance Industries",
    exchange: "NSE",
    sector: "Energy",
    price: "2,945.20",
    changePercent: 1.85,
    changeAmount: "53.40",
    volume: "12.4M",
  },
  {
    id: 2,
    symbol: "TCS",
    name: "Tata Consultancy",
    exchange: "NSE",
    sector: "IT Services",
    price: "3,842.10",
    changePercent: -0.65,
    changeAmount: "25.10",
    volume: "4.2M",
  },
  {
    id: 3,
    symbol: "HDF",
    name: "HDFC Bank",
    exchange: "NSE",
    sector: "Banking",
    price: "1,452.80",
    changePercent: 2.1,
    changeAmount: "29.80",
    volume: "22.8M",
  },
];
