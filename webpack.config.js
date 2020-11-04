const path =require('path')
module.exports= function(env,argv){
    const isEnvDevelopment = argv.mode ==='development'||!argv.mode;
    const isEnvProduction =argv.mode ==='production';
    return{
        mode:isEnvProduction?'production':isEnvDevelopment&&'development',
        detool:isEnvProduction?'source-map':isEnvDevelopment&&'cheap-module-source-map',
        entry:'./src/index.js',
        output:{
            filename:'bundle.js',
            path:path.resolve(__dirname,'dist')
        },
        module:{
            rules:[
                {
                    test: /\.js$/,
                    exclude:/node_moudeles/,
                    use:'babel-loader',
                }
            ]
        }
    }
};