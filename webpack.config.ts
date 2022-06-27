import { developmentWebpack, productionWebpack, config } from './webpack';

/**
 * Applicable webpack configuration based on environment
 */
const webpackConfig = config.DEV_MODE ? developmentWebpack : productionWebpack;

export default webpackConfig;
