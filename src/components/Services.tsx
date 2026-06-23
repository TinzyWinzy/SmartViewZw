import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Home, Utensils, Baby, ArrowUpRight, ShieldCheck, HeartPulse } from 'lucide-react';
import { ServiceType } from '../types';

interface ServicesProps {
  onServiceSelect: (service: ServiceType) => void;
}

function useRevealOnScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, revealed };
}

const servicesData = [
  {
    id: 'housekeeping' as ServiceType,
    title: 'Professional Housekeeping',
    tagline: 'Spotless Sanitation & Organized Splendor',
    icon: Home,
    color: 'text-royal-blue bg-royal-pale border-royal-blue/20',
    description: 'Your home managed like a luxury hotel. Our housekeepers are trained in delicate garment laundry, surface material chemical specifications, and thorough organization.',
    bullets: [
      'Advanced surface sterilization & floor polish systems',
      'Expert laundry, garment press & delicate fabric management',
      'Wardrobe sorting, categorization & modern folding layouts',
      'Appliances care: smart ovens, refrigerators & laundry machines',
      'Deep kitchen & bathroom deep-clean sanitation schedules'
    ]
  },
  {
    id: 'cooking' as ServiceType,
    title: 'Culinary & Meal Prep',
    tagline: 'Nutritious Dishes & Pristine Kitchen Safety',
    icon: Utensils,
    color: 'text-amber-700 bg-amber-50 border-amber-200',
    description: 'Healthy, fresh, and meticulously served. Helpers understand caloric planning, dietary restrictions, and kitchen cleanliness, serving traditional and continental favorites.',
    bullets: [
      'Meal planning customized to diet preferences (organic, low-sugar)',
      'Zimbabwean & modern contemporary family recipe mastery',
      'Strict hygiene: hazard checks & surface decontamination',
      'Bulk cooking, preservation, portioning & refrigeration',
      'Grocery list management, budget planning & fresh market trips'
    ]
  },
  {
    id: 'childcare' as ServiceType,
    title: 'Child Minding & Development',
    tagline: 'Nurturing Play, Safety & Homework Coaching',
    icon: Baby,
    color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    description: 'Your child\'s growth in safe hands. Nannies are pediatric emergency-trained and practice positive reinforcement, educational sensory-play and developmental pacing.',
    bullets: [
      'Infant bottle sanitation, feeding routines & diaper-change logs',
      'Pediatric first aid: choking, thermal, and injury responses',
      'Age-appropriate cognitive puzzles, sensory play & storytelling',
      'Primary school homework tutoring & routine school-run checks',
      'Behavior coaching, boundary guidance & secure bedroom safety'
    ]
  }
];

