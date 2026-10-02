import React from 'react';
import { ExternalLink, ArrowRight, CheckCircle2, Globe, Sparkles } from 'lucide-react';

const CaseStudiesSection = () =>
{
    const caseStudies = [
        {
            title: "Sarvanetra",
            category: "Enterprise Web Platform",
            description: "A professional and robust digital presence tailored for enterprise-grade solutions. Built with a focus on seamless user navigation, responsive layouts, and modern architecture.",
            url: "https://www.sarvanetra.com/",
            displayUrl: "sarvanetra.com",
            tags: ["Corporate", "Mobile Responsive", "Performance"],
            highlights: [
                "Scalable front-end architecture",
                "Optimized page speed & SEO score",
                "Cross-device mobile optimization"
            ],
            metrics: "100% Mobile Ready"
        },
        {
            title: "La Strada - Street Delights",
            category: "Food & Culinary Experience",
            description: "A vibrant and mouth-watering web experience showcasing street delights. Designed with rich visual storytelling, fast load speeds, and intuitive menu presentation.",
            url: "https://lastrada-streetdelights.netlify.app/",
            displayUrl: "lastrada-streetdelights.app",
            tags: ["Web App", "UI/UX Design", "Interactive"],
            highlights: [
                "Vibrant visual layout & branding",
                "Interactive menu & offerings view",
                "Ultra-fast deployment on Netlify"
            ],
            metrics: "Lightning Fast Load"
        },
        {
            title: "Cold Frost",
            category: "Commercial & Cooling Solutions",
            description: "A sleek, conversion-oriented website designed for commercial cooling services. Structured to highlight core service offerings, client trust factors, and lead generation.",
            url: "https://www.coldfrost.in/",
            displayUrl: "coldfrost.in",
            tags: ["Commercial Services", "Lead Gen", "Modern UI"],
            highlights: [
                "Clean, industrial-grade design",
                "Clear call-to-action touchpoints",
                "Optimized customer inquiry pathways"
            ],
            metrics: "High Conversion Focus"
        }
    ];

    return (
        <section className="py-20 bg-gray-50 text-gray-900 relative overflow-hidden" id="our-work">
            {/* Background Decorative Accents */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#7b104c]/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#7b104c]/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="container max-w-7xl mx-auto px-4 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7b104c]/10 text-[#7b104c] text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4">
                        <Sparkles size={14} /> Our Proven Work
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                        Featured Case Studies
                    </h2>
                    <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                        Take a look at how GWING transforms business goals into high-performing, beautifully crafted digital platforms.
                    </p>
                </div>

                {/* Case Studies Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {caseStudies.map((project, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-2xl border border-gray-200 hover:border-[#7b104c]/30 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative"
                        >
                            {/* Card Header Top Accent Line */}
                            <div className="h-1.5 w-full bg-gray-100 group-hover:bg-[#7b104c] transition-colors duration-300"></div>

                            <div className="p-6 sm:p-8 flex-grow flex flex-col">
                                {/* Category & Badge */}
                                <div className="flex items-center justify-between gap-2 mb-4">
                                    <span className="text-xs font-semibold uppercase tracking-wider text-[#7b104c] bg-[#7b104c]/10 px-3 py-1 rounded-full">
                                        {project.category}
                                    </span>
                                    {/* <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md flex items-center gap-1">
                                        <Globe size={12} /> {project.metrics}
                                    </span> */}
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#7b104c] transition-colors duration-200">
                                    {project.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 flex-grow">
                                    {project.description}
                                </p>

                                {/* Key Deliverables / Highlights */}
                                <div className="space-y-2 mb-6 pt-4 border-t border-gray-100">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Key Deliverables</span>
                                    {project.highlights.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                                            <CheckCircle2 size={15} className="text-[#7b104c] flex-shrink-0" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Tech Tags */}
                                <div className="flex flex-wrap gap-1.5 mb-6">
                                    {project.tags.map((tag, tagIdx) => (
                                        <span
                                            key={tagIdx}
                                            className="text-xs bg-gray-100 text-gray-600 font-medium px-2.5 py-1 rounded-md"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Card Footer / Link Action */}
                            <div className="px-6 sm:px-8 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between group-hover:bg-[#7b104c]/5 transition-colors duration-300">
                                <span className="text-xs font-medium text-gray-500 truncate max-w-[180px]">
                                    {project.displayUrl}
                                </span>
                                <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#7b104c] group-hover:text-[#5b0c39] hover:underline"
                                >
                                    Visit Live Site <ExternalLink size={14} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CaseStudiesSection;