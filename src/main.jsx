import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronDown,
  CircleDot,
  ClipboardCheck,
  Clock3,
  LifeBuoy,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  MonitorSmartphone,
  Phone,
  Save,
  ShieldCheck,
  Sparkles,
  Store,
  Wrench,
  X
} from "./icons.jsx";
import defaultContent from "./content/siteContent.json";
import "./styles.css";

const STORAGE_KEY = "forge-digital-content";
const AUTH_KEY = "forge-digital-admin-auth";

const iconMap = {
  website: MonitorSmartphone,
  contact: MessageCircle,
  support: LifeBuoy,
  learn: ClipboardCheck,
  improve: Wrench,
  launch: ShieldCheck,
  shop: Store,
  firm: BriefcaseBusiness,
  location: MapPin,
  time: Clock3
};

function App() {
  const [content, setContent] = useSiteContent();
  const isAdmin = window.location.pathname === "/admin";

  if (isAdmin) {
    return <AdminPage content={content} setContent={setContent} />;
  }

  return <Site content={content} />;
}

function useSiteContent() {
  const [content, setContentState] = useState(defaultContent);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      setContentState(mergeContent(defaultContent, JSON.parse(saved)));
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const setContent = (nextContent) => {
    setContentState(nextContent);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextContent));
  };

  return [content, setContent];
}

function mergeContent(base, override) {
  if (Array.isArray(base)) return Array.isArray(override) ? override : base;
  if (!base || typeof base !== "object") return override ?? base;

  return Object.keys(base).reduce((merged, key) => {
    merged[key] = mergeContent(base[key], override?.[key]);
    return merged;
  }, {});
}

function Site({ content }) {
  const visible = content.sections;

  return (
    <div className="min-h-screen overflow-hidden bg-ink text-white">
      <div className="site-bg fixed inset-0 -z-10" />
      <Header content={content} />
      <main>
        <Hero content={content} />
        {visible.services && <Services content={content} />}
        {visible.howItWorks && <HowItWorks content={content} />}
        {visible.example && <Example content={content} />}
        {visible.packages && <Packages content={content} />}
        {visible.proof && <Proof content={content} />}
        {visible.faq && <FAQ content={content} />}
        {visible.contact && <Contact content={content} />}
        <FinalCta content={content} />
      </main>
      <Footer content={content} />
    </div>
  );
}

