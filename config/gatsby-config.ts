import path from 'path';

import remarkA11yEmoji from '@fec/remark-a11y-emoji';
import remarkExternalLinks from 'remark-external-links';
// https://github.com/gatsbyjs/gatsby/issues/16239
// must be < v3 due to ESM only support therein
import unwrapImages from 'remark-unwrap-images';
import urljoin from 'url-join';

import { withBasePath, generateRssFeed, setupRssFeed } from '../node';

import { config } from '.';

import type { GatsbyConfig } from 'gatsby';

const adjustedPathPRefix = !config.pathPrefix ? '/' : config.pathPrefix;
const gatsbyConfig: GatsbyConfig = {
	pathPrefix: adjustedPathPRefix,
	plugins: [
		'gatsby-plugin-pnpm',
		{
			options: {
				rule: {
					include: /\.svg$/
				}
			},
			resolve: 'gatsby-plugin-react-svg'
		},
		'gatsby-plugin-react-helmet',
		{
			options: {
				name: 'assets',
				path: path.join(__dirname, '../', config.assetDir || 'static')
			},
			resolve: 'gatsby-source-filesystem'
		},
		{
			options: {
				name: 'posts',
				path: path.join(__dirname, '../', config.contentDir || 'content')
			},
			resolve: 'gatsby-source-filesystem'
		},
		{
			options: {
				defaults: {
					backgroundColor: 'transparent',
					formats: ['auto', 'webp', 'avif'],
					placeholder: 'blurred'
				},
				failOnError: true
			},
			resolve: 'gatsby-plugin-sharp'
		},
		'gatsby-transformer-sharp',
		'gatsby-plugin-image',
		'gatsby-remark-images',
		{
			options: {
				extensions: ['.md', '.mdx'],
				gatsbyRemarkPlugins: [
					{
						options: {
							width: config.embeddedVideoWidth
						},
						resolve: 'gatsby-remark-embed-video'
					},
					{
						resolve: 'gatsby-remark-responsive-iframe'
					},
					{
						resolve: 'gatsby-remark-relative-images'
					},
					{
						options: {
							maxWidth: config.embeddedImageWidth,
							showCaptions: ['title', 'alt']
						},
						resolve: 'gatsby-remark-images'
					},
					{
						resolve: 'gatsby-remark-copy-linked-files'
					},
					{
						options: {
							showLineNumbers: true
						},
						resolve: 'gatsby-remark-prismjs'
					}
				],
				remarkPlugins: [unwrapImages, remarkA11yEmoji, remarkExternalLinks]
			},
			resolve: 'gatsby-plugin-mdx'
		},
		{
			options: {
				trackingIds: [config.site.googleAnalyticsId]
			},
			resolve: 'gatsby-plugin-google-gtag'
		},
		'gatsby-plugin-catch-links',
		'gatsby-plugin-twitter',
		'gatsby-plugin-sitemap',
		{
			options: {
				background_color: config.site.backgroundColor,
				cache_busting_mode: 'none',
				description: config.site.description,
				display: 'minimal-ui',
				icon: config.iconPath,
				icons: config.iconList,
				name: config.site.name,
				short_name: config.site.titleAbridged,
				start_url: adjustedPathPRefix,
				theme_color: config.site.themeColor
			},
			resolve: 'gatsby-plugin-manifest'
		},
		{
			options: {
				workboxConfig: {
					globPatterns: config.iconCachePaths
				}
			},
			resolve: 'gatsby-plugin-offline'
		},
		{
			options: {
				feeds: [
					{
						output: withBasePath(config, config.site.rss),
						query: `
                {
                  allMdx(
                    limit: 1000,
                    sort: { order: DESC, fields: [frontmatter___datePublished] },
                  ) {
                    edges {
                      node {
                        excerpt
                        html
                        timeToRead
                        fields {
                          slug
                        }
                        frontmatter {
                          title
                          datePublished
                          category
                          tags
                        }
                      }
                    }
                  }
                }
              `,
						serialize: generateRssFeed(config),
						site_url: config.site.url,
						title: config.site.rssTitle
					}
				],
				query: `
            {
              site {
                siteMetadata {
                  rssMetadata {
                    site_url
                    feed_url
                    title
                    description
                    image_url
                    copyright
                  }
                }
              }
            }
          `,
				setup: setupRssFeed(config)
			},
			resolve: 'gatsby-plugin-feed'
		},
		'gatsby-plugin-styled-components'
	],
	siteMetadata: {
		config,
		rssMetadata: {
			copyright: config.site.copyright,
			description: config.site.description,
			feed_url: urljoin(config.site.url, config.pathPrefix, config.site.rss),
			image_url: `${urljoin(config.site.url, config.pathPrefix)}${
				config.site.logoUrl
			}`,
			site_url: urljoin(config.site.url, config.pathPrefix),
			title: config.site.title
		},
		siteUrl: urljoin(config.site.url, config.pathPrefix)
	}
};

export default gatsbyConfig;
