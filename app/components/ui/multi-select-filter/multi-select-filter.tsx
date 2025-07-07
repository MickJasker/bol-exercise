import { useId, type HTMLAttributes } from 'react';
import { cn } from '~/lib/utils';
import { Checkbox } from '../checkbox/checkbox';
import { Button } from '../button/button';
import { Input } from '../input/input';
import { SearchIcon } from '~/components/icons/search';

/**
 * MultiSelectFilter component that allows users to select multiple options from a list.
 * It includes a label, options, an apply button, and a search functionality.
 */
export function MultiSelectFilter({
  label,
  options,
  applyButtonLabel = 'Apply',
  className,
  ...props
}: {
  /**
   * Label for the multi-select filter presented at the top of the filter
   */
  label: string;
  /**
   * Options for the multi-select filter, each option is a tuple of [value, label]
   */
  options: readonly [string, string][];
  /**
   * Label for the apply button after selecting options
   */
  applyButtonLabel?: string;
} & HTMLAttributes<HTMLFormElement>) {
  const id = useId();

  return (
    <form
      aria-labelledby={`heading-${id}`}
      className={cn('bg-foreground/2 border border-input rounded-sm p-5 flex flex-col gap-5', className)}
      {...props}
    >
      <h3 id={`heading-${id}`}>{label}</h3>

      <Input type='search' icon={<SearchIcon />} name='search' placeholder='Search...'/>

      {options.length > 0 ? <div className='flex flex-col gap-4 max-h-[200px] overflow-y-auto'>
        {options.map(([value, label]) => (
          <Checkbox
            key={value}
            value={value}
            name='options'
            label={{
              children: label,
            }}
          />
        ))}
      </div> : <p>No options available</p>}

      <Button>
        {applyButtonLabel}
      </Button>
    </form>
  );
}
