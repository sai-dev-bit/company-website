import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

// Reusing colors from the Testimonials section for consistency
const PRIMARY_COLOR = '#7b104c'; // Dark Pink/Maroon

// Updated NavLink component to handle both smooth scrolling and routing
const NavLink = ({ to, sectionId, children, onClick, currentSection }) =>
{
  // Use sectionId for active state, as it's typically an anchor on the current page
  const activeKey = sectionId || (to ? to.replace('/', '') : ''); // 'career' or 'services'
  const isActive = activeKey === currentSection;

  const handleClick = (e) =>
  {
    e.preventDefault();

    // Check if the link should trigger a full route navigation
    const isRootPath = window.location.pathname === '/';
    const isExternalRoute = to && to !== '/';
    const isHomeLink = to === '/';

    // 1. Handle Navigation:
    //    a) If it's a non-root route (e.g., /career)
    //    b) OR if it's a link back to home (to='/') AND we are currently on a different page (/career)
    if (isExternalRoute || (isHomeLink && !isRootPath))
    {
      // Use window.location.href to perform a full navigation to the route
      window.location.href = isExternalRoute ? to : '/';
      onClick(activeKey);
      return;
    }

    // 2. Handle Smooth Scrolling (Only executed when we are already on the home page)
    if (sectionId)
    {
      const element = document.getElementById(sectionId);
      if (element)
      {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }

    // Update the active state
    onClick(sectionId || activeKey);
  };

  return (
    <li>
      <button
        onClick={handleClick}
        className={`
          text-gray-700 text-base font-medium transition-all duration-300 block 
          py-2 md:py-0 px-1
          
          ${isActive
            ? 'border-b-2 font-semibold'
            : 'border-b-2 border-transparent hover:border-gray-900 hover:text-gray-900'
          }
        `}
        style={{
          borderColor: isActive ? PRIMARY_COLOR : undefined,
          color: isActive ? PRIMARY_COLOR : undefined,
          paddingBottom: '0.25rem' // Space for the border/underline
        }}
      >
        {children}
      </button>
    </li>
  );
};

const Header = () =>
{
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Use a derived state for the active section based on the current URL path
  const initialActiveSection = window.location.pathname.replace('/', '') || 'home';
  const [currentActiveSection, setCurrentActiveSection] = useState(initialActiveSection);

  // Function to handle section click and update active state
  const handleSectionClick = (sectionId) =>
  {
    setCurrentActiveSection(sectionId);
    setIsMenuOpen(false);
  };

  // Function to handle logo click (to home)
  const handleHomeClick = () =>
  {
    if (window.location.pathname !== '/')
    {
      window.location.href = '/';
    } else
    {
      handleSectionClick('home'); // Set 'home' active and scroll to top if already on home page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Function to handle contact button click
  const handleContactClick = () =>
  {
    // MUST be digits only: Country Code + 10-digit mobile number
    // Example for India (+91 9876543210) -> "919876543210"
    const rawPhoneNumber = "918074512642";

    // Strip out any non-numeric characters automatically just in case
    const phoneNumber = rawPhoneNumber.replace(/\D/g, '');

    const message = "Hi GWING Software Technologies, I would like to inquire about your services.";
    const encodedMessage = encodeURIComponent(message);

    // Universal WhatsApp URL that works on both mobile app & desktop browser
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

    // Check if mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile)
    {
      // Direct navigation works best on mobile browsers
      window.location.href = whatsappUrl;
    } else
    {
      // Open in a new tab on desktop
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }

    setIsMenuOpen(false);
  };

  return (
    <header className="w-full bg-white shadow-lg sticky top-0 z-50">
      <nav
        className="max-w-8xl mx-auto p-4 md:px-10 flex items-center justify-between transition-all duration-300"
      >

        {/* 1. Logo/Brand (Left Side) */}
        <div
          className="h-15 w-auto flex items-center justify-start flex-shrink-0"
        >
          <button
            onClick={handleHomeClick}
            className="focus:outline-none"
          >
            <img
              src="/assets/gwing.png"
              alt="GWING Logo"
              className="h-full w-[100px] object-contain"
              onError={(e) =>
              {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/90x40/7b104c/ffffff?text=GWING";
              }}
            />
          </button>
        </div>

        {/* 2. Desktop Links (Center) */}
        <div className="hidden md:flex flex-1 items-center justify-center mt-3">
          <ul className="flex space-x-8 lg:space-x-12 list-none p-0 m-0">
            <NavLink
              to='/' // Added to='/' so we can navigate home first
              sectionId="services"
              currentSection={currentActiveSection}
              onClick={handleSectionClick}
            >
              Services
            </NavLink>
            <NavLink
              to='/' // Added to='/'
              sectionId="about"
              currentSection={currentActiveSection}
              onClick={handleSectionClick}
            >
              About
            </NavLink>
            <NavLink
              to='/' // Added to='/'
              sectionId="our-work"
              currentSection={currentActiveSection}
              onClick={handleSectionClick}
            >
              Case Studies
            </NavLink>

          </ul>
        </div>

        {/* 3. Contact Button & Mobile Menu Button (Right Side) */}
        <div className="flex items-center mt-3">
          {/* Contact Button (Desktop Only) */}
          <button
            className="hidden md:block py-2 px-5 text-sm font-medium rounded-full text-white transition-colors flex-shrink-0 hover:bg-[#5b0c39]"
            style={{ backgroundColor: PRIMARY_COLOR }}
            onClick={handleContactClick}
          >
            Contact Us
          </button>

          {/* Mobile Menu Button (Mobile Only) */}
          <button
            className="md:hidden text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown (Conditionally rendered) */}
      {isMenuOpen && (
        <div
          className="md:hidden bg-white px-4 pb-4 shadow-xl border-t border-gray-100 origin-top animate-fade-in-down"
        >
          <ul className="flex flex-col space-y-3 list-none p-0 m-0">
            <NavLink
              to='/' // Added to='/'
              sectionId="services"
              currentSection={currentActiveSection}
              onClick={handleSectionClick}
            >
              Services
            </NavLink>
            <NavLink
              to='/' // Added to='/'
              sectionId="about"
              currentSection={currentActiveSection}
              onClick={handleSectionClick}
            >
              About
            </NavLink>
            <NavLink
              to='/' // Added to='/'
              sectionId="our-work"
              currentSection={currentActiveSection}
              onClick={handleSectionClick}
            >
              Case Studies
            </NavLink>

          </ul>

          <button
            className="w-full mt-6 py-2 px-5 text-sm font-medium rounded-full text-white transition-colors hover:bg-[#5b0c39]"
            style={{ backgroundColor: PRIMARY_COLOR }}
            onClick={handleContactClick}
          >
            Contact Us
          </button>
        </div>
      )}

      {/* Simple keyframe animation for a smoother dropdown effect */}
      <style jsx="true">
        {`
     @keyframes fade-in-down {
      0% {
       opacity: 0;
       transform: translateY(-10px);
      }
      100% {
       opacity: 1;
       transform: translateY(0);
      }
     }
     .animate-fade-in-down {
      animation: fade-in-down 0.3s ease-out;
     }
    `}
      </style>

    </header>
  );
};

export default Header;