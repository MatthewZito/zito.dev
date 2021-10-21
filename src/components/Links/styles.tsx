import styled, { css } from 'styled-components';

import { BaseLink } from '@/components/Links/BaseLink';

interface ILinkStyleProps {
	activeClassName?: string;
}

const TransparentCSS = css`
	width: 100%;
	color: inherit;
	text-decoration: none;
`;

export const IconCSS = css`
	color: var(--color-grey-700);

	&:hover {
		color: var(--color-primary);
	}
`;

const PrimaryCSS = css`
	display: inline-block;
	color: var(--color-text);
	text-decoration: none;

	&:hover {
		color: var(--color-primary);
	}
`;

const AnimatedCSS = css<ILinkStyleProps>`
	display: inline-block;
	background-color: inherit;
	color: var(--color-primary);
	text-decoration: none;

	&::after {
		display: block;
		width: 100%;
		height: 2px;
		background-color: var(--color-primary);
		content: '';
		transform: scaleX(0);
		transition: transform 300ms ease;
	}

	&:hover {
		color: var(--color-primary);
	}

	&:hover::after {
		transform: scaleX(1);
	}

	&.${(props) => props.activeClassName} {
		&::after {
			transform: scaleX(1);
		}
	}
`;

const HeadingCss = css`
	color: inherit;
	text-decoration: none;

	&:hover::before {
		position: absolute;
		display: block;
		padding-right: 8px;
		color: var(--color-primary);
		content: '#';
		transform: translateX(-100%);
	}
`;

export const AnimatedLink = styled(BaseLink).attrs(
	({ activeClassName }: ILinkStyleProps) => ({
		activeClassName: activeClassName || 'gatsby-active-link'
	})
)`
	${AnimatedCSS}
`;

export const TransparentLink = styled(BaseLink)`
	${TransparentCSS}
`;

export const PrimaryLink = styled(BaseLink)`
	${PrimaryCSS}
`;

export const IconLink = styled(BaseLink)`
	${IconCSS}
`;

export const HeadingLink = styled(BaseLink)`
	${HeadingCss}
`;