export default function Services({ onServiceSelect }: ServicesProps) {
  const [activePlanTab, setActivePlanTab] = useState<'daily' | 'weekly' | 'custom'>('daily');
  const sectionRef = useRef<HTMLDivElement>(null);
  const [sectionRevealed, setSectionRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setSectionRevealed(true); observer.disconnect(); } },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div id="services-section" className="bg-white py-24 lg:py-32 border-b border-slate-100" ref={sectionRef}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={sectionRevealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20 space-y-5"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-royal-pale text-royal-deeper rounded-full text-[10px] font-bold uppercase tracking-[0.2em] border border-royal-blue/10">
            <span className="w-1.5 h-1.5 rounded-full bg-royal-blue animate-pulse" />
            Our Elite Pillars
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-light text-slate-900 uppercase tracking-tight text-balance">
            Domestic Excellence <span className="italic font-semibold text-royal-blue">Redefined</span>
          </h2>
          <p className="font-sans text-sm text-slate-500 font-light leading-relaxed max-w-2xl mx-auto text-pretty">
            Unlike traditional agency matching services, our helpers graduate with targeted, verified skills. Choose an individual specialized in a single pillar or request comprehensive multi-role capability.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesData.map((service, idx) => {
            const IconComp = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={sectionRevealed ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="group flex flex-col rounded-2xl border border-slate-200/60 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-slate-900/5 hover:border-royal-blue/15 hover:-translate-y-1"
              >
                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl border ${service.color} mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  <IconComp className="h-6 w-6" />
                </div>

                <span className="font-sans text-[10px] font-bold text-royal-blue tracking-widest uppercase mb-1">
                  {service.tagline}
                </span>
                <h3 className="font-display text-2xl font-bold text-slate-900 group-hover:text-royal-blue transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="font-sans text-xs text-slate-500 mt-4 leading-relaxed font-light">
                  {service.description}
                </p>

                <ul className="mt-6 space-y-3 flex-grow border-t border-slate-100 pt-6">
                  {service.bullets.map((bullet, bulletIdx) => (
                    <li key={bulletIdx} className="flex items-start gap-2.5 text-xs text-slate-700 font-sans leading-snug">
                      <CheckCircle2 className="h-4 w-4 text-royal-blue shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <button
                  id={`select-service-${service.id}`}
                  onClick={() => onServiceSelect(service.id)}
                  className="group/btn mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 px-4 py-3.5 font-sans text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-slate-900/10 transition-all duration-200 hover:shadow-xl active:scale-[0.98] overflow-hidden relative"
                >
                  <span className="relative z-10">Select {service.title.split(' ')[1]} Specialist</span>
                  <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                </button>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={sectionRevealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24 bg-slate-50 rounded-2xl border border-slate-200/60 p-8 md:p-12 shadow-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] border border-amber-200">
                Rigorous Execution Pacing
              </span>
              <h3 className="font-display text-3xl font-light text-slate-900 leading-[1.1] uppercase tracking-tight">
                How Our Placements <br/>
                <span className="italic font-semibold text-royal-blue">Operationalize</span> <br/>
                In Your Home
              </h3>
              <p className="font-sans text-xs text-slate-500 font-light leading-relaxed">
                We believe in structured care, not guesswork. At placement, our manager facilitates the creation of a rigid blueprint matching your household routine.
              </p>

              <div className="flex rounded-full bg-slate-200 p-1 space-x-1 max-w-sm">
                {(['daily', 'weekly', 'custom'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActivePlanTab(tab)}
                    className={`flex-1 py-2 rounded-full text-[10px] font-bold text-center uppercase tracking-widest transition-all duration-200 ${
                      activePlanTab === tab
                        ? 'bg-royal-blue text-white shadow-md'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 bg-white rounded-xl p-8 border border-slate-100 min-h-[240px] flex flex-col justify-between shadow-lg shadow-slate-900/5">
              {activePlanTab === 'daily' && (
                <div className="space-y-4 animate-fade-in-up">
                  <div className="flex items-center gap-2 text-emerald-600 font-semibold font-display text-sm">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Representative Daily Task Checklist</span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans text-gray-600">
                    <li><strong className="text-slate-900">07:00 AM:</strong> Dynamic ventilated sweep & kitchen sanitation</li>
                    <li><strong className="text-slate-900">08:30 AM:</strong> Clean cooking & prep, serve bespoke breakfast</li>
                    <li><strong className="text-slate-900">10:30 AM:</strong> Laundry loading, fabric sorting, pressing</li>
                    <li><strong className="text-slate-900">12:30 PM:</strong> Childcare feeding, educational games & nap</li>
                    <li><strong className="text-slate-900">03:00 PM:</strong> Interior dusting, deep-vacuuming & wipe checks</li>
                    <li><strong className="text-slate-900">06:00 PM:</strong> Dinner prep, dishwashing & lockup checklist</li>
                  </ul>
                </div>
              )}

              {activePlanTab === 'weekly' && (
                <div className="space-y-4 animate-fade-in-up">
                  <div className="flex items-center gap-2 text-emerald-600 font-semibold font-display text-sm">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Representative Weekly Care Checklist</span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans text-gray-600">
                    <li><strong className="text-slate-900">Mondays:</strong> Bedding stripped, sheet changes & window treatment</li>
                    <li><strong className="text-slate-900">Tuesdays:</strong> Refrigerator scrub & expired food check</li>
                    <li><strong className="text-slate-900">Wednesdays:</strong> Outdoor patio swept, metal polish & gate wipe</li>
                    <li><strong className="text-slate-900">Thursdays:</strong> Deep laundry press, dry-cleaning sorting</li>
                    <li><strong className="text-slate-900">Fridays:</strong> Grocery inventory & menu plan updates</li>
                    <li><strong className="text-slate-900">Saturdays:</strong> Bathroom grout sanitization & drain clearing</li>
                  </ul>
                </div>
              )}

              {activePlanTab === 'custom' && (
                <div className="space-y-4 animate-fade-in-up">
                  <div className="flex items-center gap-2 text-emerald-600 font-semibold font-display text-sm">
                    <HeartPulse className="h-4 w-4" />
                    <span>Custom Blueprints Tailored by Our Agency</span>
                  </div>
                  <p className="font-sans text-xs text-gray-600 leading-relaxed">
                    Every household in Harare is unique. On day one of placement, a Smart Maids representative schedules a meeting inside your home to build a customized daily task workflow calendar.
                  </p>
                  <ul className="text-xs font-sans text-gray-500 space-y-1.5 list-disc pl-4">
                    <li>Accommodation of work hours, toddler routines, and school transport</li>
                    <li>Adaptation of custom dietary instructions (halal, diabetic, allergy)</li>
                    <li>Electronic home security and lockup schedules</li>
                  </ul>
                </div>
              )}

              <div className="border-t border-gray-200 mt-4 pt-3 text-[11px] font-mono text-gray-400 flex items-center justify-between">
                <span>Vetted Audits Conducted Regularly</span>
                <span className="text-royal-blue font-semibold">Smart Maids ZW Standard</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
