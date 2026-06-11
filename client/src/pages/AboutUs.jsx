import HeroBanner from "../components/HeroBanner.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import AboutHeroBackground from "../components/ui/AboutHeroBackground.jsx";

const AboutUs = () => {
  return (
    <main className="space-y-12 pt-28 sm:pt-32 lg:pt-40">
      <HeroBanner
        eyebrow="About us"
        title="TRIVIN is a product and technology company built around execution, clarity, and long-term partnerships."
        description="We design, build, and support digital products with a delivery model that keeps strategy, engineering, and care tightly connected."
        primaryAction={
          <a href="#company-story" className="button-primary">
            Our story
          </a>
        }
        secondaryAction={
          <a href="/contact" className="button-outline">
            Work with us
          </a>
        }
        background={<AboutHeroBackground />}
      />

      <main className="mx-auto max-w-6xl px-4">
        <section id="company-story" className="prose mx-auto mb-8">
          <SectionHeading subtitle="Who we are" title="Company story" />
          <p>
            Founded to help teams ship with confidence, TRIVIN blends pragmatic
            engineering, product thinking, and design craft. We work across discovery, delivery,
            and ongoing improvement so our clients get one partner from idea to scale.
          </p>
        </section>

        <section id="mission-values" className="mb-8">
          <SectionHeading subtitle="Purpose" title="Mission, vision, and values" />
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-gray-100 bg-white p-6">
              <h3 className="font-semibold">Mission</h3>
              <p className="mt-2 text-sm text-gray-600">
                Help teams launch and evolve products with speed, reliability, and clear
                communication.
              </p>
            </div>
            <div className="rounded-lg border border-gray-100 bg-white p-6">
              <h3 className="font-semibold">Vision</h3>
              <p className="mt-2 text-sm text-gray-600">
                Become the most trusted product delivery partner for ambitious organizations.
              </p>
            </div>
            <div className="rounded-lg border border-gray-100 bg-white p-6">
              <h3 className="font-semibold">Values</h3>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                <li>Own the outcome</li>
                <li>Communicate clearly</li>
                <li>Improve continuously</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="how-we-work" className="mb-8">
          <SectionHeading subtitle="Delivery model" title="How we work" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-gray-100 bg-white p-6">
              <strong>Discover:</strong>
              <p className="mt-2 text-sm text-gray-600">We align on the problem, users, and outcomes.</p>
            </div>
            <div className="rounded-lg border border-gray-100 bg-white p-6">
              <strong>Design:</strong>
              <p className="mt-2 text-sm text-gray-600">We shape ideas into testable product plans and prototypes.</p>
            </div>
            <div className="rounded-lg border border-gray-100 bg-white p-6">
              <strong>Build:</strong>
              <p className="mt-2 text-sm text-gray-600">We ship incrementally with tight quality control.</p>
            </div>
            <div className="rounded-lg border border-gray-100 bg-white p-6">
              <strong>Support:</strong>
              <p className="mt-2 text-sm text-gray-600">We stay involved after launch to keep systems healthy.</p>
            </div>
          </div>
        </section>

        <section id="culture" className="mb-8">
          <SectionHeading subtitle="Culture" title="What working with us feels like" />
          <ul className="grid gap-4 md:grid-cols-2 text-sm text-gray-600">
            <li>Small, focused teams that move quickly without losing alignment.</li>
            <li>Direct communication and honest expectations from day one.</li>
            <li>Delivery that balances speed, quality, and maintainability.</li>
            <li>Partnership that continues after launch instead of ending at handoff.</li>
          </ul>
        </section>

        <section id="team" className="mb-8">
          <SectionHeading subtitle="Leadership" title="Team members" />
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {[
              { name: "Aisha Khan", role: "CEO" },
              { name: "Ravi Patel", role: "Head of Engineering" },
              { name: "Maya Chen", role: "Design Lead" }
            ].map((person) => (
              <div key={person.name} className="rounded-lg border border-gray-100 bg-white p-6 text-center">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                  <span className="text-sm font-semibold">
                    {person.name.split(" ").map((namePart) => namePart[0]).join("")}
                  </span>
                </div>
                <h4 className="font-semibold">{person.name}</h4>
                <p className="mt-1 text-sm text-gray-600">{person.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="stats" className="mb-8">
          <SectionHeading subtitle="Impact" title="Company snapshot" />
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-lg border border-gray-100 bg-white p-6 text-center">
              <div className="text-3xl font-heading font-semibold">120+</div>
              <div className="text-sm text-gray-600">Projects delivered</div>
            </div>
            <div className="rounded-lg border border-gray-100 bg-white p-6 text-center">
              <div className="text-3xl font-heading font-semibold">50+</div>
              <div className="text-sm text-gray-600">Happy clients</div>
            </div>
            <div className="rounded-lg border border-gray-100 bg-white p-6 text-center">
              <div className="text-3xl font-heading font-semibold">99.9%</div>
              <div className="text-sm text-gray-600">Platform uptime SLA</div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="mb-8">
          <SectionHeading subtitle="Client voice" title="What clients say" />
          <div className="space-y-4">
            <blockquote className="rounded-lg border border-gray-100 bg-white p-6">
              <p className="text-sm text-gray-600">
                "TRIVIN turned a rough concept into a reliable product with a clear delivery rhythm."
              </p>
              <cite className="mt-2 block text-xs text-gray-500">- Product Lead, Acme Corp</cite>
            </blockquote>
          </div>
        </section>

        <section id="clients" className="mb-8">
          <SectionHeading subtitle="Partners" title="Clients and collaborators" />
          <div className="flex flex-wrap items-center gap-6">
            <div className="h-12 w-32 rounded-md bg-slate-100" />
            <div className="h-12 w-32 rounded-md bg-slate-100" />
            <div className="h-12 w-32 rounded-md bg-slate-100" />
          </div>
        </section>

        <section id="careers-cta" className="mb-8">
          <div className="rounded-lg border border-gray-100 bg-white p-8 text-center">
            <h3 className="font-heading text-xl font-semibold">Join our team</h3>
            <p className="mt-2 text-sm text-gray-600">
              We are always looking for people who care about product quality and thoughtful delivery.
            </p>
            <div className="mt-4">
              <a href="/jobs" className="button-primary">
                View careers
              </a>
            </div>
          </div>
        </section>

        <section id="contact-cta" className="mb-20">
          <div className="rounded-lg border border-gray-100 bg-white p-8 text-center">
            <h3 className="font-heading text-xl font-semibold">Talk to us</h3>
            <p className="mt-2 text-sm text-gray-600">
              Have a product idea or a delivery challenge? We are ready to help.
            </p>
            <div className="mt-4">
              <a href="/contact" className="button-primary">
                Contact us
              </a>
            </div>
          </div>
        </section>
      </main>
    </main>
  );
};

export default AboutUs;
