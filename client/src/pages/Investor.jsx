import HeroBanner from "../components/HeroBanner.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import InvestorHeroBackground from "../components/ui/InvestorHeroBackground.jsx";

const Investor = () => {
    const financialReports = ["Q1 report (PDF)", "Annual report (PDF)", "Shareholder letter (PDF)"];

    const investorFaqs = [
        {
            question: "How can I request the latest investor deck?",
            answer: "Use the investor contact channel below and we will share the current materials."
        },
        {
            question: "Do you publish regular financial updates?",
            answer: "Yes. Quarterly reports and major announcements are posted in the resources section."
        }
    ];

    return (
        <div className="space-y-12 pt-20 sm:pt-24 lg:pt-32">
            <HeroBanner
                eyebrow="Investor relations"
                title="A dedicated view into TRIVIN TECHNOLOY's growth, financial position, and strategy."
                description="Review our operating model, growth drivers, reporting materials, and investor resources in one place."
                primaryAction={
                    <a href="#investment-highlights" className="button-primary">
                        Investment highlights
                    </a>
                }
                secondaryAction={
                    <a href="#financial-reports" className="button-outline">
                        Financial reports
                    </a>
                }
                background={<InvestorHeroBackground />}
            />

            <main className="mx-auto max-w-6xl px-4">
                <section id="company-overview" className="mb-8">
                    <SectionHeading subtitle="Overview" title="Company overview" />
                    <p className="text-sm text-gray-600">
                        TRIVIN TECHNOLOY provides product design, engineering, and platform support services
                        for teams that need to launch faster and operate more reliably. Our model is built to
                        create recurring client relationships, expand engagement depth, and support long-term
                        value creation.
                    </p>
                </section>

                <section id="investment-highlights" className="mb-8">
                    <SectionHeading subtitle="Highlights" title="Investment highlights" />
                    <ul className="grid gap-4 md:grid-cols-2 text-sm text-gray-600">
                        <li>Recurring services revenue with a growing base of retained clients.</li>
                        <li>Delivery model that combines strategy, design, and engineering in one flow.</li>
                        <li>Strong focus on operational discipline, quality, and margin improvement.</li>
                        <li>Leadership team aligned around product thinking and customer outcomes.</li>
                    </ul>
                </section>

                <section id="kpis" className="mb-8">
                    <SectionHeading subtitle="KPIs" title="Key performance indicators" />
                    <div className="grid gap-6 sm:grid-cols-3">
                        <div className="rounded-lg border border-gray-100 bg-white p-6 text-center">
                            <div className="text-3xl font-heading font-semibold">$4.2M</div>
                            <div className="text-sm text-gray-600">Annual revenue</div>
                        </div>
                        <div className="rounded-lg border border-gray-100 bg-white p-6 text-center">
                            <div className="text-3xl font-heading font-semibold">85%</div>
                            <div className="text-sm text-gray-600">Customer retention</div>
                        </div>
                        <div className="rounded-lg border border-gray-100 bg-white p-6 text-center">
                            <div className="text-3xl font-heading font-semibold">120+</div>
                            <div className="text-sm text-gray-600">Projects delivered</div>
                        </div>
                    </div>
                </section>

                <section id="financial-reports" className="mb-8">
                    <SectionHeading subtitle="Reports" title="Financial reports" />
                    <p className="text-sm text-gray-600">
                        Download the latest reporting materials and published statements below.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                        {financialReports.map((report) => (
                            <a key={report} className="button-outline" href="#">
                                {report}
                            </a>
                        ))}
                    </div>
                </section>

                <section id="growth-timeline" className="mb-8">
                    <SectionHeading subtitle="History" title="Growth timeline" />
                    <ol className="space-y-4 text-sm text-gray-600">
                        <li><strong>2016:</strong> Company founded and first client engagements launched.</li>
                        <li><strong>2019:</strong> Broadened into cloud delivery and managed services.</li>
                        <li><strong>2023:</strong> Reached a stronger recurring revenue mix and larger delivery capacity.</li>
                    </ol>
                </section>

                <section id="leadership" className="mb-8">
                    <SectionHeading subtitle="Team" title="Leadership team" />
                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                        {[
                            { name: "Aisha Khan", title: "CEO" },
                            { name: "Ravi Patel", title: "Head of Engineering" },
                            { name: "Maya Chen", title: "Design Lead" }
                        ].map((person) => (
                            <div key={person.name} className="rounded-lg border border-gray-100 bg-white p-6 text-center">
                                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                                    <span className="text-sm font-semibold">
                                        {person.name.split(" ").map((namePart) => namePart[0]).join("")}
                                    </span>
                                </div>
                                <h4 className="font-semibold">{person.name}</h4>
                                <p className="mt-1 text-sm text-gray-600">{person.title}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="market-opportunity" className="mb-8">
                    <SectionHeading subtitle="Market" title="Market opportunity" />
                    <p className="text-sm text-gray-600">
                        We operate in the expanding market for product engineering, cloud modernization, and
                        managed digital services. Demand is driven by teams that want a faster path from
                        roadmap to production without adding internal complexity.
                    </p>
                </section>

                <section id="product-innovation" className="mb-8">
                    <SectionHeading subtitle="Product" title="Product innovation" />
                    <p className="text-sm text-gray-600">
                        Ongoing investment in automation, reusable delivery patterns, and developer experience
                        helps us improve margins while increasing speed and consistency for clients.
                    </p>
                </section>

                <section id="funding" className="mb-8">
                    <SectionHeading subtitle="Funding" title="Funding information" />
                    <p className="text-sm text-gray-600">
                        Seed-stage history, current financing status, and future capital planning can be shared
                        through investor relations materials as needed.
                    </p>
                </section>

                <section id="investor-resources" className="mb-8">
                    <SectionHeading subtitle="Resources" title="Investor resources" />
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li>Investor deck and presentations</li>
                        <li>Governance and policy documents</li>
                        <li>Annual letters and quarterly updates</li>
                    </ul>
                </section>

                <section id="stock" className="mb-8">
                    <SectionHeading subtitle="Stock" title="Stock information" />
                    <p className="text-sm text-gray-600">
                        If and when public market information applies, this section can include ticker details,
                        market data, and filings. Until then, the page can present private-company funding and
                        cap table information.
                    </p>
                </section>

                <section id="esg" className="mb-8">
                    <SectionHeading subtitle="ESG" title="ESG and sustainability" />
                    <p className="text-sm text-gray-600">
                        We focus on responsible business practices, inclusive teams, and sustainable delivery
                        processes that reduce waste and support long-term operating discipline.
                    </p>
                </section>

                <section id="news" className="mb-8">
                    <SectionHeading subtitle="News" title="News and press releases" />
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li>Latest company announcement and product milestone</li>
                        <li>Quarterly update and business summary</li>
                    </ul>
                </section>

                <section id="faqs" className="mb-8">
                    <SectionHeading subtitle="FAQs" title="Investor FAQs" />
                    <div className="space-y-4 text-sm text-gray-600">
                        {investorFaqs.map((item) => (
                            <div key={item.question} className="rounded-lg border border-gray-100 bg-white p-5">
                                <p className="font-semibold text-gray-900">{item.question}</p>
                                <p className="mt-2">{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="investor-contact" className="mb-8">
                    <SectionHeading subtitle="Contact" title="Investor contact" />
                    <p className="text-sm text-gray-600">Email: investor@trivin.example</p>
                </section>

                <section id="final-cta" className="mb-20">
                    <div className="rounded-lg border border-gray-100 bg-white p-8 text-center">
                        <h3 className="font-heading text-xl font-semibold">Stay connected</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Reach out for investor materials, reporting requests, or to start a conversation.
                        </p>
                        <div className="mt-4">
                            <a href="/contact" className="button-primary">
                                Contact investor relations
                            </a>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Investor;
