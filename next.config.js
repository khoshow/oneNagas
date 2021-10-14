require('dotenv').config()
//For Production
module.exports = {  
    publicRuntimeConfig: {
        APP_NAME: process.env.APP_NAME,
        API_DEVELOPMENT: process.env.API_DEVELOPMENT,
        API_PRODUCTION: process.env.API_PRODUCTION,
        PRODUCTION:process.env.PRODUCTION,
        APP_PRODUCTION:true,
        DOMAIN_DEVELOPMENT: process.env.DOMAIN_DEVELOPMENT,
        DOMAIN_PRODUCTION: process.env.DOMAIN_PRODUCTION,
        FB_APP_ID: process.env. FB_APP_ID,
        DISQUS_SHORTNAME: process.env.DISQUS_SHORTNAME,
        GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID,
        webpack5: true
    }
}

//For Development

// module.exports = {  
//     publicRuntimeConfig: {
//         APP_NAME: process.env.APP_NAME,
//         API_DEVELOPMENT: process.env.API_DEVELOPMENT,
//         API_PRODUCTION: process.env.API_PRODUCTION,
//         PRODUCTION=process.env.PRODUCTION,
//         DOMAIN_DEVELOPMENT: process.env.DOMAIN_DEVELOPMENT,
//         DOMAIN_PRODUCTION: process.env. DOMAIN_PRODUCTION,
//         FB_APP_ID: process.env. FB_APP_ID,
//         DISQUS_SHORTNAME: process.env.DISQUS_SHORTNAME,
//         GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID,
//         webpack5: true
//     }
// }

