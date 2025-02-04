/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        unoptimized: true,
    },
    experimental: {
        webpackBuildWorker: true,
        parallelServerBuildTraces: true,
        parallelServerCompiles: true,
    },
    // webpack: (config) => {
    //     config.module.rules.push({
    //         test: /\.css$/i,
    //         use: ['style-loader', 'css-loader'],
    //     })
    //     return config
    // },
}

module.exports = nextConfig