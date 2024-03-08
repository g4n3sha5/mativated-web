import { CreateSessionInputField } from '@/utils/types';
import { MinusButton } from '@/pages/matjournal/common/MinusButton';
import { PlusButton } from '@/pages/matjournal/common/PlusButton';
import { faWeightScale } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from 'components/ui/Input';
import { useFormContext } from 'react-hook-form';
import { NumberValuePickButtons } from '@/pages/matjournal/common/NumberValuePickButtons';

export const WeightPicker = () => {
  const field: CreateSessionInputField = 'weight';
  const { register, watch, setValue } = useFormContext();

  return (
    <div className="w-3/4 lg:w-1/2 p-3 createSessionPickerStyle flex flex-col items-center">
      <FontAwesomeIcon className="icon" icon={faWeightScale} />
      <h1>Weight</h1>
      <div className="flex gap-x-1 w-full justify-center items-center">
        <MinusButton valueToModify={watch(field)} onClick={() => setValue(field, Number(watch(field)) - 1)} />
        <div className="relative">
          <Input
            {...register(field, {
              valueAsNumber: true,
            })}
            className="text-2xl font-bold w-full max-w-32 text-center h-14"
            type="number"
            min="0"
          />
          <span className="absolute top-1/2 right-1/4 -translate-y-1/2">kg</span>
        </div>
        <PlusButton onClick={() => setValue(field, watch(field) + 1)} />
      </div>

      <NumberValuePickButtons
        scope={120}
        start={50}
        modulo={15}
        variant={(value) => (watch(field) === value ? 'white' : 'secondary')}
        callback={(value) => setValue(field, value)}
        disabled={(value) => watch(field) === value}
        suffix="kg"
      />
    </div>
  );
};
