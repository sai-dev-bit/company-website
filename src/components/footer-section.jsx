import React, { useState } from 'react';
import { Linkedin, Facebook, Instagram, Twitter, Mail, X } from 'lucide-react';
import companyLogo from '/assets/gwing.png'; // Adjust the path as necessary

const Footer = () =>
{
  const [email, setEmail] = useState('');
  const [activeModal, setActiveModal] = useState(null); // 'terms' | 'privacy' | null

  const handleSubmit = (e) =>
  {
    e.preventDefault();
    // Handle subscription logic here
    console.log('Subscribed with email:', email);
    setEmail('');
    alert('Thank you for subscribing!');
  };

  const openModal = (modal) => (e) =>
  {
    e.preventDefault();
    setActiveModal(modal);
  };

  const closeModal = () => setActiveModal(null);

  const lastUpdated = "August 9, 2026";

  return (
    <footer className="bg-white text-gray-800 px-8">
      {/* Footer Top Section */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div >
            {/* Logo and About */}
            {/* <div className=""> */}
            {/* 1. Use flex-col (vertical stacking) on mobile (default). 
      2. Switch to flex-row (horizontal layout) on medium screens (md:flex-row).
      3. Added subtle padding for better mobile spacing (p-4). 
    */}
            <div className="flex flex-col md:flex-row w-full bg-white p-4 md:p-0">

              {/* Logo Container */}
              {/* On mobile (default), this is full width (w-full) and centered (justify-center). 
            On desktop (md:), it reverts to 1/5 width (md:w-1/5) and aligns left (md:justify-start). */}
              <div className="w-full md:w-1/5 flex justify-center md:justify-start flex-shrink-0 mb-4 md:mb-0">
                <a href="/" className="block">
                  {/* The logo wrapper restricts its size to a reasonable amount (max-w-[150px]) on mobile. */}
                  <div className=" md:max-w-full">
                    {/* Assuming companyLogo is defined in the component scope */}
                    <img src={companyLogo} alt="GWING Logo" className="w-[100px] h-auto" />
                  </div>
                </a>
              </div>

              {/* Text Container */}
              {/* On mobile, this is full width (w-full) with no left margin. 
            On desktop (md:), it is 4/5 width (md:w-4/5) and gets the necessary left margin (md:ml-8). 
            The awkward mt-8 was removed from the <p> tag and alignment is set to items-center for vertical centering on desktop. */}
              <div className="w-full md:w-4/5 md:ml-8 flex items-start md:items-center">
                <p class="text-gray-700 leading-relaxed text-base text-center">
                  At GWING, we fuel extraordinary possibilities through technology. We believe innovation empowers individuals and organizations to achieve remarkable things. We craft technology with a purpose, not just for today, but to build a brighter future, together.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
      {/* </div> */}

      {/* Footer Middle Section */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Subscribe Form */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-[#7b104c]">Subscribe to Our Insights</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@example.com"
                    required
                    className="flex-1 px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7b104c] focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#7b104c] text-white font-semibold  hover:bg-[#5b0c39] transition-colors duration-300"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>

            {/* Social Media */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-[#7b104c]">Join Us on Social Media</h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/company/gwing-software-technologies/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#7b104c] hover:text-white transition-colors duration-300"
                  title="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://www.instagram.com/gwing.info/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#7b104c] hover:text-white transition-colors duration-300"
                  title="Facebook"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="https://www.instagram.com/gwing.info/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#7b104c] hover:text-white transition-colors duration-300"
                  title="Instagram"
                >
                  <Instagram size={20} />
                </a>
                {/* <a
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#7b104c] hover:text-white transition-colors duration-300"
                  title="Twitter"
                >
                  <Twitter size={20} />
                </a> */}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-[#7b104c]">Get In Touch</h3>
              <div className="space-y-2">
                <a
                  href="mailto:info@gwingtech.com"
                  className="flex items-center space-x-2 text-gray-600 hover:text-[#7b104c] transition-colors duration-300"
                >
                  <Mail size={18} />
                  <span>info@gwingtech.com</span>
                </a>
                <p className="text-gray-600">
                  Ready to start your digital transformation journey? Contact us today.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Copyright */}
      <div className="border-t border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-600 text-sm">
              <span>© 2026</span> GWING <span>Software Technologies Private Limited. All Rights Reserved.</span>{' '}
              <button
                onClick={openModal('terms')}
                className="hover:text-[#7b104c] transition-colors duration-300 underline-offset-2"
              >
                Terms & Conditions
              </button>{' '}
              <span>|</span>{' '}
              <button
                onClick={openModal('privacy')}
                className="hover:text-[#7b104c] transition-colors duration-300 underline-offset-2"
              >
                Privacy Policy
              </button>
            </div>

            {/* DMCA Badge */}
            <div className="flex items-center space-x-4">
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                title="DMCA.com Protection Status"
                className="dmca-badge"
              >

              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Terms & Conditions / Privacy Policy Modal */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={closeModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Modal Content */}
          <div
            className="relative bg-white w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                {activeModal === 'terms' ? 'Terms & Conditions' : 'Privacy Policy'}
              </h2>
              <button
                onClick={closeModal}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#7b104c] hover:text-white transition-colors duration-300"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-6 text-sm sm:text-base">
              <p className="text-xs text-gray-500 mb-6">Last updated: {lastUpdated}</p>

              {activeModal === 'terms' ? (
                <div className="text-gray-600 leading-relaxed space-y-6">
                  <p>
                    These Terms & Conditions ("Terms") govern your access to and use of the
                    website and services provided by GWING Software Technologies Private Limited
                    ("GWING," "we," "us," or "our"), including our custom software development,
                    website development, web application development, and mobile application
                    development services. By accessing our website or engaging our services, you
                    agree to be bound by these Terms.
                  </p>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">1. Our Services</h3>
                    <p>
                      GWING provides technology consulting and development services, including
                      but not limited to custom software solutions, website design and
                      development, web application development, and mobile application
                      development. Specific project scope, deliverables, timelines, and fees for
                      any engagement will be set out separately in a proposal, statement of work,
                      or signed agreement between GWING and the client, which shall take
                      precedence over these Terms in the event of any conflict.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">2. Use of Our Website</h3>
                    <p className="mb-2">By using our website, you agree that you will not:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Use the website for any unlawful purpose or in violation of these Terms</li>
                      <li>Attempt to gain unauthorized access to our systems, servers, or networks</li>
                      <li>Introduce viruses, malware, or other harmful code</li>
                      <li>Copy, reproduce, or distribute content from our website without permission</li>
                      <li>Interfere with the proper functioning of the website</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">3. Intellectual Property</h3>
                    <p className="mb-2">
                      Unless otherwise agreed in writing, all content on this website, including
                      text, graphics, logos, and design, is the property of GWING Technologies
                      Private Limited and is protected by applicable intellectual property laws.
                    </p>
                    <p>
                      Ownership of deliverables created as part of a client engagement (such as
                      custom software, source code, websites, web applications, or mobile
                      applications) will be governed by the specific terms of the relevant project
                      agreement or statement of work entered into with the client.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">4. Client Responsibilities</h3>
                    <p className="mb-2">When engaging our services, clients agree to:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Provide accurate, complete, and timely information necessary for project delivery</li>
                      <li>Obtain any rights, licenses, or permissions required for content, data, or materials provided to us</li>
                      <li>Review and approve deliverables within agreed timeframes</li>
                      <li>Make payments in accordance with the agreed project terms</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">5. Fees and Payment</h3>
                    <p>
                      Fees for services are set out in the applicable proposal, quotation, or
                      agreement. Unless otherwise stated, invoices are due within the timeframe
                      specified in that agreement. Late payments may result in suspension of
                      services until outstanding amounts are settled.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">6. Confidentiality</h3>
                    <p>
                      Both parties agree to keep confidential any non-public business, technical,
                      or project information disclosed during the course of an engagement, and to
                      use such information solely for the purpose of the engagement, except where
                      disclosure is required by law.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">7. Warranties and Disclaimers</h3>
                    <p>
                      We strive to deliver high-quality software, websites, web applications, and
                      mobile applications using industry-standard practices. However, our website
                      and general service descriptions are provided "as is" without warranties of
                      any kind, express or implied, except as expressly set out in a signed
                      project agreement. We do not guarantee that any software or application will
                      be entirely free of errors or interruptions.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">8. Limitation of Liability</h3>
                    <p>
                      To the maximum extent permitted by law, GWING Software Technologies Private Limited
                      shall not be liable for any indirect, incidental, special, or consequential
                      damages arising out of or related to the use of our website or services. Our
                      total liability arising from any project engagement shall not exceed the
                      amount paid by the client for the relevant services, except where a separate
                      agreement specifies otherwise.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">9. Third-Party Services</h3>
                    <p>
                      Our services and deliverables may incorporate or rely on third-party tools,
                      platforms, libraries, or services. We are not responsible for the
                      availability, performance, or policies of such third parties, and their use
                      may be subject to separate terms.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">10. Termination</h3>
                    <p>
                      Either party may terminate an ongoing engagement in accordance with the
                      termination provisions set out in the applicable project agreement. We
                      reserve the right to suspend or restrict access to our website or services
                      in the event of a violation of these Terms.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">11. Governing Law</h3>
                    <p>
                      These Terms shall be governed by and construed in accordance with the laws
                      of India, without regard to its conflict of law principles. Any disputes
                      arising under these Terms shall be subject to the exclusive jurisdiction of
                      the courts located in [City], India.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">12. Changes to These Terms</h3>
                    <p>
                      We may revise these Terms from time to time. The "Last updated" date at the
                      top of this section reflects the most recent changes. Continued use of our
                      website or services after any changes constitutes acceptance of the updated
                      Terms.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">13. Contact Us</h3>
                    <p>
                      If you have any questions about these Terms & Conditions, please contact us
                      at:
                    </p>
                    <p className="mt-2">
                      <b>GWING Software Technologies Private Limited</b><br />
                      Email: legal@gwingsoftwaretechnologies.online<br />
                      Plot no 348, Kunamaha lakshmi nagar, Near jagathgirigutta police station, Balanagar, Telangana, India - 500037
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-gray-600 leading-relaxed space-y-6">
                  <p>
                    GWING Software Technologies Private Limited ("GWING," "we," "us," or "our") provides
                    custom software, website, web application, and mobile application development
                    services. This Privacy Policy explains how we collect, use, disclose, and
                    safeguard information when you visit our website, use our services, or
                    otherwise interact with us. By using our website or services, you agree to the
                    practices described in this policy.
                  </p>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">1. Information We Collect</h3>
                    <p className="mb-2">We may collect the following categories of information:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li><b>Contact information</b> you provide, such as your name, email address, phone number, and company name, when you fill out a form, request a consultation, or contact us.</li>
                      <li><b>Project information</b> shared with us during the course of a business engagement, including requirements, specifications, and any data provided to enable our development or consulting services.</li>
                      <li><b>Technical information</b> such as IP address, browser type, device type, pages visited, and time spent on our website, typically collected automatically through cookies and similar technologies.</li>
                      <li><b>Communications</b> including emails, call records, or messages exchanged with our team.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">2. How We Use Your Information</h3>
                    <p className="mb-2">We use the information we collect to:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Respond to inquiries and provide requested information about our services</li>
                      <li>Deliver, maintain, and improve the software, websites, web applications, and mobile applications we build</li>
                      <li>Communicate with you about projects, proposals, and ongoing support</li>
                      <li>Analyze website usage to improve content, navigation, and user experience</li>
                      <li>Comply with legal obligations and enforce our agreements</li>
                      <li>Send updates, newsletters, or marketing communications, where you have consented to receive them</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">3. Cookies and Tracking Technologies</h3>
                    <p>
                      Our website uses cookies and similar tracking technologies to recognize your
                      browser, remember preferences, and understand how visitors use our site. You
                      can control or disable cookies through your browser settings; however, doing
                      so may affect certain features of our website.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">4. How We Share Information</h3>
                    <p className="mb-2">We do not sell your personal information. We may share information with:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li><b>Service providers</b> who support our operations, such as hosting providers, analytics tools, and communication platforms, under confidentiality obligations.</li>
                      <li><b>Business partners or subcontractors</b> engaged to deliver specific parts of a client project, where necessary and appropriate.</li>
                      <li><b>Legal and regulatory authorities</b>, where required to comply with applicable law, respond to lawful requests, or protect our rights.</li>
                      <li><b>Successors</b>, in the event of a merger, acquisition, or sale of assets, subject to standard confidentiality protections.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">5. Data Security</h3>
                    <p>
                      We implement reasonable technical and organizational measures designed to
                      protect information from unauthorized access, alteration, disclosure, or
                      destruction. However, no method of transmission or storage is completely
                      secure, and we cannot guarantee absolute security.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">6. Data Retention</h3>
                    <p>
                      We retain personal information for as long as necessary to fulfill the
                      purposes outlined in this policy, comply with legal obligations, resolve
                      disputes, and enforce our agreements, after which it is securely deleted or
                      anonymized.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">7. Your Rights</h3>
                    <p className="mb-2">Depending on your location, you may have the right to:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Access the personal information we hold about you</li>
                      <li>Request correction of inaccurate or incomplete information</li>
                      <li>Request deletion of your personal information</li>
                      <li>Object to or restrict certain processing of your information</li>
                      <li>Withdraw consent where processing is based on consent</li>
                    </ul>
                    <p className="mt-2">
                      To exercise any of these rights, please contact us using the details below.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">8. Third-Party Links</h3>
                    <p>
                      Our website and communications may contain links to third-party websites or
                      services. We are not responsible for the privacy practices or content of
                      those third parties, and we encourage you to review their privacy policies
                      separately.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">9. Children's Privacy</h3>
                    <p>
                      Our services are intended for businesses and professionals. We do not
                      knowingly collect personal information from individuals under the age of 18.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">10. Changes to This Policy</h3>
                    <p>
                      We may update this Privacy Policy from time to time to reflect changes in
                      our practices or applicable law. The "Last updated" date at the top of this
                      section indicates when this policy was last revised. We encourage you to
                      review this page periodically.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">11. Contact Us</h3>
                    <p>
                      If you have questions or concerns about this Privacy Policy or our data
                      practices, please contact us at:
                    </p>
                    <p className="mt-2">
                      <b>GWING Software Technologies Private Limited</b><br />
                      Email: privacy@gwingsoftwaretechnologies.online<br />
                      Plot no 348, Kunamaha lakshmi nagar, Near jagathgirigutta police station, Balanagar, Telangana, India - 500037
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;