import { useId, useMemo, useState, type HTMLAttributes } from 'react';
import { cn } from '~/lib/utils';
import { Checkbox } from '../checkbox/checkbox';
import { Button } from '../button/button';
import { Input } from '../input/input';
import { SearchIcon } from '~/components/icons/search';
import Fuse from 'fuse.js';

/**
 * MultiSelectFilter component that allows users to select multiple options from a list.
 * It includes a label, options, an apply button, and a search functionality.
 */
export function MultiSelectFilter({
  label,
  options,
  applyButtonLabel = 'Apply',
  className,
  onSubmit,
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
  const [searchValue, setSearchValue] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<readonly string[]>([]);
  const [checkedOptions, setCheckedOptions] = useState<readonly string[]>([]);

  const fuse = useMemo(
    () =>
      new Fuse(options, {
        keys: ['1'], // Search by the label (second element of the tuple)
      }),
    [options]
  );

  const filteredOptions = useMemo(() => {
    if (!searchValue)
      return [
        ...options.filter(([value]) => selectedOptions.includes(value)),
        ...options.filter(([value]) => !selectedOptions.includes(value)),
      ];

    return fuse.search(searchValue).map((result) => result.item);
  }, [searchValue, fuse, options, selectedOptions]);

  const id = useId();

  return (
    <form
      aria-labelledby={`heading-${id}`}
      className={cn(
        'bg-foreground/2 border border-input rounded-sm p-5 flex flex-col gap-5',
        className
      )}
      onSubmit={(e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const selected = formData.getAll('options') as string[];
        setSelectedOptions(selected);

        onSubmit?.(e);
      }}
      {...props}
    >
      <h3 id={`heading-${id}`}>{label}</h3>

      <Input
        icon={<SearchIcon />}
        name="search"
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <div className="flex flex-col gap-4 h-[200px] overflow-y-auto">
        {filteredOptions.length > 0 ? (
          filteredOptions.map(([value, label]) => (
            <Checkbox
              key={value}
              value={value}
              name="options"
              checked={checkedOptions.includes(value)}
              onCheckedChange={(checked) => {
                setCheckedOptions((prev) =>
                  checked ? [...prev, value] : prev.filter((v) => v !== value)
                );
              }}
              label={{
                children: label,
              }}
            />
          ))
        ) : (
          <p className="text-sm">No options available</p>
        )}
      </div>

      <Button type="submit">{applyButtonLabel}</Button>
    </form>
  );
}
