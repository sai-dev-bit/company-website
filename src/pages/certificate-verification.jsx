import React, { useState, useEffect } from 'react';
import { Award, Search, Calendar, User, Briefcase, CheckCircle, AlertCircle, Clock, Loader2, GraduationCap, MapPin } from 'lucide-react';
import { jsPDF } from 'jspdf';

const MOCK_TIMELINE_STEPS = [
  { key: 'STARTED', title: 'Internship Started', date: (d) => new Date(d.startDate), icon: Clock, type: 'start' },
  { key: 'ENDED', title: 'Internship Completed', date: (d) => new Date(d.endDate), icon: Calendar, type: 'end' },
];

const determineInternshipStatus = (details) => {
  if (!details || !details.startDate || !details.endDate) {
    return { stage: 'error' };
  }
  const isVerified = details.verified === true;

  if (isVerified) {
    return {
      status: 'Certificate Issued & Verified',
      message: 'Congratulations! The official internship certificate has been successfully issued and verified.',
      color: 'text-green-700 border-green-700 bg-green-50',
      icon: CheckCircle,
      stage: 'issued'
    };
  } else {
    return { stage: 'pending' }; // We don't show pending details publicly
  }
};

const TimelineStep = ({ step, details }) => {
  const stepDate = new Date(step.date(details));
  const status = determineInternshipStatus(details);
  const stage = status.stage || 'pending';

  const isStepActive = 
    (step.key === 'STARTED' && stage !== 'error') ||
    (step.key === 'ENDED' && stage === 'issued');

  const Icon = step.icon;
  const colorClass = isStepActive ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600';
  const lineClass = isStepActive ? 'bg-green-600' : 'bg-gray-300';

  const formattedDate = !isNaN(stepDate.getTime())
    ? stepDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    : 'Date TBD';

  return (
    <div className="relative flex items-start pb-12 last:pb-0">
      {step.type !== 'end' && (
        <div className={`absolute left-5 top-10 bottom-0 w-0.5 ${lineClass}`} />
      )}
      <div className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-4 border-white ${colorClass}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="ml-6 flex-1">
        <p className={`font-semibold text-lg ${isStepActive ? 'text-gray-900' : 'text-gray-500'}`}>
          {step.title}
        </p>
        <time className="text-sm text-gray-500">{formattedDate}</time>
      </div>
    </div>
  );
};

const InfoCard = ({ icon: Icon, title, value }) => (
  <div className="flex flex-col border border-gray-300 p-6 rounded-none">
    <div className="flex items-center space-x-3 mb-2">
      <Icon className="w-5 h-5 text-[#7b104c]" />
      <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
    </div>
    <p className="text-xl font-bold text-gray-900 break-words">{value || '—'}</p>
  </div>
);

