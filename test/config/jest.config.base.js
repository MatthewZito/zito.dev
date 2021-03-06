const path = require('path');

module.exports = {
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
	moduleNameMapper: {
		'.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
		'.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			path.join(__dirname, '../mocks/assets.js'),

		// aliases
		'^@/(.*)$': '<rootDir>/src/$1',
		'^@@/(.*)$': '<rootDir>/test/$1',

		// workarounds for https://github.com/facebook/jest/issues/9771
		// @see https://github.com/gatsbyjs/gatsby/discussions/34803
		'^gatsby-page-utils/(.*)$': `gatsby-page-utils/dist/$1`,
		'^gatsby-core-utils/(.*)$': `gatsby-core-utils/dist/$1`,
		'^gatsby-plugin-utils/(.*)$': [
			`gatsby-plugin-utils/dist/$1`,
			`gatsby-plugin-utils/$1`
		]
	},
	setupFiles: [path.join(__dirname, './loader.shim.js')],
	setupFilesAfterEnv: [path.join(__dirname, './setupTests.js')],
	testEnvironment: 'jsdom',
	testMatch: ['**/?(*.)+(spec|test).(ts|tsx)'],
	testPathIgnorePatterns: ['<rootDir>/cypress'],
	testURL: 'http://localhost',
	transform: {
		'^.+\\.jsx?$': path.join(__dirname, './preprocess.js'),
		'^.+\\.tsx?$': 'ts-jest'
	},
	// https://github.com/facebook/jest/issues/2081#issuecomment-699558143
	transformIgnorePatterns: ['node_modules/(?!.*(gatsby|gatsby-plugin-mdx)/)']
};
