import type { MetadataRoute } from 'next';
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: '*', allow: '/' }, sitemap: 'https://jonathan-ferreira.jonathanfferreira.chatgpt.site/sitemap.xml' }; }
