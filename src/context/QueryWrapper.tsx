import React from 'react';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

/**
 * @summary Wrapper for `react-query` context, for both for SSR and Browser envs
 */
export const QueryWrapper = ({
	element
}: {
	element: React.ReactChild;
}): JSX.Element => (
	<QueryClientProvider client={queryClient}>
		{element}
		<ReactQueryDevtools initialIsOpen={false} />
	</QueryClientProvider>
);