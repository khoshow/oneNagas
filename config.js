import getConfig from 'next/config';
const { env } = getConfig();

export const API = env.PRODUCTION
    ? env.API_PRODUCTION
    : env.API_DEVELOPMENT;

export const APP_NAME = env.APP_NAME;

export const DOMAIN = env.PRODUCTION
    ? env.DOMAIN_PRODUCTION
    : env.DOMAIN_DEVELOPMENT;

export const FB_APP_ID = env.FB_APP_ID;
export const DISQUS_SHORTNAME = env.DISQUS_SHORTNAME;
export const GOOGLE_CLIENT_ID = env.GOOGLE_CLIENT_ID
