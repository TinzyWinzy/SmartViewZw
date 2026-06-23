import React, { useState, useMemo } from 'react';
import { BookingInquiry, TrainingApplication } from '../types';
import { ACADEMY_COURSES } from '../data';
import { 
  Users, Award, ShieldAlert, CheckCircle2, Search, Trash2, Mail, Phone,
  Download, RefreshCw, ChevronUp, ChevronDown, ChevronLeft, ChevronRight,
  CheckSquare, Square
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

type SortDir = 'asc' | 'desc';
type BookingsSortKey = keyof Pick<BookingInquiry, 'clientName' | 'createdAt' | 'status' | 'location'>;
type AppsSortKey = keyof Pick<TrainingApplication, 'applicantName' | 'createdAt' | 'status' | 'location'>;

export default function AdminPortal({
  bookings, applications, onUpdateBookingStatus, onUpdateApplicationStatus,
  onDeleteBooking, onDeleteApplication, onResetData
}: AdminPortalProps) {
  const [activeTab, setActiveTab] = useState<'bookings' | 'applications'>('bookings');
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Sorting
  const [sortField, setSortField] = useState<BookingsSortKey | AppsSortKey>('createdAt');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  // Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Bulk selection
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const extractedLocations = Array.from(new Set([
    ...bookings.map(b => b.location.split('(')[0].trim()),
    ...applications.map(a => a.location.split('(')[0].trim())
  ]));

  const getCourseTitle = (id: string) => {
    return ACADEMY_COURSES.find(c => c.id === id)?.title || 'Custom Study Way';
  };

  const handleSort = (field: BookingsSortKey | AppsSortKey) => {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
    setPage(1);
  };

  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field) return null;
    return sortDir === 'asc' ? <ChevronUp className="h-3 w-3 inline ml-1" /> : <ChevronDown className="h-3 w-3 inline ml-1" />;
  };

  // Filter + sort + paginate bookings
  const { data: pagedBookings, total: totalBookings } = useMemo(() => {
    let filtered = bookings.filter(b => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = b.clientName.toLowerCase().includes(q) || b.email.toLowerCase().includes(q) || b.phone.includes(q);
      const matchesLoc = locationFilter === 'All' || b.location.startsWith(locationFilter);
      const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
      return matchesSearch && matchesLoc && matchesStatus;
    });
    filtered.sort((a, b) => {
      const dir = sortDir === 'asc' ? 1 : -1;
      const key = sortField as BookingsSortKey;
      if (key === 'createdAt') return (a.createdAt > b.createdAt ? 1 : -1) * dir;
      return (String(a[key] ?? '').localeCompare(String(b[key] ?? ''))) * dir;
    });
    const total = filtered.length;
    const start = (page - 1) * pageSize;
    return { data: filtered.slice(start, start + pageSize), total };
  }, [bookings, searchQuery, locationFilter, statusFilter, sortField, sortDir, page, pageSize]);

  // Filter + sort + paginate applications
  const { data: pagedApps, total: totalApps } = useMemo(() => {
    let filtered = applications.filter(a => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = a.applicantName.toLowerCase().includes(q) || a.nationalId.toLowerCase().includes(q) || a.phone.includes(q);
      const matchesLoc = locationFilter === 'All' || a.location.startsWith(locationFilter);
      const matchesStatus = statusFilter === 'All' || a.status === statusFilter;
      return matchesSearch && matchesLoc && matchesStatus;
    });
    filtered.sort((a, b) => {
      const dir = sortDir === 'asc' ? 1 : -1;
      const key = sortField as AppsSortKey;
      if (key === 'createdAt') return (a.createdAt > b.createdAt ? 1 : -1) * dir;
      return (String(a[key] ?? '').localeCompare(String(b[key] ?? ''))) * dir;
    });
    const total = filtered.length;
    const start = (page - 1) * pageSize;
    return { data: filtered.slice(start, start + pageSize), total };
  }, [applications, searchQuery, locationFilter, statusFilter, sortField, sortDir, page, pageSize]);

  const totalItems = activeTab === 'bookings' ? totalBookings : totalApps;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    const current = activeTab === 'bookings' ? pagedBookings : pagedApps;
    if (selectedIds.size === current.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(current.map(d => d.id)));
    }
  };

  const bulkStatusUpdate = (status: string) => {
    selectedIds.forEach(id => {
      if (activeTab === 'bookings') onUpdateBookingStatus(id, status as BookingInquiry['status']);
      else onUpdateApplicationStatus(id, status as TrainingApplication['status']);
    });
    setSelectedIds(new Set());
  };

  const bulkDelete = () => {
    if (selectedIds.size === 0 || !confirm(`Delete ${selectedIds.size} selected records?`)) return;
    selectedIds.forEach(id => {
      if (activeTab === 'bookings') onDeleteBooking(id);
      else onDeleteApplication(id);
    });
    setSelectedIds(new Set());
  };

  const exportCSV = () => {
    const type = activeTab;
    let headers = '';
    let rows = '';
    if (type === 'bookings') {
      headers = 'Client Name,Email,Phone,Location,Service,Schedule,Status,Date\n';
      rows = bookings.map(b => `"${b.clientName}","${b.email}","${b.phone}","${b.location}","${b.serviceNeeded}","${b.frequency}","${b.status}","${b.createdAt}"`).join('\n');
    } else {
      headers = 'Name,National ID,Gender,Age,Phone,Location,Course,Status,Date\n';
      rows = applications.map(a => `"${a.applicantName}","${a.nationalId}","${a.gender}",${a.age},"${a.phone}","${a.location}","${getCourseTitle(a.selectedCourseId)}","${a.status}","${a.createdAt}"`).join('\n');
    }
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `smartmaids_zw_${type}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const Pagination = () => (
    <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-[11px] font-sans text-slate-500">
      <div className="flex items-center gap-2">
        <span>{totalItems} total</span>
        <select
          value={pageSize}
          onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}
          className="premium-input py-1 px-2 text-[11px] w-auto"
        >
          {[5, 10, 25, 50].map(n => <option key={n} value={n}>{n} / page</option>)}
        </select>
      </div>
      <div className="flex items-center gap-1">
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1} className="p-1.5 rounded hover:bg-slate-100 disabled:opacity-30 transition">
          <ChevronLeft className="h-4 w-4" />
        </button>
        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
          const start = Math.max(1, Math.min(page - 2, totalPages - 4));
          const n = start + i;
          if (n > totalPages) return null;
          return (
            <button key={n} onClick={() => setPage(n)} className={`px-2.5 py-1 rounded font-bold transition ${n === page ? 'bg-royal-blue text-white' : 'hover:bg-slate-100'}`}>
              {n}
            </button>
          );
        })}
        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages} className="p-1.5 rounded hover:bg-slate-100 disabled:opacity-30 transition">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );

  const thClass = "p-3 text-left font-semibold text-slate-600 uppercase tracking-wider text-[10px] cursor-pointer select-none hover:text-slate-800 transition";
  const activeData = activeTab === 'bookings' ? pagedBookings : pagedApps;

  return (
    <div id="admin-workspace" className="bg-slate-50 min-h-screen py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Banner */}
        <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] border border-amber-200">Agency HQ</span>
            <h2 className="font-display text-4xl font-light text-slate-900 uppercase tracking-tight">Leads <span className="font-display italic font-semibold text-royal-blue">Manager</span></h2>
            <p className="font-sans text-xs text-slate-500 font-light max-w-lg leading-relaxed">Manage employer inquiries and academy applications.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={onResetData} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 transition">
              <RefreshCw className="h-3.5 w-3.5" /><span>Load Seed Data</span>
            </button>
            <button onClick={exportCSV} className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition shadow-md">
              <Download className="h-3.5 w-3.5" /><span>Export {activeTab === 'bookings' ? 'Inquiries' : 'Enrollees'}</span>
            </button>
          </div>
        </div>

        {/* Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Employer Inquiries', count: bookings.length, icon: Users, color: 'bg-royal-pale text-royal-blue', desc: 'Needs matched callbacks' },
            { label: 'Academy applicants', count: applications.length, icon: Award, color: 'bg-amber-50 text-amber-600', desc: 'Screening interviews scheduled' },
            { label: 'Pending Review', count: bookings.filter(b => b.status === 'pending').length + applications.filter(a => a.status === 'submitted').length, icon: ShieldAlert, color: 'bg-rose-50 text-rose-600', desc: 'Requires priority contact' },
            { label: 'Placements matched', count: bookings.filter(b => b.status === 'matched').length + applications.filter(a => a.status === 'completed').length, icon: CheckCircle2, color: 'bg-emerald-50 text-emerald-600', desc: 'Contracts finalized!' },
          ].map(c => (
            <div key={c.label} className="premium-card p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-display text-xs text-gray-500 uppercase font-semibold">{c.label}</p>
                  <h3 className="font-display text-3xl font-extrabold text-gray-900 mt-2">{c.count}</h3>
                </div>
                <div className={`p-3 ${c.color} rounded-xl shrink-0`}>
                  <c.icon className="h-6 w-6" />
                </div>
              </div>
              <p className="font-sans text-[10px] text-gray-500 mt-3">{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Controls + table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs space-y-4">
          {/* Filters */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6 pb-0">
            <div className="flex rounded-xl bg-slate-100 p-1 space-x-1">
              <button onClick={() => { setActiveTab('bookings'); setStatusFilter('All'); setPage(1); setSelectedIds(new Set()); }} 
                className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${activeTab === 'bookings' ? 'bg-white text-royal-blue shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}>
                Employer ({bookings.length})
              </button>
              <button onClick={() => { setActiveTab('applications'); setStatusFilter('All'); setPage(1); setSelectedIds(new Set()); }} 
                className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${activeTab === 'applications' ? 'bg-white text-royal-blue shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}>
                Academy ({applications.length})
              </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-grow sm:w-64">
                <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                <input type="text" placeholder="Search..." value={searchQuery} onChange={e => { setSearchQuery(e.target.value); setPage(1); }} className="premium-input pl-10" />
              </div>
              <select value={locationFilter} onChange={e => { setLocationFilter(e.target.value); setPage(1); }} className="premium-input w-full sm:w-auto">
                <option value="All">All Locations</option>
                {extractedLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
              </select>
              <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }} className="premium-input w-full sm:w-auto">
                <option value="All">All Statuses</option>
                {(activeTab === 'bookings' ? ['pending','reviewed','matched','archived'] : ['submitted','interviewing','enrolled','completed','rejected']).map(s => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Bulk actions bar */}
          {selectedIds.size > 0 && (
            <div className="flex items-center gap-3 px-6 py-3 bg-royal-pale border-y border-royal-blue/10">
              <span className="font-sans text-xs font-bold text-royal-deeper">{selectedIds.size} selected</span>
              {(activeTab === 'bookings' ? ['pending','reviewed','matched','archived'] : ['submitted','interviewing','enrolled','completed','rejected']).map(s => (
                <button key={s} onClick={() => bulkStatusUpdate(s)} className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-lg bg-white border border-royal-blue/20 text-royal-deeper hover:bg-royal-blue hover:text-white transition">
                  {s}
                </button>
              ))}
              <button onClick={bulkDelete} className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-lg bg-red-50 border border-red-200 text-red-700 hover:bg-red-100 transition ml-auto">
                Delete
              </button>
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-sans text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="p-3 w-10">
                    <button onClick={toggleSelectAll} className="text-slate-400 hover:text-slate-600 transition">
                      {selectedIds.size === activeData.length && activeData.length > 0 ? <CheckSquare className="h-4 w-4 text-royal-blue" /> : <Square className="h-4 w-4" />}
                    </button>
                  </th>
                  {activeTab === 'bookings' ? (
                    <>
                      <th className={thClass} onClick={() => handleSort('clientName')}>Client / Contact <SortIcon field="clientName" /></th>
                      <th className="p-3 font-semibold text-slate-600 uppercase tracking-wider text-[10px]">Service</th>
                      <th className={thClass} onClick={() => handleSort('location')}>Location <SortIcon field="location" /></th>
                      <th className={thClass} onClick={() => handleSort('status')}>Status <SortIcon field="status" /></th>
                      <th className={thClass} onClick={() => handleSort('createdAt')}>Date <SortIcon field="createdAt" /></th>
                      <th className="p-3 text-center w-14">Actions</th>
                    </>
                  ) : (
                    <>
                      <th className={thClass} onClick={() => handleSort('applicantName')}>Applicant <SortIcon field="applicantName" /></th>
                      <th className="p-3 font-semibold text-slate-600 uppercase tracking-wider text-[10px]">Course</th>
                      <th className={thClass} onClick={() => handleSort('location')}>Location <SortIcon field="location" /></th>
                      <th className={thClass} onClick={() => handleSort('status')}>Status <SortIcon field="status" /></th>
                      <th className={thClass} onClick={() => handleSort('createdAt')}>Date <SortIcon field="createdAt" /></th>
                      <th className="p-3 text-center w-14">Actions</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {activeData.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-400 italic">No records match this configuration.</td>
                  </tr>
                ) : activeTab === 'bookings' ? (
                  (pagedBookings as BookingInquiry[]).map(b => (
                    <tr key={b.id} className={`hover:bg-slate-50/50 transition ${selectedIds.has(b.id) ? 'bg-royal-pale/50' : ''}`}>
                      <td className="p-3">
                        <button onClick={() => toggleSelect(b.id)} className="text-slate-400 hover:text-slate-600 transition">
                          {selectedIds.has(b.id) ? <CheckSquare className="h-4 w-4 text-royal-blue" /> : <Square className="h-4 w-4" />}
                        </button>
                      </td>
                      <td className="p-3">
                        <div className="font-bold text-gray-900">{b.clientName}</div>
                        <div className="text-gray-500 font-light flex items-center gap-1.5 mt-0.5 flex-wrap">
                          <Mail className="h-3 w-3 shrink-0" /><span className="mr-1.5">{b.email}</span>
                          <Phone className="h-3 w-3 shrink-0" /><span>{b.phone}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="font-semibold text-royal-blue bg-royal-light rounded px-2 py-0.5 border border-royal-blue/10 capitalize">{b.serviceNeeded}</span>
                        <span className="text-gray-500 block mt-1">{b.frequency.replace('_', ' ')}</span>
                      </td>
                      <td className="p-3 text-gray-800 font-medium">{b.location}</td>
                      <td className="p-3">
                        <select value={b.status} onChange={e => onUpdateBookingStatus(b.id, e.target.value as any)} 
                          className={`px-2 py-1 rounded-lg border font-bold text-[10px] uppercase font-mono bg-white focus:outline-none ${b.status === 'pending' ? 'text-amber-800 border-amber-300 bg-amber-50' : b.status === 'reviewed' ? 'text-teal-800 border-teal-300 bg-teal-50' : b.status === 'matched' ? 'text-emerald-800 border-emerald-300 bg-emerald-50' : 'text-slate-700 border-slate-300 bg-slate-100'}`}>
                          {['pending','reviewed','matched','archived'].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                      <td className="p-3 text-gray-400 font-mono">{b.createdAt.split('T')[0]}</td>
                      <td className="p-3 text-center">
                        <button onClick={() => onDeleteBooking(b.id)} className="p-1.5 text-slate-400 hover:text-red-500 border border-slate-100 hover:border-red-100 hover:bg-red-50 rounded-lg transition">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  (pagedApps as TrainingApplication[]).map(a => (
                    <tr key={a.id} className={`hover:bg-slate-50/50 transition ${selectedIds.has(a.id) ? 'bg-royal-pale/50' : ''}`}>
                      <td className="p-3">
                        <button onClick={() => toggleSelect(a.id)} className="text-slate-400 hover:text-slate-600 transition">
                          {selectedIds.has(a.id) ? <CheckSquare className="h-4 w-4 text-royal-blue" /> : <Square className="h-4 w-4" />}
                        </button>
                      </td>
                      <td className="p-3">
                        <div className="font-bold text-gray-900">{a.applicantName}</div>
                        <div className="text-gray-500 font-light flex items-center gap-1.5 mt-0.5 flex-wrap">
                          <span className="font-mono text-[10px] bg-slate-100 rounded px-1.5 py-0.5">ID: {a.nationalId}</span>
                          <span>Age {a.age} &bull; {a.gender}</span>
                        </div>
                        <div className="text-slate-500 font-medium flex items-center gap-1 mt-1">
                          <Phone className="h-3 w-3 text-emerald-600" /><span>{a.phone}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="font-semibold text-amber-800 bg-amber-50 rounded px-2 py-0.5 border border-amber-200 block max-w-[200px] truncate">{getCourseTitle(a.selectedCourseId)}</span>
                      </td>
                      <td className="p-3 text-gray-800 font-medium">{a.location.split('(')[0].trim()}</td>
                      <td className="p-3">
                        <select value={a.status} onChange={e => onUpdateApplicationStatus(a.id, e.target.value as any)} 
                          className={`px-2 py-1 rounded-lg border font-bold text-[10px] uppercase font-mono bg-white focus:outline-none ${a.status === 'submitted' ? 'text-amber-800 border-amber-300 bg-amber-50' : a.status === 'interviewing' ? 'text-cyan-800 border-cyan-300 bg-cyan-50' : a.status === 'enrolled' ? 'text-teal-800 border-teal-300 bg-teal-50' : a.status === 'completed' ? 'text-emerald-800 border-emerald-300 bg-emerald-50' : 'text-rose-800 border-rose-300 bg-rose-50'}`}>
                          {['submitted','interviewing','enrolled','completed','rejected'].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                      <td className="p-3 text-gray-400 font-mono">{a.createdAt.split('T')[0]}</td>
                      <td className="p-3 text-center">
                        <button onClick={() => onDeleteApplication(a.id)} className="p-1.5 text-slate-400 hover:text-red-500 border border-slate-100 hover:border-red-100 hover:bg-red-50 rounded-lg transition">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
}
