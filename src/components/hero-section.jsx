import React, { useState } from 'react';
import
{
  ArrowRight,
  MessageCircle,
  Mail,
  Briefcase,
  User,
  Phone,
  MessageSquare,
  Paperclip,
  X,
  CheckCircle
} from 'lucide-react';

// --- CSS Variables for Professional Styling ---
const CustomStyles = () => (
  <style>
    {`
      :root {
        --primary: #7b104c;
        --primary-light: #9b2865;
        --primary-dark: #5b0c39;
        --primary-lightest: #fdf2f7;
        --primary-light-mid: #d4256e;
        --background: #ffffff;
        --text: #333333;
        --text-light: #666666; 
        --surface: #ffffff;
        --surface-hover: #f8f8f8;
        --bg-light: var(--primary-lightest);
        --border-color: #d1d5db;
      }

      .input-fill {
        transition: all 0.3s ease;
        border-bottom-width: 2px;
        padding-left: 0.5rem;
        padding-bottom: 0.5rem;
        background-color: transparent;
        border-radius: 0;
      }
      .input-fill:focus {
        border-color: var(--primary);
        box-shadow: none;
        outline: none;
      }
      .input-group .icon {
        color: var(--primary);
        transition: color 0.3s ease;
      }
      .input-fill:focus + .icon {
        color: var(--primary-dark);
      }

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

// --- Modal Component ---
const Modal = ({ isOpen, onClose, children }) =>
{
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto flex justify-center items-center p-4 transition-all duration-300 backdrop-blur-sm bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-auto transform transition-all duration-300 scale-100 opacity-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

// --- Contact Form Input Group ---
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

// --- Full Modal Content Component ---
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

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log("Form Submitted with Data:", data);

    setTimeout(() =>
    {
      setIsLoading(false);
      setIsSubmitted(true);
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

      {/* Right Column: Image & Message */}
      <div className="hidden lg:block lg:w-2/5 bg-[var(--primary-light)] p-6 md:p-8 relative overflow-hidden">
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

const StatCard = ({ number, label, delay }) =>
{
  return (
    <div
      className="relative overflow-hidden bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border-2 border-[var(--primary-light)]/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(123,16,76,0.3)] hover:border-[var(--primary)]/70 group"
      style={{ animationDelay: delay }}
    >
      <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:left-[100%] transition-all duration-500"></div>
      <span className="block text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] bg-clip-text text-transparent mb-1 sm:mb-2">
        {number}
      </span>
      <span className="block text-xs sm:text-sm text-gray-600 font-medium uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
};

const Badge = ({ children, position, delay, icon }) =>
{
  const positions = {
    top: 'top-0 right-4 sm:right-20',
    bottom: 'bottom-10 -right-2 sm:bottom-20 sm:-right-5',
    left: 'bottom-20 left-2 sm:bottom-10 sm:left-15',
  };

  return (
    <div
      className={`absolute ${positions[position]} bg-white p-2 sm:p-4 rounded-lg sm:rounded-xl shadow-lg flex items-center gap-2 sm:gap-3 text-sm sm:text-base font-medium animate-float`}
      style={{ animationDelay: delay }}
    >
      {children}
      <span className="text-xl sm:text-2xl">{icon}</span>
    </div>
  );
};

const scrollToId = (id) =>
{
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

export default function HeroSection()
{
  const [isModalOpen, setIsModalOpen] = useState(false);

  const chips = [
    { icon: '💻', label: 'Website Development' },
    { icon: '📱', label: 'Mobile App Development' },
    { icon: '🎨', label: 'UI/UX Design' },
  ];

  return (
    <div className="w-full mx-auto relative overflow-hidden">
      <CustomStyles />

      {/* Tech Pattern Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-pink-50/20">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(123,16,76,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(123,16,76,0.08)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

        {/* Floating Tech Elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-[var(--primary)]/15 to-pink-500/15 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-gradient-to-r from-blue-400/15 to-[var(--primary-light)]/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-gradient-to-r from-purple-400/15 to-[var(--primary)]/15 rounded-full blur-lg animate-pulse delay-500"></div>

        {/* Circuit Lines */}
        <div className="absolute inset-0 opacity-[0.08]">
          <div className="absolute top-20 left-0 right-0 h-px bg-[var(--primary)]"></div>
          <div className="absolute top-40 left-0 right-0 h-px bg-[var(--primary)]"></div>
          <div className="absolute top-60 left-0 right-0 h-px bg-[var(--primary)]"></div>
          <div className="absolute left-20 top-0 bottom-0 w-px bg-[var(--primary)]"></div>
          <div className="absolute left-40 top-0 bottom-0 w-px bg-[var(--primary)]"></div>
          <div className="absolute left-60 top-0 bottom-0 w-px bg-[var(--primary)]"></div>
          <div className="absolute top-80 left-0 right-0 h-px bg-[var(--primary)]"></div>
          <div className="absolute top-100 left-0 right-0 h-px bg-[var(--primary)]"></div>
          <div className="absolute left-80 top-0 bottom-0 w-px bg-[var(--primary)]"></div>
          <div className="absolute left-100 top-0 bottom-0 w-px bg-[var(--primary)]"></div>
        </div>

        {/* Binary Code Animation */}
        <div className="absolute bottom-10 left-10 opacity-10 text-2xl font-mono animate-pulse">
          10101010
        </div>
        <div className="absolute top-10 right-10 opacity-10 text-2xl font-mono animate-pulse delay-700">
          11001100
        </div>
        <div className="absolute top-1/3 left-1/4 opacity-8 text-xl font-mono animate-pulse delay-300">
          010101
        </div>
        <div className="absolute bottom-1/4 right-1/3 opacity-8 text-xl font-mono animate-pulse delay-1200">
          111000
        </div>
      </div>

      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between px-6 sm:px-10 lg:px-16 py-16 sm:py-20 lg:py-24 relative z-10">
        {/* Left Content */}
        <div className="flex-1 max-w-[100%] relative mb-16 lg:mb-0 text-center lg:text-left">
          {/* Decorative pulsing circle */}
          <div className="absolute -top-8 -left-8 sm:-top-12 sm:-left-12 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] rounded-full opacity-20 blur-sm"></div>

          <h1 className="font-extrabold leading-[1.15] mb-6 relative text-left tracking-tight mb-12">
            <span className="text-2xl sm:text-4xl md:text-2xl block text-gray-800">
              We Build Websites & Apps
            </span>
            <span className="text-3xl sm:text-4xl md:text-5xl block bg-gradient-to-r from-[var(--primary)] via-[var(--primary-light-mid)] to-pink-500 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient">
              That Grow Your Business.
            </span>
          </h1>

          <p className="text-xl sm:text-xl text-gray-600 leading-relaxed relative text-left max-w-[100%] mx-auto lg:mx-0 mb-12">
            GWING is a hands-on development studio focused on three things: fast, beautiful
            websites, mobile apps people actually use, and web apps that scale with you plus the
            design work that ties it all together.
          </p>

          {/* Chip Row */}
          <div className="flex flex-wrap gap-2 my-12 justify-center lg:justify-start">
            {chips.map((chip, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 bg-white/80 backdrop-blur-sm border border-[var(--primary)]/20 text-gray-700 text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-full shadow-sm"
              >
                <span className="text-sm">{chip.icon}</span>
                {chip.label}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-[var(--primary)] text-white text-sm sm:text-base font-semibold rounded-full shadow-lg hover:bg-[var(--primary-dark)] hover:shadow-xl transition-all duration-300"
            >
              Get a Free Project Estimate
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => scrollToId('our-work')}
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-white border-2 border-[var(--primary)] text-[var(--primary)] text-sm sm:text-base font-semibold rounded-full hover:bg-[var(--primary)] hover:text-white transition-all duration-300"
            >
              <MessageCircle size={16} />
              See Our Work
            </button>
          </div>
        </div>

        {/* Right Visual */}
        <div className="hidden lg:flex flex-1 relative items-center justify-center min-h-[420px] lg:min-h-[480px]">
          <div className="w-[380px] lg:w-[460px] h-[380px] lg:h-[460px] bg-[url('/assets/maps.png')] rounded-full relative bg-cover bg-center shadow-2xl border-2 border-white/20"></div>
        </div>
      </section>

      {/* Inquiry Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <InquiryModalContent onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}