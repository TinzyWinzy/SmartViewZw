/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ServiceType = 'housekeeping' | 'cooking' | 'childcare' | 'comprehensive';

export interface BookingInquiry {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  location: string; // e.g., Harare, Bulawayo, Gweru, Mutare
  serviceNeeded: ServiceType;
  frequency: 'full_time' | 'part_time' | 'live_in' | 'live_out';
  preferredLanguages: string[]; // Shona, Ndebele, English
  additionalNotes: string;
  status: 'pending' | 'reviewed' | 'matched' | 'archived';
  createdAt: string;
}

export interface TrainingApplication {
  id: string;
  applicantName: string;
  nationalId: string;
  gender: 'female' | 'male';
  age: number;
  phone: string;
  location: string;
  selectedCourseId: string;
  priorExperience: string;
  status: 'submitted' | 'interviewing' | 'enrolled' | 'completed' | 'rejected';
  createdAt: string;
}

export interface AcademyCourse {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  modules: string[];
  durationWeeks: number;
  certification: string;
  priceUSD: number;
  placementGuarantee: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: 'Client' | 'Graduate Helper';
  location: string;
  rating: number; // 1 to 5
  message: string;
  avatarUrl?: string;
}
