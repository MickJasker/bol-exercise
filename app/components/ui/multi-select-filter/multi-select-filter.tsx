import { useCallback, useMemo, useState, type HTMLAttributes } from 'react';
import { cn } from '~/lib/utils';
import { Checkbox } from '../checkbox/checkbox';
import { Button } from '../button/button';
import { Input } from '../input/input';
import { SearchIcon } from '~/components/icons/search';
import Fuse from 'fuse.js';
import { useSearchParams } from 'react-router';

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
  id,
  ...props
}: {
  /**
   * Label for the multi-select filter presented at the top of the filter
   */
  label: string;
  /**
   * Options for the multi-select filter, each option is a tuple of [value, label]
   */
  options: readonly {
    value: string;
    label: string;
  }[];
  /**
   * Label for the apply button after selecting options
   */
  applyButtonLabel?: string;
  /**
   * Unique id for the multi-select filter, used for storing selected options in the URL search params
   */
  id: string;
} & HTMLAttributes<HTMLFormElement>) {
  const [searchValue, setSearchValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedOptions = useMemo(() => {
    try {
      const optionsString = searchParams.get(`${id}.options`);
      if (optionsString) {
        const optionsArray = JSON.parse(atob(optionsString)) as string[];
        return optionsArray;
      } else {
        return [];
      }
    } catch {
      return [];
    }
  }, [searchParams, id]);

  const [checkedOptions, setCheckedOptions] =
    useState<readonly string[]>(selectedOptions);

  const setSelectedOptions = useCallback(
    (selected: readonly string[]) => {
      const newSearchParams = new URLSearchParams(searchParams);

      if (selected.length === 0) {
        newSearchParams.delete(`${id}.options`);
      } else {
        newSearchParams.set(`${id}.options`, btoa(JSON.stringify(selected)));
      }

      setSearchParams(newSearchParams);
    },
    [searchParams, setSearchParams, id]
  );

  const fuse = useMemo(() => {
    return new Fuse(options, {
      keys: ['label'],
    });
  }, [options]);

  const filteredOptions = useMemo(() => {
    if (!searchValue)
      return [
        ...options
          .toSorted((a, b) => a.label.localeCompare(b.label))
          .filter(({ value }) => selectedOptions.includes(value)),
        ...options
          .toSorted((a, b) => a.label.localeCompare(b.label))
          .filter(({ value }) => !selectedOptions.includes(value)),
      ];

    return fuse.search(searchValue).map((result) => result.item);
  }, [searchValue, fuse, options, selectedOptions, setSelectedOptions]);

  return (
    <form
      aria-labelledby={`heading-${id}`}
      className={cn(
        'bg-foreground/2 border border-input rounded-sm p-5 flex flex-col gap-5',
        className
      )}
      id={id}
      onSubmit={(e) => {
        e.preventDefault();
        setSelectedOptions(checkedOptions);

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

      <div className="flex flex-col gap-4 h-[200px] relative overflow-y-auto">
        {filteredOptions.length > 0 ? (
          filteredOptions.map(({ value, label }) => (
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
