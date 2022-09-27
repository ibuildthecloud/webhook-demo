/** @type {import('next').NextConfig} */

module.exports = {
    output: 'standalone',
    env: {
        APP_VERSION: process.env.APP_VERSION || "",
    },
    async rewrites() {
        return [
            {
                source: '/wh/info',
                destination: 'http://localhost:5000/wh/info',
            },
            {
                source: '/wh',
                destination: 'http://localhost:5000/wh',
            },
            {
                source: '/data',
                destination: 'http://localhost:5000/data',
            },
            {
                source: '/ws',
                destination: 'http://localhost:8080/ws',
            },
            {
                source: '/docs',
                destination: 'http://localhost:8082/docs/',
            },
        ]
    },
}