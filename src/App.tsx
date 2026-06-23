/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, Award, MessageSquare, Compass, CheckCircle, 
  Sparkle, MapPin, Mail, Phone, Heart, Users, Star, ArrowRight 
} from 'lucide-react';

import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import TrainingAcademy from './components/TrainingAcademy';
import InteractiveBooking from './components/InteractiveBooking';
import Testimonials from './components/Testimonials';
import AdminPortal from './components/AdminPortal';

import { BookingInquiry, TrainingApplication, ServiceType } from './types';
import { SERVICE_AREAS } from './data';
import { db } from './firebase';
import { collection, doc, setDoc, updateDoc, deleteDoc, onSnapshot, getDocs, writeBatch } from 'firebase/firestore';

// Initial Seed Data for Instant Demonstration
const INITIAL_BOOKINGS: BookingInquiry[] = [
  {
    id: 'b-seed-1',
    clientName: 'Dr. Brandon Tino',
    email: 'brandontinoz@gmail.com',
    phone: '+263 77 444 9860',
    location: SERVICE_AREAS[0], // Harare North
    serviceNeeded: 'housekeeping',
    frequency: 'full_time',
    preferredLanguages: ['English', 'Shona'],
    additionalNotes: 'Need a meticulous housekeeper for a 4-bedroom house. Focus on laundry and delicates.',
    status: 'pending',
    createdAt: new Date(Date.now() - 3600 * 1000 * 2).toISOString() // 2 hours ago
  },
  {
    id: 'b-seed-2',
    clientName: 'Samantha Moyo',
    email: 'samantha.m@moyo-holdings.co.zw',
    phone: '+263 71 228 3941',
    location: 'Bulawayo Central & Suburbs',
    serviceNeeded: 'childcare',
    frequency: 'live_in',
    preferredLanguages: ['English', 'Ndebele'],
    additionalNotes: 'Nanny for 18-month-old infant. Seeking pediatric safety first-aid certified helper only.',
    status: 'matched',
    createdAt: new Date(Date.now() - 3600 * 1000 * 24).toISOString() // Yesterday
  },
  {
    id: 'b-seed-3',
    clientName: 'Ronald Goredema',
    email: 'r_goredema@telecom.co.zw',
    phone: '+263 78 554 1205',
    location: 'Mutare Urban Areas',
    serviceNeeded: 'cooking',
    frequency: 'part_time',
    preferredLanguages: ['English', 'Shona'],
    additionalNotes: 'Desires healthy meal plans preparing dietary low-carb options 2 days a week.',
    status: 'reviewed',
    createdAt: new Date(Date.now() - 3600 * 1000 * 24 * 3).toISOString() // 3 days ago
  }
];

