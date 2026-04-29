import { useEffect, useState } from "react";
import { allStocksAPI } from "../api/allStocksAPI";
import { io, type Socket } from "socket.io-client";

const chipBySymbol: Record<string, string> = {
  REL: "bg-blue-50 border-blue-100 text-indigo-600",
  TCS: "bg-purple-50 border-purple-100 text-purple-600",
  HDF: "bg-orange-50 border-orange-100 text-orange-500",
};

type LiveStock = {
  instrument_token: number;
  symbol: string;
  exchange: string;
  last_price: number;
  change: number;
  ohlc?: { close?: number };
  volume_traded: number;
};

type PaginationInfo = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

const DEFAULT_LIMIT = 5;
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export const StockList = () => {
  const [stocks, setStocks] = useState<LiveStock[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);

  const fetchPage = async (targetPage: number) => {
    try {
      setLoading(true);
      const res = await allStocksAPI.getAllStocks(targetPage, DEFAULT_LIMIT);
      const payload = res.data?.data ?? {};
      const newStocks = (payload.data ?? []) as LiveStock[];
      const nextPagination = (payload.pagination ??
        null) as PaginationInfo | null;

      setStocks((prev) => {
        if (targetPage === 1) return newStocks;

        const map = new Map(prev.map((s) => [s.instrument_token, s]));
        newStocks.forEach((s) => map.set(s.instrument_token, s));
        return Array.from(map.values());
      });

      setPagination(nextPagination);
      setPage(targetPage);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch with retry (handles "first tick not arrived yet")
  useEffect(() => {
    let retryCount = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const fetchInitial = async () => {
      const res = await allStocksAPI.getAllStocks(1, DEFAULT_LIMIT);
      const payload = res.data?.data ?? {};
      const newStocks = (payload.data ?? []) as LiveStock[];
      const nextPagination = (payload.pagination ??
        null) as PaginationInfo | null;

      if (newStocks.length === 0 && retryCount < 5) {
        retryCount += 1;
        timer = setTimeout(fetchInitial, 1000);
        return;
      }

      setStocks(newStocks);
      setPagination(nextPagination);
      setPage(1);
    };

    fetchInitial();

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  // Socket live updates for loaded rows
  useEffect(() => {
    const socket: Socket = io(SOCKET_URL, {
      transports: ["websocket"],
      withCredentials: true,
    });

    socket.on("stocks:update", (updatedStocks: LiveStock[]) => {
      setStocks((prev) => {
        const map = new Map(prev.map((s) => [s.instrument_token, s]));

        updatedStocks.forEach((u) => {
          if (map.has(u.instrument_token)) {
            map.set(u.instrument_token, {
              ...(map.get(u.instrument_token) ?? {}),
              ...u,
            } as LiveStock);
          }
        });

        return Array.from(map.values());
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleLoadMore = () => {
    if (!pagination?.hasNext || loading) return;
    fetchPage(page + 1);
  };

  return (
    <section className="bg-white shadow-sm border border-slate-200 rounded-2xl overflow-y-scroll custom-scroll">
      <div className="top-0 z-10 sticky gap-4 grid grid-cols-12 bg-gray-50 px-6 py-4 border-slate-200 border-b font-semibold text-gray-500 text-xs uppercase tracking-wider">
        <div className="col-span-5 md:col-span-4 lg:col-span-3">Company</div>
        <div className="hidden lg:block lg:col-span-3 text-center">
          Trend (7D)
        </div>
        <div className="col-span-4 md:col-span-3 lg:col-span-2 text-right">
          Market Price
        </div>
        <div className="hidden md:block md:col-span-3 lg:col-span-2 text-right">
          Volume
        </div>
        <div className="col-span-3 md:col-span-2 lg:col-span-2 text-right">
          Action
        </div>
      </div>

      <div className="divide-y divide-slate-200">
        {stocks.map((stock) => {
          const isUp = stock.change > 0;
          const changeAmount = stock.ohlc?.close
            ? stock.last_price - stock.ohlc.close
            : 0;
          return (
            <div
              key={stock.instrument_token}
              className="group relative items-center gap-4 grid grid-cols-12 bg-white hover:bg-gray-50 px-6 py-4 transition-colors"
            >
              <div className="flex items-center gap-3 col-span-5 md:col-span-4 lg:col-span-3">
                <div
                  className={`w-10 h-10 rounded-lg border flex items-center justify-center flex-shrink-0 font-bold text-sm ${chipBySymbol[stock.symbol] ?? "bg-slate-50 border-slate-200 text-slate-600"}`}
                >
                  {stock.symbol.slice(0, 3)}
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-gray-900 text-sm truncate">
                    {stock.symbol}
                  </h4>
                  <p className="text-gray-500 text-xs truncate">
                    {stock.exchange} - Equity
                  </p>
                </div>
              </div>

              <div className="hidden lg:flex justify-center lg:col-span-3">
                <div
                  className={`w-28 h-10 rounded-md ${isUp ? "bg-emerald-50" : "bg-red-50"}`}
                />
              </div>

              <div className="relative flex justify-end items-center col-span-4 md:col-span-3 lg:col-span-4 h-full">
                <div className="right-0 absolute flex justify-end items-center gap-8 group-hover:opacity-0 w-full transition-all group-hover:translate-x-[-10px] duration-200">
                  <div className="text-right">
                    <div className="font-bold text-gray-900 text-sm">
                      Rs {stock.last_price.toFixed(2)}
                    </div>
                    <div
                      className={`text-xs font-medium ${isUp ? "text-emerald-500" : "text-red-500"}`}
                    >
                      {isUp ? "+" : ""}
                      {stock.change.toFixed(2)}% (Rs {changeAmount.toFixed(2)})
                    </div>
                  </div>
                  <div className="hidden md:block w-20 text-right">
                    <div className="text-gray-700 text-sm">
                      {stock.volume_traded}
                    </div>
                  </div>
                </div>

                <div className="right-0 absolute flex items-center gap-2 bg-gray-50 opacity-0 group-hover:opacity-100 py-1 pl-4 transition-all translate-x-[10px] group-hover:translate-x-0 duration-200">
                  <button className="bg-white hover:bg-indigo-50 px-4 py-2 border border-indigo-500 rounded-lg font-semibold text-indigo-600 text-xs transition-colors">
                    View
                  </button>
                  <button className="bg-emerald-500 hover:bg-emerald-600 shadow-sm px-4 py-2 rounded-lg font-semibold text-white text-xs transition-colors">
                    Buy
                  </button>
                </div>
              </div>

              <div className="flex justify-end col-span-3 md:col-span-2 lg:col-span-2">
                <button
                  className="flex justify-center items-center hover:bg-emerald-50 border border-slate-200 hover:border-emerald-500 rounded-full w-8 h-8 text-gray-400 hover:text-emerald-500 transition-all"
                  title="Add to Watchlist"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gray-50/30 p-4 border-slate-200 border-t text-center">
        <button
          onClick={handleLoadMore}
          disabled={loading || !pagination?.hasNext}
          className="font-semibold text-indigo-600 hover:text-indigo-500 disabled:text-gray-400 text-sm transition-colors disabled:cursor-not-allowed"
        >
          {loading
            ? "Loading..."
            : pagination?.hasNext
              ? "Load More Stocks"
              : "No More Stocks"}
        </button>
      </div>
    </section>
  );
};
