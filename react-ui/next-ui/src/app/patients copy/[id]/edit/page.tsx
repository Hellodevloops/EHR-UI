// src/app/patient/[id]/edit/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/layouts/Sidebar';
import Navbar from '../../../components/layouts/Navbar';
import MainContent from '../../../components/layouts/MainContent';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

// Mock data fetching function (replace with real API in production)
const fetchPatient = (id: string) => {
  const patients = [
    { id: 'PAT-001', name: 'John Doe', status: 'Stable', room: '101' },
    { id: 'PAT-002', name: 'Jane Smith', status: 'Critical', room: 'ICU-2' },
  ];
  return patients.find((p) => p.id === id) || null;
};

interface Patient {
  id: string;
  name: string;
  status: 'Stable' | 'Critical';
  room: string;
}

const PatientEditPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [patient, setPatient] = useState<Patient | null>(null);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchedPatient = fetchPatient(id as string);
      if (fetchedPatient) {
        setPatient(fetchedPatient);
      } else {
        // Handle patient not found (e.g., redirect or show error)
        router.push('/patients');
      }
    }
  }, [id, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (patient && patient.name && patient.room) {
      // Mock update logic (replace with API call in production)
      console.log('Updated patient:', patient);
      router.push('/patients'); // Redirect back to patients list
    }
  };

  if (!patient) return <div>Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 to-gray-50">
      <Navbar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} userName="Dr. Smith" />
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
        <MainContent hasSidebar={true}>
          <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-2xl border border-indigo-100">
            <h1 className="text-3xl font-bold text-indigo-900 mb-6">Edit Patient: {patient.id}</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <label htmlFor="name" className="text-sm font-medium text-indigo-800">
                  Patient Name
                </label>
                <input
                  id="name"
                  value={patient.name}
                  onChange={(e) => setPatient({ ...patient, name: e.target.value })}
                  className="w-full px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200 text-indigo-900"
                  placeholder="Enter patient name"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="status" className="text-sm font-medium text-indigo-800">
                  Status
                </label>
                <select
                  id="status"
                  value={patient.status}
                  onChange={(e) =>
                    setPatient({ ...patient, status: e.target.value as 'Stable' | 'Critical' })
                  }
                  className="w-full px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200 text-indigo-900"
                >
                  <option value="Stable">Stable</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
              <div className="space-y-1">
                <label htmlFor="room" className="text-sm font-medium text-indigo-800">
                  Room
                </label>
                <input
                  id="room"
                  value={patient.room}
                  onChange={(e) => setPatient({ ...patient, room: e.target.value })}
                  className="w-full px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200 text-indigo-900"
                  placeholder="Enter room number"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg hover:from-indigo-700 hover:to-blue-600 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
                >
                  Update Patient
                </button>
                <Link
                  href="/patients"
                  className="flex-1 py-3 text-center bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </MainContent>
      </div>
    </div>
  );
};

export default PatientEditPage;