const INITIAL_APPLICATIONS: TrainingApplication[] = [
  {
    id: 'app-seed-1',
    applicantName: 'Chipo Sibanda',
    nationalId: '63-128471Q-50',
    gender: 'female',
    age: 24,
    phone: '+263 77 112 2334',
    location: 'Harare East (Highlands, Greendale, Chisipite, Ruwa)',
    selectedCourseId: 'sm-exec-4', // Executive Course
    priorExperience: 'House helper in Ruwa for 1 year.',
    status: 'enrolled',
    createdAt: new Date(Date.now() - 3600 * 1000 * 12).toISOString() // 12 hours ago
  },
  {
    id: 'app-seed-2',
    applicantName: 'Gertrude Chiminya',
    nationalId: '15-442801F-22',
    gender: 'female',
    age: 22,
    phone: '+263 78 122 4455',
    location: 'Gweru Urban Areas',
    selectedCourseId: 'sm-hb-1', // Housekeeping Course
    priorExperience: 'No formal employment; helps clean church hall.',
    status: 'interviewing',
    createdAt: new Date(Date.now() - 3600 * 1000 * 24 * 2).toISOString() // 2 days ago
  },
  {
    id: 'app-seed-3',
    applicantName: 'Rufaro Gumbo',
    nationalId: '08-992147D-11',
    gender: 'female',
    age: 28,
    phone: '+263 77 555 6667',
    location: 'Bulawayo Central & Suburbs',
    selectedCourseId: 'sm-cm-3', // Child Minding Course
    priorExperience: 'Looked after nieces for 4 years, high patience levels.',
    status: 'completed',
    createdAt: new Date(Date.now() - 3600 * 1000 * 24 * 5).toISOString() // 5 days ago
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'landing' | 'academy' | 'admin'>('landing');
  const [selectedServiceId, setSelectedServiceId] = useState<ServiceType | null>(null);

  // Persistence States synced real-time with Firebase Firestore
  const [bookings, setBookings] = useState<BookingInquiry[]>([]);
  const [applications, setApplications] = useState<TrainingApplication[]>([]);
  const [dbLoading, setDbLoading] = useState(true);

  // Set up real-time Firebase listeners with automatic initial seeding if database is empty
  useEffect(() => {
    const bookingsRef = collection(db, 'bookings');
    const unsubscribeBookings = onSnapshot(bookingsRef, async (snapshot) => {
      if (snapshot.empty) {
        console.log("Seeding initial bookings to Firestore...");
        try {
          const batch = writeBatch(db);
          INITIAL_BOOKINGS.forEach((item) => {
            const docRef = doc(db, 'bookings', item.id);
            batch.set(docRef, item);
          });
          await batch.commit();
        } catch (error) {
          console.error("Error seeding initial bookings:", error);
        }
      } else {
        const fetchedBookings: BookingInquiry[] = [];
        snapshot.forEach((doc) => {
          fetchedBookings.push(doc.data() as BookingInquiry);
        });
        fetchedBookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setBookings(fetchedBookings);
      }
    });

    const appsRef = collection(db, 'academy_applications');
    const unsubscribeApps = onSnapshot(appsRef, async (snapshot) => {
      if (snapshot.empty) {
        console.log("Seeding initial applications to Firestore...");
        try {
          const batch = writeBatch(db);
          INITIAL_APPLICATIONS.forEach((item) => {
            const docRef = doc(db, 'academy_applications', item.id);
            batch.set(docRef, item);
          });
          await batch.commit();
        } catch (error) {
          console.error("Error seeding initial applications:", error);
        }
      } else {
        const fetchedApps: TrainingApplication[] = [];
        snapshot.forEach((doc) => {
          fetchedApps.push(doc.data() as TrainingApplication);
        });
        fetchedApps.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setApplications(fetchedApps);
      }
      setDbLoading(false);
    });

    return () => {
      unsubscribeBookings();
      unsubscribeApps();
    };
  }, []);

  // Actions for Booking Submission (directly connected to Firestore)
  const handleBookingSubmit = async (newBookingData: Omit<BookingInquiry, 'id' | 'createdAt' | 'status'>) => {
    const bookingId = `booking-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    const newBooking: BookingInquiry = {
      ...newBookingData,
      id: bookingId,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    try {
      await setDoc(doc(db, 'bookings', bookingId), newBooking);
    } catch (error) {
      console.error("Error saving booking inquiry:", error);
    }
  };

  // Actions for Course Applications (directly connected to Firestore)
  const handleApplicationSubmit = async (newAppData: Omit<TrainingApplication, 'id' | 'createdAt' | 'status'>) => {
    const appId = `app-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    const newApp: TrainingApplication = {
      ...newAppData,
      id: appId,
      status: 'submitted',
      createdAt: new Date().toISOString()
    };
    try {
      await setDoc(doc(db, 'academy_applications', appId), newApp);
    } catch (error) {
      console.error("Error saving training app:", error);
    }
  };

  // Status updates & edits inside admin workspace (directly in Firestore)
  const handleUpdateBookingStatus = async (id: string, status: BookingInquiry['status']) => {
    try {
      await updateDoc(doc(db, 'bookings', id), { status });
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  const handleUpdateApplicationStatus = async (id: string, status: TrainingApplication['status']) => {
    try {
      await updateDoc(doc(db, 'academy_applications', id), { status });
    } catch (error) {
      console.error("Error updating application status:", error);
    }
  };

  const handleDeleteBooking = async (id: string) => {
    if (confirm('Are you sure you want to delete this placement inquiry record?')) {
      try {
        await deleteDoc(doc(db, 'bookings', id));
      } catch (error) {
        console.error("Error deleting booking:", error);
      }
    }
  };

  const handleDeleteApplication = async (id: string) => {
    if (confirm('Are you sure you want to delete this academy application record?')) {
      try {
        await deleteDoc(doc(db, 'academy_applications', id));
      } catch (error) {
        console.error("Error deleting application:", error);
      }
    }
  };

  const handleResetData = async () => {
    if (confirm('Do you want to restore default demonstrative leads and applications in Firestore?')) {
      try {
        const bookingsSnaps = await getDocs(collection(db, 'bookings'));
        const batch1 = writeBatch(db);
        bookingsSnaps.forEach((docSnap) => {
          batch1.delete(docSnap.ref);
        });
        INITIAL_BOOKINGS.forEach((item) => {
          const docRef = doc(db, 'bookings', item.id);
          batch1.set(docRef, item);
        });
        await batch1.commit();

        const appsSnaps = await getDocs(collection(db, 'academy_applications'));
        const batch2 = writeBatch(db);
        appsSnaps.forEach((docSnap) => {
          batch2.delete(docSnap.ref);
        });
        INITIAL_APPLICATIONS.forEach((item) => {
          const docRef = doc(db, 'academy_applications', item.id);
          batch2.set(docRef, item);
        });
        await batch2.commit();
      } catch (error) {
        console.error("Error resetting data:", error);
      }
    }
  };


  const scrollToBookingForm = () => {
    const section = document.getElementById('booking-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleServiceClickFromPillar = (service: ServiceType) => {
    setSelectedServiceId(service);
    scrollToBookingForm();
  };

  return (
    <div className="relative min-h-screen bg-white text-gray-850 font-sans selection:bg-royal-blue/15 selection:text-royal-blue overflow-x-hidden">
      
      {/* Dynamic Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onBookClick={scrollToBookingForm} 
      />

      {/* Holiday Campaign Notice Scraped from Facebook Page Campaign */}
      <div className="bg-[#FCF9F2] border-b border-[#EDE3CD] py-3.5 px-4 text-center text-xs text-slate-900 transition-colors duration-200">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 font-sans">
          <span className="inline-flex items-center gap-1.5 text-gold-dark text-[10px] uppercase tracking-[0.15em] font-extrabold">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-accent animate-pulse"></span>
            Special Announcement
          </span>
          <span className="text-slate-700 font-display text-sm italic py-0.5">
            "This holiday season, let us help you find the perfect professional, trained maid to assist with your household needs."
          </span>
          <button 
            onClick={scrollToBookingForm}
            className="text-royal-blue hover:text-[#0f172a] text-[10px] uppercase tracking-widest font-black underline decoration-1 underline-offset-4 transition"
          >
            Hire a Helper &rarr;
          </button>
        </div>
      </div>

      {/* Screen Views rendering */}
      <main>
        <AnimatePresence mode="wait">
          {activeTab === 'landing' && (
            <motion.div
              key="landing-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Hero Banner Component */}
              <Hero 
                onBookClick={scrollToBookingForm} 
                onAcademyClick={() => {
                  setActiveTab('academy');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />

              {/* Social Proof Gallery — From Our Facebook */}
              <section className="bg-white py-12 border-b border-slate-100">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-wrap items-center justify-center gap-6">
                    <img
                      src="/src/assets/images/467776379_578844414509442_3209053998752476031_n.jpg"
                      alt="Smart Maids ZW Facebook post"
                      className="h-20 w-20 rounded-xl object-cover shadow-sm border border-slate-200 hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <img
                      src="/src/assets/images/483103368_656929590034257_4554107601167840866_n.jpg"
                      alt="Smart Maids ZW Facebook post"
                      className="h-32 w-32 rounded-xl object-cover shadow-sm border border-slate-200 hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <img
                      src="/src/assets/images/484032934_657515429975673_1079432024744908613_n.jpg"
                      alt="Smart Maids ZW Facebook post"
                      className="h-32 w-32 rounded-xl object-cover shadow-sm border border-slate-200 hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="text-center">
                      <p className="font-sans text-[10px] font-bold text-royal-blue uppercase tracking-widest">
                        Follow us on Facebook
                      </p>
                      <p className="font-sans text-[11px] text-slate-500">@smartmaidszw</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Three Pillars Services */}
              <Services onServiceSelect={handleServiceClickFromPillar} />

              {/* Special Why Choose Us comparison / Value Props */}
              <section className="bg-white py-20 lg:py-28 border-b border-slate-100">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 text-amber-800 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-4 border border-amber-200">
                      The Smart Maids Upgrade
                    </span>
                    <h2 className="font-display text-4xl sm:text-5xl font-light text-slate-900 uppercase tracking-tight">
                      Standard Matching <span className="font-display italic font-semibold text-royal-blue">vs.</span> Smart Maids
                    </h2>
                    <p className="font-sans text-xs text-slate-500 font-light leading-relaxed max-w-lg mx-auto">
                      See why Zimbabwean households, high-profile officials, and leading real estate founders trust our elite graduates over informal helpers.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                    
                    {/* Independent Hiring */}
                    <div className="border border-slate-200/80 bg-slate-50 rounded-2xl p-8 space-y-6">
                      <div className="flex items-center space-x-3 text-slate-500">
                        <Users className="h-6 w-6" />
                        <h3 className="font-display font-bold text-lg text-slate-700">Traditional Independent Sourcing</h3>
                      </div>
                      <p className="font-sans text-xs text-slate-500 font-light leading-relaxed">
                        Hiring unverified domestic help from newspapers, Facebook public threads, or informal agents carries critical unseen risks in the Harare/Bulawayo markets.
                      </p>
                      
                      <ul className="space-y-4 text-xs font-sans text-slate-600 border-t border-slate-200/50 pt-6">
                        <li className="flex items-start">
                          <span className="text-rose-500 font-bold mr-2">✗</span>
                          <span><strong>Zero security checks:</strong> No verified criminal background search, reference vetting, or national database biometric file.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-rose-500 font-bold mr-2">✗</span>
                          <span><strong>Lack of training:</strong> Helper works based on guesswork. Unsanitary chemical usage on precious surfaces or delicate laundry tears.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-rose-500 font-bold mr-2">✗</span>
                          <span><strong>Zero emergency response capability:</strong> Small child starts choking or fire breaks out; helper has no formal pediatric first-aid certification.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-rose-500 font-bold mr-2">✗</span>
                          <span><strong>Unannounced departures:</strong> Helper decides to leave with no Replacement option, disrupting your entire corporate work routing.</span>
                        </li>
                      </ul>
                    </div>

                    {/* Smart Maids ZW Standard */}
                    <div className="border border-gold-accent bg-[#FCF9F2] rounded-3xl p-8 space-y-6 relative overflow-hidden shadow-2xl shadow-gold-100/30">
                      <div className="absolute top-0 right-0 bg-gold-accent text-white font-mono text-[9px] font-extrabold tracking-widest px-3 py-1.5 uppercase rounded-bl-xl">
                        Elite Protocol
                      </div>

                      <div className="flex items-center space-x-3 text-royal-blue">
                        <CheckCircle className="h-5 w-5" />
                        <h3 className="font-display font-bold text-lg text-slate-900">Smart Maids ZW Protocol</h3>
                      </div>
                      <p className="font-sans text-xs text-slate-700 font-light leading-relaxed">
                        An elite ecosystem where career dignity meets precision domestic service. We vet meticulously and train systematically.
                      </p>

                      <ul className="space-y-3.5 text-xs font-sans text-slate-800 border-t border-royal-blue/10 pt-6">
                        <li className="flex items-start">
                          <span className="text-emerald-500 font-bold mr-2">✓</span>
                          <span><strong>Supreme Vetting and Biometrics:</strong> Document validation, previous employers interviewed twice, and official national ID file securely registered.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-emerald-500 font-bold mr-2">✓</span>
                          <span><strong>Comprehensive Academy Degrees:</strong> Grads certified in Housekeeping, Culinary health, and Pediatric safety at our Zimbabwe campus.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-emerald-500 font-bold mr-2">✓</span>
                          <span><strong>Emergency Ready &amp; Responsive:</strong> Highly trained first-aid response systems, emergency alarm understanding, and household boundary etiquette.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-emerald-500 font-bold mr-2">✓</span>
                          <span><strong>30-Day Matching Safety net:</strong> Free placement replacements if expectations diverge. Full continuous support during active employment.</span>
                        </li>
                      </ul>
                    </div>

                  </div>
                </div>
              </section>

              {/* B2C Career Program Intro Pitch Callout */}
              <section className="bg-slate-50 py-16 border-b border-slate-100 relative overflow-hidden">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="rounded-3xl bg-slate-950 border border-slate-850 p-8 sm:p-14 text-white relative">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_120%,rgba(197,160,89,0.12),transparent)]"></div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
                      
                      <div className="lg:col-span-8 space-y-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 text-gold-accent rounded-full text-[9px] font-bold uppercase tracking-[0.15em] border border-white/10">
                          Career Empowerment (B2C)
                        </span>
                        <h3 className="font-display text-3xl sm:text-4xl font-light uppercase tracking-tight leading-tight">
                          AVOID UNEMPLOYMENT. START A <span className="font-display italic font-semibold text-gold-accent">CERTIFIED MAID CAREER.</span>
                        </h3>
                        <p className="font-sans text-xs text-neutral-400 leading-relaxed font-light">
                          Our comprehensive training program empowers individuals with professional skills. Take control of your career path. Upon graduation, we secure immediate placement interviews with pre-screened employer households looking for the best in Zimbabwe.
                        </p>
                      </div>

                      <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col justify-center gap-4 text-center">
                        <button
                          id="landing-apply-training-cta"
                          onClick={() => {
                            setActiveTab('academy');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="rounded-full bg-gold-accent hover:bg-gold-dark text-slate-950 px-6 py-3.5 font-sans font-bold text-xs uppercase tracking-widest transition duration-240 active:scale-98 shadow-lg shadow-gold-500/10"
                        >
                          Enroll in Academy
                        </button>
                        <a
                          href="https://wa.me/263774449860"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/10 px-6 py-3.5 font-sans font-bold text-xs uppercase tracking-widest transition duration-240 flex items-center justify-center gap-1.5"
                          id="landing-wa-academy"
                        >
                          <span>WhatsApp Admissions</span>
                        </a>
                      </div>

                    </div>
                  </div>
                </div>
              </section>

              {/* Client and Graduate Testimonials Section */}
              <Testimonials />

              {/* Booking Inquiry Placement Lead form */}
              <InteractiveBooking 
                onBookingSubmit={handleBookingSubmit} 
                selectedServiceId={selectedServiceId} 
              />
            </motion.div>
          )}

          {activeTab === 'academy' && (
            <motion.div
              key="academy-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TrainingAcademy onApplySubmit={handleApplicationSubmit} />
            </motion.div>
          )}

          {activeTab === 'admin' && (
            <motion.div
              key="admin-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AdminPortal 
                bookings={bookings}
                applications={applications}
                onUpdateBookingStatus={handleUpdateBookingStatus}
                onUpdateApplicationStatus={handleUpdateApplicationStatus}
                onDeleteBooking={handleDeleteBooking}
                onDeleteApplication={handleDeleteApplication}
                onResetData={handleResetData}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating WhatsApp API Trigger */}
      {activeTab !== 'admin' && (
        <a
          id="floating-wa-link"
          href="https://wa.me/263774449860?text=Hello%20Smart%20Maids%20ZW!%20I'm%20visiting%20your%2520website%20and%20would%20like%20to%20inquire%20about%20domestic%20helper%20placement%20services."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center h-14 w-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-2xl hover:scale-108 active:scale-95 transition-all duration-300 group"
          title="Chat with us on WhatsApp"
        >
          <span className="absolute right-16 scale-0 bg-slate-900 text-white font-sans text-[10px] font-bold py-1.5 px-3 rounded-lg shadow-md group-hover:scale-100 transition duration-200 whitespace-nowrap">
            WhatsApp Dispatch: Live
          </span>
          <MessageSquare className="h-6 w-6" />
        </a>
      )}

      {/* Footer layout */}
      <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Logo and brief info */}
            <div className="md:col-span-5 space-y-4">
              <div href="#" className="flex items-center space-x-3 cursor-pointer">
                <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-royal-blue flex items-center justify-center shadow-sm">
                  <span className="text-white font-display-modern font-black text-base">S</span>
                </div>
                <div>
                  <h4 className="font-display text-lg font-extrabold tracking-tight text-white leading-tight">
                    SMART MAIDS <span className="text-gold-accent text-xs font-mono font-bold bg-white/10 px-1 rounded ml-1">ZW</span>
                  </h4>
                  <p className="font-sans text-[10px] uppercase tracking-widest text-[#B38F1F]">
                    Expert Vetting &amp; Certified Placement
                  </p>
                </div>
              </div>

              <p className="font-sans text-xs text-slate-400 leading-relaxed font-light">
                Smart Maids ZW is Zimbabwe’s premier domestic agency specializing in training, vetting, and matching high-profile households in Harare, Bulawayo, Mutare, and Gweru with elite domestic personnel. We raise the dignity of housework.
              </p>

              <div className="flex items-center space-x-4 pt-2">
                <span className="font-serif text-[11px] text-slate-500 font-light flex items-center">
                  <MapPin className="h-3.5 w-3.5 text-royal-blue mr-1" />
                  Harare HQ: Avondale Shops Hub, Harare Office 4
                </span>
              </div>
            </div>

            {/* Quick map links */}
            <div className="md:col-span-3 space-y-3.5">
              <h4 className="font-display text-xs font-extrabold text-white uppercase tracking-widest border-l-2 border-[#B38F1F] pl-2">
                Agency Sitemap
              </h4>
              <ul className="space-y-2.5 text-xs font-sans">
                <li>
                  <button 
                    onClick={() => { setActiveTab('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                    className="hover:text-white transition"
                  >
                    Find a Helper (Employer)
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setActiveTab('academy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                    className="hover:text-white transition"
                  >
                    Academy &amp; Jobs (Job Seeker)
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setActiveTab('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                    className="hover:text-white text-amber-400 font-semibold transition flex items-center gap-1"
                  >
                    <span>Admin Leads Panel</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400"></span>
                  </button>
                </li>
                <li>
                  <a href="#services-section" className="hover:text-white transition">Three Pillars Care</a>
                </li>
              </ul>
            </div>

            {/* Local contact phone cards */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="font-display text-xs font-extrabold text-white uppercase tracking-widest border-l-2 border-[#B38F1F] pl-2">
                Zimbabwe Contact Office
              </h4>
              <div className="space-y-3 font-sans text-xs">
                
                <div className="flex items-start space-x-2.5">
                  <Phone className="h-4 w-4 text-royal-blue shrink-0 mt-0.5" />
                  <div>
                    <p className="text-slate-300 font-semibold">077 444 9860</p>
                    <p className="text-slate-400 font-light text-[11px]">+263 77 444 9860</p>
                    <p className="text-[10px] text-slate-500">Call / WhatsApp Dispatch (24/7)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5">
                  <Mail className="h-4 w-4 text-royal-blue shrink-0 mt-0.5" />
                  <div>
                    <p className="text-slate-300 font-semibold">smart.maid@outlook.com</p>
                    <p className="text-[10px] text-slate-500">Official Intake &amp; Inquiry Email</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5">
                  <span className="text-royal-blue shrink-0 font-bold ml-1 text-sm mt-[-1px]">f</span>
                  <div className="ml-1">
                    <p className="text-slate-300 font-semibold">@smartmaidszw</p>
                    <p className="text-[10px] text-slate-500">Official Facebook Platform</p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-3 rounded-xl text-[11px] leading-relaxed text-slate-400 font-light">
                  <strong>Local Harare SEO note:</strong> We are proud to serve homes in Borrowdale Brooke, Mt Pleasant, Highlands, Avondale, Hillside, Bulawayo North and across major centers.
                </div>

              </div>
            </div>

          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-sans text-slate-500">
            <p>© {new Date().getFullYear()} Smart Maids ZW Academy &amp; Placements. All Rights Reserved.</p>
            <p className="flex items-center space-x-1 mt-3 sm:mt-0">
              <span>Made with care for Harare &amp; Bulawayo households</span>
              <Heart className="h-3 w-3 text-red-500 fill-current" />
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}
