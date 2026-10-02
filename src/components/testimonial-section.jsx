import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Masthanvali",
      position: "MD, Coldforst",
      companyLogo: "/assets/coldfrost.jpg",
      text: "They were very prompt in their responses and always available. Thanks to GWING's engineers, we were able to complete all projects on time and without any issues. The team was very prompt in terms of responding to queries and requests.",
    },
    {
      id: 2,
      name: "Samuel Lee",
      position: "Product Manager, BioSync",
      companyLogo: "/assets/biosync.png",
      text: "GWING has successfully delivered the app. They took the time to thoroughly understand my business objectives and target audience, ensuring that the mobile app aligned perfectly with our goals. Their ability to translate my ideas into a functional and visually appealing app was truly impressive.",
    },
    {
      id: 3,
      name: "Rajeev Kumar",
      position: "President of ElevTech",
      companyLogo: "/assets/elevtech.png",
      text: "GWING has provided custom software development services for an industrial inspection company. They have rewritten and overhauled the client's software. GWING has delivered the project on time, meeting the client's expectations.",
    },
    {
      id: 4,
      name: "Lisa Smith",
      position: "D.M Communications",
      companyLogo: "/assets/ember.png",
      text: "The team has been fantastic in supporting all the activities required to maintain our corporate website. The team provided experienced talent at a very reasonable cost. The GWING team seamlessly works as an extension of our team and helps scale as required on the technology side.",
    },
    {
      id: 5,
      name: "James",
      position: "Co-Founder & COO",
      companyLogo: "/assets/quantum.png",
      text: "When we needed a powerful, tailored operational platform to accelerate our research, QuantumQuotient delivered. They took an existing open-source core—a testament to their agility—and completely transformed its architecture, custom-developing the capabilities required to meet our exact specifications.",
    },
    {
      id: 6,
      name: "Henry",
      position: "CEO & Founder, Stratagem",
      companyLogo: "/assets/stratagem.png",
      text: "GWING helped us develop a mobile app for an IT company. This included integrating payment processing functionality. They delivered the project within the expected timeline and with no bugs. They were experts in creating complex mobile applications.",
    },
    {
      id: 7,
      name: "Joanne",
      position: "Vice President",
      companyLogo: "/assets/logicforge.png",
      text: "Customer Centric, right level of technical expertise, real value for money. A number of things which immensely adds to GWING's portfolio.",
    },
    {
      id: 8,
      name: "William",
      position: "Director of QE",
      companyLogo: "/assets/pixel-ascent.png",
      text: "GWING has been a valuable and trusted partner in providing Software Quality Engineering services. Provided consultants are very well technically trained and available to deliver on aggressive timelines. Overall very happy with the services provided.",
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getVisibleSlides = () => {
    const slides = [];
    const totalSlides = testimonials.length;
    
    // Show 3 slides at a time
    for (let i = 0; i < 3; i++) {
      const slideIndex = (currentSlide + i) % totalSlides;
      slides.push(testimonials[slideIndex]);
    }
    
    return slides;
  };

  return (
    <section className="py-20 bg-white">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header Section */}
       
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
            What Our Clients Say About Their Transformative Journeys
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl md:max-w-5xl mx-auto px-4 sm:px-0">
            We've served more than 50+ clients globally in the last 2 years and retained 90% of them.
          </p>
        </div>

        
        {/* Testimonials Grid */}
        <div className="relative">
          {/* Navigation Buttons - Hidden on mobile */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white border border-[#7b104c] text-[#7b104c] rounded-full p-3 shadow-lg hover:bg-[#7b104c] hover:text-white transition-all duration-300 hidden lg:block"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white border border-[#7b104c] text-[#7b104c] rounded-full p-3 shadow-lg hover:bg-[#7b104c] hover:text-white transition-all duration-300 hidden lg:block"
          >
            <ChevronRight size={24} />
          </button>

          {/* Testimonials Grid - 1 card on mobile, 3 cards on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {getVisibleSlides().map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-2xl border border-[#fdf2f7] shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="p-6 lg:p-8 h-full flex flex-col">
                  {/* Quote Icon */}
                  <div className="flex items-center justify-between mb-4 lg:mb-6">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#fdf2f7] rounded-full flex items-center justify-center group-hover:bg-[#7b104c] transition-colors duration-300">
                      <Quote className="w-5 h-5 lg:w-6 lg:h-6 text-[#7b104c] group-hover:text-white transition-colors duration-300" />
                    </div>
                    
                    {/* Star Rating */}
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 lg:w-5 lg:h-5 fill-[#FFB81D] text-[#FFB81D]"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Testimonial Text */}
                  <div className="flex-grow mb-4 lg:mb-6">
                    <p className="text-gray-600 leading-relaxed text-sm lg:text-base text-justify">
                      {testimonial.text}
                    </p>
                  </div>

                  {/* Client Info */}
                  <div className="flex items-center justify-between pt-4 lg:pt-6 border-t border-gray-100">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-base lg:text-lg">
                        {testimonial.name}
                      </p>
                      <p className="text-gray-500 text-xs lg:text-sm mt-1">
                        {testimonial.position}
                      </p>
                    </div>
                    
                    {/* Company Logo */}
                    <div className="ml-3 lg:ml-4 pl-3 lg:pl-4 border-l border-gray-200">
                      <img
                        src={testimonial.companyLogo}
                        alt={testimonial.name}
                        className="h-6 lg:h-8 w-auto object-contain max-w-[80px] lg:max-w-[120px]"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://placehold.co/120x32/fdf2f7/7b104c?text=LOGO";
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Navigation Buttons */}
          <div className="flex justify-center mt-8 space-x-4 lg:hidden">
            <button
              onClick={prevSlide}
              className="w-12 h-12 bg-white border border-[#7b104c] text-[#7b104c] rounded-full flex items-center justify-center hover:bg-[#7b104c] hover:text-white transition-all duration-300"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 bg-white border border-[#7b104c] text-[#7b104c] rounded-full flex items-center justify-center hover:bg-[#7b104c] hover:text-white transition-all duration-300"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-[#7b104c] w-6 lg:w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

       
      </div>
    </section>
  );
};

export default TestimonialsSection;