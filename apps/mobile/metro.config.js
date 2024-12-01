const {
    withNativeWind: withNativeWind
} = require("nativewind/metro");

const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const fs = require('fs');

// Find the project and workspace directories
const projectRoot = __dirname;
// This can be replaced with `find-yarn-workspace-root`
const monorepoRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// 1. Watch all files within the monorepo
config.watchFolders = [monorepoRoot];
// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
    path.resolve(projectRoot, 'node_modules'),
    path.resolve(monorepoRoot, 'node_modules'),
];

config.resolver.resolveRequest = (context, moduleName, platform) => {
    if ((moduleName.startsWith('.') || moduleName.startsWith('/')) && moduleName.endsWith('.js')) {
        const possibleResolvedTsFile = path
            .resolve(context.originModulePath, '..', moduleName)
            .replace(/\.js$/, '.ts');

        if (fs.existsSync(possibleResolvedTsFile)) {
            return {
                filePath: possibleResolvedTsFile,
                type: 'sourceFile',
            };
        }
    }

    return context.resolveRequest(context, moduleName, platform);
};

module.exports = withNativeWind(config, {
    input: "./global.css"
});