import path from 'path';

/**
 * Paths to be used by webpack
 */
export const paths = {
  src: path.resolve(__dirname, '../', 'src'), // source directory
  'sample-app': path.resolve(__dirname, '../', 'sample-app'), // build directory
};

/**
 * Configuration variables for webpack
 */
export const config = {
  HOST: process.env.WEBPACK_HOST || 'localhost',
  PORT: process.env.WEBPACK_PORT || '8888',
  DEV_MODE: process.env.NODE_ENV !== 'production',
};
