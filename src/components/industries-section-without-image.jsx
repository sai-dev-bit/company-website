import React from 'react';

const IndustriesWithOutImageSection = () => {
  const industries = [
    {
      title: "Banking & Finance",
      description: "We empower fintech companies with effective business solutions.",
      icon: "/assets/Web-Industry-Icon-01.svg",
      link: "/industry/banking-financial-software-development-services/",
    },
    {
      title: "Insurance",
      description: "We offer user-centric solutions for insurance firms to enhance the customer experience.",
      icon: "/assets/Web-Industry-Icon-02.svg",
      link: "/industry/insurance-software-development-services/",
    },
    {
      title: "Retail",
      description: "We help retail businesses develop the right business solutions that encourage growth.",
      icon: "/assets/Web-Industry-Icon-03.svg",
      link: "/industry/retail-ecommerce-software-development-company/",
    },
    {
      title: "Education",
      description: "We help EdTech companies deliver education effectively with tailor-made e-learning solutions.",
      icon: "/assets/Web-Industry-Icon-04.svg",
      link: "/industry/elearning-software-development-company/",
    },
    {
      title: "Healthcare",
      description: "We offer unparalleled healthcare software solutions for healthcare institutions.",
      icon: "/assets/Web-Industry-Icon-05.svg",
      link: "/industry/healthcare-software-development-services/",
    },
    {
      title: "Energy & Utilities",
      description: "We empower energy enterprises with software solutions to automate workflows.",
      icon: "/assets/Web-Industry-Icon-06.svg",
      link: "/industry/energy-and-utilities-software-development-solutions/",
    },
    {
      title: "Logistics",
      description: "We help logistics firms optimize their operations with robust SCM solutions.",
      icon: "/assets/Web-Industry-Icon-07.svg",
      link: "/industry/transportation-and-logistics-software-development/",
    },
    {
      title: "Manufacturing",
      description: "We provide firms with software solutions to streamline manufacturing processes.",
      icon: "/assets/Web-Industry-Icon-08.svg",
      link: "/industry/manufacturing-software-development-services/",
    }
  ];

  return (
    <section className="py-20  bg-gradient-to-br from-[#7b104c] to-[#5b0c39] scroll-mt-20" id='industries'>
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header Section */}
       <div className="text-center mb-12 md:mb-16">
  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
    Engineering the Future of Your Industry
  </h2>
  <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-4xl md:max-w-5xl mx-auto px-4 sm:px-0">
    For years, GWING focused on one goal, delivering solutions that don't just meet today's needs, but also future-proof your business. We are a dedicated software development partner, armed with the talent and insight necessary to design and build the innovative, scalable architecture that will drive your competitive advantage.
  </p>
</div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="group relative bg-white/10 backdrop-blur-sm  overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl"
            >
              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              
                <div className="p-4 h-full flex flex-col items-center text-center relative z-10">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className=" rounded-lg flex items-center justify-center  transition-colors duration-300">
                      <img
                        src={industry.icon}
                        alt={industry.title}
                        className="w-20 h-20 object-contain"
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-white/95 transition-colors duration-300">
                    {industry.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/80 leading-relaxed flex-grow">
                    {industry.description}
                  </p>

                  {/* Arrow Indicator */}
                  {/* <div className="mt-6 flex items-center justify-center text-white font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                    Explore More
                    <svg
                      className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div> */}
                </div>
              
            </div>
          ))}
        </div>

        {/* Optional: Bottom border for first row on larger screens */}
        <style jsx>{`
          @media (min-width: 1024px) {
            .grid > div:nth-child(-n+4) {
              border-bottom: 1px solid rgba(255, 255, 255, 0.1);
              padding-bottom: 2rem;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default IndustriesWithOutImageSection;