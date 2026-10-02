import React, { useState } from 'react';
import { Mail, Briefcase, User, Phone, MessageSquare, Paperclip, X, ArrowRight, CheckCircle } from 'lucide-react';

// --- CSS Variables for Professional Styling (Tailwind utility classes are used where possible) ---
const CustomStyles = () => (
  <style>
    {`
      :root {
        /* New Theme Colors */
        --primary: #7b104c; /* Deep Maroon/Pink */
        --primary-light: #9b2865;
        --primary-dark: #5b0c39;
        --primary-lightest: #fdf2f7; /* Used for subtle section background */
        --primary-light-mid: #d4256e;
        --background: #ffffff;
        --text: #333333; /* Darker text for better contrast */
        --text-light: #666666; 
        --surface: #ffffff;
        --surface-hover: #f8f8f8;
        
        /* Mapped existing variables to the new theme */
        --bg-light: var(--primary-lightest);
        --border-color: #d1d5db; /* Keeping neutral border */
      }

      /* Style for the 'fill-in-the-blank' inputs */
      .input-fill {
        transition: all 0.3s ease;
        border-bottom-width: 2px;
        padding-left: 0.5rem; /* Reduced padding for cleaner line look */
        padding-bottom: 0.5rem;
        background-color: transparent;
        border-radius: 0;
      }
      .input-fill:focus {
        border-color: var(--primary);
        box-shadow: none; /* Removed box-shadow for clean line focus */
        outline: none;
      }
      .input-group .icon {
        color: var(--primary);
        transition: color 0.3s ease;
      }
      .input-fill:focus + .icon {
        color: var(--primary-dark);
      }

      /* Custom styling for the Send Message button */
      .submit-button {
        background-color: var(--primary);
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        font-weight: 600;
        transition: background-color 0.3s, transform 0.1s;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
      }
      .submit-button:hover {
        background-color: var(--primary-dark);
        transform: translateY(-1px);
      }
    `}
  </style>
);

// --- Modal Component (Updated for Blur and New Size) ---
const Modal = ({ isOpen, onClose, children }) =>
{
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto flex justify-center items-center p-4 transition-all duration-300 backdrop-blur-sm bg-black/40"
      onClick={onClose}
    >
      <div
        // Adjusted max-width for the two-column form, controlling height via content
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-auto transform transition-all duration-300 scale-100 opacity-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {children}
      </div>
    </div>
  );
};

// --- Contact Form Input Group (Reimagined for fill-in-the-blank style) ---
const InputGroup = ({ icon: Icon, type = 'text', name, placeholder, required = false, isTextarea = false, minLength, maxLength }) => (
  <div className="input-group relative flex items-center border-b-2 border-[var(--border-color)] focus-within:border-[var(--primary)] transition-colors duration-300">
    <Icon className="icon text-[var(--primary)] flex-shrink-0" size={20} />
    {isTextarea ? (
      <textarea
        name={name}
        className="input-fill w-full py-3 sm:py-4 text-[var(--text)] text-base sm:text-lg placeholder-gray-500 resize-none focus:placeholder-transparent"
        placeholder={placeholder}
        rows={3}
        required={required}
        maxLength={maxLength}
      ></textarea>
    ) : (
      <input
        type={type}
        name={name}
        className="input-fill w-full py-3 sm:py-4 text-[var(--text)] text-base sm:text-lg placeholder-gray-500 focus:placeholder-transparent"
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
      />
    )}
  </div>
);


