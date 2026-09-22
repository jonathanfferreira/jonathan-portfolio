'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, ArrowDown, ArrowUp, Download, Plus, Database, Layers3, Code2, Menu, X, GitBranch } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useMotionValueEvent } from 'motion/react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { copy, production, lab, stack, type Language } from '@/data/content';
// Set true after adding public/jonathan-ferreira-resume.pdf.
const resumeAvailable = false;
const navIds = ['about', 'work', 'experience', 'contact'];
const journeyNodes = [{ id: 'top', label: 'START' }, { id: 'about', label: 'DATABASES' }, { id: 'work', label: 'PRODUCT' }, { id: 'xtage', label: 'XTAGE' }, { id: 'production', label: 'ECAPX' }, { id: 'lab', label: 'BUILDING' }, { id: 'contact', label: 'NOW' }];
function Journey() {
    const ref = useRef<SVGPathElement>(null);
    const dot = useRef<SVGCircleElement>(null);
    const [points, setPoints] = useState<{
        y: number;
        label: string;
    }[]>([]);
    const [height, setHeight] = useState(5000);
    const { scrollYProgress } = useScroll();
    const reduced = useReducedMotion();
    useEffect(() => {
        const update = () => { const base = document.getElementById('main')!; const offset = base.getBoundingClientRect().top + window.scrollY; setHeight(base.offsetHeight); setPoints(journeyNodes.map(n => ({ y: (document.getElementById(n.id)?.getBoundingClientRect().top ?? 0) + window.scrollY - offset + (n.id === 'top' ? 180 : 60), label: n.label }))); };
        update();
        const observer = new ResizeObserver(update);
        observer.observe(document.getElementById("main")!);
        return () => observer.disconnect();
    }, []);
    useMotionValueEvent(scrollYProgress, 'change', v => { if (!reduced && ref.current && dot.current) {
        const p = ref.current.getPointAtLength(v * ref.current.getTotalLength());
        dot.current.setAttribute('cx', String(p.x));
        dot.current.setAttribute('cy', String(p.y));
    } });
    const d = points.map((p, i) => i === 0 ? `M 22 ${p.y}` : `L 22 ${p.y - 32} Q 22 ${p.y - 20} 32 ${p.y - 10} Q 42 ${p.y} 32 ${p.y + 10} Q 22 ${p.y + 20} 22 ${p.y + 32}`).join(' ');
    return <div className="journey" aria-hidden="true"><svg width="100" height={height}><path ref={ref} d={d} fill="none" stroke="#343434" strokeWidth="1"/>{points.map(p => <g key={p.label}><circle cx="22" cy={p.y} r="3" fill="#ff5200"/><text x="42" y={p.y + 4}>{p.label}</text></g>)}<circle ref={dot} cx="22" cy="180" r="5" fill="#ff5200" className="journey-dot"/></svg></div>;
}
function Tags({ items }: {
    items: readonly string[];
}) { return <ul className="tags">{items.map(item => <li key={item}>{item}</li>)}</ul>; }
function External({ href, children, className = '' }: {
    href: string;
    children: React.ReactNode;
    className?: string;
}) { return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}<ArrowUpRight size={17} aria-hidden="true"/></a>; }
function ResumeButton({ lang }: {
    lang: Language;
}) { const t = copy[lang]; if (resumeAvailable)
    return <a className="text-button" href="/jonathan-ferreira-resume.pdf" download><Download size={16}/>{t.resume}</a>; return <Dialog><DialogTrigger className="text-button"><Download size={16}/>{t.resume}</DialogTrigger><DialogContent className="resume-dialog" showCloseButton={false}><DialogTitle>{t.resume}</DialogTitle><DialogDescription>{t.resumeNotice}</DialogDescription><a href="mailto:fferreira.jonathan@gmail.com?subject=Curr%C3%ADculo%20%E2%80%94%20Jonathan%20Ferreira" className="button primary">{t.resumeEmail}<ArrowUpRight size={18}/></a><DialogClose className="text-button dialog-close">{t.close}<X size={16}/></DialogClose></DialogContent></Dialog>; }
