/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookingInquiry, TrainingApplication } from '../types';
import { ACADEMY_COURSES } from '../data';
import { 
  Users, Users2, Filter, Search, Award, ShieldAlert, CheckCircle2, 
  Trash2, Mail, Phone, Calendar, Download, RefreshCw
} from 'lucide-react';

interface AdminPortalProps {
  bookings: BookingInquiry[];
  applications: TrainingApplication[];
  onUpdateBookingStatus: (id: string, status: BookingInquiry['status']) => void;
  onUpdateApplicationStatus: (id: string, status: TrainingApplication['status']) => void;
  onDeleteBooking: (id: string) => void;
  onDeleteApplication: (id: string) => void;
  onResetData: () => void;
}

export default function AdminPortal({
  bookings,
  applications,
  onUpdateBookingStatus,
  onUpdateApplicationStatus,
  onDeleteBooking,
  onDeleteApplication,
  onResetData
}: AdminPortalProps) {
  const [activeTab, setActiveTab] = useState<'bookings' | 'applications'>('bookings');
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Locations set
  const extractedLocations = Array.from(new Set([
    ...bookings.map(b => b.location.split('(')[0].trim()),
    ...applications.map(a => a.location.split('(')[0].trim())
  ]));

  // Booking Filtering
  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.clientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.phone.includes(searchQuery);
    const matchesLoc = locationFilter === 'All' || b.location.startsWith(locationFilter);
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchesSearch && matchesLoc && matchesStatus;
  });

  // Applications Filtering
  const filteredApplications = applications.filter(a => {
    const matchesSearch = a.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          a.nationalId.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          a.phone.includes(searchQuery);
    const matchesLoc = locationFilter === 'All' || a.location.startsWith(locationFilter);
    const matchesStatus = statusFilter === 'All' || a.status === statusFilter;
    return matchesSearch && matchesLoc && matchesStatus;
  });

  const getCourseTitle = (id: string) => {
    return ACADEMY_COURSES.find(c => c.id === id)?.title || 'Custom Study Way';
  };

  const exportCSV = (type: 'bookings' | 'applications') => {
    let headers = '';
    let rows = '';

    if (type === 'bookings') {
      headers = 'Client Name,Email,Phone,Location,Service Requested,Schedule,Status,Date\n';
      rows = bookings.map(b => 
        `"${b.clientName}","${b.email}","${b.phone}","${b.location}","${b.serviceNeeded}","${b.frequency}","${b.status}","${b.createdAt}"`
      ).join('\n');
    } else {
      headers = 'Applicant Name,ID Number,Gender,Age,Phone,Location,Course Enrolled,Status,Date\n';
      rows = applications.map(a => 
        `"${a.applicantName}","${a.nationalId}","${a.gender}",${a.age},"${a.phone}","${a.location}","${getCourseTitle(a.selectedCourseId)}","${a.status}","${a.createdAt}"`
      ).join('\n');
    }

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `smartmaids_zw_${type}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="admin-workspace" className="bg-slate-50 min-h-screen py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Workspace banner */}
        <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] border border-amber-200">
              Agency HQ Workspace
            </span>
            <h2 className="font-display text-4xl font-light text-slate-900 uppercase tracking-tight">
              Leads <span className="font-display italic font-semibold text-royal-blue">Manager</span>
            </h2>
            <p className="font-sans text-xs text-slate-500 font-light max-w-lg leading-relaxed">
              Demonstrates real React State persistence. View bookings lodged by employers and Academy applications registered.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              id="admin-reset-data"
              onClick={onResetData}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 transition"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Load Seed Data</span>
            </button>
            <button
              id={`export-csv-${activeTab}`}
              onClick={() => exportCSV(activeTab)}
              className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition shadow-md"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export {activeTab === 'bookings' ? 'Inquiries' : 'Enrollees'}</span>
            </button>
          </div>
        </div>

        {/* Counter cards bento */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-display text-xs text-gray-500 uppercase font-semibold">Employer Inquiries</p>
                <h3 className="font-display text-3xl font-extrabold text-gray-900 mt-2">{bookings.length}</h3>
              </div>
              <div className="p-3 bg-royal-light rounded-xl text-royal-blue shrink-0">
                <Users className="h-6 w-6" />
              </div>
            </div>
            <p className="font-sans text-[10px] text-gray-500 mt-3 flex items-center gap-1">
              <span className="text-emerald-500 font-bold">✓ Active</span>
              <span>Needs matched dispatcher callbacks</span>
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-display text-xs text-gray-500 uppercase font-semibold">Academy applicants</p>
                <h3 className="font-display text-3xl font-extrabold text-gray-900 mt-2">{applications.length}</h3>
              </div>
              <div className="p-3 bg-amber-50 rounded-xl text-amber-600 shrink-0">
                <Award className="h-6 w-6" />
              </div>
            </div>
            <p className="font-sans text-[10px] text-gray-500 mt-3 flex items-center gap-1">
              <span className="text-amber-600 font-bold">Intake Open</span>
              <span>Screening interviews scheduled</span>
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-display text-xs text-gray-500 uppercase font-semibold">Pending Review</p>
                <h3 className="font-display text-3xl font-extrabold text-amber-600 mt-2">
                  {bookings.filter(b => b.status === 'pending').length + applications.filter(a => a.status === 'submitted').length}
                </h3>
              </div>
              <div className="p-3 bg-rose-50 rounded-xl text-rose-600 shrink-0">
                <ShieldAlert className="h-6 w-6" />
              </div>
            </div>
            <p className="font-sans text-[10px] text-gray-500 mt-3">Requires priority contact dialing</p>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-display text-xs text-gray-500 uppercase font-semibold">Placements matched</p>
                <h3 className="font-display text-3xl font-extrabold text-emerald-600 mt-2">
                  {bookings.filter(b => b.status === 'matched').length + applications.filter(a => a.status === 'completed').length}
                </h3>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 shrink-0">
                <CheckCircle2 className="h-6 w-6" />
              </div>
            </div>
            <p className="font-sans text-[10px] text-gray-500 mt-3">Employment contracts finalized!</p>
          </div>

        </div>

        {/* Workspace controls */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-6">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            
            {/* View selectors */}
            <div className="flex rounded-xl bg-slate-100 p-1 space-x-1 w-full md:w-auto">
              <button
                id="tab-bookings"
                onClick={() => {
                  setActiveTab('bookings');
                  setStatusFilter('All');
                }}
                className={`flex-1 md:flex-initial px-6 py-2 rounded-lg text-xs font-bold font-sans uppercase tracking-wider transition ${
                  activeTab === 'bookings'
                    ? 'bg-white text-royal-blue shadow-sm'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                Employer Placements ({bookings.length})
              </button>
              <button
                id="tab-applications"
                onClick={() => {
                  setActiveTab('applications');
                  setStatusFilter('All');
                }}
                className={`flex-1 md:flex-initial px-6 py-2 rounded-lg text-xs font-bold font-sans uppercase tracking-wider transition ${
                  activeTab === 'applications'
                    ? 'bg-white text-royal-blue shadow-sm'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                Academy Applicants ({applications.length})
              </button>
            </div>

            {/* Searching */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              
              <div className="relative flex-grow sm:w-64">
                <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  id="admin-search-field"
                  type="text"
                  placeholder="Query profiles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2.5 w-full rounded-xl border border-slate-200 font-sans text-xs focus:outline-none focus:border-royal-blue"
                />
              </div>

              {/* Location selection */}
              <div className="relative">
                <select
                  id="admin-loc-filter"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-sans text-xs focus:outline-none focus:border-royal-blue w-full sm:w-auto"
                >
                  <option value="All">All Locations</option>
                  {extractedLocations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              {/* Status selection */}
              <div className="relative">
                <select
                  id="admin-status-filter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-sans text-xs focus:outline-none focus:border-royal-blue w-full sm:w-auto"
                >
                  <option value="All">All Statuses</option>
                  {activeTab === 'bookings' ? (
                    <>
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="matched">Matched</option>
                      <option value="archived">Archived</option>
                    </>
                  ) : (
                    <>
                      <option value="submitted">Submitted</option>
                      <option value="interviewing">Interviewing</option>
                      <option value="enrolled">Enrolled</option>
                      <option value="completed">Completed</option>
                      <option value="rejected">Rejected</option>
                    </>
                  )}
                </select>
              </div>

            </div>

          </div>

          {/* List display */}
          <div className="overflow-x-auto border border-slate-200/50 rounded-2xl bg-white max-h-[500px]">
            {activeTab === 'bookings' ? (
              <table id="tbl-bookings" className="w-full text-left border-collapse font-sans text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 font-semibold text-slate-600 uppercase tracking-wider text-[10px]">
                    <th className="p-4">Client / Contact</th>
                    <th className="p-4">Service &amp; Schedule</th>
                    <th className="p-4">Location</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Date Sub</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-400 italic">
                        No employer inquiries matched this configuration. Try dialing in seed data!
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-50/50 transition">
                        <td className="p-4">
                          <div className="font-bold text-gray-900">{b.clientName}</div>
                          <div className="text-gray-500 font-light flex items-center space-x-1.5 mt-0.5">
                            <Mail className="h-3 w-3 shrink-0" /> <span className="mr-2">{b.email}</span>
                            <Phone className="h-3 w-3 shrink-0" /> <span>{b.phone}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="font-semibold text-royal-blue bg-royal-light rounded px-2 py-0.5 border border-royal-blue/10 capitalize">
                            {b.serviceNeeded}
                          </span>
                          <span className="text-gray-500 block mt-1">
                            {b.frequency.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="p-4 text-gray-800 font-medium">
                          {b.location}
                        </td>
                        <td className="p-4">
                          <select
                            value={b.status}
                            onChange={(e) => onUpdateBookingStatus(b.id, e.target.value as any)}
                            className={`px-2.5 py-1 rounded-lg border font-bold text-[10px] uppercase font-mono bg-white focus:outline-none ${
                              b.status === 'pending' ? 'text-amber-800 border-amber-300 bg-amber-50' :
                              b.status === 'reviewed' ? 'text-teal-800 border-teal-300 bg-teal-50' :
                              b.status === 'matched' ? 'text-emerald-800 border-emerald-300 bg-emerald-50' :
                              'text-slate-700 border-slate-300 bg-slate-100'
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="matched">Matched</option>
                            <option value="archived">Archived</option>
                          </select>
                        </td>
                        <td className="p-4 text-gray-400 font-mono">
                          {b.createdAt.split('T')[0]}
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => onDeleteBooking(b.id)}
                            className="p-1.5 text-slate-400 hover:text-red-500 border border-slate-100 hover:border-red-100 hover:bg-red-50 rounded-lg transition"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            ) : (
              <table id="tbl-applications" className="w-full text-left border-collapse font-sans text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 font-semibold text-slate-600 uppercase tracking-wider text-[10px]">
                    <th className="p-4">Applicant / Info</th>
                    <th className="p-4">Target Program Course</th>
                    <th className="p-4">Location</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Date Sub</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredApplications.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-400 italic">
                        No academy registrations match. Register details from the separate training portal!
                      </td>
                    </tr>
                  ) : (
                    filteredApplications.map((a) => (
                      <tr key={a.id} className="hover:bg-slate-50/50 transition">
                        <td className="p-4">
                          <div className="font-bold text-gray-900">{a.applicantName}</div>
                          <div className="text-gray-500 font-light flex items-center space-x-1.5 mt-0.5">
                            <span className="font-mono text-[10px] bg-slate-100 rounded px-1.5 py-0.5 mr-2">
                              ID: {a.nationalId}
                            </span>
                            <span>Age {a.age} • {a.gender}</span>
                          </div>
                          <div className="text-slate-500 font-medium flex items-center gap-1 mt-1">
                            <Phone className="h-3 w-3 inline text-emerald-600" />
                            <span>{a.phone}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="font-semibold text-amber-800 bg-amber-50 rounded px-2 py-0.5 border border-amber-200 block max-w-[220px] truncate">
                            {getCourseTitle(a.selectedCourseId)}
                          </span>
                        </td>
                        <td className="p-4 text-gray-800 font-medium">
                          {a.location.split('(')[0].trim()}
                        </td>
                        <td className="p-4">
                          <select
                            value={a.status}
                            onChange={(e) => onUpdateApplicationStatus(a.id, e.target.value as any)}
                            className={`px-2.5 py-1 rounded-lg border font-bold text-[10px] uppercase font-mono bg-white focus:outline-none ${
                              a.status === 'submitted' ? 'text-amber-800 border-amber-300 bg-amber-50' :
                              a.status === 'interviewing' ? 'text-cyan-800 border-cyan-300 bg-cyan-50' :
                              a.status === 'enrolled' ? 'text-teal-800 border-teal-300 bg-teal-50' :
                              a.status === 'completed' ? 'text-emerald-800 border-emerald-300 bg-emerald-50' :
                              'text-rose-800 border-rose-300 bg-rose-50'
                            }`}
                          >
                            <option value="submitted">Submitted</option>
                            <option value="interviewing">Interviewing</option>
                            <option value="enrolled">Enrolled</option>
                            <option value="completed">Completed</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </td>
                        <td className="p-4 text-gray-400 font-mono">
                          {a.createdAt.split('T')[0]}
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => onDeleteApplication(a.id)}
                            className="p-1.5 text-slate-400 hover:text-red-500 border border-slate-100 hover:border-red-100 hover:bg-red-50 rounded-lg transition"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