const CertificateVerification = () => {
  const [internId, setInternId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!internId.trim()) return setError('Please enter a Certificate ID');

    setLoading(true);
    setError('');
    setResult(null);
    setPreviewUrl('');

    try {
      await new Promise(r => setTimeout(r, 1500));
      const res = await fetch(`https://intern-backend-d7d9.onrender.com/api/certificate/status/${internId}`);

      if (!res.ok) {
        setError("The intern you are trying to verify is not found or you have entered an invalid Intern ID. Please contact GWING.");
        return;
      }

      const data = await res.json();

      if (!data.details || data.verified !== true) {
        setError("The intern you are trying to verify is not found or you have entered an invalid Intern ID. Please contact GWING.");
        return;
      }

      setResult({
        ...data.details,
        verified: true,
        fullName: data.details.fullName || 'Name Not Available',
        internId: data.details.internId || internId,
      });

    } catch (err) {
      setError('Failed to connect to server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!result || !result.verified) {
      setPreviewUrl('');
      return;
    }

    const generatePreview = () => {
      const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      doc.addImage("/assets/certificate-bg.png", 'PNG', 0, 0, pageWidth, pageHeight);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(30);
      doc.setTextColor("#0b1320");
      doc.text(result.fullName.toUpperCase(), pageWidth / 2, 110, { align: "center" });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(14);
      const desc = `has successfully completed ${result.mode} internship at GWING Software Technologies as ${result.role} Intern, actively contributing to projects from ${result.startDate} to ${result.endDate} with unwavering dedication.`;
      doc.text(desc, pageWidth / 2, 130, { align: "center", maxWidth: pageWidth - 60 });

      const blob = doc.output('blob');
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
    };

    generatePreview();

    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [result]);

  const statusInfo = result ? determineInternshipStatus(result) : null;

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-[#7b104c] to-[#5b0c39] text-white">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <Award className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Official Internship Verification Portal</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Verify the authenticity of any GWING Internship Certificate and track real-time progress.
          </p>
        </div>
      </section>

      {/* Search Form */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="bg-white p-8 border border-gray-300 shadow-xl rounded-none">
            <form onSubmit={handleVerify} className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                value={internId}
                onChange={(e) => setInternId(e.target.value)}
                placeholder="Enter Intern ID (e.g., GWING508291)"
                className="flex-1 px-5 py-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7b104c] text-lg rounded-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-4 bg-[#7b104c] text-white font-semibold hover:bg-[#5b0c39] transition-all disabled:opacity-70 flex items-center gap-3 justify-center rounded-none"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                {loading ? 'Verifying...' : 'Verify Certificate'}
              </button>
            </form>

            {error && (
              <div className="mt-6 p-5 bg-red-50 border border-red-400 text-red-700 flex items-start gap-3 rounded-none">
                <AlertCircle className="w-6 h-6 mt-0.5 flex-shrink-0" />
                <p className="font-medium">{error}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Results - Only shown when verified === true */}
      {result && result.verified && (
        <section className="py-16 bg-gray-50">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="bg-white border border-gray-300 shadow-xl rounded-none">
              <div className="p-8 border-b border-gray-300">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Verification For ID: {result.internId}
                </h2>
                <div className={`inline-flex items-center gap-3 px-4 py-2 border-l-4 font-bold rounded-none ${statusInfo.color}`}>
                  <statusInfo.icon className="w-5 h-5" />
                  <span>{statusInfo.status}</span>
                </div>
                <p className="text-gray-600 mt-2">{statusInfo.message}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 divide-x divide-gray-300">
                {/* Intern Details */}
                <div className="p-8 lg:col-span-2">
                  <h3 className="text-2xl font-bold mb-6 border-b pb-2">Internship Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoCard icon={User} title="Full Name" value={result.fullName} />
                    <InfoCard icon={Award} title="Certificate ID" value={result.internId} />
                    <InfoCard icon={Briefcase} title="Internship Role" value={result.role} />
                    <InfoCard icon={MapPin} title="Mode" value={result.mode} />
                    <InfoCard icon={Calendar} title="Duration" value={`${result.duration} Weeks`} />
                    <InfoCard icon={Clock} title="Dates" value={`${result.startDate} to ${result.endDate}`} />
                    <InfoCard icon={GraduationCap} title="College/University" value={result.college} />
                  </div>
                </div>

                {/* Timeline */}
                <div className="p-8 bg-gray-50">
                  <h3 className="text-2xl font-bold mb-6 border-b pb-2">Internship Timeline</h3>
                  <div className="ml-2">
                    {MOCK_TIMELINE_STEPS.map((step) => (
                      <TimelineStep key={step.key} step={step} details={result} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Certificate Preview */}
              <div className="border-t border-gray-300 p-8">
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">
                  Official Certificate Preview
                </h3>
                <div className="relative border border-gray-400 max-w-4xl mx-auto rounded-none">
                  {previewUrl ? (
                    <>
                      <iframe
                        src={previewUrl}
                        title="Certificate Preview"
                        className="w-full aspect-[1.414/1] block"
                        style={{ border: 'none' }}
                      />
                      <div
                        className="absolute inset-0 bg-transparent cursor-not-allowed"
                        onContextMenu={(e) => e.preventDefault()}
                        onMouseDown={(e) => e.preventDefault()}
                      />
                    </>
                  ) : (
                    <div className="w-full aspect-[1.414/1] bg-gray-100 flex items-center justify-center">
                      <Loader2 className="w-12 h-12 animate-spin text-[#7b104c]" />
                    </div>
                  )}
                </div>
                <div className="p-4 bg-gray-100 text-center border-t border-gray-300 mt-0">
                  <p className="text-gray-700 font-semibold">
                    <span className="text-[#7b104c] font-bold mr-1">NOTE:</span> This preview is for visual confirmation only. Interaction (download/print) is restricted.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#7b104c] to-[#5b0c39] text-white">
        <div className="container mx-auto px-4 text-center max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Begin Your Career Journey</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Explore our current internship openings and apply to gain hands-on experience in cutting-edge technologies.
          </p>
          <a href="/career" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#7b104c] hover:bg-gray-100 font-bold text-lg transition-all rounded-none">
            Apply for Internship
          </a>
        </div>
      </section>
    </div>
  );
};

export default CertificateVerification;

// import React, { useState, useEffect } from 'react';
// import { Award, Search, Calendar, User, Briefcase, CheckCircle, AlertCircle, Clock, Mail, GraduationCap, Phone, MapPin, Loader2, XCircle } from 'lucide-react';
// import { jsPDF } from 'jspdf';

// const MOCK_TIMELINE_STEPS = [
// //   { key: 'APPLIED', title: 'Application Submitted', date: (d) => new Date(d.startDate).setDate(new Date(d.startDate).getDate() - 30), icon: Mail, type: 'start' },
//   { key: 'OFFERED', title: 'Offer Letter Sent', date: (d) => new Date(d.startDate).setDate(new Date(d.startDate).getDate() - 15), icon: Briefcase, type: 'middle' },
//   { key: 'STARTED', title: 'Internship Started', date: (d) => new Date(d.startDate), icon: Clock, type: 'middle' },
//   { key: 'ENDED', title: 'Internship Completed', date: (d) => new Date(d.endDate), icon: Calendar, type: 'end' },
// ];

// const determineInternshipStatus = (details) => {
//   if (!details || !details.startDate || !details.endDate) {
//     return {
//       key: 'INVALID',
//       status: 'Invalid Data',
//       message: 'Missing internship dates. Please contact support.',
//       color: 'text-red-700 border-red-700 bg-red-50',
//       icon: AlertCircle,
//       stage: 'error'
//     };
//   }

//   const today = new Date('2025-12-05'); // Fixed current date for testing
//   today.setHours(0, 0, 0, 0);
//   const startDate = new Date(details.startDate);
//   const endDate = new Date(details.endDate);
//   startDate.setHours(0, 0, 0, 0);
//   endDate.setHours(0, 0, 0, 0);

//   const isVerified = details.verified === true;
//   const hasReportSubmitted = details.status?.toLowerCase() === 'completed' || details.qualification?.toLowerCase() === 'passedout';

//   // 1. Certificate Issued
//   if (isVerified && today >= endDate && hasReportSubmitted) {
//     return {
//       key: 'ISSUED',
//       status: 'Certificate Issued & Verified',
//       message: `Congratulations! ${details.fullName} has successfully completed the ${details.duration}-weeks ${details.mode} as ${details.role}. The official certificate has been issued.`,
//       color: 'text-green-700 border-green-700 bg-green-50',
//       icon: CheckCircle,
//       stage: 'issued'
//     };
//   }

//   // 2. Offer Sent – Internship Not Started
//   if (today < startDate) {
//     const daysUntilStart = Math.ceil((startDate - today) / (1000 * 60 * 60 * 24));
//     return {
//       key: 'OFFERED',
//       status: 'Offer Accepted – Internship Not Started',
//       message: `${details.fullName} has accepted the internship offer. The program will officially begin on ${details.startDate}. Only ${daysUntilStart} day(s) to go!`,
//       color: 'text-purple-700 border-purple-700 bg-purple-50',
//       icon: Briefcase,
//       stage: 'offered'
//     };
//   }

//   // 3. Internship Ongoing
//   if (today >= startDate && today < endDate) {
//     const daysLeft = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
//     return {
//       key: 'ONGOING',
//       status: 'Internship In Progress',
//       message: `${details.fullName} is currently actively interning with us. ${daysLeft} day(s) remaining until completion on ${details.endDate}. Keep up the great work!`,
//       color: 'text-blue-700 border-blue-700 bg-blue-50',
//       icon: Clock,
//       stage: 'ongoing'
//     };
//   }

//   // 4. Internship Ended – Report Pending
//   if (today >= endDate && !hasReportSubmitted) {
//     const daysSinceEnd = Math.ceil((today - endDate) / (1000 * 60 * 60 * 24));
//     return {
//       key: 'REPORT_PENDING',
//       status: 'Report Submission Pending',
//       message: `The internship ended on ${details.endDate} (${daysSinceEnd} day(s) ago). The certificate cannot be issued until the final internship report is submitted and approved.`,
//       color: 'text-red-700 border-red-700 bg-red-50',
//       icon: XCircle,
//       stage: 'report_pending'
//     };
//   }

//   // 5. Fallback
//   return {
//     key: 'REPORT_PENDING',
//       status: 'Report Submission Pending',
//       message: `The internship ended on ${details.endDate} (${daysSinceEnd} day(s) ago). The certificate cannot be issued until the final internship report is submitted and approved.`,
//       color: 'text-red-700 border-red-700 bg-red-50',
//       icon: XCircle,
//       stage: 'report_pending'
//   };
// };

// const TimelineStep = ({ step, details }) => {
//   const stepDate = new Date(step.date(details));
//   const status = determineInternshipStatus(details);
//   const stage = status.stage;

//   let isStepActive = false;
//   if (step.key === 'APPLIED') isStepActive = true;
//   if (step.key === 'OFFERED') isStepActive = ['offered', 'ongoing', 'report_pending', 'issued'].includes(stage);
//   if (step.key === 'STARTED') isStepActive = ['ongoing', 'report_pending', 'issued'].includes(stage);
//   if (step.key === 'ENDED') isStepActive = ['report_pending', 'issued'].includes(stage);

//   const Icon = step.icon;
//   const colorClass = isStepActive ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600';
//   const lineClass = isStepActive ? 'bg-green-600' : 'bg-gray-300';

//   const formattedDate = !isNaN(stepDate.getTime())
//     ? stepDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
//     : 'Date TBD';

//   return (
//     <div className="relative flex items-start pb-12 last:pb-0">
//       {step.type !== 'end' && (
//         <div className={`absolute left-5 top-10 bottom-0 w-0.5 ${lineClass}`} />
//       )}
//       <div className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-4 border-white ${colorClass}`}>
//         <Icon className="w-5 h-5" />
//       </div>
//       <div className="ml-6 flex-1">
//         <p className={`font-semibold text-lg ${isStepActive ? 'text-gray-900' : 'text-gray-500'}`}>
//           {step.title}
//           {step.key === 'ENDED' && stage === 'report_pending' && ' (Report Pending)'}
//         </p>
//         <time className="text-sm text-gray-500">{formattedDate}</time>
//       </div>
//     </div>
//   );
// };

// const InfoCard = ({ icon: Icon, title, value }) => (
//   <div className="flex flex-col border border-gray-300 p-6 rounded-none">
//     <div className="flex items-center space-x-3 mb-2">
//       <Icon className="w-5 h-5 text-[#7b104c]" />
//       <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
//     </div>
//     <p className="text-xl font-bold text-gray-900 break-words">{value || '—'}</p>
//   </div>
// );

// const CertificateVerification = () => {
//   const [internId, setInternId] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState('');
//   const [previewUrl, setPreviewUrl] = useState('');

//   const handleVerify = async (e) => {
//     e.preventDefault();
//     if (!internId.trim()) return setError('Please enter a Certificate ID');

//     setLoading(true);
//     setError('');
//     setResult(null);
//     setPreviewUrl('');

//     try {
//       await new Promise(r => setTimeout(r, 1500)); // Simulate network

//       const res = await fetch(`https://intern-backend-d7d9.onrender.com/api/certificate/status/${internId}`);

//       if (!res.ok) {
//         const errorData = await res.json().catch(() => ({}));
//         setError(errorData.message || `Verification failed (Status: ${res.status})`);
//         return;
//       }

//       const data = await res.json();
//       console.log("data ", data.details);
      
//       // Even if not verified, show progress if details exist
//       if (data.details) {
//         setResult({
//           ...data.details,
//           verified: data.verified === true,
//           fullName: data.details.fullName || 'Name Not Available',
//           internId: data.details.internId || internId,
//         });
//       } else {
//         setError(data.message || 'No internship record found for this ID.');
//       }
//     } catch (err) {
//       console.error(err);
//       setError('Failed to connect to server.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Generate PDF Preview Only When Issued
//   useEffect(() => {
//     if (!result || !result.verified) {
//       setPreviewUrl('');
//       return;
//     }

//     const generatePreview = () => {
//       const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
//       const pageWidth = doc.internal.pageSize.getWidth();
//       const pageHeight = doc.internal.pageSize.getHeight();

//       const placeholder = 'https://placehold.co/297x210/DDEFFF/3366AA?text=Certificate+Background';
//       doc.addImage(
//         "/assets/certificate-bg.png", // ← Put your bg here: public/assets/certificate-bg.png
//         'PNG',
//         0, 0,
//         pageWidth, pageHeight
//       );

//     //   doc.addImage(placeholder, 'PNG', 0, 0, pageWidth, pageHeight, '', 'FAST');

//       doc.setFont("helvetica", "bold");
//       doc.setFontSize(30);
//       doc.setTextColor("#0b1320");
//       doc.text(result.fullName.toUpperCase(), pageWidth / 2, 110, { align: "center" });

//       doc.setFont("helvetica", "normal");
//       doc.setFontSize(14);
//       const desc = `has successfully completed ${result.mode} internship at GWING Software Technologies as ${result.role} Intern, actively contributing to projects from ${result.startDate} to ${result.endDate} with unwavering dedication.`;
//       doc.text(desc, pageWidth / 2, 130, { align: "center", maxWidth: pageWidth - 60 });

//       doc.setFontSize(10);
//       doc.setTextColor("#4b5563");
//     //   doc.text("Issued by GWING Software Technologies • MSME & AICTE Recognized", pageWidth / 2, pageHeight - 20, { align: "center" });

//       const blob = doc.output('blob');
//       const url = URL.createObjectURL(blob);
//       setPreviewUrl(url);
//     };

//     generatePreview();

//     return () => {
//       if (previewUrl) URL.revokeObjectURL(previewUrl);
//     };
//   }, [result]);

//   const statusInfo = result ? determineInternshipStatus(result) : null;

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
//       {/* Hero */}
//       <section className="py-20 bg-gradient-to-br from-[#7b104c] to-[#5b0c39] text-white">
//         <div className="container max-w-7xl mx-auto px-4 text-center">
//           <Award className="w-16 h-16 mx-auto mb-6" />
//           <h1 className="text-4xl md:text-5xl font-bold mb-6">Official Internship Verification Portal</h1>
//           <p className="text-xl text-white/90 max-w-3xl mx-auto">
//             Verify the authenticity of any GWING Internship Certificate and track real-time progress.
//           </p>
//         </div>
//       </section>

//       {/* Search Form */}
//       <section className="py-16 bg-white">
//         <div className="container max-w-4xl mx-auto px-4">
//           <div className="bg-white p-8 border border-gray-300 shadow-xl rounded-none">
//             <form onSubmit={handleVerify} className="flex flex-col md:flex-row gap-4">
//               <input
//                 type="text"
//                 value={internId}
//                 onChange={(e) => setInternId(e.target.value)}
//                 placeholder="Enter Intern ID (e.g., GWING508291)"
//                 className="flex-1 px-5 py-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7b104c] text-lg rounded-none"
//               />
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-8 py-4 bg-[#7b104c] text-white font-semibold hover:bg-[#5b0c39] transition-all disabled:opacity-70 flex items-center gap-3 justify-center rounded-none"
//               >
//                 {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
//                 {loading ? 'Verifying...' : 'Verify Certificate'}
//               </button>
//             </form>

//             {error && (
//               <div className="mt-6 p-5 bg-red-50 border border-red-400 text-red-700 flex items-start gap-3 rounded-none">
//                 <AlertCircle className="w-6 h-6 mt-0.5 flex-shrink-0" />
//                 <p className="font-medium">{error}</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Results */}
//       {result && statusInfo && (
//         <section className="py-16 bg-gray-50">
//           <div className="container max-w-7xl mx-auto px-4">
//             <div className="bg-white border border-gray-300 shadow-xl rounded-none">
//               <div className="p-8 border-b border-gray-300">
//                 <h2 className="text-3xl font-bold text-gray-900 mb-2">Verification Results for {result.internId}</h2>
//                 <div className={`inline-flex items-center gap-3 px-4 py-2 border-l-4 font-bold rounded-none ${statusInfo.color}`}>
//                   <statusInfo.icon className="w-5 h-5" />
//                   <span>{statusInfo.status}</span>
//                 </div>
//                 <p className="text-gray-600 mt-2">{statusInfo.message}</p>
//                 {!result.verified && (
//                   <p className="text-lg font-bold text-red-700 mt-4">
//                     Certificate Not Issued Yet
//                   </p>
//                 )}
//               </div>

//               <div className="grid grid-cols-1 lg:grid-cols-3 divide-x divide-gray-300">
//                 {/* COLUMN 1: INTERN DETAILS */}
//                 <div className="p-8 lg:col-span-2">
//                   <h3 className="text-2xl font-bold mb-6 border-b pb-2">Internship & Personal Details</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <InfoCard icon={User} title="Full Name" value={result.fullName} />
//                     <InfoCard icon={Award} title="Certificate ID" value={result.internId} />
//                     <InfoCard icon={Briefcase} title="Internship Role" value={result.role} />
//                     <InfoCard icon={MapPin} title="Mode" value={result.mode} />
//                     <InfoCard icon={Calendar} title="Duration" value={`${result.duration} Weeks`} />
//                     <InfoCard icon={Clock} title="Dates" value={`${result.startDate} to ${result.endDate}`} />
//                     {/* <InfoCard icon={Phone} title="Mobile" value={result.mobile} /> */}
//                     {/* <InfoCard icon={Mail} title="Email" value={result.email} /> */}
//                     <InfoCard icon={GraduationCap} title="College/University" value={result.college} />
//                   </div>
//                 </div>

//                 {/* COLUMN 2: TIMELINE */}
//                 <div className="p-8 bg-gray-50">
//                   <h3 className="text-2xl font-bold mb-6 border-b pb-2">Internship Process Flow</h3>
//                   <div className="ml-2">
//                     {MOCK_TIMELINE_STEPS.map((step) => (
//                       <TimelineStep key={step.key} step={step} details={result} />
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* CERTIFICATE PREVIEW SECTION */}
//               {result.verified ? (
//                 <div className="border-t border-gray-300 p-8">
//                   <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">
//                     Official Certificate Preview
//                   </h3>
//                   <div className="relative border border-gray-400 max-w-4xl mx-auto rounded-none">
//                     {previewUrl ? (
//                       <>
//                         <iframe
//                           src={previewUrl}
//                           title="Certificate Preview"
//                           className="w-full aspect-[1.414/1] block"
//                           style={{ border: 'none' }}
//                         />
//                         <div
//                           className="absolute inset-0 bg-transparent cursor-not-allowed"
//                           style={{ pointerEvents: 'auto' }}
//                           onContextMenu={(e) => e.preventDefault()}
//                           onMouseDown={(e) => e.preventDefault()}
//                         />
//                       </>
//                     ) : (
//                       <div className="w-full aspect-[1.414/1] bg-gray-100 flex items-center justify-center">
//                         <Loader2 className="w-12 h-12 animate-spin text-[#7b104c]" />
//                       </div>
//                     )}
//                   </div>
//                   <div className="p-4 bg-gray-100 text-center border-t border-gray-300 mt-0">
//                     <p className="text-gray-700 font-semibold">
//                       <span className="text-[#7b104c] font-bold mr-1">NOTE:</span> This preview is for visual confirmation only. Interaction (download/print) is restricted.
//                     </p>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="border-t border-gray-300 p-8 bg-gray-50 text-center">
//                   <h3 className="text-2xl font-bold text-gray-900 mb-6">
//                     Certificate Preview
//                   </h3>
//                   <div className="max-w-3xl mx-auto p-8 bg-blue-50 border border-blue-300 rounded-none">
//                     <p className="text-lg text-blue-900 leading-relaxed">
//                       You will be able to see your certificate preview <strong>only after it is verified by the company</strong> upon submission and approval of your final internship report.
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* CTA */}
//       <section className="py-16 bg-gradient-to-br from-[#7b104c] to-[#5b0c39] text-white">
//         <div className="container mx-auto px-4 text-center max-w-7xl">
//           <h2 className="text-3xl md:text-4xl font-bold mb-6">Begin Your Career Journey</h2>
//           <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
//             Explore our current internship openings and apply to gain hands-on experience in cutting-edge technologies.
//           </p>
//           <a href="/career" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#7b104c] hover:bg-gray-100 font-bold text-lg transition-all rounded-none">
//             Apply for Internship
//           </a>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default CertificateVerification;