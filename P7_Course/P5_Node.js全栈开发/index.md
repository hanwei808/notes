# Model1 Node.js 高级编程（核心模块、模块加载机制）

devServer: {
    historyApiFallback: true,
    open: true,
    proxy:{
        "/api":{
            target:"http://16.163.134.229:23380/index",
            changeOrigin: true,
            pathRewrite:
                {
                    "^/api": "",
                }
        }
    }
}