export default function Portfolio() {
    const [lang, setLang] = useState<Language>('en');
    const [menu, setMenu] = useState(false);
    const t = copy[lang];
    const reduced = useReducedMotion();
    useEffect(() => { document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'; }, [lang]);
    const reveal = { initial: false as const, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .12 }, transition: { duration: reduced ? 0 : .55 } };
    return <>
 <a className="skip" href="#main">{t.skip}</a>
 <header className="header"><a href="#top" className="wordmark" aria-label="Jonathan Ferreira — Home">jf<span>✳</span></a><nav className="desktop-nav" aria-label={lang === 'pt' ? 'Navegação principal' : 'Main navigation'}>{t.nav.map((item, i) => <a key={item} href={`#${navIds[i]}`}>{item}</a>)}</nav><div className="header-right"><div className="languages" aria-label="Language"><button aria-pressed={lang === 'pt'} onClick={() => setLang('pt')}>PT</button><span>/</span><button aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button></div><a href="mailto:fferreira.jonathan@gmail.com" className="header-cta">{t.contact}<ArrowUpRight size={17}/></a><button className="menu-toggle" aria-label={menu ? (lang === 'pt' ? 'Fechar menu' : 'Close menu') : (lang === 'pt' ? 'Abrir menu' : 'Open menu')} aria-expanded={menu} aria-controls="mobile-nav" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button></div></header>
 {menu && <nav className="mobile-nav" id="mobile-nav">{t.nav.map((item, i) => <a href={`#${navIds[i]}`} key={item} onClick={() => setMenu(false)}>{item}<ArrowUpRight size={18}/></a>)}</nav>}
 <main id="main"><Journey />
 <section className="hero wrap" id="top"><div className="hero-meta"><span className="mono">JONATHAN FERREIRA</span><span className="availability"><i />{t.available}</span></div>
 <motion.h1 initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : .7 }}>Software<br /><span>Developer<span className="orange">.</span></span></motion.h1>
 <div className="hero-diagram" aria-hidden="true"><svg viewBox="0 0 300 210"><path d="M15 180H70Q90 180 90 160V125Q90 100 115 100H235Q260 100 260 75V35" fill="none" stroke="#444" strokeWidth="1.3"/><path d="M15 180H70Q90 180 90 160V125Q90 100 115 100H190" fill="none" stroke="#ff5200" strokeWidth="2"/><circle cx="15" cy="180" r="4" fill="#ff5200"/><circle cx="190" cy="100" r="5" fill="#ff5200"/><circle cx="260" cy="35" r="4" fill="#050505" stroke="#777"/><text x="14" y="202">DATABASES</text><text x="191" y="80">PRODUCT</text><text x="219" y="18">WHAT’S NEXT?</text></svg><span className="diagram-caption">[ A CONTINUOUS EVOLUTION ]</span></div>
 <div className="hero-lower"><div><p className="mono role">{t.role}</p><p className="intro">{t.intro}</p><div className="hero-actions"><a href="#work" className="button primary">{t.projects}<ArrowDown size={17}/></a><ResumeButton lang={lang}/></div></div><div className="hero-note"><span className="cross">+</span><span className="mono">{t.location}</span><span className="mono">{lang === 'pt' ? 'ABERTO AO PRÓXIMO PASSO' : 'OPEN TO WHAT’S NEXT'}</span></div></div>
 <div className="hero-bottom"><div className="hero-stack mono">NEXT.JS <b>·</b> REACT <b>·</b> TYPESCRIPT <b>·</b> SUPABASE <b>·</b> POSTGRESQL</div><a href="#about" className="scroll mono">{t.scroll}<ArrowDown size={14}/></a></div>
 </section>
 <motion.section {...reveal} className="section wrap about" id="about"><div className="section-index mono"><span>01 / {lang === 'pt' ? 'SOBRE' : 'ABOUT'}</span><Plus size={16}/></div><div className="about-grid"><h2>{t.about}</h2><div className="about-copy"><p>{t.aboutText}</p><p className="muted">{t.aboutExtra}</p><span className="mono orange about-foot">{t.aboutFoot}</span></div></div></motion.section>
 <section className="section wrap work" id="work"><div className="section-index mono"><span>02 / {t.featured.toUpperCase()}</span><span>{lang === 'pt' ? 'PROJETO SELECIONADO' : 'SELECTED PROJECT'} / 2026</span></div><div id="xtage" className="featured"><div className="featured-art"><div className="art-meta mono"><span>XTAGE</span><span>SAAS / EVENT MANAGEMENT</span></div><Image src="/images/xtage.png" alt="XTAGE" width={760} height={230} className="xtage-logo" sizes="(max-width: 900px) 75vw, 40vw"/><div className="product-flow"><span><Layers3 size={18}/>{lang === 'pt' ? 'Inscrições' : 'Registrations'}</span><i /><span><Database size={18}/>{lang === 'pt' ? 'Operação' : 'Operations'}</span><i /><span><Code2 size={18}/>{lang === 'pt' ? 'Pagamentos' : 'Payments'}</span></div><div className="art-footer mono"><span>FROM BACKSTAGE TO CENTER STAGE.</span><span>XTAGE.APP ↗</span></div></div><div className="featured-info"><div className="project-top"><span className="mono orange">FEATURED / 01</span><span className="live-label mono"><i />{lang === 'pt' ? 'EM PRODUÇÃO' : 'IN PRODUCTION'}</span></div><h2>XTAGE<span className="orange">.</span></h2><h3>{t.xtage}</h3><p>{t.xtageText}</p><Tags items={['Next.js', 'React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Vercel']}/><div className="project-actions"><External href="https://xtage.app" className="button light">{t.live}</External><a href="#xtage-case" onClick={() => { const e = document.getElementById("xtage-case"); if (e instanceof HTMLDetailsElement)
        e.open = true; }} className="text-button">{t.case}<Plus size={16}/></a></div></div></div><details id="xtage-case" className="case-details"><summary><span className="mono">XTAGE / {t.case}</span><Plus size={18}/></summary><div className="case-body"><div><h3>{t.caseTitle}</h3><p>{t.caseText}</p></div><ul>{t.caseAreas.map(a => <li key={a}><ArrowUpRight size={16}/>{a}</li>)}</ul></div></details></section>
 <section className="section wrap production" id="production"><div className="section-index mono"><span>03 / {lang === 'pt' ? 'PRODUÇÃO' : 'PRODUCTION'}</span><span>01 — 03</span></div><div className="section-heading"><h2>{t.production}</h2><p className="muted">{t.productionSub}</p></div><div className="project-grid">{production.map((p, i) => <article className={`project-card ${p.accent}`} key={p.name}><a className={`project-visual visual-${i}`} href={p.url} target="_blank" rel="noopener noreferrer" aria-label={`${t.visit}: ${p.name}`}>{i === 0 ? <Image src="/images/ecapx.png" alt="ECAPX" sizes="(max-width: 600px) 70vw, 25vw" width={360} height={140}/> : i === 1 ? <Image src="/images/xpace.png" alt="XPACE Company" sizes="(max-width: 600px) 70vw, 25vw" width={350} height={170}/> : <Image src="/images/smile.webp" alt={lang === 'pt' ? 'Página inicial do O Smile Burger' : 'O Smile Burger homepage'} sizes="(max-width: 600px) 100vw, 35vw" width={1440} height={900}/>}<span className="visual-arrow"><ArrowUpRight size={21}/></span><span className="visual-number mono">0{i + 1}</span></a><div className="project-caption"><span className="mono muted">{p.category[lang]}</span><h3>{p.name}</h3><p>{p.description[lang]}</p><Tags items={p.stack}/><External href={p.url} className="text-button">{t.visit}</External></div></article>)}</div></section>
 <section className="lab-section" id="lab"><div className="wrap section"><div className="section-index mono"><span>04 / PRODUCT LAB</span><span className="lab-mark">[ {lang === 'pt' ? 'EM DESENVOLVIMENTO' : 'WORK IN PROGRESS'} ]</span></div><div className="section-heading lab-heading"><h2>{t.labTitle}<span className="orange">_</span></h2><p className="muted">{t.labSub}</p></div><div className="lab-grid">{lab.map((p, i) => <article key={p.name} className="lab-card"><div className="lab-card-top mono"><span>EXP_00{i + 1}</span><Plus size={19}/></div><span className={`lab-status ${p.accent} mono`}>{p.status?.[lang]}</span><h3>{p.name}</h3><span className="lab-category mono">{p.category[lang]}</span><p className="muted">{p.description[lang]}</p>{p.stack.length > 0 && <Tags items={p.stack}/>}<div className="lab-actions">{p.demoUrl && <External href={p.demoUrl} className="text-button">{t.liveDemo}</External>}{(p.repoUrl || p.url) && <External href={p.repoUrl || p.url} className="text-button"><GitBranch size={16}/>{t.repo}</External>}</div></article>)}</div></div></section>
 <section className="section wrap experience" id="experience"><div className="section-index mono"><span>05 / {lang === 'pt' ? 'EXPERIÊNCIA' : 'EXPERIENCE'}</span><Plus size={16}/></div><h2>{t.experience}</h2><div className="experience-row"><div className="mono date">{t.xtageDate}</div><div><h3>XTAGE</h3><span className="experience-role">{t.xtageRole}</span><p className="muted">{t.xtageExperience}</p></div><ArrowUpRight className="experience-arrow" size={24}/></div><div className="experience-row"><div className="mono date">2022 — {lang === 'pt' ? 'JUN' : 'JUN'} 2026</div><div><h3>ORAEX Cloud Consulting</h3><span className="experience-role">{t.oraexRole}</span><p className="mono progression">{t.oraexProgress}</p><p className="muted">{t.oraexText}</p></div><Database className="experience-arrow" size={24}/></div></section>
 <section className="section wrap toolkit" id="stack"><div className="section-index mono"><span>06 / {lang === 'pt' ? 'TECNOLOGIAS' : 'TECH STACK'}</span><Plus size={16}/></div><div className="toolkit-grid"><h2>{t.toolkit}</h2><div className="stack-list">{stack.map((s, i) => <div key={s.name}><h3 className="mono"><span>0{i + 1}</span>{s.name}</h3><Tags items={s.items}/></div>)}</div></div><div className="education-grid"><div><span className="mono muted">{t.educationLabel}</span><h3>{t.education}</h3><p>Descomplica Faculdade Digital</p><span className="mono muted">{t.expected}</span></div><div><span className="mono muted">{t.certLabel}</span><h3>{t.cert}</h3><span className="mono muted">2025</span></div></div></section>
 <section className="contact-section" id="contact"><div className="section wrap"><div className="section-index mono"><span>07 / {lang === 'pt' ? 'CONTATO' : 'CONTACT'}</span><span>{lang === 'pt' ? 'O PRÓXIMO CAPÍTULO' : 'THE NEXT CHAPTER'}</span></div><div className="contact-grid"><h2>{t.contactTitle}</h2><div><p>{t.contactText}</p><a href="mailto:fferreira.jonathan@gmail.com" className="button primary">{t.email}<ArrowUpRight size={20}/></a></div></div><a className="email-address" href="mailto:fferreira.jonathan@gmail.com">fferreira.jonathan@gmail.com<ArrowUpRight size={22}/></a><div className="contact-bottom"><span className="mono muted">JOINVILLE, SANTA CATARINA, BRAZIL</span><div><External href="https://www.linkedin.com/in/fferreirajonathan/">LinkedIn</External><External href="https://github.com/jonathanfferreira">GitHub</External><ResumeButton lang={lang}/></div></div></div></section>
 </main><footer className="wrap footer"><a href="#top" className="wordmark">jf<span>✳</span></a><span className="mono muted">© 2026 JONATHAN FERREIRA</span><a href="#top" className="text-button">{t.top}<ArrowUp size={16}/></a></footer>
 </>;
}
