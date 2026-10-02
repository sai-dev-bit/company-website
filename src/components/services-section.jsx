import React from 'react';

const ServicesSection = () =>
{
  // Custom color constants using arbitrary value notation based on your theme
  const PRIMARY_COLOR = 'text-[#7b104c]';        // --primary
  const ICON_BG = 'bg-[#fdf2f7]';                // --primary-lightest for icon background
  const ICON_HOVER_BG = 'bg-[#5b0c39]';          // --primary-dark for icon hover background
  const HOVER_GRADIENT_END = 'to-[#fdf2f7]';     // --primary-lightest for hover gradient end

  // Trimmed to the 4 core services
  const services = [
    {
      title: "Software Solutions",
      description: "We craft custom digital platforms and systems engineered to align perfectly with your unique business model and scale objectives.",
      icon: "/assets/App-Generic-1.svg",
      link: "/services/custom-software-development-services/",
    },
    {
      title: "Websites",
      description: "Designing and building fast, responsive websites that represent your brand with clarity and convert visitors into customers.",
      icon: "/assets/App-Recent-1.svg",
      link: "/services/website-development-services/",
    },
    {
      title: "Web Applications",
      description: "Building high-performance, scalable web applications with a focus on intuitive design and exceptional user experience.",
      icon: "/assets/App-Folder.svg",
      link: "/services/web-application-development-services/",
    },
    {
      title: "Mobile Applications",
      description: "Crafting native and cross-platform mobile apps that deliver smooth, engaging experiences across iOS and Android devices.",
      icon: "/assets/Bot-Sparkle.svg",
      link: "/services/mobile-app-development-services/",
    },
  ];

  return (
    <section className="py-20 bg-[var(--primary-bg)] mx-auto scroll-mt-20" id="services">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="flex justify-center text-center mb-16">
          <div className="max-w-8xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Our <span className={PRIMARY_COLOR}>Services</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed px-4 text-center">
              We empower global enterprises to turn ambitious ideas into market-ready realities. Our specialized services are designed to maximize your growth through cutting-edge software solutions and robust technological implementations. Explore our core service offerings below:
            </p>
          </div>
        </div>

        {/* Services Grid Container with Internal Dividers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-gray-200 gap-4">
          {services.map((service, index) => (
            <div
              key={index}
              className={`
                group relative bg-white p-8 transition-all duration-300 ease-in-out
                hover:shadow-2xl hover:z-10 hover:scale-[1.03]
              `}
              style={{ paddingBottom: '2rem' }}
            >
              {/* Hover Background Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br from-white ${HOVER_GRADIENT_END} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}></div>

              <div className="flex flex-col h-full">
                {/* Icon */}
                <div className="mb-6">
                  <div className={`w-16 h-16 ${ICON_BG} flex items-center justify-center transition-colors duration-300 group-hover:${ICON_HOVER_BG}`}>
                    <img
                      src={service.icon}
                      alt={service.title}
                      className="w-10 h-10 transition-all duration-300 group-hover:filter group-hover:brightness-0 group-hover:invert"
                      onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/40x40/fdf2f7/7b104c?text=S"; }}
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className={`text-xl font-bold text-gray-900 mb-4 transition-colors duration-300 group-hover:${PRIMARY_COLOR}`}>
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed flex-grow">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;