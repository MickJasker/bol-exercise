import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { cn } from '~/lib/utils';
import { useEffect, useId, useState, type ComponentProps } from 'react';
import { Label } from '../label/label';

function Checkbox({
  className,
  label,
  ...props
}: ComponentProps<typeof CheckboxPrimitive.Root> & {
  label?: ComponentProps<typeof Label>;
}) {
  const [checked, setChecked] = useState(props.checked || false);

  useEffect(() => {
    setChecked(props.checked || false);
  }, [props.checked]);

  const id = useId() ?? props.id;

  return (
    <div className="flex items-center gap-3">
      <CheckboxPrimitive.Root
        data-slot="checkbox"
        checked={checked}
        onCheckedChange={(value) => {
          setChecked(value !== 'indeterminate' ? value : false);
          props.onCheckedChange?.(value);
        }}
        className={cn(
          'peer cursor-pointer border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 aria-invalid:border-destructive size-5 shrink-0 border-2 p-[2px] shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        id={id}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          className="bg-primary size-[100%] block"
        />
      </CheckboxPrimitive.Root>

      {label && (
        <Label
          {...label}
          htmlFor={id}
          className={cn('data-[checked=true]:text-primary', label.className)}
          data-checked={checked}
        />
      )}
    </div>
  );
}

export { Checkbox };
