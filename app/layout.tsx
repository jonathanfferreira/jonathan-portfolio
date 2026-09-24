import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
const chillax = localFont({ src: '../public/fonts/Chillax-Variable.ttf', variable: '--font-chillax', weight: '200 700', display: 'swap' });
const poppins = localFont({ src: [{ path: '../public/fonts/Poppins-Regular.ttf', weight: '400' }, { path: '../public/fonts/Poppins-Medium.ttf', weight: '500' }], variable: '--font-poppins', display: 'swap' });
const mono = localFont({ src: '../public/fonts/pt-mono-bold.ttf', variable: '--font-ptmono', weight: '700', display: 'swap' });
const origin = 'https://jonathan-ferreira.jonathanfferreira.chatgpt.site';
export const metadata: Metadata = { metadataBase: new URL(origin), title: 'Jonathan Ferreira — Product & UI Designer', description: 'Product and UI designer with a technical background, creating digital products, responsive interfaces and front-end experiences.', alternates: { canonical: '/' }, openGraph: { type: 'website', url: '/', title: 'Jonathan Ferreira — Product & UI Designer', description: 'Product Design / UI / Front-end. Explore XTAGE, selected work and the product lab.', siteName: 'Jonathan Ferreira', locale: 'en_US', alternateLocale: 'pt_BR' }, twitter: { card: 'summary', title: 'Jonathan Ferreira — Product & UI Designer', description: 'Digital products, interfaces and experiences with a technical mindset.' }, icons: { icon: '/favicon.svg' } };
export default function RootLayout({ children }: {
    children: React.ReactNode;
}) { return <html lang="en" className={`${chillax.variable} ${poppins.variable} ${mono.variable}`}><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Person', name: 'Jonathan Ferreira', jobTitle: 'Product & UI Designer', url: origin, sameAs: ['https://github.com/jonathanfferreira', 'https://www.linkedin.com/in/fferreirajonathan/'], email: 'fferreira.jonathan@gmail.com', address: { '@type': 'PostalAddress', addressLocality: 'Joinville', addressRegion: 'SC', addressCountry: 'BR' } }) }}/></body></html>; }
