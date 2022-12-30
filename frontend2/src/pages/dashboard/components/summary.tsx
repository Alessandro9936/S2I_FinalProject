import React, { useMemo } from "react";
import TimeSpanButton from "../../../components/Buttons/TimeSpanButton";
import Card from "../../../components/card";
import DateBar from "../../../components/date-bar";
import useActiveDates from "../../../hooks/useActiveDates";
import { useGetTransactionsByDate } from "../../../services/transaction-services";

const DateSelectors = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-fit text-xs font-semibold text-neutral-500">
      <div className="flex cursor-pointer gap-1 rounded-full bg-white px-2 py-1 shadow md:px-3 md:py-1">
        <button>Sync dates</button>
        <span>o</span>
      </div>
      <div className="ml-auto flex gap-2 md:gap-4">{children}</div>
    </div>
  );
};

const Summary = ({ gridDisposition }: { gridDisposition: string }) => {
  const {
    updateActiveDate,
    updateActiveTimeSpan,
    activeDateFormatted,
    activeTimeSpan,
  } = useActiveDates();

  const query = useGetTransactionsByDate(activeDateFormatted);

  const transactions = query.data ?? [];
  const currency = transactions[0]?.currency;

  const amounts = transactions.reduce(
    (acc, cur) => {
      cur.type === "income"
        ? (acc.income += cur.amount)
        : (acc.expenses += cur.amount);
      return acc;
    },
    { income: 0, expenses: 0 }
  );

  const totalBalance = amounts ? amounts.income - amounts.expenses : 0;

  console.log(totalBalance);

  return (
    <section className={`${gridDisposition} flex flex-col gap-y-6`}>
      <DateSelectors>
        {["Yearly", "Monthly"].map((timeSpan) => (
          <TimeSpanButton
            key={timeSpan}
            timeSpan={timeSpan as "Yearly" | "Monthly"}
            activeTimeSpan={activeTimeSpan}
            updateActiveTimeSpan={updateActiveTimeSpan}
          />
        ))}
      </DateSelectors>
      <DateBar
        updateActiveDate={updateActiveDate}
        activeDateFormatted={activeDateFormatted}
      />
      <div className="flex flex-1 flex-col md:gap-y-6 lg:justify-between lg:gap-y-0">
        <div className="flex-1  lg:flex-initial">
          <p className=" mb-1 font-semibold ">Income</p>
          <Card classNames="px-4 py-5">
            <div className="flex items-center justify-between">
              <p className="text-lg md:text-2xl">
                {amounts ? amounts.income : 0}
              </p>
              <span>{currency}</span>
            </div>
          </Card>
        </div>
        <div className="flex-1 lg:flex-initial">
          <p className=" mb-1 font-semibold ">Expense</p>
          <Card classNames="px-4 py-5">
            <div className="flex items-center justify-between">
              <p className="text-lg md:text-2xl">
                {amounts ? amounts.expenses : 0}
              </p>
              <span>{currency}</span>
            </div>
          </Card>
        </div>
        <div className="flex-1 lg:flex-initial">
          <p className=" mb-1 font-semibold ">Total</p>
          <Card classNames="px-4 py-5">
            <div className="flex items-center justify-between">
              <p
                className={`text-lg md:text-2xl ${
                  totalBalance > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {totalBalance}
              </p>
              <span>{currency}</span>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
export default Summary;
