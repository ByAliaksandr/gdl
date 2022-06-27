import { merge } from 'webpack-merge';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { webpackBase } from './base';
import { paths } from './config';

import type { Configuration as WebpackConfiguration } from 'webpack';

/**
 * Webpack plugins for prod builds.
 */

const cleanWebpack = new CleanWebpackPlugin({
  cleanOnceBeforeBuildPatterns: [paths['sample-app']],
});

const plugins = [cleanWebpack];

/**
 * Webpack production configuration
 */

const productionConfig: WebpackConfiguration = {
  plugins,
};

/**
 * Merge production configuration with base configuration
 */

const productionWebpack = merge(webpackBase, productionConfig);

/**
 * Export production configuration
 */

export { productionWebpack };
