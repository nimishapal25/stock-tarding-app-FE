import { stocks } from "../../../utils/stockJson";

const watchlistStocks = stocks.slice(0, 3);

export const WatchlistSlider = () => {
  return (
    <aside className="hidden z-20 relative xl:flex flex-col bg-white border-slate-200 border-l w-95 h-fit shrink-0">
      <div className="flex justify-between items-center bg-white px-6 py-5 border-slate-200 border-b">
        <div>
          <h2 className="font-bold text-gray-900 text-lg">My Watchlist</h2>
          <p className="mt-0.5 text-gray-500 text-xs">
            {watchlistStocks.length} items tracking
          </p>
        </div>
        <button className="hover:bg-slate-100 p-2 rounded-lg text-gray-400 hover:text-gray-900 transition-colors">
          ...
        </button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-3">
          {watchlistStocks.map((stock) => {
            const isUp = stock.changePercent > 0;
            return (
              <div
                key={stock.id}
                className="group bg-white shadow-sm hover:shadow-md p-4 border border-slate-200 rounded-2xl transition-shadow cursor-pointer"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex justify-center items-center bg-slate-50 border border-slate-200 rounded-full w-8 h-8 font-bold text-slate-700 text-xs">
                      {stock.symbol}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">
                        {stock.name}
                      </h4>
                      <p className="text-gray-500 text-xs">{stock.exchange}</p>
                    </div>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-opacity">
                    x
                  </button>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="font-bold text-gray-900 text-lg">
                      Rs {stock.price}
                    </div>
                    <div
                      className={`text-xs font-medium ${isUp ? "text-emerald-500" : "text-red-500"}`}
                    >
                      {isUp ? "+" : ""}
                      {stock.changePercent}%
                    </div>
                  </div>
                  <div
                    className={`h-8 w-24 rounded-md ${isUp ? "bg-emerald-50" : "bg-red-50"}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-gray-50/50 p-4 border-slate-200 border-t">
        <button className="flex justify-center items-center gap-2 bg-gray-900 hover:bg-black shadow-sm py-3 rounded-2xl w-full font-semibold text-white text-sm transition-colors">
          View Full Watchlist
        </button>
      </div>
    </aside>
  );
};
