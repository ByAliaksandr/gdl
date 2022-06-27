import { paths, config } from './config';

import type { Configuration as WebpackConfiguration } from 'webpack';

/**
 * Entry point names
 */

const ENTRY_NAME_GDL = 'gdl';

/**
 * Entry point to gdl for webpack bundle
 */
const entry = { [ENTRY_NAME_GDL]: `${paths['src']}/index.ts` };

/**
 * Output for webpack bundle
 */

const output = {
  path: paths['sample-app'],
  filename: '[name].js',
};

/**
 * Modules to be used by webpack
 */

const typeScript = {
  test: /\.ts?$/,
  use: 'ts-loader',
  exclude: /node_modules/,
};

const module = {
  rules: [typeScript],
};

/**
 * Resolve extions to be used by webpack
 */

const resolve = {
  extensions: ['.ts', '.js'],
  alias: {
    '@': paths['src'],
  },
};

export const webpackBase: WebpackConfiguration = {
  entry,
  output,
  resolve,
  module,
  context: __dirname,
  mode: config.DEV_MODE ? 'development' : 'production',
};
