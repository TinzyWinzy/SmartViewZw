/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Home, Utensils, Baby, ArrowUpRight, ShieldCheck, HeartPulse } from 'lucide-react';
import { ServiceType } from '../types';

interface ServicesProps {
  onServiceSelect: (service: ServiceType) => void;
}

export default function Services({ onServiceSelect }: ServicesProps) {
  const [activePlanTab, setActivePlanTab] = useState<'daily' | 'weekly' | 'custom'>('daily');

  const servicesData = [
    {
      id: 'housekeeping' as ServiceType,
      title: 'Professional Housekeeping',
      tagline: 'Spotless Sanitation & Organized Splendor',
      icon: Home,
      color: 'text-royal-blue bg-royal-light border-royal-blue/20',
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
      description: 'Your child’s growth in safe hands. Nannies are pediatric emergency-trained and practice positive reinforcement, educational sensory-play and developmental pacing.',
      bullets: [
        'Infant bottle sanitation, feeding routines & diaper-change logs',
        'Pediatric first aid: choking, thermal, and injury responses',
        'Age-appropriate cognitive puzzles, sensory play & storytelling',
        'Primary school homework tutoring & routine school-run checks',
        'Behavior coaching, boundary guidance & secure bedroom safety'
      ]
    }
  ];

  return (
    <div id="services-section" className="bg-white py-20 lg:py-28 border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-royal-light text-royal-blue rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-4 border border-royal-blue/10">
            <div className="w-1.5 h-1.5 bg-royal-blue rounded-full animate-ping"></div>
            Our Elite Pillars
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-light text-slate-900 uppercase tracking-tight">
            Domestic Excellence <span className="font-display italic font-semibold text-royal-blue">Redefined</span>
          </h2>
          <p className="font-sans text-sm text-slate-550 font-light leading-relaxed max-w-2xl mx-auto">
            Unlike traditional agency matching services, our helpers graduate with targeted, verified skills. Choose an individual specialized in a single pillar or request comprehensive multi-role capability.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesData.map((service, idx) => {
            const IconComp = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="flex flex-col rounded-2xl border border-slate-100 bg-slate-50 p-8 shadow-sm transition-all duration-300 hover:shadow-2xl hover:bg-white hover:border-royal-blue/10 group"
              >
                {/* Icon Circle */}
                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl border ${service.color} mb-6 transition duration-305 group-hover:scale-110`}>
                  <IconComp className="h-6 w-6" />
                </div>

                {/* Service Metadata */}
                <span className="font-sans text-[10px] font-bold text-royal-blue tracking-widest uppercase mb-1">
                  {service.tagline}
                </span>
                <h3 className="font-display text-2xl font-bold text-slate-900 group-hover:text-royal-blue transition">
                  {service.title}
                </h3>

                <p className="font-sans text-xs text-slate-500 mt-4 leading-relaxed font-light">
                  {service.description}
                </p>

                {/* Bullets */}
                <ul className="mt-6 space-y-3 flex-grow border-t border-slate-200/50 pt-6">
                  {service.bullets.map((bullet, bulletIdx) => (
                    <li key={bulletIdx} className="flex items-start space-x-2 text-xs text-slate-700 font-sans leading-tight">
                      <CheckCircle2 className="h-4 w-4 text-royal-blue shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Instant CTA */}
                <button
                  id={`select-service-${service.id}`}
                  onClick={() => onServiceSelect(service.id)}
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 px-4 py-3.5 font-sans text-xs font-bold uppercase tracking-widest text-white shadow-lg transition duration-200"
                >
                  <span>Select {service.title.split(' ')[1]} Specialist</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Timeline Tabs - How we secure the standard */}
        <div className="mt-20 bg-slate-50 rounded-2xl border border-slate-100 p-8 md:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] border border-amber-200">
                Rigorous Execution Pacing
              </span>
              <h3 className="font-display text-3xl font-light text-slate-900 leading-[1.1] uppercase tracking-tight">
                How Our Placements <br/>
                <span className="font-display italic font-semibold text-royal-blue">Operationalize</span> <br/>
                In Your Home
              </h3>
              <p className="font-sans text-xs text-slate-500 font-light leading-relaxed">
                We believe in structured care, not guesswork. At placement, our manager facilitates the creation of a rigid blueprint matching your household routine.
              </p>

              {/* Tab Toggles */}
              <div className="flex rounded-full bg-slate-200 p-1 space-x-1 max-w-sm">
                {(['daily', 'weekly', 'custom'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActivePlanTab(tab)}
                    className={`flex-1 py-2 rounded-full text-[10px] font-bold text-center uppercase tracking-widest transition ${
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

            {/* Tab Descriptions content */}
            <div className="lg:col-span-7 bg-white rounded-xl p-8 border border-slate-100 min-h-[220px] flex flex-col justify-between shadow-xl shadow-slate-100">
              {activePlanTab === 'daily' && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-emerald-600 font-semibold font-display text-sm">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Representative Daily Task Checklist</span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans text-gray-600">
                    <li>🌅 <strong>07:00 AM:</strong> Complete dynamic ventilated sweep &amp; kitchen sanitation checks</li>
                    <li>🍳 <strong>08:30 AM:</strong> Clean cooking &amp; prep, serve bespoke breakfast items</li>
                    <li>🧺 <strong>10:30 AM:</strong> Laundry loading, fabric sorting, and pressing routines</li>
                    <li>👶 <strong>12:30 PM:</strong> Childcare lunch feeding, educational games &amp; afternoon sleep routine</li>
                    <li>📂 <strong>03:00 PM:</strong> Interior dusting, deep-vacuuming &amp; surface wipe checks</li>
                    <li>🥘 <strong>06:00 PM:</strong> Dinner culinary preparation, dishwashing &amp; lockup checklist</li>
                  </ul>
                </div>
              )}

              {activePlanTab === 'weekly' && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-emerald-600 font-semibold font-display text-sm">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Representative Weekly Care Checklist</span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans text-gray-600">
                    <li>🛏️ <strong>Mondays:</strong> General bedding stripped, sheet changes &amp; window treatment</li>
                    <li>🔬 <strong>Tuesdays:</strong> Comprehensive refrigerator scrub down &amp; expired food log check</li>
                    <li>🚪 <strong>Wednesdays:</strong> Main outdoor patio swept, metal polish &amp; gate wiping</li>
                    <li>🧥 <strong>Thursdays:</strong> Deep laundry press, dry-cleaning sorting &amp; storage</li>
                    <li>🛍️ <strong>Fridays:</strong> Grocery inventory checklist &amp; menu plan updates for next week</li>
                    <li>🧹 <strong>Saturdays:</strong> Intensive bathroom grout sanitization &amp; drain clearing</li>
                  </ul>
                </div>
              )}

              {activePlanTab === 'custom' && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-emerald-600 font-semibold font-display text-sm">
                    <HeartPulse className="h-4 w-4" />
                    <span>Custom Blueprints Tailored by Our Agency</span>
                  </div>
                  <p className="font-sans text-xs text-gray-600 leading-relaxed">
                    Every household in Harare is unique. We do not apply a rigid one-size-fits-all model. On day one of placement, a Smart Maids representative schedules a meeting inside your home to build a customized daily task workflow calendar.
                  </p>
                  <ul className="text-xs font-sans text-gray-500 space-y-1.5 list-disc pl-4">
                    <li>Accommodation of active work hours, toddler nursing routines, and children’s school transport pickup</li>
                    <li>Adaptation of custom dietary instructions (halal, diabetic recipes, allergy security)</li>
                    <li>Specific electronic home security and lockup schedules</li>
                  </ul>
                </div>
              )}

              <div className="border-t border-gray-200 mt-4 pt-3 text-[11px] font-mono text-gray-500 flex items-center justify-between">
                <span>Vetted Audits Conducted Regularly</span>
                <span className="text-royal-blue font-bold">Smart Maids ZW Standard</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
