// src/components/PatientsPage.tsx
'use client';

import React, { useState } from 'react';
import Sidebar from './layouts/Sidebar';
import Navbar from './layouts/Navbar';
import MainContent from './layouts/MainContent';
import DataTable from './ui/DataTable';
import Modal from './ui/Modal';
import { Plus } from 'lucide-react';
import Link from 'next/link';

interface Patient {
  id: string;
  name: string;
  status: 'Stable' | 'Critical';
  room: string;
}

const patientColumns = [
  { header: 'Name', accessor: 'name' },
  { header: 'ID', accessor: 'id' },
  { header: 'Status', accessor: 'status' },
  { header: 'Room', accessor: 'room' },
  { header: 'Actions', accessor: 'actions' },
];

const PatientsPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([
    { id: 'PAT-001', name: 'John Doe', status: 'Stable', room: '101' },
    { id: 'PAT-002', name: 'Jane Smith', status: 'Critical', room: 'ICU-2' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Patient>({
    id: '',
    name: '',
    status: 'Stable',
    room: '',
  });

  // Add Patient
  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.room) {
      const newId = `PAT-${String(patients.length + 1).padStart(3, '0')}`;
      setPatients([...patients, { ...formData, id: newId }]);
      setFormData({ id: '', name: '', status: 'Stable', room: '' });
      setIsModalOpen(false);
    }
  };

  // Delete Patient
  const handleDeletePatient = (id: string) => {
    setPatients(patients.filter((patient) => patient.id !== id));
  };

  // Patient data with actions
  const patientData = patients.map((patient) => ({
    ...patient,
    actions: (
      <div className="flex space-x-4">
        <Link
          href={`/patient/${patient.id}/edit`}
          className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors duration-200 text-sm font-medium"
        >
          Edit
        </Link>
        <button
          onClick={() => handleDeletePatient(patient.id)}
          className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200 text-sm font-medium"
        >
          Delete
        </button>
      </div>
    ),
  }));

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 to-gray-50">
      <Navbar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} userName="Dr. Smith" />
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
        <MainContent hasSidebar={true}>
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-indigo-900">Patient Management</h1>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg hover:from-indigo-700 hover:to-blue-600 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Patient
              </button>
            </div>

            <DataTable columns={patientColumns} data={patientData} title="Patients List" />

            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Add New Patient"
              onSubmit={handleAddPatient}
              submitButtonText="Add Patient"
            >
              <div className="space-y-6">
                <div className="space-y-1">
                  <label htmlFor="name" className="text-sm font-medium text-indigo-800">
                    Patient Name
                  </label>
                  <input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value as 'Stable' | 'Critical' })
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
                    value={formData.room}
                    onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                    className="w-full px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200 text-indigo-900"
                    placeholder="Enter room number"
                  />
                </div>
              </div>
            </Modal>
          </div>
        </MainContent>
      </div>
    </div>
  );
};

export default PatientsPage;