// --- Full Modal Content Component (Form + Image) ---
const InquiryModalContent = ({ onClose }) =>
{
  const [fileName, setFileName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) =>
  {
    const file = e.target.files[0];
    setFileName(file ? file.name : '');
  };

  const handleSubmit = (e) =>
  {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log("Form Submitted with Data:", data);

    setTimeout(() =>
    {
      setIsLoading(false);
      setIsSubmitted(true);
      // Reset form fields here if needed, but we keep the success message visible
    }, 1500);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[450px]">

      {/* Left Column: Contact Form */}
      <div className="w-full lg:w-3/5 p-4 sm:p-6 md:p-10 relative">
        <button onClick={onClose} className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-700 transition z-10">
          <X size={20} className="sm:w-6" />
        </button>

        <h3 className="text-xl sm:text-2xl font-bold text-[var(--primary-dark)] mb-2">
          Let's Start Building.
        </h3>
        <p className="text-sm sm:text-md text-[var(--text-light)] mb-4 sm:mb-6">
          Get a free 30-minute consultation on your project roadmap.
        </p>

        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center h-full min-h-[300px] sm:min-h-[400px] text-center p-6 sm:p-8 bg-green-50 rounded-lg border-2 border-green-200">
            <CheckCircle size={36} className="sm:w-12 text-green-600 mb-3 sm:mb-4 animate-bounce" />
            <h4 className="text-xl sm:text-2xl font-bold text-green-700 mb-2">Success!</h4>
            <p className="text-base sm:text-lg text-green-600">
              Your inquiry has been received. A specialist will be in touch within 24 hours.
            </p>
            <button onClick={onClose} className="mt-4 sm:mt-6 text-[var(--primary)] font-semibold hover:underline text-sm sm:text-base">Close</button>
          </div>
        ) : (
          <form name="Inquiry Form" className="space-y-4 sm:space-y-6" onSubmit={handleSubmit} method="POST">

            {/* Name & Email Group */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-4 sm:gap-y-6">
              <InputGroup icon={User} name="your-name" placeholder="Your Name" required maxLength="70" />
              <InputGroup icon={Mail} type="email" name="business-email" placeholder="Business Email" required />
            </div>

            {/* Company & Phone Group */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-4 sm:gap-y-6">
              <InputGroup icon={Briefcase} name="company-name" placeholder="Company Name" maxLength="100" />
              <InputGroup icon={Phone} name="phone" placeholder="Contact No" required minLength="10" maxLength="25" />
            </div>

            {/* How Can We Help You */}
            <InputGroup icon={MessageSquare} name="your-message" placeholder="Project Scope / How Can We Help You?" isTextarea required maxLength="5000" />

            {/* Attachment */}
            <div className="flex items-center justify-between border-b-2 border-[var(--border-color)] p-2 bg-white">
              <input
                type="file"
                id="attachment-file"
                name="attachment"
                className="hidden"
                onChange={handleFileChange}
              />
              <label
                htmlFor="attachment-file"
                className="flex items-center gap-2 cursor-pointer text-[var(--primary)] hover:text-[var(--primary-dark)] transition font-medium text-xs sm:text-sm"
              >
                <Paperclip size={14} className="sm:w-4" />
                {fileName || 'Attach Project Brief (Optional)'}
              </label>
              <span className="text-xs text-[var(--text-light)]">Max: 20 MB</span>
            </div>

            {/* Terms Text */}
            <div className="text-xs text-[var(--text-light)] pt-2">
              By submitting, you agree to GWING's
              <a target="_blank" rel="noopener noreferrer" href="#" className="text-[var(--primary)] hover:underline ml-1">Privacy Policy</a>
              and
              <a target="_blank" rel="noopener noreferrer" href="#" className="text-[var(--primary)] hover:underline ml-1">Terms</a>.
            </div>

            {/* Submit Button */}
            <div className="pt-3 sm:pt-4 text-center">
              <button type="submit" className="submit-button flex items-center justify-center mx-auto text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3" disabled={isLoading}>
                {isLoading ? (
                  <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  'Send Inquiry'
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Right Column: Image & Message (Hidden on small screens) */}
      <div className="hidden lg:block lg:w-2/5 bg-[var(--primary-light)] p-6 md:p-8 relative overflow-hidden">

        {/* Decorative Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            transform: 'rotate(10deg) scale(1.5)',
            transition: 'opacity 0.5s'
          }}
        ></div>

        <div className="relative z-10 text-white flex flex-col justify-center h-full">
          <h4 className="text-2xl md:text-3xl font-extrabold mb-3 md:mb-4 leading-snug">
            Your Next Breakthrough Starts Here.
          </h4>
          <p className="text-base md:text-lg mb-4 md:mb-6 opacity-90">
            Discuss your most ambitious digital goals with our experts—from AI integration to complex system architecture.
          </p>
          <div className="flex items-center gap-2 text-sm md:text-base">
            <CheckCircle size={18} className="md:w-5" /> <span className="font-medium">Confidential & Non-Obligatory</span>
          </div>
          <div className="flex items-center gap-2 mt-2 text-sm md:text-base">
            <CheckCircle size={18} className="md:w-5" /> <span className="font-medium">30-Min Free Consultation</span>
          </div>
        </div>

      </div>

    </div>
  );
};


// --- Animated Arrow Button Component ---
const AnimatedArrowButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="group flex items-center justify-center gap-2 sm:gap-3 mt-6 sm:mt-10 mx-auto px-4 sm:px-8 py-3 sm:py-4 transition-all duration-500 rounded-full bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] hover:shadow-xl hover:shadow-[var(--primary-light)]/30 text-sm sm:text-base"
  >
    <span className="font-bold text-center">
      Book a 30-min Product Discovery Call
    </span>
    <div className="flex items-center transition-transform duration-300 group-hover:translate-x-2">
      <ArrowRight size={16} className="sm:w-5" />
    </div>
  </button>
);


// --- Main Application Component ---
const ExpertiseSection = () =>
{
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <CustomStyles />

      {/* Expertise Section Content */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 bg-gradient-to-br from-[var(--primary-lightest)] to-white">

        <div className="max-w-7xl mx-auto text-center">

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text)] mb-4 sm:mb-6 leading-tight  mx-auto px-2">
            Igniting Growth with <span className="text-[var(--primary)]">Scalable Digital Engineering</span>
          </h2>


          <div className="max-w-5xl mx-auto">
            <p className="text-sm sm:text-base md:text-lg text-[var(--text-light)] leading-relaxed mb-4 sm:mb-6 text-center px-4 text-justify ">
              GWING specializes in full-cycle enterprise development, delivering high-performance platforms, cloud migration, and bespoke applications. Our approach merges strategic IT consulting with robust quality engineering to ensure your digital foundation is future-proof, efficient, and perfectly aligned with your business objectives.
            </p>

            <AnimatedArrowButton onClick={() => setIsModalOpen(true)} />
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <InquiryModalContent onClose={() => setIsModalOpen(false)} />
      </Modal>

    </div>
  );
};

export default ExpertiseSection;