/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [ 
    'antd', 
    '@ant-design',
    '@ant-design/icons',
    'rc-util', 
    'rc-pagination', 
    'rc-picker', 
    'rc-notification', 
    'rc-tooltip' 
  ]
};

export default nextConfig;
