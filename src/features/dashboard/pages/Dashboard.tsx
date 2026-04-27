import { NavbarComponent } from "../../../components/UI/NavbarComponent";
import { StockList } from "../component/StockList";
import { WatchlistSlider } from "../component/WatchlistSlider";

export function Dashboard() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <NavbarComponent />

      <main className="flex flex-1 bg-slate-50 mx-auto w-full max-w-400 min-h-0 overflow-hidden">
        <div className="flex flex-col flex-1 p-6 lg:p-8 min-h-0">
          <section className="mb-8">
            <h1 className="mb-6 font-bold text-gray-900 text-2xl tracking-tight">
              Market Overview
            </h1>

            <div className="gap-4 grid grid-cols-1 md:grid-cols-3 mb-8">
              <div className="bg-white shadow-sm p-5 border border-slate-200 rounded-2xl">
                <h3 className="font-semibold text-gray-500 text-sm">
                  NIFTY 50
                </h3>
                <div className="mt-1 font-bold text-gray-900 text-xl">
                  22,453.30
                </div>
              </div>
              <div className="bg-white shadow-sm p-5 border border-slate-200 rounded-2xl">
                <h3 className="font-semibold text-gray-500 text-sm">SENSEX</h3>
                <div className="mt-1 font-bold text-gray-900 text-xl">
                  73,982.15
                </div>
              </div>
              <div className="bg-white shadow-sm p-5 border border-slate-200 rounded-2xl">
                <h3 className="font-semibold text-gray-500 text-sm">
                  BANK NIFTY
                </h3>
                <div className="mt-1 font-bold text-gray-900 text-xl">
                  47,825.40
                </div>
              </div>
            </div>
          </section>

          <StockList />
        </div>

        <WatchlistSlider />
      </main>
    </div>
  );
}
