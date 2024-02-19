import { AddSessionInputField } from '@/pages/matjournal/addSession/types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import { useFormContext } from 'react-hook-form';
import { sessionTypeIconDictionary } from 'utils/constants';

export const SessionTypePicker = () => {
  const field: AddSessionInputField = 'type';
  const { setValue, watch } = useFormContext();

  return (
    <div className="min-w-14 addSessionPickerStyle p-3 items-center ">
      <h1>Type</h1>
      <div className="flex lg:flex-col flex-wrap basis-full justify-center gap-x-2 gap-y-2 lg:gap-y-1">
        {sessionTypeIconDictionary.map((session) => (
          <TooltipProvider key={session.type} delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <session.Icon
                  onClick={(evt) => {
                    evt.preventDefault();
                    setValue(field, session.type);
                  }}
                  className={`w-11 h-11 xl:w-13 xl:h-13 cursor-pointer stroke-black hover:stroke-white hover:fill-white ${
                    session.type === watch(field) && 'stroke-white fill-white'
                  }`}
                />
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="bg-black rounded-md px-3 z-10 capitalize text-white text-lg font-rajdhani"
              >
                {session.visibleName}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};
