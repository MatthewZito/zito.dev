import React from 'react';

import { MDXProvider } from '@mdx-js/react';

import * as TextComponents from './Text';
import * as CodeComponents from './Code';
import * as TableComponents from './Table';
import * as ListComponents from './List';
import * as MiscComponents from './Miscellaneous';

import { Footnote } from './Footnote';

import type { IPost } from '@/types';

interface IMdxThemeProps {
	children: React.ReactNode;
	post: IPost;
}

const getComponentMapping = (post: IPost) => {
	const headings = TextComponents.generateHeadings(post.slug);

	return {
		wrapper: ({ children }: { children: React.ReactNode }) => {
			const updatedChildren = React.Children.map(children, (child) => {
				if (!React.isValidElement(child)) {
					return child;
				}

				if (child.props.className === 'footnotes') {
					// the key is of negligible consequence given we've only one element that will ever match
					// however, react requires one, so...
					return <Footnote key={1} {...child.props} />;
				}

				return child;
			});

			return <>{updatedChildren}</>;
		},
		p: TextComponents.Paragraph,
		h1: headings.H1,
		h2: headings.H2,
		h3: headings.H3,
		h4: headings.H4,
		h5: headings.H5,
		h6: headings.H6,

		blockquote: TextComponents.Blockquote,

		ul: ListComponents.UnorderedList,
		ol: ListComponents.OrderedList,
		li: ListComponents.Item,

		table: TableComponents.Table,
		thead: TableComponents.Head,
		tbody: TableComponents.Body,
		tr: TableComponents.Row,
		td: TableComponents.BodyCell,
		th: TableComponents.HeadCell,

		pre: CodeComponents.Pre,
		code: CodeComponents.Code,
		inlineCode: CodeComponents.InlineCode,

		hr: MiscComponents.Break,
		thematicBreak: MiscComponents.Break,

		a: MiscComponents.Link,
		img: MiscComponents.MdxImage
	};
};

export const MDXTheme = ({ children, post }: IMdxThemeProps): JSX.Element => (
	<>
		<MiscComponents.GlobalGatsbyImageStyle />
		<CodeComponents.GlobalCodeStyle />
		<MDXProvider components={getComponentMapping(post)}>{children}</MDXProvider>
	</>
);