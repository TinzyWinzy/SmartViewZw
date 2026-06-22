/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AcademyCourse, Testimonial } from './types';

export const ACADEMY_COURSES: AcademyCourse[] = [
  {
    id: 'sm-hb-1',
    title: 'Professional Housekeeping & Home Management',
    shortDescription: 'Master modern cleaning techniques, laundry care, fabric rules, and organizational systems.',
    fullDescription: 'Designed for professional helpers who want to deliver executive-level home care. This module transforms simple house chores into systematic home management services.',
    modules: [
      'Advanced Sanitization & Safety Protocols',
      'Laundry Management, Ironing & Delicate Garment Care',
      'Organizational Systems & Wardrobe Arranging',
      'Smart Cleaning Chemicals: Eco-safe & Surface-specific guidelines',
      'Time Management & Daily Routine Structuring'
    ],
    durationWeeks: 2,
    certification: 'Smart Maids ZW - Home Management Certificate Level 1',
    priceUSD: 45,
    placementGuarantee: true
  },
  {
    id: 'sm-cul-2',
    title: 'Culinary Masterclass & Kitchen Management',
    shortDescription: 'Learn nutrition planning, food hygiene, ingredient prep, and multi-cuisine cooking.',
    fullDescription: 'Empowers household helpers with the culinary prowess to plan, prep, and execute highly nutritious and delicious multi-course meals including traditional, healthy contemporary, and diet-specific dishes.',
    modules: [
      'Food Safety, Food Handling & Kitchen Sanitation',
      'Nutrition & Smart Meal Planning for Busy Households',
      'Prep Work (Mise En Place) & Professional Knife Skills',
      'Traditional Zimbabwean & Modern Contemporary Recipes',
      'Handling Dietary Requirements (Low Sodium, Diabetic, Gluten-Free)'
    ],
    durationWeeks: 3,
    certification: 'Smart Maids ZW - Culinary & Health Nutrition Certificate',
    priceUSD: 60,
    placementGuarantee: true
  },
  {
    id: 'sm-cm-3',
    title: 'Professional Child Minding & Pediatric Safety',
    shortDescription: 'Safe, nurturing, and professional childcare. Includes child developmental activities and emergencies.',
    fullDescription: 'Comprehensive training for helpers looking after infants, toddlers, and school-age kids. Focuses heavily on security, emergency response, behavior guiding, and sensory development activities.',
    modules: [
      'Infant Care: Feeding, Bathing, and Sleep Routines',
      'Toddler & Child Psychology & Positive Interaction',
      'First Aid: Choking prevention, Burns, Cuts, and Medical Alerts',
      'Educational Play & Sensory Development Exercises',
      'School Support & Homework Supervision Routine'
    ],
    durationWeeks: 2,
    certification: 'Smart Maids ZW - Pediatric Child Care & First-Aid Certified',
    priceUSD: 50,
    placementGuarantee: true
  },
  {
    id: 'sm-exec-4',
    title: 'Executive Comprehensive Domestic Professional',
    shortDescription: 'Combines Housekeeping, Culinary, Childcare and Professional Communication in one elite program.',
    fullDescription: 'The pinnacle of domestic helper training. Unifies all three pillars and adds executive etiquette, professional English, cross-cultural home adaptation, and conflict resolution.',
    modules: [
      'All Housekeeping, Culinary, and Childcare Foundations',
      'Professional Communication & Etiquette in Modern Households',
      'Digital Literacy & Smart Home Appliance Control',
      'Conflict Resolution & Professional Boundary Care',
      'Emergency Response Execution (Burglary, Fire, Medical, Utilities)'
    ],
    durationWeeks: 4,
    certification: 'Smart Maids ZW - Executive Domestic Master Diploma',
    priceUSD: 110,
    placementGuarantee: true
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Tendai Mapako',
    role: 'Client',
    location: 'Borrowdale, Harare',
    rating: 5,
    message: 'The housekeeping level of the maid we matched with is exceptional. She brought complete order to our chaotic home. The fact that she is professionally trained and vetted gave my family ultimate peace of mind.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    id: 't-2',
    name: 'Chipo Sibanda',
    role: 'Graduate Helper',
    location: 'Bulawayo',
    rating: 5,
    message: 'I was unemployed for two years before joining the Smart Maids training program. They gave me skills in housekeeping and culinary arts that changed everything. Within a week of graduating, I got placed with an amazing family!',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    id: 't-3',
    name: 'Farai Gumbo',
    role: 'Client',
    location: 'Glen Lorne, Harare',
    rating: 5,
    message: 'Our nanny prepared healthy meals right after her culinary training here. Our children love her and she manages emergencies meticulously. Smart Maids ZW represents an unmatched standard in Zimbabwe.',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    id: 't-4',
    name: 'Ruvimbo Mutasa',
    role: 'Graduate Helper',
    location: 'Gweru',
    rating: 5,
    message: 'The Child Minding first-aid course literally saved a life when my client’s toddler started choking. The training isn’t just about chores; it equips you with true lifesaving capabilities and boosts your confidence.',
    avatarUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=150&h=150'
  }
];

export const SERVICE_AREAS = [
  'Harare North (Borrowdale, Glen Lorne, Mt Pleasant, Marlborough)',
  'Harare East (Highlands, Greendale, Chisipite, Ruwa)',
  'Harare West (Westgate, Avondale, Belvedere)',
  'Bulawayo Central & Suburbs',
  'Gweru Urban Areas',
  'Mutare Urban Areas'
];
