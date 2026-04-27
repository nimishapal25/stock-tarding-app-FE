import { useState } from "react";

export const SearchComponent = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <div className="hidden lg:block flex-1 px-8 max-w-xl">
      <div className="group relative">
        <div className="left-0 absolute inset-y-0 flex items-center pl-4 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-400 group-focus-within:text-emerald-500 transition-colors"
            aria-hidden="true"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
            />
          </svg>
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
          placeholder="Search stocks, ETFs, indices..."
          className="block bg-slate-100 focus:bg-white py-2.5 pr-4 pl-11 border border-slate-200 focus:border-emerald-400 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-emerald-400/20 w-full text-gray-900 text-sm transition-all duration-200 placeholder-gray-500"
        />

        {showDropdown && (
          <div className="top-full right-0 left-0 z-50 absolute bg-white shadow-card mt-2 border border-slate-200 rounded-[16px] overflow-hidden">
            <div className="p-2">
              <div className="px-3 py-2 font-semibold text-gray-500 text-xs uppercase tracking-wider">
                Recent Searches
              </div>

              <button
                type="button"
                className="flex justify-between items-center hover:bg-slate-50 px-3 py-2.5 rounded-lg w-full text-left transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex justify-center items-center bg-blue-100 rounded-full w-8 h-8 font-bold text-blue-600 text-xs">
                    RELI
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">
                      Reliance Industries
                    </div>
                    <div className="text-gray-500 text-xs">NSE • Equity</div>
                  </div>
                </div>
                <span className="text-gray-400 text-xs">₹2,945.20</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
