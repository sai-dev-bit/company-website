import React, { useState } from 'react';


const CaseStudySection = () =>
{
  // Sets the initial active tab to the first case study's ID.
  const [activeTab, setActiveTab] = useState('case-study-1');

  // --- DATA ---
  const companyLogos = [
    { id: 1, logo: "/assets/coldfrost.jpg" },
    { id: 2, logo: "/assets/lastrada.jpeg" },
    { id: 3, logo: "/assets/cctv.png" },
  ];

  const caseStudies = [
    {
      id: 'case-study-1',
      caseLogo: '/assets/coldfrost.jpg',
      title: '2X Improved Digital Presence for Industrial Testing & Inspection Company',
      stats: [
        { value: '40%', text: 'Improved Efficiency' },
        { value: '60%', text: 'Increased App Response Speed' },
        { value: '80%', text: 'Reduced Customer Onboarding TAT' }
      ],
      image: '/assets/ca.png', // Using the uploaded image file ID
      link: '/case-studies/tai-services/'
    },
  ];
  // To create a continuous loop, we duplicate the logos
  const allLogos = [...companyLogos, ...companyLogos];


  const activeCaseStudy = caseStudies.find(study => study.id === activeTab);

  // Custom class for the right side background pattern
  const rightSideBgStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%237b104c' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  };

  const FadeInTransition = ({ isActive, children }) => (
    <div
      className={`
        transition-all duration-500 ease-in
        ${isActive ? 'opacity-100 translate-y-0 block' : 'opacity-0 translate-y-5 hidden'}
      `}
    >
      {children}
    </div>
  );

  return (
    <section className="relative py-20 bg-white overflow-hidden md:py-16 display-grid place-items-center">
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#a8195f] opacity-40 blur-3xl"></div>
      <div className="absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-[#a8195f] opacity-40 blur-3xl"></div>
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      ></div>

      {/* Section Heading */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-[var(--primary)] text-4xl font-semibold leading-relaxed mb-6 sm:text-3xl md:text-[36px]">
            Our Clients
          </h2>
        </div>
      </div>

      {/* Logo Tabs - IMPLEMENTING MARQUEE EFFECT */}
      <div className="text-center pb-8 overflow-x-hidden relative w-[50%] display-grid place-items-center">

        {/* CSS Keyframes for Marquee */}
        <style>
          {`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .logo-marquee {
              animation: marquee 30s linear infinite; /* 30 seconds for a full loop */
              min-width: max-content; /* Ensure the flex container is wide enough */
            }
            /* Class to ensure smooth scrolling behavior for non-animated environments or for debugging */
            .logo-list-item {
              padding: 1rem; /* p-4 */
              margin-right: 28px; /* equivalent to gap-7 */
              flex-shrink: 0;
            }
          `}
        </style>

        {/* Marquee Wrapper - Ensures no horizontal scrollbar is shown */}
        <div className="w-[500px] inline-block">
          <ul className="flex flex-nowrap list-none p-0 m-0 logo-marquee">
            {allLogos.map((logo, index) => (
              <li
                key={index} // Use index for duplicated keys
                className={`
                  logo-list-item
                  cursor-pointer transition-all duration-300 ease-in-out rounded-lg border-2 border-transparent
                  hover:-translate-y-1
                  ${activeTab === logo.id ? 'border-[var(--primary-dark)] bg-[var(--primary-lightest)]' : 'border-transparent'}
                `}
              // The setActiveTab logic should ideally use the original set of logos (index < companyLogos.length)
              // Assuming it's currently commented out because the rest of the case studies aren't implemented.
              // onClick={() => setActiveTab('case-study-' + logo.id)}
              >
                <img
                  src={logo.logo}
                  alt={`logo-${logo.id}`}
                  className={`
                    h-15 w-auto object-contain transition-all duration-300 ease-in-out max-h-12
                  `}
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Fading overlay to create the seamless infinite scroll effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>
        </div>
      </div>

      {/* Case Study Content */}
      <div className="w-full">
        <div className="case-study-content-wrapper">
          {caseStudies.map((study) => (
            <FadeInTransition key={study.id} isActive={activeTab === study.id}>
              <div className="mx-auto px-0 max-w-7xl">
                <div className="flex flex-col min-h-[500px] bg-white overflow-hidden shadow-2xl my-7 lg:flex-row">

                  {/* Left Side (Content) */}
                  <div className="bg-[var(--primary-dark)] w-full p-10 text-white flex items-center lg:w-1/2 lg:p-14">
                    <div className="max-w-md">
                      <img
                        width="269"
                        height="90"
                        className="max-w-[200px] h-auto mb-8 "
                        src={study.caseLogo}
                        alt="case study logo"
                      />

                      <p className="text-3xl font-medium leading-tight mb-8 sm:text-2xl md:text-3xl">
                        <strong className="text-2xl block mb-2 sm:text-3xl md:text-2xl">
                          {study.title}
                        </strong>
                      </p>

                      <ul className="list-none p-0 my-10">
                        {study.stats.map((stat, index) => (
                          <li key={index} className="relative text-lg font-medium leading-snug mb-6 pb-4 border-b border-white border-opacity-30 max-w-[300px] last:border-b-0">
                            <span className="text-lg font-extrabold block mb-1 text-white text-opacity-90 sm:text-md md:text-lg">
                              {stat.value}
                            </span>
                            {stat.text}
                          </li>
                        ))}
                      </ul>

                    </div>
                  </div>

                  {/* Right Side (Image) */}
                  <div
                    className="w-full bg-primary-lightest flex items-center justify-center p-10 relative z-10 lg:w-1/2 lg:p-14"
                    style={rightSideBgStyle} // Apply custom background pattern
                  >
                    <div className="relative z-10 text-center">
                      <img
                        loading="lazy"
                        src={study.image}
                        alt="Case Study"
                        className="max-w-[130%] h-auto shadow-2xl shadow-black/20"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </FadeInTransition>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudySection;
