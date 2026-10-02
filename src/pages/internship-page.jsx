import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Award, Users, BookOpen, ChevronRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Internship = () => {
 const [formData, setFormData] = useState({
  fullName: '',
  email: '',
  mobile: '',
  qualification: '',
  college: '',
  role: '',
  duration: '',
 });
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [showPopup, setShowPopup] = useState(false);
 // New state for custom error popups
 const [errorPopup, setErrorPopup] = useState({ show: false, message: '' });
 const [whatsappLink, setWhatsappLink] = useState('#');

 useEffect(() => {
  const fetchWhatsAppLink = async () => {
   try {
    const response = await fetch('https://intern-backend-three.vercel.app/api/whatsapp-link');
    if (!response.ok) throw new Error('Failed to fetch WhatsApp link');
    const data = await response.json();
    if (data && data.whatsapp) {
     setWhatsappLink(data.whatsapp);
    }
   } catch (error) {
    console.error('Error fetching WhatsApp link:', error);
   }
  };
  fetchWhatsAppLink();
 }, []);

 const handleInputChange = (e) => {
  setFormData({ ...formData, [e.target.id]: e.target.value });
 };

 // Helper function to display the custom error popup
 const displayError = (message) => {
  setErrorPopup({ show: true, message });
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
    // Clear any previous error
    setErrorPopup({ show: false, message: '' });

  // Basic validation
  if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
   displayError('Invalid mobile number. Please enter a 10-digit Indian mobile number starting with 6-9.');
   setIsSubmitting(false);
   return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
   displayError('Invalid email address. Please enter a valid email.');
   setIsSubmitting(false);
   return;
  }

  const requiredFields = {
        fullName: 'Full Name', 
        email: 'Email Address', 
        mobile: 'Mobile Number', 
        qualification: 'Qualification', 
        college: 'College Name', 
        role: 'Preferred Role', 
        duration: 'Internship Duration'
    };
    
  for (const field in requiredFields) {
   if (!formData[field].trim()) {
    displayError(`Please fill in the '${requiredFields[field]}' field.`);
    setIsSubmitting(false);
    return;
   }
  }

  try {
   const response = await fetch('https://intern-backend-three.vercel.app/api/intern', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
   });

   if (!response.ok) throw new Error(`Failed to submit application to the server. ${JSON.stringify(response)}`);
   
      // If submission is successful
      await response.json();
   setShowPopup(true);
   setFormData({ fullName: '', email: '', mobile: '', qualification: '', college: '', role: '', duration: '' });
      
  } catch (error) {
   // Show a friendly error message in the custom popup instead of alert
   displayError(error.message);
  } finally {
   setIsSubmitting(false);
  }
 };

 const benefits = [
  {
   icon: <Award className="w-8 h-8" />,
   title: "Industry Certificate",
   description: "Get certified by an MSME & AICTE recognized company"
  },
  {
   icon: <BookOpen className="w-8 h-8" />,
   title: "Hands-on Experience",
   description: "Work on real-world projects with modern technologies"
  },
  {
   icon: <Users className="w-8 h-8" />,
   title: "Mentorship",
   description: "Guidance from experienced industry professionals"
  },
  {
   icon: <Clock className="w-8 h-8" />,
   title: "Flexible Duration",
   description: "4-week virtual internship to fit your schedule"
  }
 ];

 const roles = [
  "Java Developer",
  "Java Web Developer",
  "Python Developer",
  "Python Web Developer",
  "React.js Developer",
  "Node.js Developer",
  "JavaScript Developer",
  "JavaScript Web Developer",
  "Database Engineer",
  "AI/ML Engineer",
  "Data Scientist",
  "Data Analyst",
  "QA Tester & Analyst",
  "Mobile App Developer"
 ];

 return (
  <div className="min-h-screen bg-white font-sans text-gray-900">
   {/* Application Form */}
   <section className="py-16 bg-white">
    <div className="container max-w-7xl mx-auto px-4">
     <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
       <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Apply for Internship
       </h2>
       <p className="text-lg text-gray-600">
        Fill out the form below to start your journey with GWING
       </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8  shadow-lg border border-gray-200">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
         { id: 'fullName', label: 'Full Name *', type: 'text' },
         { id: 'email', label: 'Email Address *', type: 'email' },
         { id: 'mobile', label: 'Mobile Number *', type: 'tel' },
         { id: 'college', label: 'College Name *', type: 'text' },
        ].map(({ id, label, type }) => (
         <div key={id}>
          <label htmlFor={id} className="block mb-2 text-gray-700 font-medium">
           {label}
          </label>
          <input
           id={id}
           type={type}
           value={formData[id]}
           onChange={handleInputChange}
           required
           className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7b104c] focus:border-transparent transition-all duration-200"
          />
         </div>
        ))}
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
         <label htmlFor="qualification" className="block mb-2 text-gray-700 font-medium">
          Education Qualification *
         </label>
         <select
          id="qualification"
          value={formData.qualification}
          onChange={handleInputChange}
          required
          className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7b104c] focus:border-transparent transition-all duration-200"
         >
          <option value="">Select Qualification</option>
          {['BTech 1st Year', 'BTech 2nd Year', 'BTech 3rd Year', 'BTech 4th Year', 'MTech', 'MCA', 'Degree 1st Year', 'Degree 2nd Year', 'Degree 3rd Year', 'Completed Graduation'].map((opt) => (
           <option key={opt} value={opt}>{opt}</option>
          ))}
         </select>
        </div>

        <div>
         <label htmlFor="role" className="block mb-2 text-gray-700 font-medium">
          Preferred Role *
         </label>
         <select
          id="role"
          value={formData.role}
          onChange={handleInputChange}
          required
          className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7b104c] focus:border-transparent transition-all duration-200"
         >
          <option value="">Select Role</option>
          {roles.map((opt) => (
           <option key={opt} value={opt}>{opt}</option>
          ))}
         </select>
        </div>
       </div>

       <div className="mt-6">
        <label htmlFor="duration" className="block mb-2 text-gray-700 font-medium">
         Internship Duration *
        </label>
        <select
         id="duration"
         value={formData.duration}
         onChange={handleInputChange}
         required
         className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7b104c] focus:border-transparent transition-all duration-200"
        >
         <option value="">Select Duration</option>
         <option value="4">4 Weeks</option>
        </select>
       </div>

       <div className="mt-8 p-6 bg-[#fdf2f7] border border-[#7b104c]/20">
        <label className="block mb-3 text-gray-700 font-semibold">
         Join Our WhatsApp Group *
        </label>
        <p className="text-gray-600 mb-4">
         Important updates and communication will be shared in our WhatsApp group. Please join to stay informed.
        </p>
        <a 
         href={whatsappLink} 
         target="_blank" 
         rel="noopener noreferrer"
         className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white hover:bg-green-600 transition-all duration-200 font-medium"
        >
         <img 
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
          alt="WhatsApp" 
          className="w-5 h-5" 
         />
         Join WhatsApp Group
        </a>
       </div>

       <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full mt-8 py-4 bg-[#7b104c] text-white font-semibold transition-all duration-200 hover:bg-[#5b0c39] ${
         isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105 hover:shadow-lg'
        }`}
       >
        {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
       </button>
      </form>
     </div>
    </div>
   </section>

   {/* Benefits Section */}
   <section className="py-16 bg-white">
    <div className="container max-w-7xl mx-auto px-4">
     <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
       Why Choose GWING Internship?
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
       We're committed to empowering the next generation of tech talent with real-world experience and industry recognition.
      </p>
     </div>

     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {benefits.map((benefit, index) => (
       <div
        key={index}
        className="bg-white p-6  border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 group hover:border-[#7b104c]"
       >
        <div className="text-[#7b104c] mb-4 group-hover:scale-110 transition-transform duration-300">
         {benefit.icon}
        </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Details */}
      <section className="py-16 bg-[#fdf2f7]">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                About the Program
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Welcome to GWING's prestigious internship program! As an MSME and AICTE recognized company, 
                we offer you the opportunity to work on cutting-edge technologies and gain valuable industry experience.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#7b104c] l"></div>
                  <span className="text-gray-700">Offer letter and completion certificate</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#7b104c] l"></div>
                  <span className="text-gray-700">Exposure to various domain's in Industry</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#7b104c] l"></div>
                  <span className="text-gray-700">Career Guidance</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#7b104c] l"></div>
                  <span className="text-gray-700">Learn latest tools and technologies</span>
                </div>
              </div>
              <Link
                to="/verify-certificate">
              <button
                className={`w-full mt-8 py-4 bg-[#7b104c] text-white font-semibold transition-all duration-200 hover:bg-[#5b0c39] ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105 hover:shadow-lg'
                }`}
              >
                Verify Certificate
              </button>
              </Link>
            </div>
            
            <div className="bg-white p-8  shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Available Roles
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {roles.map((role, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-[#fdf2f7] transition-colors duration-200"
                  >
                    <ChevronRight className="w-4 h-4 text-[#7b104c] flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-br from-[#7b104c] to-[#5b0c39] text-white">
        <div className="container mx-auto px-4 text-center max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of students who have kickstarted their careers with GWING's internship program.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="https://www.linkedin.com/company/gwing-software-technologies/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 bg-white text-[#7b104c] hover:bg-gray-100 transition-all duration-200 font-semibold"
            >
              <img 
                src="https://logowik.com/content/uploads/images/329_linkedin.jpg" 
                alt="LinkedIn" 
                className="w-6 h-6" 
              />
              Follow on LinkedIn
            </a>
            <a
              href="https://www.instagram.com/gwing.info"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 bg-white text-[#7b104c] hover:bg-gray-100 transition-all duration-200 font-semibold"
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png" 
                alt="Instagram" 
                className="w-6 h-6" 
              />
              Follow on Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white relative  w-full max-w-md p-8 text-center shadow-2xl animate-pop-in">
            <button 
              onClick={() => setShowPopup(false)} 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              <X size={24} />
            </button>
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-green-500 rounded-full text-white text-4xl">
              ✓
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Application Submitted!
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Thank you for applying to GWING's Internship Program. Your offer letter will be sent to your email within 24-48 hours.
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white hover:bg-green-600 transition-all duration-200 font-medium"
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
                alt="WhatsApp" 
                className="w-5 h-5" 
              />
              Join WhatsApp Group
            </a>
          </div>
        </div>
      )}

    {/* NEW: Error Popup */}
      {errorPopup.show && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white relative  w-full max-w-md p-8 text-center shadow-2xl animate-pop-in">
            <button 
              onClick={() => setErrorPopup({ show: false, message: '' })} 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              <X size={24} />
            </button>
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-red-500 rounded-full text-white text-4xl">
              !
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Submission Failed
            </h2>
            <p className="text-red-700 mb-6 leading-relaxed font-medium">
              {errorPopup.message}
            </p>
            <button
              onClick={() => setErrorPopup({ show: false, message: '' })} 
              className="px-6 py-3 bg-[#7b104c] text-white hover:bg-[#5b0c39] transition-all duration-200 font-medium"
            >
              Got It, Let me Check
            </button>
          </div>
        </div>
      )}
    {/* Simple keyframe for popup animation */}
    <style jsx="true">{`
        @keyframes pop-in {
            0% { transform: scale(0.8); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop-in {
            animation: pop-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
    `}</style>
    </div>
  );
};

export default Internship;