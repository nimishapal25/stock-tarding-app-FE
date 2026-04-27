import { SearchComponent } from "./SearchComponent";

export const NavbarComponent = () => {
  return (
    <header
      id="TopNav"
      className="top-0 z-50 sticky flex-shrink-0 bg-white border-slate-200 border-b h-[72px]"
    >
      <div className="flex justify-between items-center mx-auto px-6 max-w-[1600px] h-full">
        {/* Left: Logo + Tabs */}
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="flex justify-center items-center bg-emerald-500 shadow-black/5 shadow-xl rounded-lg w-8 h-8 text-white">
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V400c0 44.2 35.8 80 80 80H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H80c-8.8 0-16-7.2-16-16V64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z"
                />
              </svg>
            </div>
            <span className="font-bold text-gray-900 text-xl tracking-tight">
              TradePro
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 pt-1 h-full">
            <button className="flex items-center pb-5 border-emerald-500 border-b-2 h-full font-semibold text-emerald-500 text-sm">
              Stocks
            </button>
            <button className="flex items-center pb-5 border-transparent border-b-2 h-full font-medium text-gray-500 hover:text-gray-900 text-sm transition-colors">
              Watchlist
            </button>
            <button className="flex items-center pb-5 border-transparent border-b-2 h-full font-medium text-gray-500 hover:text-gray-900 text-sm transition-colors">
              Orders & Positions
            </button>
          </nav>
        </div>

        {/* Center: Search */}
        <SearchComponent />

        {/* Right: Actions */}
        <div className="flex items-center gap-5">
          <button className="relative text-gray-500 hover:text-gray-900 transition-colors">
            <svg
              className="w-[18px] h-[18px]"
              aria-hidden="true"
              viewBox="0 0 448 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"
              />
            </svg>
            <span className="top-0 right-0 absolute bg-red-500 border border-white rounded-full w-2 h-2" />
          </button>

          <div className="hidden sm:flex flex-col items-end">
            <span className="font-bold text-gray-900 text-sm">$32,485.95</span>
            <span className="flex items-center gap-1 text-emerald-500 text-xs">
              <svg
                className="w-2.5 h-2.5"
                aria-hidden="true"
                viewBox="0 0 320 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"
                />
              </svg>
              1.24%
            </span>
          </div>

          <button className="border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 w-10 h-10 overflow-hidden transition-all">
            <img
              className="w-full h-full object-cover"
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/6d0079dad7-de2c088ca921004860b9.png"
              alt="Trader profile"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
