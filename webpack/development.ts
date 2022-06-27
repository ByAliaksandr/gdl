import { merge } from 'webpack-merge';
import { webpackBase } from './base';
import { config, paths } from './config';

import type { Configuration as DevServerConfig } from 'webpack-dev-server';
import type { Configuration as WebpackConfiguration } from 'webpack';

/**
 * Webpack dev-server configuration
 */

const devServer: DevServerConfig = {
  host: config.HOST,
  port: config.PORT,
  hot: true,
  client: {
    logging: 'warn',
    overlay: {
      errors: true,
      warnings: false,
    },
    progress: true,
  },
  static: {
    directory: paths['sample-app'],
  },
};

/**
 * Webpack development configuration
 */

const developmentConfig: WebpackConfiguration = {
  devServer,
  devtool: 'source-map',
};

/**
 * Merge development configuration with common configuration
 */

const developmentWebpack = merge(webpackBase, developmentConfig);

/**
 * Export development configuration
 */

export { developmentWebpack };
