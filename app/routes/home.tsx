import { gql } from 'graphql-request';
import { useSuspenseQuery } from '@tanstack/react-query';
import type { Route } from './+types/home';
import { graphQLClient } from '~/api/graphql';
import { queryClient } from '~/api/queryClient';
import { MultiSelectFilter } from '~/components/ui/multi-select-filter/multi-select-filter';

// eslint-disable-next-line no-empty-pattern
export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Bol MultiSelect Exercise' },
    { name: 'description', content: 'Welcome to Bol MultiSelect Exercise!' },
  ];
}

export default function Home() {
  const { data } = useSuspenseQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-20 px-8 py-20">
      <h1 className="text-5xl font-bold">Bol MultiSelect Exercise</h1>

      <main className="contents">
        <section className="flex flex-col gap-8">
          <h2 className="text-4xl font-bold">Single filter</h2>
          <p className="text-pretty text-foreground/70">
            This filter uses the URL search params to store the selected
            options. The selected options are stored as a base64 encoded JSON
            string in the URL. User can refresh the page and the selected
            options will be preserved. Selected filters can also be shared via
            the URL. Parts of your app that want to use the selected filter can
            use the searchParams to retrieve the selected options.
          </p>
          <MultiSelectFilter
            className="w-[300px]"
            label="Productgroep"
            applyButtonLabel="Toepassen"
            options={data.categories}
            storeId="productgroep"
          />
        </section>

        <section className="flex flex-col gap-8">
          <h2 className="text-4xl font-bold">Filters with same storeId</h2>
          <p className="text-pretty text-foreground/70">
            When applying the same storeId in multiple filters, the selected
            options will be shared between the filters. This allows for creating
            a consistent filter experience across different components.
          </p>

          <div className="flex gap-4">
            <MultiSelectFilter
              className="w-[300px]"
              label="Productgroep (2)"
              applyButtonLabel="Toepassen"
              options={data.categories}
              storeId="productgroep.2"
            />

            <MultiSelectFilter
              className="w-[300px]"
              label="Productgroep (2)"
              applyButtonLabel="Toepassen"
              options={data.categories}
              storeId="productgroep.2"
            />
          </div>
        </section>
      </main>

      <footer className="text-center text-sm text-foreground/70">
        Made by{' '}
        <a
          href="https://www.linkedin.com/in/mick-jasker-3360bb13b/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mick Jasker
        </a>{' '}
        -{' '}
        <a href="https://codecapi.nl" target="_blank" rel="noopener noreferrer">
          CodeCapi
        </a>
      </footer>
    </div>
  );
}

export async function loader() {
  await queryClient.ensureQueryData({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
}

async function fetchCategories() {
  const data = await graphQLClient.request<{
    categories: {
      label: string;
      value: string;
    }[];
  }>(gql`
    query {
      categories {
        label
        value
      }
    }
  `);

  return data;
}
