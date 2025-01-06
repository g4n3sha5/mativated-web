import { SessionTypeIcon } from '@/components/ui/SessionTypeIcon';
import { StatisticsGetOutput } from '@/utils/types';
import { TotalSessionType } from '@mativated-monorepo/shared/types';

interface Props {
  statistics: StatisticsGetOutput;
  type: TotalSessionType;
}

export const Statistics = ({ statistics, type }: Props) => {
  const statisticsItems = [
    {
      label: (
        <div className="text-center">
          <span className="font-semibold">Daily</span> <span className="tracking-tightest">Average</span>
        </div>
      ),
      value: (
        <>
          {statistics?.dailyAvg}
          <span className="font-normal ml-1 text-2xl">h</span>
        </>
      ),
    },
    {
      label: (
        <div className="text-center">
          <span className="font-semibold">Weekly</span>
          <span className="tracking-tightest"> Average</span>
        </div>
      ),
      value: (
        <>
          {statistics?.weeklyAvg}
          <span className="font-normal ml-1 text-2xl">h</span>
        </>
      ),
    },
    {
      label: (
        <div className="text-center">
          <span className="font-semibold">Monthly</span> <span className="tracking-tightest"> Average</span>
        </div>
      ),
      value: (
        <>
          {statistics?.monthlyAvg}
          <span className="font-normal ml-1 text-2xl">h</span>
        </>
      ),
    },
    {
      label: (
        <div className="text-center">
          <span className="font-semibold">Yearly</span>
          <span className="tracking-tightest"> Average</span>
        </div>
      ),
      value: (
        <>
          {statistics?.yearlyAvg}
          <span className="font-normal ml-1 text-2xl">h</span>
        </>
      ),
    },
    {
      label: (
        <div className="text-center">
          Longest <span className="font-semibold">Streak</span>
        </div>
      ),
      value: (
        <>
          {statistics?.longestStreak}
          <span className="font-normal ml-1 text-2xl">days</span>
        </>
      ),
    },
    {
      label: (
        <div className="text-center">
          Current <span className="font-semibold">Streak</span>
        </div>
      ),
      value: (
        <>
          {statistics?.currentStreak}
          <span className="font-normal ml-1 text-2xl">days</span>
        </>
      ),
    },
    {
      label: (
        <>
          {type === 'TOTAL' && 'Most'} <span className="font-semibold">Trained</span>
        </>
      ),
      value: (
        <span>
          <SessionTypeIcon className="fill-black stroke-black w-8 h-8" type={statistics?.percentageTrained.type} />
          {statistics?.percentageTrained.value}%
        </span>
      ),
    },
    {
      label: (
        <>
          Most <span className="font-semibold">Trained</span>
        </>
      ),
      value: (
        <span>
          <SessionTypeIcon className="fill-black stroke-black w-8 h-8" type="GI" />
          60%
        </span>
      ),
    },
  ];

  return (
    <div className="flex  flex-wrap   gap-3 justify-center xl:justify-start items-start  h-max w-full lg:w-3/4 xl:gap-x-10 px-1">
      {statisticsItems.map((statistic, index) => {
        return (
          <div
            key={index}
            className="flex bg-white w-24 md:w-32 h-24 xl:w-32 xl:h-32 2xl:h-32 2xl:w-40 rounded-lg p-1 2xl:p-4 flex-col justify-around items-center"
          >
            <div> {statistic.label} </div>
            <span className="font-bold text-3xl tracking-wide">{statistic.value}</span>
          </div>
        );
      })}
    </div>
  );
};
