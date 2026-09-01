import { useNavigate } from "react-router-dom";


import {
  ArrowRight,
  ArrowUpRight,
  Check,
  MessageCircle,
  Search,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Search,
    number: "01",
    title: "Discover opportunities",
    description:
      "Find tasks, projects, and opportunities that match your skills and the kind of work you want to do.",
  },
  {
    icon: Zap,
    number: "02",
    title: "Apply with confidence",
    description:
      "Send applications directly to employers and clearly show why you're the right person for the job.",
  },
  {
    icon: MessageCircle,
    number: "03",
    title: "Negotiate your value",
    description:
      "Don't settle for a fixed number. Discuss the work, make an offer, and agree on terms that work for everyone.",
  },
  {
    icon: Users,
    number: "04",
    title: "Work together",
    description:
      "Keep conversations, offers, updates, and collaboration connected in one place.",
  },
];

const stats = [
  { value: "01", label: "Place to discover work" },
  { value: "∞", label: "Possibilities to contribute" },
  { value: "24/7", label: "Open opportunities" },
];

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#e8e3d5] text-[#020202] selection:bg-black selection:text-[#e8e3d5]">
      {/* NAVBAR */}
      <header className="fixed left-0 right-0 top-0 z-50">
        <div className="mx-auto max-w-7xl px-5 pt-5 md:px-8">
          <nav className="flex items-center justify-between rounded-full border border-black/10 bg-[#e8e3d5]/90 px-4 py-3 backdrop-blur-xl md:px-6">
            <a href="#" className="flex items-center gap-2">
              <span className="text-lg font-black tracking-tight">
                Connecto<span className="font-medium"></span>
              </span>
            </a>

            <div className="hidden items-center gap-8 text-sm font-medium md:flex">
              <a
                href="#how-it-works"
                className="transition-opacity hover:opacity-50"
              >
                How it works
              </a>

              <a
                href="#features"
                className="transition-opacity hover:opacity-50"
              >
                Features
              </a>

              <a
                href="#community"
                className="transition-opacity hover:opacity-50"
              >
                Community
              </a>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  navigate("/login");
                }}
                className="hidden rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:bg-black/5 sm:block"
              >
                Sign in
              </button>

              <button
                onClick={() => {
                  navigate("/login");
                }}
                className="rounded-full bg-black px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-[1.03]"
              >
                Join the Hub
              </button>
            </div>
          </nav>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden px-5 pb-20 pt-36 md:px-8 md:pb-28 md:pt-48">
          {/* subtle background decoration */}
          <div className="pointer-events-none absolute left-1/2 top-20 h-[500px] w-[500px] -translate-x-1/2 rounded-full border border-black/[0.035]" />
          <div className="pointer-events-none absolute left-1/2 top-28 h-[380px] w-[380px] -translate-x-1/2 rounded-full border border-black/[0.035]" />

          <div className="relative mx-auto max-w-6xl text-center">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/30 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em]">
              The contributor hub
            </div>

            <h1 className="mx-auto max-w-5xl text-[3.4rem] font-black leading-[0.91] tracking-[-0.055em] sm:text-6xl md:text-8xl lg:text-[7.4rem]">
              Find work.
              <br />
              <span className="opacity-40">Make an impact.</span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-base leading-7 text-black/55 md:text-lg">
              Connecto brings contributors, employers, opportunities, and
              communities together. Discover work, apply, negotiate, and build
              your reputation in one place.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                onClick={() => {
                  navigate("/login");
                }}
                className="group flex items-center justify-center gap-3 rounded-full bg-black px-7 py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5"
              >
                Explore opportunities
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>

              <button className="rounded-full border border-black/15 bg-white/30 px-7 py-4 text-sm font-bold transition-all hover:bg-white/50">
                Learn how it works
              </button>
            </div>
          </div>

          {/* PRODUCT PREVIEW */}
          <div className="relative mx-auto mt-20 max-w-6xl md:mt-28">
            <div className="overflow-hidden rounded-[28px] border border-black/10 bg-[#f4f1e9] shadow-[0_30px_100px_rgba(0,0,0,0.12)]">
              {/* fake browser bar */}
              <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
                </div>

                <div className="hidden rounded-full bg-black/[0.04] px-5 py-1.5 text-[10px] text-black/35 sm:block">
                  Connecto
                </div>

                <div className="w-8" />
              </div>

              <div className="grid min-h-[440px] grid-cols-1 md:grid-cols-[190px_1fr]">
                {/* sidebar */}
                <aside className="hidden border-r border-black/10 p-5 md:block">
                  <div className="mb-10 text-sm font-black">
                    Connecto<span className="font-normal">hub</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="rounded-xl bg-black px-3 py-2.5 font-bold text-white">
                      Overview
                    </div>
                    <div className="px-3 py-2.5 text-black/45">
                      Opportunities
                    </div>
                    <div className="px-3 py-2.5 text-black/45">
                      Applications
                    </div>
                    <div className="px-3 py-2.5 text-black/45">Messages</div>
                    <div className="px-3 py-2.5 text-black/45">Community</div>
                  </div>

                  <div className="mt-16 border-t border-black/10 pt-5">
                    <div className="mb-2 text-[9px] font-bold uppercase tracking-wider text-black/35">
                      Your profile
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                        D
                      </div>
                      <div>
                        <div className="text-[10px] font-bold">Contributor</div>
                        <div className="text-[9px] text-black/35">
                          Available
                        </div>
                      </div>
                    </div>
                  </div>
                </aside>

                {/* dashboard */}
                <div className="p-5 md:p-8">
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-xs font-medium text-black/40">
                        Tuesday, August 29
                      </div>
                      <h3 className="mt-1 text-2xl font-black tracking-tight md:text-3xl">
                        Find your next opportunity.
                      </h3>
                    </div>

                    <div className="hidden rounded-full border border-black/10 px-4 py-2 text-xs font-bold sm:block">
                      + Create task
                    </div>
                  </div>

                  <div className="mt-7 grid gap-4 lg:grid-cols-2">
                    <div className="rounded-2xl border border-black/10 bg-white/45 p-5">
                      <div className="flex items-start justify-between">
                        <div className="rounded-full bg-black px-3 py-1 text-[9px] font-bold text-white">
                          OPEN
                        </div>
                        <ArrowUpRight size={17} className="text-black/35" />
                      </div>

                      <h4 className="mt-6 text-lg font-black">
                        Build Authentication Module
                      </h4>

                      <p className="mt-2 max-w-md text-xs leading-5 text-black/45">
                        Looking for a contributor to build a secure
                        authentication system for our platform.
                      </p>

                      <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-4">
                        <span className="text-xs font-bold">Engineering</span>
                        <span className="text-sm font-black">$250</span>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-black/10 bg-white/45 p-5">
                      <div className="flex items-start justify-between">
                        <div className="rounded-full border border-black/10 px-3 py-1 text-[9px] font-bold">
                          NEGOTIATING
                        </div>
                        <MessageCircle size={17} className="text-black/35" />
                      </div>

                      <h4 className="mt-6 text-lg font-black">
                        Community Growth Strategy
                      </h4>

                      <p className="mt-2 max-w-md text-xs leading-5 text-black/45">
                        Help us design and execute a strategy for growing our
                        contributor community.
                      </p>

                      <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-4">
                        <span className="text-xs font-bold">Growth</span>
                        <span className="text-sm font-black">$180</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-black/10 bg-black p-5 text-white">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                      <div>
                        <div className="text-[9px] font-bold uppercase tracking-widest text-white/40">
                          Latest activity
                        </div>
                        <div className="mt-1 text-sm font-bold">
                          You received a new offer
                        </div>
                      </div>

                      <button className="w-fit rounded-full bg-white px-4 py-2 text-[10px] font-bold text-black">
                        Review offer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="border-y border-black/10">
          <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-3">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`px-7 py-10 md:px-10 ${
                  index !== 0 ? "border-t md:border-l md:border-t-0" : ""
                } border-black/10`}
              >
                <div className="text-4xl font-black tracking-tight">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-black/45">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* INTRO */}
        <section className="px-5 py-24 md:px-8 md:py-36">
          <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-24">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-black/35">
                One hub. Everything you need.
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-black leading-[0.95] tracking-[-0.04em] md:text-6xl">
                Work shouldn't be complicated.
              </h2>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-black/50">
                Finding opportunities shouldn't mean jumping between job boards,
                DMs, spreadsheets, and payment conversations. Connecto Hub puts
                the entire contributor journey in one simple experience.
              </p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section
          id="how-it-works"
          className="border-y border-black/10 bg-[#ded8c9]/45 px-5 py-24 md:px-8 md:py-32"
        >
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-black/35">
                How it works
              </div>

              <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] md:text-6xl">
                From opportunity
                <br />
                to outcome.
              </h2>
            </div>

            <div className="mt-16 grid gap-px overflow-hidden rounded-[28px] border border-black/10 bg-black/10 md:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.number}
                    className="group bg-[#e8e3d5] p-7 md:p-10"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10">
                        <Icon size={18} />
                      </div>

                      <span className="text-xs font-bold text-black/25">
                        {feature.number}
                      </span>
                    </div>

                    <h3 className="mt-12 text-2xl font-black tracking-tight">
                      {feature.title}
                    </h3>

                    <p className="mt-3 max-w-md text-sm leading-6 text-black/50">
                      {feature.description}
                    </p>

                    <div className="mt-8 flex items-center gap-2 text-xs font-bold opacity-0 transition-opacity group-hover:opacity-100">
                      Learn more <ArrowRight size={13} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* NEGOTIATION SECTION */}
        <section id="features" className="px-5 py-24 md:px-8 md:py-36">
          <div className="mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-2 md:gap-24">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider">
                <MessageCircle size={12} />
                Built for real conversations
              </div>

              <h2 className="mt-7 text-4xl font-black leading-[0.95] tracking-[-0.045em] md:text-6xl">
                Your value isn't
                <br />a fixed number.
              </h2>

              <p className="mt-7 max-w-lg text-base leading-7 text-black/50">
                Sometimes the posted price isn't right. Connecto lets
                contributors and employers have the conversation, send offers,
                counter offers, and find terms that work for both sides.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Send and receive offers",
                  "Discuss terms directly",
                  "Track negotiation status",
                  "Keep the conversation connected to the task",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-white">
                      <Check size={13} />
                    </div>
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* negotiation visual */}
            <div className="relative">
              <div className="rounded-[30px] border border-black/10 bg-[#f4f1e9] p-5 shadow-[0_25px_80px_rgba(0,0,0,0.08)] md:p-7">
                <div className="border-b border-black/10 pb-5">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-black/35">
                    Negotiation
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <h3 className="font-black">Build API Integration</h3>
                    <span className="rounded-full bg-black px-3 py-1 text-[9px] font-bold text-white">
                      ACTIVE
                    </span>
                  </div>
                </div>

                <div className="space-y-4 py-6">
                  <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-white p-4">
                    <div className="text-[9px] font-bold text-black/35">
                      Employer
                    </div>
                    <p className="mt-2 text-xs leading-5">
                      Can you handle this for $150?
                    </p>
                  </div>

                  <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-black p-4 text-white">
                    <div className="text-[9px] font-bold text-white/40">
                      You
                    </div>
                    <p className="mt-2 text-xs leading-5">
                      I can do it for $190 considering the integration and
                      testing involved.
                    </p>
                  </div>

                  <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-white p-4">
                    <div className="text-[9px] font-bold text-black/35">
                      Employer
                    </div>
                    <p className="mt-2 text-xs leading-5">
                      Let's meet at $175.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-black/10 bg-white p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[9px] text-black/35">
                        Current offer
                      </div>
                      <div className="mt-1 text-xl font-black">$175</div>
                    </div>

                    <button className="rounded-full bg-black px-5 py-2.5 text-[10px] font-bold text-white">
                      Accept offer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMMUNITY */}
        <section
          id="community"
          className="overflow-hidden border-y border-black/10 bg-black px-5 py-24 text-white md:px-8 md:py-32"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-14 md:grid-cols-2 md:items-end">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-white/35">
                  More than a marketplace
                </div>

                <h2 className="mt-5 text-4xl font-black leading-[0.95] tracking-[-0.045em] md:text-6xl">
                  Build with
                  <br />
                  people, not profiles.
                </h2>
              </div>

              <p className="max-w-lg text-base leading-7 text-white/45 md:justify-self-end">
                Share what you're building. Discover what others are working on.
                Ask questions, start conversations, and become part of a
                community where opportunities can start anywhere.
              </p>
            </div>

            <div className="mt-16 grid gap-4 md:grid-cols-3">
              <CommunityCard
                category="BUILDING"
                title="Just shipped our new contributor dashboard."
                body="Excited to finally make task discovery much simpler."
                likes="24"
              />

              <CommunityCard
                category="DISCUSSION"
                title="What's the best way to structure your first offer?"
                body="Would love to hear how other contributors approach negotiations."
                likes="18"
              />

              <CommunityCard
                category="OPPORTUNITY"
                title="Looking for two contributors for our next sprint."
                body="Backend + community growth. Let's build something great."
                likes="31"
              />
            </div>
          </div>
        </section>

        {/* TRUST */}
        <section className="px-5 py-24 md:px-8 md:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-[32px] border border-black/10 bg-[#ded8c9]/45 p-7 md:p-12">
              <div className="grid gap-12 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                    <ShieldCheck size={20} />
                  </div>

                  <h2 className="mt-7 text-3xl font-black tracking-tight md:text-5xl">
                    Everything stays connected.
                  </h2>

                  <p className="mt-4 max-w-2xl text-sm leading-6 text-black/50">
                    Applications, tasks, conversations, offers, notifications,
                    and community activity are designed to work together so you
                    always know what's happening.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-2">
                  {["Tasks", "Applications", "Messages", "Offers"].map(
                    (item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-black/10 bg-[#e8e3d5] px-5 py-5 text-center text-xs font-bold"
                      >
                        {item}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="px-5 pb-10 pt-10 md:px-8 md:pb-16">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[36px] bg-black px-7 py-20 text-center text-white md:px-12 md:py-28">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05]" />

            <div className="relative">
              <h2 className="mx-auto mt-7 max-w-3xl text-4xl font-black leading-[0.95] tracking-[-0.045em] md:text-7xl">
                Your next opportunity is already out there.
              </h2>

              <p className="mx-auto mt-7 max-w-xl text-sm leading-6 text-white/45 md:text-base">
                Find it. Apply for it. Negotiate it. Build something you're
                proud of.
              </p>

              <button
                onClick={() => {
                  navigate("/login");
                }}
                className="group mt-9 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold text-black transition-transform hover:-translate-y-0.5"
              >
                Enter Connecto
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="px-5 py-10 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 border-t border-black/10 pt-8 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs font-black text-[#e8e3d5]">
              R
            </div>
            <span className="text-sm font-black">
              Connecto<span className="font-normal"></span>
            </span>
          </div>

          <div className="flex flex-wrap gap-6 text-xs font-medium text-black/40">
            <a href="#" className="hover:text-black">
              Opportunities
            </a>
            <a href="#" className="hover:text-black">
              Community
            </a>
            <a href="#" className="hover:text-black">
              About
            </a>
            <a href="#" className="hover:text-black">
              Terms
            </a>
          </div>

          <div className="text-xs text-black/35">© 2026 Connecto</div>
        </div>
      </footer>
    </div>
  );
}

function CommunityCard({
  category,
  title,
  body,
  likes,
}: {
  category: string;
  title: string;
  body: string;
  likes: string;
}) {
  return (
    <div className="group rounded-[24px] border border-white/10 bg-white/[0.045] p-6 transition-colors hover:bg-white/[0.07]">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-bold tracking-[0.16em] text-white/35">
          {category}
        </span>

        <ArrowUpRight
          size={16}
          className="text-white/25 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </div>

      <h3 className="mt-10 text-lg font-bold leading-6">{title}</h3>

      <p className="mt-3 text-xs leading-5 text-white/40">{body}</p>

      <div className="mt-7 border-t border-white/10 pt-4 text-[10px] font-bold text-white/30">
        ♥ {likes} people liked this
      </div>
    </div>
  );
}
