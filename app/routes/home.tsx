import { gql } from 'graphql-request';
import { useSuspenseQuery } from '@tanstack/react-query';
import type { Route } from './+types/home';
import { graphQLClient } from '~/api/graphql';
import { queryClient } from '~/api/queryClient';
import { MultiSelectFilter } from '~/components/ui/multi-select-filter/multi-select-filter';

// eslint-disable-next-line no-empty-pattern
export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Home() {
  const { data } = useSuspenseQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  return (
    <div className="grid h-screen place-items-center">
      <MultiSelectFilter
        className="w-[300px]"
        label="Productgroep"
        applyButtonLabel="Toepassen"
        options={data.categories}
        id='productgroep'
      />
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
