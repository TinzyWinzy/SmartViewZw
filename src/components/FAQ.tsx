import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'How quickly can I get a domestic helper placed?',
    a: 'Most placements are completed within 3–5 business days after inquiry. We match from our pool of pre-vetted, certified graduates across Harare, Bulawayo, Mutare, and Gweru.'
  },
  {
    q: 'What is the 30-day replacement guarantee?',
    a: 'If your placed helper does not meet expectations within the first 30 days, we provide a free replacement — no additional placement fees.'
  },
  {
    q: 'Are your helpers trained and certified?',
    a: 'Yes. Every helper graduates from our Smart Maids Academy, completing modules in housekeeping, culinary safety, childcare, and first-aid response.'
  },
  {
    q: 'What areas do you cover in Zimbabwe?',
    a: 'We serve Harare (Borrowdale, Mt Pleasant, Highlands, Avondale), Bulawayo (Hillside, North End), Mutare, Gweru, and surrounding suburbs.'
  },
  {
    q: 'How much does it cost to hire through Smart Maids ZW?',
    a: 'Placement fees vary by service type and schedule. Contact us for a tailored quote. Academy training programs start at $120 USD per course.'
  },
  {
    q: 'Can I visit your academy or office?',
    a: 'Yes. Our Harare HQ is located at Avondale Shops Hub, Office 4. Appointments are recommended — call +263 77 444 9860 to schedule.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-white py-24 lg:py-32 border-b border-slate-100" id="faq-section">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-5">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-royal-pale text-royal-deeper rounded-full text-[10px] font-bold uppercase tracking-[0.2em] border border-royal-blue/10">
            Got Questions?
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-light text-slate-900 uppercase tracking-tight">
            Frequently Asked <span className="italic font-semibold text-royal-blue">Questions</span>
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden transition-shadow duration-200 hover:shadow-sm">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-sans text-sm font-semibold text-slate-900 hover:bg-slate-50/50 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${openIndex === idx ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === idx ? 'max-h-80' : 'max-h-0'}`}>
                <p className="px-6 pb-5 font-sans text-xs text-slate-500 font-light leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
