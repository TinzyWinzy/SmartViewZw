/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Clock, DollarSign, BookOpen, UserCheck, ShieldCheck, Check, Upload, HelpCircle, PhoneCall } from 'lucide-react';
import { ACADEMY_COURSES, SERVICE_AREAS } from '../data';
import { AcademyCourse, TrainingApplication } from '../types';

interface TrainingAcademyProps {
  onApplySubmit: (application: Omit<TrainingApplication, 'id' | 'createdAt' | 'status'>) => void;
}

export default function TrainingAcademy({ onApplySubmit }: TrainingAcademyProps) {
  const [selectedCourse, setSelectedCourse] = useState<AcademyCourse | null>(null);
  const [formData, setFormData] = useState({
    applicantName: '',
    nationalId: '',
    gender: 'female' as 'female' | 'male',
    age: 23,
    phone: '',
    location: SERVICE_AREAS[0],
    selectedCourseId: ACADEMY_COURSES[0].id,
    priorExperience: ''
  });

  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Drag & Drop event handlers for file upload
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFileName(e.dataTransfer.files[0].name);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFileName(e.target.files[0].name);
    }
  };

  const openFileBrowser = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.applicantName || !formData.phone || !formData.nationalId) {
      alert('Please fill in all core fields (Name, National ID, Phone Number).');
      return;
    }

    onApplySubmit({
      applicantName: formData.applicantName,
      nationalId: formData.nationalId,
      gender: formData.gender,
      age: formData.age,
      phone: formData.phone,
      location: formData.location,
      selectedCourseId: formData.selectedCourseId,
      priorExperience: formData.priorExperience
    });

    setIsSubmitSuccess(true);
    // Reset form
    setFormData({
      applicantName: '',
      nationalId: '',
      gender: 'female',
      age: 23,
      phone: '',
      location: SERVICE_AREAS[0],
      selectedCourseId: ACADEMY_COURSES[0].id,
      priorExperience: ''
    });
    setUploadedFileName(null);
  };

  return (
    <div id="academy-portal" className="bg-white min-h-screen">
      
      {/* Banner / Header */}
      <div className="royal-gradient text-white py-20 lg:py-28 relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(197,160,89,0.1),transparent)]"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center lg:text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-8 space-y-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-gold-accent rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-4 border border-white/15">
                Smart Maids ZW domestic Academy
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.05] tracking-tight uppercase">
                TAKE CONTROL OF YOUR FUTURE. START A <span className="font-display italic font-semibold text-gold-accent flex-wrap">PROFESSIONAL CAREER.</span>
              </h1>
              <p className="font-sans text-xs text-slate-300 max-w-3xl leading-relaxed font-light">
                Avoid unemployment and gain high-demand professional domestic management skills. Become an elite housekeeper, a certified childcare provider, or a professional chef matching Harare's premier estates.
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-xs font-semibold text-royal-light">
                <div className="flex items-center space-x-1.5 bg-white/5 border border-white/10 px-3.5 py-2 rounded-lg">
                  <UserCheck className="h-4 w-4 text-emerald-400" />
                  <span>Vetting Support</span>
                </div>
                <div className="flex items-center space-x-1.5 bg-white/5 border border-white/10 px-3.5 py-2 rounded-lg">
                  <Award className="h-4 w-4 text-emerald-400" />
                  <span>Certified Badges Given</span>
                </div>
                <div className="flex items-center space-x-1.5 bg-white/5 border border-white/10 px-3.5 py-2 rounded-lg">
                  <Clock className="h-4 w-4 text-emerald-400" />
                  <span>Flexible Course Schedules</span>
                </div>
              </div>
            </div>

            {/* Quote block */}
            <div className="lg:col-span-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/15 p-6 space-y-4">
              <span className="text-gold-accent font-mono text-5xl font-bold leading-none block">“</span>
              <p className="font-sans text-sm text-gray-100 italic font-light leading-relaxed">
                "Take control of your future and avoid unemployment. Enroll in our professional maid training program today and choose a dignified career."
              </p>
              <div className="border-t border-white/10 pt-3">
                <p className="font-display text-xs font-bold text-white uppercase tracking-wider">Admissions Council</p>
                <p className="font-sans text-[11px] text-gray-300">Smart Maids ZW Academy Campaigns</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Course Catalog */}
      <div className="py-20 lg:py-28 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-royal-light text-royal-blue rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-4 border border-royal-blue/10">
              Certification pathways
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-light text-slate-900 uppercase tracking-tight">
              Explore Available <span className="font-display italic font-semibold text-royal-blue">Programs</span>
            </h2>
            <p className="font-sans text-xs text-slate-500 font-light mt-1 max-w-xl leading-relaxed">
              Select a professional course path to view certification requirements and modules. All classes are highly practical.
            </p>
          </div>
          <div className="mt-4 md:mt-0 font-sans text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-full inline-flex items-center gap-1.5 self-start">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>100% Placement Guarantee for Executive Graduates</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ACADEMY_COURSES.map((course) => (
            <div
              key={course.id}
              className="group flex flex-col justify-between border border-slate-100 bg-slate-50 rounded-2xl p-6 shadow-sm hover:border-royal-blue/15 hover:bg-white hover:shadow-2xl transition duration-305"
            >
              <div>
                <span className="inline-block py-1 px-2.5 text-[9px] font-mono font-extrabold tracking-widest uppercase bg-royal-light text-royal-blue rounded-md border border-royal-blue/10 mb-4">
                  Course Code: {course.id.toUpperCase()}
                </span>
                <h3 className="font-display text-xl font-bold text-slate-900 leading-snug group-hover:text-royal-blue transition">
                  {course.title}
                </h3>
                <p className="font-sans text-xs text-slate-500 font-light my-3 leading-relaxed">
                  {course.shortDescription}
                </p>

                {/* Badges durations */}
                <div className="flex items-center space-x-4 border-t border-slate-200/50 pt-4 mt-4 text-[11px] font-sans text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3.5 w-3.5 text-royal-blue shrink-0" />
                    <span>{course.durationWeeks} Weeks</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="h-3.5 w-3.5 text-gold-dark shrink-0" />
                    <span className="font-bold text-gray-900">${course.priceUSD} USD</span>
                  </div>
                </div>
              </div>

              {/* View Modules CTA Button */}
              <button
                id={`view-course-${course.id}`}
                onClick={() => setSelectedCourse(course)}
                className="mt-6 flex items-center justify-center gap-1.5 w-full bg-white group-hover:bg-royal-blue hover:text-white group-hover:text-white border border-slate-200 group-hover:border-royal-blue rounded-xl py-2.5 font-sans text-xs font-semibold text-gray-700 transition duration-200"
              >
                <BookOpen className="h-4 w-4" />
                <span>View Syllabus modules</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Separate Application Form */}
      <div id="enrollment-form-section" className="py-16 bg-slate-50 border-t border-b border-gray-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
            
            <div className="bg-gradient-to-r from-royal-blue to-royal-dark text-white p-8 relative">
              <div className="absolute top-4 right-4 h-14 w-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <Award className="h-7 w-7 text-gold-accent" />
              </div>
              <h3 className="font-display text-2xl font-extrabold tracking-tight">
                Course Application &amp; Intake Registration Form
              </h3>
              <p className="font-sans text-sm text-gray-200 mt-1 font-light leading-relaxed">
                Avoid unemployment. Step into our dynamic campus in Harare or Bulawayo. Fill out the application profile below and choose your study program. No prior diplomas required.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              
              {/* Form success message */}
              <AnimatePresence>
                {isSubmitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    id="submit-success-toast"
                    className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3 bg-emerald-50 border border-emerald-300 text-emerald-800 p-4 rounded-2xl text-xs font-sans"
                  >
                    <Check className="h-5 w-5 bg-emerald-500 text-white rounded-full p-0.5 shrink-0" />
                    <div className="space-y-1">
                      <p className="font-semibold">Your Academy Registration was Submitted Successfully!</p>
                      <p className="text-emerald-700 font-light leading-relaxed">
                        An admissions officer from the Smart Maids ZW Training Office will contact you on your mobile number (+263/ WhatsApp) within 24 hours to schedule your screening and onboarding interview.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Applicant Name */}
                <div className="space-y-2">
                  <label id="lbl-applicantName" className="block font-sans text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="applicant-applicantName"
                    type="text"
                    required
                    placeholder="e.g. Tendai Gertrude Chiminya"
                    value={formData.applicantName}
                    onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 font-sans text-sm focus:border-royal-blue focus:outline-none"
                  />
                </div>

                {/* National ID */}
                <div className="space-y-2">
                  <label id="lbl-nationalId" className="block font-sans text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Zimbabwean National ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="applicant-nationalId"
                    type="text"
                    required
                    placeholder="e.g. 63-128471Q-50"
                    value={formData.nationalId}
                    onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 font-sans text-sm focus:border-royal-blue focus:outline-none"
                  />
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <label id="lbl-gender" className="block font-sans text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Gender Identity
                  </label>
                  <select
                    id="applicant-gender"
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'female' | 'male' })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 font-sans text-sm bg-white focus:border-royal-blue focus:outline-none"
                  >
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                </div>

                {/* Age */}
                <div className="space-y-2">
                  <label id="lbl-age" className="block font-sans text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Age <span className="text-gray-400 font-light">(Min 18 for jobs)</span>
                  </label>
                  <input
                    id="applicant-age"
                    type="number"
                    min="18"
                    max="60"
                    required
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 18 })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 font-sans text-sm focus:border-royal-blue focus:outline-none"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label id="lbl-phone" className="block font-sans text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    WhatsApp or Mobile Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="applicant-phone"
                    type="tel"
                    required
                    placeholder="e.g. +263 77 444 9860"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 font-sans text-sm focus:border-royal-blue focus:outline-none"
                  />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label id="lbl-location" className="block font-sans text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Preferred Training Location Center
                  </label>
                  <select
                    id="applicant-location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 font-sans text-sm bg-white focus:border-royal-blue focus:outline-none"
                  >
                    {SERVICE_AREAS.map((area) => (
                      <option key={area} value={area}>
                        {area.split('(')[0].trim()}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Select Course Path */}
                <div className="sm:col-span-2 space-y-2">
                  <label id="lbl-courseId" className="block font-sans text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Selected Study program
                  </label>
                  <select
                    id="applicant-courseId"
                    value={formData.selectedCourseId}
                    onChange={(e) => setFormData({ ...formData, selectedCourseId: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 font-sans text-sm bg-white focus:border-royal-blue focus:outline-none"
                  >
                    {ACADEMY_COURSES.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.title} — ({course.durationWeeks} Weeks • ${course.priceUSD} USD)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Prior Experience text */}
                <div className="sm:col-span-2 space-y-2">
                  <label id="lbl-priorExperience" className="block font-sans text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Prior housework or childminding experience <span className="text-gray-400 font-light">(Optional)</span>
                  </label>
                  <textarea
                    id="applicant-priorExperience"
                    rows={2}
                    placeholder="State briefly if you have worked in a household before, looked after siblings or cooked in a clinic, etc."
                    value={formData.priorExperience}
                    onChange={(e) => setFormData({ ...formData, priorExperience: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 font-sans text-sm focus:border-royal-blue focus:outline-none resize-none"
                  />
                </div>

                {/* Drag And Drop File Upload */}
                <div className="sm:col-span-2 space-y-2">
                  <label id="lbl-file-upload" className="block font-sans text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Upload National ID photocopy or Prior CV / References <span className="text-gray-400 font-light">(Optional)</span>
                  </label>
                  
                  <div
                    id="doc-uploader-box"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition ${
                      isDragOver
                        ? 'border-royal-blue bg-royal-light/30'
                        : uploadedFileName
                        ? 'border-emerald-500 bg-emerald-50/25'
                        : 'border-slate-300 hover:border-royal-blue bg-slate-50'
                    }`}
                    onClick={openFileBrowser}
                  >
                    <input
                      id="doc-file-input"
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                    />
                    
                    <Upload className={`h-8 w-8 ${uploadedFileName ? 'text-emerald-500' : 'text-slate-400'} mb-2`} />
                    
                    {uploadedFileName ? (
                      <div className="space-y-1">
                        <p className="font-sans text-sm font-semibold text-emerald-700">File Selected Successfully!</p>
                        <p className="font-mono text-xs text-gray-500">{uploadedFileName}</p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <p className="font-sans text-sm font-medium text-gray-700">
                          <span className="text-royal-blue font-bold">Click to select files</span> or drag and drop here
                        </p>
                        <p className="font-sans text-[11px] text-gray-500">Supports PDF, PNG, JPG, or DOC (Max 5MB)</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Submit Button */}
              <button
                id="academy-submit-btn"
                type="submit"
                className="w-full flex items-center justify-center space-x-2 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 font-sans text-xs font-bold uppercase tracking-widest text-white shadow-xl transition focus:outline-none"
              >
                <span>Submit Academy Application Intake</span>
              </button>

            </form>
          </div>

        </div>
      </div>

      {/* Syllabus Modal Backdrop */}
      <AnimatePresence>
        {selectedCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedCourse(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="royal-gradient text-white p-6 relative">
                <span className="text-[10px] font-mono tracking-widest text-gold-accent font-extrabold uppercase bg-white/10 px-2.5 py-1 rounded">
                  OFFICIAL CURRICULUM BLUEPRINT
                </span>
                <h3 className="font-display text-xl font-bold mt-2 pr-6">{selectedCourse.title}</h3>
                <button
                  id="close-syllabus-modal"
                  onClick={() => setSelectedCourse(null)}
                  className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full"
                >
                  ✕
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="font-display font-medium text-xs text-gray-500 uppercase tracking-wider mb-2">Core Purpose &amp; Career Impact</h4>
                  <p className="font-sans text-xs text-gray-700 leading-relaxed font-light">{selectedCourse.fullDescription}</p>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <h4 className="font-display font-medium text-xs text-gray-500 uppercase tracking-wider mb-3">Structured Training Modules</h4>
                  <ul className="space-y-2.5">
                    {selectedCourse.modules.map((mod, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5 text-xs text-gray-700 font-sans leading-tight">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-50 font-mono text-[10px] font-bold text-amber-700 border border-amber-200">
                          {idx + 1}
                        </span>
                        <span className="pt-0.5">{mod}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Summary Box */}
                <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="font-display text-[10px] text-gray-500 uppercase font-medium">Certification Level</p>
                    <p className="font-sans text-xs font-bold text-gray-900 mt-1 leading-tight">{selectedCourse.certification}</p>
                  </div>
                  <div>
                    <p className="font-display text-[10px] text-gray-500 uppercase font-medium">Placement Status</p>
                    <p className="font-sans text-xs font-bold text-emerald-600 mt-1">✓ Elite Placement Eligible</p>
                  </div>
                </div>

                {/* Instant select CTA */}
                <button
                  id={`confirm-course-${selectedCourse.id}`}
                  onClick={() => {
                    setFormData({ ...formData, selectedCourseId: selectedCourse.id });
                    setSelectedCourse(null);
                    // Scroll to the intake form smoothly
                    document.getElementById('enrollment-form-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-royal-blue hover:bg-royal-dark text-white py-3.5 font-sans text-xs font-bold shadow-md transition"
                >
                  <span>Select Program and Enroll Below</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
