import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState,
  type HTMLAttributes,
} from 'react';
import { cn } from '~/lib/utils';
import { Checkbox } from '../checkbox/checkbox';
import { Button } from '../button/button';
import { Input } from '../input/input';
import { SearchIcon } from '~/components/icons/search';
import Fuse from 'fuse.js';
import { useSearchParams } from 'react-router';

/**
 * MultiSelectFilter component that allows users to select multiple options from a list.
 */
export function MultiSelectFilter({
  label,
  options,
  applyButtonLabel = 'Apply',
  className,
  onSubmit,
  storeId,
  ...props
}: {
  /**
   * Label for the multi-select filter presented at the top of the filter
   */
  label: string;
  /**
   * Options for the multi-select filter, each option is a tuple of [value, label]
   */
  options: readonly { value: string; label: string }[];
  /**
   * Label for the apply button after selecting options
   */
  applyButtonLabel?: string;
  /**
   * Unique id for the multi-select filter, used for storing selected options in the URL search params.
   * When the same storeId is used in multiple filters, the selected options will be shared between them.
   */
  storeId: string;
} & HTMLAttributes<HTMLFormElement>) {
  const [searchValue, setSearchValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedOptions = useMemo(() => {
    return searchParams.get(`${storeId}.options`)?.split(',') ?? [];
  }, [searchParams, storeId]);

  const [checkedOptions, setCheckedOptions] =
    useState<readonly string[]>(selectedOptions);

  const setSelectedOptions = useCallback(
    (selected: readonly string[]) => {
      const newSearchParams = new URLSearchParams(searchParams);

      if (selected.length === 0) {
        newSearchParams.delete(`${storeId}.options`);
      } else {
        newSearchParams.set(
          `${storeId}.options`,
          selected.join(',')
        );
      }
      setSearchParams(newSearchParams, {
        preventScrollReset: true,
        replace: true,
      });
    },
    [searchParams, setSearchParams, storeId]
  );

  useEffect(() => {
    setCheckedOptions(selectedOptions);
  }, [searchParams]);

  const id = useId();

  const fuse = useMemo(
    () =>
      new Fuse(options, {
        keys: ['label'],
        threshold: 0.2,
        includeScore: true,
        ignoreLocation: true,
        useExtendedSearch: true,
        minMatchCharLength: 2,
      }),
    [options]
  );

  const filteredOptions = useMemo(() => {
    if (!searchValue) {
      const sorted = options.toSorted((a, b) =>
        a.label.localeCompare(b.label, 'nl-NL')
      );

      return [
        ...sorted.filter(({ value }) => selectedOptions.includes(value)),
        ...sorted.filter(({ value }) => !selectedOptions.includes(value)),
      ];
    }

    return fuse.search(searchValue).map((result) => result.item);
  }, [searchValue, fuse, options, selectedOptions]);

  return (
    <form
      aria-labelledby={`heading-${id}`}
      className={cn(
        'bg-foreground/2 border border-input rounded-sm p-5 flex flex-col gap-5',
        className
      )}
      onSubmit={(e) => {
        e.preventDefault();
        setSelectedOptions(checkedOptions);

        setSearchValue('');

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
              label={{ children: label }}
            />
          ))
        ) : (
          <p className="text-sm">Geen resultaten</p>
        )}
      </div>

      <Button type="submit">{applyButtonLabel}</Button>
    </form>
  );
}
