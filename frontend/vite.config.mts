import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import path from 'path';

const env = loadEnv(process.env.NODE_ENV as string, process.cwd(), 'VITE_');
console.log(env);
export default ({mode}) =>{
    console.log('mode:', mode);
    const config = {
        // depending on your application, base can also be "/"
        base: '',
        plugins: [react(), viteTsconfigPaths()],
        server: {    
            // this ensures that the browser opens upon server start
            host: true,
            // this sets a default port to 3000  
            port: 3000, 
            watch: {
                usePolling: true
            },
            proxy: {
                '/api': {
                    target: env.VITE_API_BACKEND_PROXY,
                    changeOrigin: true,
                    configure: (proxy, _options) => {
                        proxy.on('error', (err, _req, _res) => {
                            console.log('proxy error', err);
                        });
                        proxy.on('proxyReq', (proxyReq, req, _res) => {
                            console.log('Sending Request to the Target:', req.method, req.url);
                        });
                        proxy.on('proxyRes', (proxyRes, req, _res) => {
                            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
                        });
                    },
                }
            }
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@app': path.resolve(__dirname, './src/app'),
                '@shared-components': path.resolve(
                __dirname,
                './src/shared-components',
                ),
                '@features': path.resolve(__dirname, './src/features'),
                '@hooks': path.resolve(__dirname, './src/hooks'),
                '@services': path.resolve(__dirname, './src/services'),
                '@type': path.resolve(__dirname, './src/types'),
            },
        },
        define: {
            'process.env': process.env
        }
    }
    return defineConfig(config);

}