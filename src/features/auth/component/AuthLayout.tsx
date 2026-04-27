import type { ReactNode } from "react";

type TrendDirection = "up" | "down";
type ChartTone = "emerald" | "orange";

interface AuthLayoutProps {
  badgeText: string;
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  marketName: string;
  marketExchange: string;
  marketValue: string;
  marketChange: string;
  trendDirection: TrendDirection;
  chartTone: ChartTone;
  trustedText?: string;
  rightTitle: string;
  rightSubtitle: string;
  children: ReactNode;
}

const upArrowPath =
  "M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z";
const downArrowPath =
  "M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z";

const trendClass: Record<TrendDirection, string> = {
  up: "text-emerald-400",
  down: "text-orange-600",
};

const chartClass: Record<ChartTone, string> = {
  emerald: "bg-emerald-400/5",
  orange: "bg-orange-600/5",
};

const chartBorderClass: Record<ChartTone, string> = {
  emerald: "border-emerald-400",
  orange: "border-orange-600",
};

function TradeProLogo() {
  return (
    <>
      <div className="flex justify-center items-center bg-emerald-400 shadow-black/5 shadow-xl rounded-xl w-12 h-12 text-white">
        <svg
          className="w-6 h-6"
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
      <span className="font-bold text-gray-900 text-2xl tracking-tight">
        TradePro
      </span>
    </>
  );
}

export function AuthLayout({
  badgeText,
  titlePrefix,
  titleHighlight,
  description,
  marketName,
  marketExchange,
  marketValue,
  marketChange,
  trendDirection,
  chartTone,
  trustedText,
  rightTitle,
  rightSubtitle,
  children,
}: AuthLayoutProps) {
  return (
    <main className="flex lg:flex-row flex-col flex-1 min-h-screen">
      <section className="hidden relative lg:flex flex-col justify-between bg-slate-50 p-12 lg:p-20 border-slate-100 border-r lg:w-1/2 overflow-hidden">
        <div className="top-0 right-0 absolute bg-emerald-400/5 blur-3xl rounded-full w-150 h-150 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="z-10 relative">
          <div className="flex items-center gap-3 mb-16">
            <TradeProLogo />
          </div>

          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-white shadow-sm mb-6 px-3 py-1 border border-slate-100 rounded-full">
                <span className="bg-emerald-400 rounded-full w-2 h-2"></span>
                <span className="font-semibold text-gray-600 text-xs uppercase tracking-wider">
                  {badgeText}
                </span>
              </div>
              <h1 className="mb-6 font-bold text-gray-900 text-5xl leading-tight tracking-tight">
                {titlePrefix}
                <br />
                <span className="text-emerald-400">{titleHighlight}</span>
              </h1>
              <p className="mb-10 max-w-md text-gray-600 text-lg leading-relaxed">
                {description}
              </p>
            </div>

            <div className="group relative bg-white shadow-card hover:shadow-lg p-6 border border-slate-100 rounded-3xl overflow-hidden transition-shadow duration-300">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    {marketName}
                  </h3>
                  <p className="mt-1 text-gray-500 text-sm">{marketExchange}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900 text-lg">
                    {marketValue}
                  </p>
                  <p
                    className={`flex justify-end items-center gap-1 mt-1 font-medium text-sm ${trendClass[trendDirection]}`}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                    >
                      <path
                        fill="currentColor"
                        d={
                          trendDirection === "up" ? upArrowPath : downArrowPath
                        }
                      />
                    </svg>
                    {marketChange}
                  </p>
                </div>
              </div>
              <div className={`-mx-2 w-full h-30 ${chartClass[chartTone]}`}>
                <div className={`border ${chartBorderClass[chartTone]}`}></div>
              </div>
            </div>
          </div>
        </div>

        {trustedText ? (
          <div className="z-10 relative mt-20">
            <p className="mb-4 font-medium text-gray-500 text-sm">
              {trustedText}
            </p>
          </div>
        ) : null}
      </section>

      <section className="relative flex flex-col justify-start items-center bg-white p-8 lg:p-20 w-full lg:w-1/2">
        <div className="lg:hidden flex items-center self-start gap-3 mx-auto mb-12 w-full max-w-md">
          <TradeProLogo />
        </div>

        <div className="mx-auto w-full max-w-md">
          <div className="mb-10 lg:text-left text-center">
            <h2 className="mb-3 font-bold text-gray-900 text-3xl tracking-tight">
              {rightTitle}
            </h2>
            <p className="text-gray-500">{rightSubtitle}</p>
          </div>
          {children}
        </div>
      </section>
    </main>
  );
}
