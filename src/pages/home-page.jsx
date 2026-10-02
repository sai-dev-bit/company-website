import React from 'react';
import HeroSection from '../components/hero-section';
import ExpertiseSection from '../components/expertise-section';
import CaseStudySection from '../components/case-study-section';
import ServicesSection from '../components/services-section';
import TechnologySection from '../components/tecnology-section';
import IndustriesWithOutImageSection from '../components/industries-section-without-image';
import TestimonialsSection from '../components/testimonial-section';
import FAQSection from '../components/faq-section';
import AboutUsSection from '../components/about-us';
import CaseStudiesSection from '../components/our-work';


const HomePage = () =>
{
  return (
    <>
      {/* HeroSection content will scroll beneath the Header */}
      <HeroSection />
      <ExpertiseSection />
      <CaseStudySection />
      <ServicesSection />
      {/* <TechnologySection/> */}
      {/* <IndustriesWithOutImageSection/> */}
      {/* <TestimonialsSection /> */}
      <AboutUsSection />
      <CaseStudiesSection />
      <FAQSection />
    </>

  );
};

export default HomePage;