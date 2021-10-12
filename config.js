import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export const APP_NAME = publicRuntimeConfig.APP_NAME;


const dev = publicRuntimeConfig.PRODUCTION == 'production';

export const API = dev ? publicRuntimeConfig.API_PRODUCTION : publicRuntimeConfig.API_DEVELOPMENT;
export const DOMAIN = dev ? publicRuntimeConfig.DOMAIN_PRODUCTION : publicRuntimeConfig.DOMAIN_DEVELOPMENT;

export const FB_APP_ID = publicRuntimeConfig.FB_APP_ID;
export const DISQUS_SHORTNAME = publicRuntimeConfig.DISQUS_SHORTNAME;
export const GOOGLE_CLIENT_ID = publicRuntimeConfig.GOOGLE_CLIENT_ID;