function Header({ content }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-ink/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <a href="#top" className="group flex items-center">
          <LogoMark />
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {content.nav.map((item) => (
            <a key={item.label} className="nav-link" href={item.href}>
              {item.label}
            </a>
          ))}
        </div>

        <Button href="#contact" size="sm" className="hidden lg:inline-flex">
          {content.cta.primary}
        </Button>

        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-white/10 bg-ink/96 px-5 py-5 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {content.nav.map((item) => (
              <a
                key={item.label}
                className="rounded-lg px-3 py-3 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white"
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button href="#contact" className="mt-3 justify-center">
              {content.cta.primary}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

function LogoMark() {
  return (
    <span className="flex select-none items-baseline gap-1.5">
      <span
        className="font-display text-[1.2rem] font-bold italic leading-none tracking-tight text-white"
        style={{ fontVariationSettings: "'opsz' 72, 'wght' 700" }}
      >
        Forge
      </span>
      <span className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
        Digital
      </span>
    </span>
  );
}

function Hero({ content }) {
  return (
    <section id="top" className="relative pt-32 sm:pt-36 lg:pt-40">
      <Container className="grid items-center gap-14 pb-20 lg:grid-cols-[1.02fr_.98fr] lg:pb-28">
        <div className="reveal">
          <Eyebrow>{content.hero.eyebrow}</Eyebrow>
          <h1
            className="mt-6 max-w-4xl font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[5.25rem]"
            style={{ fontVariationSettings: "'opsz' 72, 'wght' 700" }}
          >
            {content.hero.headline}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
            {content.hero.subheadline}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="#contact">{content.hero.primaryButton}</Button>
            <Button href="#services" variant="secondary">
              {content.hero.secondaryButton}
            </Button>
          </div>
          <div className="mt-8 grid gap-3 text-sm text-slate-400 sm:grid-cols-3">
            {content.hero.trustBullets.map((item) => (
              <div key={item} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 flex-none text-slate-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal delay-100">
          <PhotoStory content={content} />
        </div>
      </Container>
    </section>
  );
}

function PhotoStory({ content }) {
  return (
    <div className="relative mx-auto max-w-xl">
      <div className="absolute -inset-5 rounded-[2rem] bg-white/[0.04] blur-3xl" />
      <div className="relative overflow-hidden rounded-[1.65rem] border border-white/12 bg-white/[0.055] shadow-card">
        <img
          src={content.photos.hero}
          alt={content.hero.photoAlt}
          className="h-[460px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/24 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
          <div className="rounded-2xl border border-white/14 bg-ink/74 p-5 backdrop-blur-md">
            <p className="font-display text-xl font-bold text-white" style={{ fontVariationSettings: "'opsz' 20, 'wght' 650" }}>
              {content.hero.photoCardTitle}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              {content.hero.photoCardText}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {content.hero.photoTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/12 bg-white/[0.07] px-3 py-1 text-xs font-medium text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Services({ content }) {
  return (
    <Section id="services">
      <SectionHeader
        eyebrow={content.services.eyebrow}
        title={content.services.title}
        text={content.services.intro}
      />
      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {content.services.cards.map((service, index) => (
          <FeatureCard key={service.title} item={service} index={index} />
        ))}
      </div>
    </Section>
  );
}

function FeatureCard({ item, index }) {
  const Icon = iconMap[item.icon] || CircleDot;
  return (
    <article
      style={{ transitionDelay: `${index * 60}ms` }}
      className="group flex min-h-[300px] flex-col rounded-2xl border border-white/10 bg-white/[0.045] p-7 transition duration-300 hover:-translate-y-1 hover:border-cyan/28 hover:bg-white/[0.065]"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.07] text-white/60">
        <Icon size={22} />
      </div>
      <h3 className="mt-8 font-display text-2xl font-bold text-white" style={{ fontVariationSettings: "'opsz' 24, 'wght' 650" }}>
        {item.title}
      </h3>
      <p className="mt-4 flex-1 leading-7 text-slate-300">{item.description}</p>
      <p className="mt-8 text-sm text-slate-500">{item.footer}</p>
    </article>
  );
}

function HowItWorks({ content }) {
  return (
    <Section id="process" className="relative">
      <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
        <SectionHeader
          align="left"
          eyebrow={content.process.eyebrow}
          title={content.process.title}
          text={content.process.text}
        />
        <div className="space-y-4">
          {content.process.steps.map((step, index) => {
            const Icon = iconMap[step.icon] || CircleDot;
            return (
              <div
                key={step.title}
                style={{ transitionDelay: `${index * 60}ms` }}
                className="grid gap-5 rounded-2xl border border-white/10 bg-panel/70 p-6 sm:grid-cols-[auto_1fr]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.07] text-white/60">
                  <Icon size={22} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {step.number}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-bold text-white" style={{ fontVariationSettings: "'opsz' 24, 'wght' 650" }}>
                    {step.title}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-300">{step.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

function Example({ content }) {
  return (
    <Section id="example">
      <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_.98fr]">
        <div>
          <Eyebrow>{content.example.eyebrow}</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl" style={{ fontVariationSettings: "'opsz' 48, 'wght' 700" }}>
            {content.example.title}
          </h2>
          <p className="mt-6 max-w-2xl leading-8 text-slate-300">
            {content.example.body}
          </p>
          <div className="mt-7 space-y-3">
            {content.example.points.map((point) => (
              <div key={point} className="flex gap-3 text-slate-300">
                <BadgeCheck className="mt-1 h-5 w-5 flex-none text-slate-500" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
        <BeforeAfterCard content={content} />
      </div>
    </Section>
  );
}

function BeforeAfterCard({ content }) {
  return (
    <div className="reveal delay-100 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] shadow-card">
      <img
        src={content.photos.example}
        alt={content.example.photoAlt}
        className="h-64 w-full object-cover"
      />
      <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
        <div className="rounded-2xl border border-white/10 bg-slate-950/55 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Before
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
            {content.example.before.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-white/14 bg-white/[0.06] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
            After
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-200">
            {content.example.after.map((item) => (
              <li key={item}>— {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Packages({ content }) {
  return (
    <Section id="packages">
      <SectionHeader
        eyebrow={content.packages.eyebrow}
        title={content.packages.title}
        text={content.packages.text}
      />
      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {content.packages.cards.map((item) => (
          <PackageCard key={item.title} item={item} />
        ))}
      </div>
    </Section>
  );
}

function PackageCard({ item }) {
  return (
    <article className="flex min-h-[430px] flex-col rounded-2xl border border-white/10 bg-white/[0.045] p-7 transition duration-300 hover:-translate-y-1 hover:border-cyan/28">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{item.label}</p>
      <h3 className="mt-4 font-display text-2xl font-bold text-white" style={{ fontVariationSettings: "'opsz' 24, 'wght' 650" }}>
        {item.title}
      </h3>
      <p className="mt-4 leading-7 text-slate-300">{item.description}</p>
      <div className="mt-6 space-y-3">
        {item.features.map((feature) => (
          <div key={feature} className="flex gap-3 text-sm text-slate-300">
            <Check className="h-5 w-5 flex-none text-slate-500" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
      <Button href="#contact" variant="secondary" className="mt-auto justify-center">
        {item.button}
      </Button>
    </article>
  );
}

function Proof({ content }) {
  return (
    <Section id="proof">
      <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] shadow-card">
          <img
            src={content.photos.proof}
            alt={content.proof.photoAlt}
            className="h-[390px] w-full object-cover"
          />
        </div>
        <div>
          <Eyebrow>{content.proof.eyebrow}</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl" style={{ fontVariationSettings: "'opsz' 48, 'wght' 700" }}>
            {content.proof.title}
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {content.proof.items.map((item) => {
              const Icon = iconMap[item.icon] || CircleDot;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-panel/70 p-5"
                >
                  <Icon className="h-6 w-6 text-slate-400" />
                  <p className="mt-5 font-display font-semibold leading-6 text-white">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}

function FAQ({ content }) {
  return (
    <Section id="faq">
      <SectionHeader eyebrow={content.faq.eyebrow} title={content.faq.title} />
      <div className="mx-auto mt-10 max-w-3xl space-y-3">
        {content.faq.items.map((item) => (
          <FAQItem key={item.question} item={item} />
        ))}
      </div>
    </Section>
  );
}

function FAQItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.045]">
      <button
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-display font-semibold text-white"
        onClick={() => setOpen(!open)}
      >
        <span>{item.question}</span>
        <ChevronDown
          className={`h-5 w-5 flex-none text-slate-500 transition ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <p className="px-5 pb-5 leading-7 text-slate-300">{item.answer}</p>}
    </div>
  );
}

function Contact({ content }) {
  return (
    <Section id="contact">
      <div className="grid gap-10 lg:grid-cols-[.82fr_1.18fr]">
        <div>
          <Eyebrow>{content.contact.eyebrow}</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl" style={{ fontVariationSettings: "'opsz' 48, 'wght' 700" }}>
            {content.contact.title}
          </h2>
          <p className="mt-6 leading-8 text-slate-300">{content.contact.text}</p>
          <div className="mt-8 space-y-3 rounded-2xl border border-white/10 bg-panel/70 p-5">
            <ContactLine icon={Mail}>{content.contact.email}</ContactLine>
            <ContactLine icon={Phone}>{content.contact.phone}</ContactLine>
            <ContactLine icon={MapPin}>{content.contact.location}</ContactLine>
          </div>
        </div>
        <form className="rounded-3xl border border-white/10 bg-white/[0.055] p-5 shadow-card sm:p-7">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" placeholder="Your name" />
            <Field label="Email" type="email" placeholder="you@business.com" />
          </div>
          <div className="mt-4">
            <Field
              label="Business type"
              placeholder="Restaurant, local service, real estate..."
            />
          </div>
          <div className="mt-4">
            <label className="text-sm font-medium text-slate-200" htmlFor="message">
              What would you like to improve?
            </label>
            <textarea
              id="message"
              rows="5"
              placeholder="A better website, more inquiries, faster follow-up, or something else?"
              className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan/60"
            />
          </div>
          <button
            type="button"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-cyan/40 bg-cyan px-5 py-3.5 text-sm font-bold text-slate-950 shadow-soft transition hover:bg-white"
          >
            {content.contact.button}
            <ArrowRight size={16} />
          </button>
          <p className="mt-4 text-center text-xs text-slate-500">
            This form is ready to connect to email, CRM, or a booking tool.
          </p>
        </form>
      </div>
    </Section>
  );
}

function ContactLine({ icon: Icon, children }) {
  return (
    <div className="flex items-center gap-3 text-sm text-slate-300">
      <Icon className="h-4 w-4 text-slate-500" />
      <span>{children}</span>
    </div>
  );
}

function FinalCta({ content }) {
  return (
    <Section className="py-14">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-slate-900/70 p-8 text-center shadow-card sm:p-12 lg:p-16">
        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <h2 className="mx-auto max-w-4xl font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl" style={{ fontVariationSettings: "'opsz' 48, 'wght' 700" }}>
          {content.finalCta.title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-300">
          {content.finalCta.text}
        </p>
        <div className="mt-8">
          <Button href="#contact">{content.finalCta.button}</Button>
        </div>
      </div>
    </Section>
  );
}

function Footer({ content }) {
  return (
    <footer className="border-t border-white/[0.07] py-12">
      <Container className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-xs">
          <LogoMark />
          <p className="mt-4 text-sm leading-6 text-slate-500">
            {content.brand.tagline}
          </p>
          <p className="mt-5 text-xs italic text-slate-600">
            Built for real businesses, by real people.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500 lg:pt-1">
          {content.nav.map((item) => (
            <a key={item.label} href={item.href} className="transition hover:text-slate-300">
              {item.label}
            </a>
          ))}
        </div>
        <p className="text-xs text-slate-600 lg:pt-1">
          © {new Date().getFullYear()} {content.brand.name}
        </p>
      </Container>
    </footer>
  );
}

function AdminPage({ content, setContent }) {
  const [authed, setAuthed] = useState(
    window.sessionStorage.getItem(AUTH_KEY) === "true"
  );
  const [password, setPassword] = useState("");
  const [draft, setDraft] = useState(content);
  const [saved, setSaved] = useState(false);

  useEffect(() => setDraft(content), [content]);

  const photos = useMemo(
    () => [
      ["hero", "Hero photo"],
      ["example", "Example photo"],
      ["proof", "Proof photo"]
    ],
    []
  );

  const login = (event) => {
    event.preventDefault();
    if (password === content.admin.password) {
      window.sessionStorage.setItem(AUTH_KEY, "true");
      setAuthed(true);
    }
  };

  const save = () => {
    setContent(draft);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  };

  const reset = () => {
    setDraft(defaultContent);
    setContent(defaultContent);
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-ink px-5 py-10 text-white">
        <div className="mx-auto mt-20 max-w-md rounded-3xl border border-white/10 bg-white/[0.055] p-7 shadow-card">
          <LogoMark />
          <h1 className="mt-8 font-display text-3xl font-semibold">
            Forge Digital Admin
          </h1>
          <p className="mt-3 leading-7 text-slate-300">
            Enter the admin password to edit the site content in this browser.
          </p>
          <form onSubmit={login} className="mt-7 space-y-4">
            <Field
              label="Password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={setPassword}
            />
            <button className="inline-flex w-full items-center justify-center rounded-xl bg-cyan px-5 py-3 text-sm font-bold text-slate-950">
              Open editor
            </button>
          </form>
          <p className="mt-4 text-xs leading-5 text-slate-500">
            Default password is stored in the JSON content file and can be
            changed there before deploying.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink px-5 py-8 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <a href="/" className="text-sm font-semibold text-cyan">
              ← Back to website
            </a>
            <h1 className="mt-4 font-display text-4xl font-semibold">
              Site editor
            </h1>
            <p className="mt-2 text-slate-400">
              Edit common copy, photos, visibility, and contact details.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={reset}
              className="rounded-xl border border-white/10 px-4 py-3 text-sm font-bold text-slate-200 hover:bg-white/5"
            >
              Reset content
            </button>
            <button
              onClick={save}
              className="inline-flex items-center gap-2 rounded-xl bg-cyan px-5 py-3 text-sm font-bold text-slate-950"
            >
              <Save size={16} />
              {saved ? "Saved" : "Save changes"}
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-2xl border border-white/10 bg-white/[0.045] p-5">
            <h2 className="font-display text-lg font-semibold">
              Section visibility
            </h2>
            <div className="mt-5 space-y-3">
              {Object.keys(draft.sections).map((key) => (
                <label
                  key={key}
                  className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-white/10 bg-slate-950/40 px-3 py-3 text-sm capitalize text-slate-300"
                >
                  <span>{labelize(key)}</span>
                  <input
                    type="checkbox"
                    checked={draft.sections[key]}
                    onChange={(event) =>
                      setDraft(updatePath(draft, `sections.${key}`, event.target.checked))
                    }
                    className="h-4 w-4 accent-cyan"
                  />
                </label>
              ))}
            </div>
          </aside>

          <div className="space-y-6">
            <AdminPanel title="Hero">
              <AdminInput label="Eyebrow" path="hero.eyebrow" draft={draft} setDraft={setDraft} />
              <AdminTextarea label="Headline" path="hero.headline" draft={draft} setDraft={setDraft} />
              <AdminTextarea label="Subheadline" path="hero.subheadline" draft={draft} setDraft={setDraft} />
              <div className="grid gap-4 sm:grid-cols-2">
                <AdminInput label="Primary button" path="hero.primaryButton" draft={draft} setDraft={setDraft} />
                <AdminInput label="Secondary button" path="hero.secondaryButton" draft={draft} setDraft={setDraft} />
              </div>
              <AdminTextarea label="Photo card text" path="hero.photoCardText" draft={draft} setDraft={setDraft} />
            </AdminPanel>

            <AdminPanel title="Services">
              <AdminInput label="Section heading" path="services.title" draft={draft} setDraft={setDraft} />
              {draft.services.cards.map((_, index) => (
                <AdminRepeater key={index} title={`Service ${index + 1}`}>
                  <AdminInput label="Title" path={`services.cards.${index}.title`} draft={draft} setDraft={setDraft} />
                  <AdminTextarea label="Description" path={`services.cards.${index}.description`} draft={draft} setDraft={setDraft} />
                  <AdminInput label="Footer" path={`services.cards.${index}.footer`} draft={draft} setDraft={setDraft} />
                </AdminRepeater>
              ))}
            </AdminPanel>

            <AdminPanel title="Packages">
              {draft.packages.cards.map((_, index) => (
                <AdminRepeater key={index} title={`Package ${index + 1}`}>
                  <AdminInput label="Title" path={`packages.cards.${index}.title`} draft={draft} setDraft={setDraft} />
                  <AdminTextarea label="Description" path={`packages.cards.${index}.description`} draft={draft} setDraft={setDraft} />
                  <AdminInput label="Button" path={`packages.cards.${index}.button`} draft={draft} setDraft={setDraft} />
                </AdminRepeater>
              ))}
            </AdminPanel>

            <AdminPanel title="Photos">
              {photos.map(([key, label]) => (
                <AdminInput
                  key={key}
                  label={`${label} URL`}
                  path={`photos.${key}`}
                  draft={draft}
                  setDraft={setDraft}
                />
              ))}
            </AdminPanel>

            <AdminPanel title="CTA and Contact">
              <AdminInput label="CTA button text" path="cta.primary" draft={draft} setDraft={setDraft} />
              <AdminTextarea label="Final CTA title" path="finalCta.title" draft={draft} setDraft={setDraft} />
              <div className="grid gap-4 sm:grid-cols-2">
                <AdminInput label="Email" path="contact.email" draft={draft} setDraft={setDraft} />
                <AdminInput label="Phone" path="contact.phone" draft={draft} setDraft={setDraft} />
              </div>
              <AdminInput label="Location" path="contact.location" draft={draft} setDraft={setDraft} />
            </AdminPanel>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminPanel({ title, children }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.045] p-5 sm:p-6">
      <h2 className="font-display text-xl font-semibold">{title}</h2>
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

function AdminRepeater({ title, children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-4">
      <p className="mb-4 text-sm font-semibold text-cyan">{title}</p>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function AdminInput({ label, path, draft, setDraft }) {
  return (
    <Field
      label={label}
      value={getPath(draft, path)}
      onChange={(value) => setDraft(updatePath(draft, path, value))}
    />
  );
}

function AdminTextarea({ label, path, draft, setDraft }) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-200">{label}</label>
      <textarea
        value={getPath(draft, path)}
        onChange={(event) => setDraft(updatePath(draft, path, event.target.value))}
        rows="3"
        className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan/60"
      />
    </div>
  );
}

function Field({ label, type = "text", placeholder, value, onChange }) {
  const id = label.toLowerCase().replaceAll(" ", "-");
  return (
    <div>
      <label className="text-sm font-medium text-slate-200" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan/60"
      />
    </div>
  );
}

const sectionPadding = {
  services:   "py-16 sm:py-22",
  process:    "py-20 sm:py-28",
  example:    "py-14 sm:py-20",
  packages:   "py-20 sm:py-26",
  proof:      "py-16 sm:py-24",
  faq:        "py-18 sm:py-24",
  contact:    "pb-14",
};

function Section({ id, children, className = "" }) {
  const pad = sectionPadding[id] ?? "py-20 sm:py-24";
  return (
    <section id={id} className={`scroll-mt-24 ${pad} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

function SectionHeader({ eyebrow, title, text, align = "center" }) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-xl"}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-5 font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl" style={{ fontVariationSettings: "'opsz' 48, 'wght' 700" }}>
        {title}
      </h2>
      {text && <p className="mt-5 leading-8 text-slate-300">{text}</p>}
    </div>
  );
}

function Eyebrow({ children }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.07] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
      <Sparkles className="h-3.5 w-3.5 text-slate-500" />
      {children}
    </p>
  );
}

function Button({ href, children, variant = "primary", size = "md", className = "" }) {
  const styles =
    variant === "primary"
      ? "border-cyan/40 bg-cyan text-slate-950 shadow-soft hover:bg-white"
      : "border-white/12 bg-white/6 text-white hover:border-cyan/40 hover:bg-white/10";
  const sizes = size === "sm" ? "px-4 py-2.5 text-sm" : "px-5 py-3.5 text-sm";
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 rounded-xl border font-bold transition duration-300 ${styles} ${sizes} ${className}`}
    >
      {children}
      <ArrowRight size={16} />
    </a>
  );
}

function Container({ children, className = "" }) {
  return (
    <div className={`mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

function getPath(object, path) {
  return path.split(".").reduce((value, key) => value?.[key], object) ?? "";
}

function updatePath(object, path, value) {
  const next = structuredClone(object);
  const keys = path.split(".");
  let cursor = next;
  keys.slice(0, -1).forEach((key) => {
    cursor = cursor[key];
  });
  cursor[keys.at(-1)] = value;
  return next;
}

function labelize(value) {
  return value.replace(/([A-Z])/g, " $1").trim();
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
