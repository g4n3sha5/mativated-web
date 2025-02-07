import { Separator } from '@/components/ui/Separator';
import { GoalProgressIndicator } from '@/pages/sessions/dashboard/subcomponents/GoalProgressIndicator';
import { SessionTypePicker } from '@/pages/sessions/dashboard/subcomponents/statisticsRightPanel/subcomponents/SessionTypePicker';
import { totalSessionTypeLabelDictionary } from '@/utils/constants';
import { trpc } from '@/utils/trpc';
import { SessionType } from '@/utils/types';
import { useUser } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { ArrowLeftRight } from 'react-bootstrap-icons';
import { FormProvider, useForm } from 'react-hook-form';

import { Statistics } from './Statistics';

interface Props {
  isShownRightPanel: boolean;
  setIsShownRightPanel: (shown: boolean) => void;
}

export const DashboardContent = ({ isShownRightPanel, setIsShownRightPanel }: Props) => {
  const { user, isLoaded } = useUser();
  const utils = trpc.useUtils();
  const defaultValues: Record<'type', SessionType> = {
    type: 'TOTAL',
  };
  const methods = useForm({
    defaultValues: defaultValues,
  });
  const { watch } = methods;
  if (!user?.id) return <></>;

  const { data: statistics } = trpc.sessions.getSessionSpecificStats.useQuery({
    authorId: user.id,
    type: watch('type'),
  });

  useEffect(() => {
    utils.sessions.getSessionSpecificStats.invalidate();
  }, []);

  return (
    <div className=" h-full xl:pt-0  xl:p-10 flex flex-col  animate-in fade-in slide-in-from-left duration-400 lg:p-2 overflow-x-hidden overflow-y-auto ">
      <div className="w-full pt-[calc(var(--navHeight)_+_20px)] flex pr-4 align-middle px-4 md:px-0">
        <h1 className=" text-2xl  text-zinc-300 text-center md:text-left mb-1">
          <span className="text-zinc-100  font-bold ">
            {totalSessionTypeLabelDictionary.find((obj) => obj.type === watch('type'))?.label}
          </span>{' '}
          statistics
        </h1>
        <ArrowLeftRight
          className="md:hidden cursor-pointer text-white  mb-3 ml-auto mr-3 hover:scale-110 text-3xl "
          onClick={() => setIsShownRightPanel(true)}
        />
      </div>

      <div className="flex justify-between gap-2 lg:gap-10 items-center md:items-start mr-2">
        <div className="flex-col justify-start w-1/2 hidden md:flex">
          <h1 className=" text-white text-4xl xl:text-5xl tracking-tighter font-extralight ">Dashboard</h1>{' '}
        </div>
        <FormProvider {...methods}>
          <form className="flex flex-1 flex-col items-center  basis-[60%]">
            <SessionTypePicker />
          </form>
        </FormProvider>
      </div>

      <Separator className="bg-white w-64 mt-2 mb-6 mx-auto md:mx-0" />
      <div className="flex flex-col flex-1  w-full     overflow-x-hidden  overflow-auto xl:overflow-hidden lg:mt-10">
        <Statistics statistics={statistics} type={watch('type')} />
        <GoalProgressIndicator />
      </div>
    </div>
  );
};
