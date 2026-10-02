import React from 'react';

const AboutUsSection = () =>
{
    const stats = [
        { value: "5+", label: "Clients Served" },
        { value: "90%", label: "Client Retention" },
        { value: "2+", label: "Years Delivering" },
    ];

    return (
        <section className="relative py-16 md:py-20 bg-white overflow-hidden" id="about">
            {/* Decorative background elements */}
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#a8195f] opacity-40 blur-3xl"></div>
            <div className="absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-[#a8195f] opacity-40 blur-3xl"></div>
            <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                    backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                }}
            ></div>

            <div className="relative container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#5b0c39] mb-4">
                    Who We Are
                </span>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#a8195f] mb-5 leading-snug">
                    We build the software that helps businesses grow
                </h2>

                <p className="text-sm sm:text-base text-[#a8195f] max-w-2xl mx-auto leading-relaxed">
                    We develop custom software, websites, and mobile applications for businesses that
                    want technology built around their goals. Our mission is simple:{' '}
                    <span className="text-white font-semibold">empower businesses with digital
                        solutions that scale their operations.</span>
                </p>

                {/* Stats */}
                <div className="mt-10 grid grid-cols-3 gap-4 sm:gap-8 max-w-lg mx-auto">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className={`${index !== 0 ? 'border-l border-white/20 pl-4 sm:pl-8' : ''}`}
                        >
                            <p className="text-2xl sm:text-3xl font-bold text-[#5b0c39] mb-1">
                                {stat.value}
                            </p>
                            <p className="text-xs text-[#a8195f] tracking-wide">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutUsSection;