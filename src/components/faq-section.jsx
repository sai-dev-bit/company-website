import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQSection = () =>
{
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What services does GWING provide?",
      answer: `We specialize in four core areas to help businesses go digital and scale their operations:`,
      content: `
        <ul>
          <li><b>Custom Software Development:</b> Tailored platforms built around your unique business processes.</li>
          <li><b>Website Development:</b> Fast, responsive websites that represent your brand and convert visitors.</li>
          <li><b>Web Application Development:</b> Scalable, high-performance web apps with a great user experience.</li>
          <li><b>Mobile App Development:</b> Native and cross-platform apps for iOS and Android.</li>
        </ul>
      `
    },
    {
      question: "How long does it take to build a website or web application?",
      answer: `Timelines depend on scope and complexity, but here's a general guide:`,
      content: `
        <ul>
          <li><b>Business websites:</b> typically 2-4 weeks</li>
          <li><b>Web applications:</b> typically 6-12 weeks depending on features and integrations</li>
          <li><b>Custom software platforms:</b> typically 8-16 weeks for a full build</li>
        </ul>
        <p>We work in agile sprints with regular check-ins, so you always know where your project stands and can adjust as we go.</p>
      `
    },
    {
      question: "Do you build both iOS and Android apps?",
      answer: `Yes. We build native apps for iOS and Android as well as cross-platform apps using frameworks like React Native and Flutter, depending on what best fits your budget, timeline, and performance needs. Every app we build includes design, development, testing, and support through launch.`
    },
    {
      question: "Can you work with our existing systems, or do we need to start from scratch?",
      answer: `We can do either. If you already have software, a website, or an app in place, we can integrate with it, extend it, or modernize it. If you're starting from scratch, we handle the full process from planning and design through development and deployment, so you don't need an in-house technical team to get started.`
    },
    {
      question: "How do we get started with a project?",
      answer: `Getting started is simple:`,
      content: `
        <ul>
          <li><b>Consultation:</b> Tell us about your business and what you're trying to achieve.</li>
          <li><b>Proposal:</b> We put together a scope, timeline, and cost estimate.</li>
          <li><b>Build:</b> Our team designs, develops, and tests your solution in regular sprints.</li>
          <li><b>Launch & Support:</b> We deploy your solution and stay on for ongoing support as you grow.</li>
        </ul>
      `
    }
  ];

  const toggleAccordion = (index) =>
  {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-[#fdf2f7]">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Find answers to common questions about our services and solutions
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-6xl mx-auto">
          <div>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-[#f8f8f8] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-4 sm:p-6 text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 pr-3 sm:pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {activeIndex === index ? (
                      <Minus className="w-5 h-5 sm:w-6 sm:h-6 text-[#7b104c]" />
                    ) : (
                      <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-[#7b104c]" />
                    )}
                  </div>
                </button>

                {/* Accordion Content */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${activeIndex === index ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                  <div className="px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 md:pb-8">
                    <div className="border-t border-gray-100 pt-4 sm:pt-6">
                      <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none">
                        <p
                          className="text-gray-600 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base"
                          dangerouslySetInnerHTML={{ __html: faq.answer }}
                        />
                        {faq.content && (
                          <div
                            className="text-gray-600 leading-relaxed text-sm sm:text-base"
                            dangerouslySetInnerHTML={{ __html: faq.content }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
};

export default FAQSection;