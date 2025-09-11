#!/usr/bin/env node

// Simple CORS proxy server for development
// Usage: node cors-proxy-server.js
// Then set REACT_APP_API_URL=http://localhost:8080/https://ttjtesting.afrupqj.cn/api/v1

const corsAnywhere = require('cors-anywhere');

const host = 'localhost';
const port = 8080;

console.log('🔧 Starting CORS Proxy Server for Development...');

corsAnywhere.createServer({
  originWhitelist: [], // Allow all origins
  requireHeader: [], // Don't require specific headers
  removeHeaders: ['cookie', 'cookie2'], // Remove cookies for security
}).listen(port, host, () => {
  console.log(`🚀 CORS Proxy Server running at http://${host}:${port}`);
  console.log(`📡 API calls will be proxied through this server`);
  console.log(`🌍 Your API URL should be: http://${host}:${port}/https://ttjtesting.afrupqj.cn/api/v1`);
  console.log(`⚡ To stop: Ctrl+C`);
});