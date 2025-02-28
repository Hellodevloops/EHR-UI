// src/app/patient/[id]/edit/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/layouts/Sidebar';
import Navbar from '../../../components/layouts/Navbar';
import MainContent from '../../../components/layouts/MainContent';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import {
  User,
  Calendar,
  Venus,
  Bed,
  Stethoscope,
  Phone,
  Mail,
  AlertCircle,
  FileText,
  Upload,
  Save,
  X,
} from 'lucide-react';

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  status: 'Stable' | 'Critical' | 'Discharged';
  room: string;
  admissionDate: string;
  diagnosis: string;
  phone: string;
  email: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  notes: string;
  documents: File[];
}

const fetchPatient = (id: string): Patient | null => {
  const patients: Patient[] = [
    {
      id: 'PAT-001',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1980-05-15',
      gender: 'Male',
      status: 'Stable',
      room: '101',
      admissionDate: '2025-02-01',
      diagnosis: 'Hypertension',
      phone: '555-0123',
      email: 'john.doe@example.com',
      emergencyContact: { name: 'Jane Doe', phone: '555-0124', relationship: 'Spouse' },
      notes: 'Regular checkup scheduled',
      documents: [],
    },
  ];
  return patients.find((p) => p.id === id) || null;
};

const PatientEditPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchedPatient = fetchPatient(id as string);
      if (fetchedPatient) {
        setPatient(fetchedPatient);
      } else {
        router.push('/patients');
      }
      setLoading(false);
    }
  }, [id, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (patient) {
      console.log('Updated patient:', patient);
      router.push('/patients');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && patient) {
      const newFiles = Array.from(e.target.files);
      setPatient({
        ...patient,
        documents: [...patient.documents, ...newFiles],
      });
    }
  };

  const removeDocument = (index: number) => {
    if (patient) {
      const updatedDocs = patient.documents.filter((_, i) => i !== index);
      setPatient({ ...patient, documents: updatedDocs });
    }
  };

  if (loading) return <div className="flex items-center justify-center h-screen text-indigo-600 font-semibold">Loading Patient Data...</div>;
  if (!patient) return null;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-white">
      <Navbar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} userName="Dr. Smith" />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
        <MainContent hasSidebar={true}>
          {/* <div className="max-w-4xl mx-auto p-8"> */}
            <div className="bg-white rounded-3xl shadow-2xl p-10 border border-indigo-100/30 backdrop-blur-sm bg-opacity-95">
              <h1 className="text-4xl font-serif font-bold text-indigo-900 mb-10 flex items-center tracking-tight">
                <User className="mr-3 h-8 w-8 text-indigo-600" /> Edit Patient: <span className="ml-2 text-indigo-700">{patient.id}</span>
              </h1>

              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Personal Information */}
                <div className="space-y-6 bg-indigo-50/50 p-6 rounded-xl border border-indigo-100">
                  <h2 className="text-2xl font-semibold text-indigo-800 flex items-center">
                    <User className="mr-2 h-6 w-6 text-indigo-600" /> Personal Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <label className="block text-sm font-medium text-indigo-700 mb-1">First Name</label>
                      <div className="relative">
                        <input
                          value={patient.firstName}
                          onChange={(e) => setPatient({ ...patient, firstName: e.target.value })}
                          className="w-full rounded-xl border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400/50 pl-12 py-3 bg-white text-indigo-900 placeholder-indigo-400/70 transition-all duration-300"
                          placeholder="Enter First Name"
                        />
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-500 group-hover:text-indigo-600" />
                      </div>
                    </div>
                    <div className="relative group">
                      <label className="block text-sm font-medium text-indigo-700 mb-1">Last Name</label>
                      <div className="relative">
                        <input
                          value={patient.lastName}
                          onChange={(e) => setPatient({ ...patient, lastName: e.target.value })}
                          className="w-full rounded-xl border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400/50 pl-12 py-3 bg-white text-indigo-900 placeholder-indigo-400/70 transition-all duration-300"
                          placeholder="Enter Last Name"
                        />
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-500 group-hover:text-indigo-600" />
                      </div>
                    </div>
                    <div className="relative group">
                      <label className="block text-sm font-medium text-indigo-700 mb-1">Date of Birth</label>
                      <div className="relative">
                        <input
                          type="date"
                          value={patient.dateOfBirth}
                          onChange={(e) => setPatient({ ...patient, dateOfBirth: e.target.value })}
                          className="w-full rounded-xl border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400/50 pl-12 py-3 bg-white text-indigo-900 transition-all duration-300"
                        />
                        <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-500 group-hover:text-indigo-600" />
                      </div>
                    </div>
                    <div className="relative group">
                      <label className="block text-sm font-medium text-indigo-700 mb-1">Gender</label>
                      <div className="relative">
                        <select
                          value={patient.gender}
                          onChange={(e) => setPatient({ ...patient, gender: e.target.value as 'Male' | 'Female' | 'Other' })}
                          className="w-full rounded-xl border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400/50 pl-12 py-3 bg-white text-indigo-900 transition-all duration-300 appearance-none"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                        <Venus className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-500 group-hover:text-indigo-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Medical Information */}
                <div className="space-y-6 bg-indigo-50/50 p-6 rounded-xl border border-indigo-100">
                  <h2 className="text-2xl font-semibold text-indigo-800 flex items-center">
                    <Stethoscope className="mr-2 h-6 w-6 text-indigo-600" /> Medical Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <label className="block text-sm font-medium text-indigo-700 mb-1">Status</label>
                      <div className="relative">
                        <select
                          value={patient.status}
                          onChange={(e) => setPatient({ ...patient, status: e.target.value as 'Stable' | 'Critical' | 'Discharged' })}
                          className="w-full rounded-xl border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400/50 pl-12 py-3 bg-white text-indigo-900 transition-all duration-300 appearance-none"
                        >
                          <option value="Stable">Stable</option>
                          <option value="Critical">Critical</option>
                          <option value="Discharged">Discharged</option>
                        </select>
                        <AlertCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-500 group-hover:text-indigo-600" />
                      </div>
                    </div>
                    <div className="relative group">
                      <label className="block text-sm font-medium text-indigo-700 mb-1">Room</label>
                      <div className="relative">
                        <input
                          value={patient.room}
                          onChange={(e) => setPatient({ ...patient, room: e.target.value })}
                          className="w-full rounded-xl border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400/50 pl-12 py-3 bg-white text-indigo-900 placeholder-indigo-400/70 transition-all duration-300"
                          placeholder="Enter Room Number"
                        />
                        <Bed className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-500 group-hover:text-indigo-600" />
                      </div>
                    </div>
                    <div className="relative group">
                      <label className="block text-sm font-medium text-indigo-700 mb-1">Admission Date</label>
                      <div className="relative">
                        <input
                          type="date"
                          value={patient.admissionDate}
                          onChange={(e) => setPatient({ ...patient, admissionDate: e.target.value })}
                          className="w-full rounded-xl border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400/50 pl-12 py-3 bg-white text-indigo-900 transition-all duration-300"
                        />
                        <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-500 group-hover:text-indigo-600" />
                      </div>
                    </div>
                    <div className="relative group">
                      <label className="block text-sm font-medium text-indigo-700 mb-1">Diagnosis</label>
                      <div className="relative">
                        <input
                          value={patient.diagnosis}
                          onChange={(e) => setPatient({ ...patient, diagnosis: e.target.value })}
                          className="w-full rounded-xl border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400/50 pl-12 py-3 bg-white text-indigo-900 placeholder-indigo-400/70 transition-all duration-300"
                          placeholder="Enter Diagnosis"
                        />
                        <Stethoscope className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-500 group-hover:text-indigo-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-6 bg-indigo-50/50 p-6 rounded-xl border border-indigo-100">
                  <h2 className="text-2xl font-semibold text-indigo-800 flex items-center">
                    <Phone className="mr-2 h-6 w-6 text-indigo-600" /> Contact Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <label className="block text-sm font-medium text-indigo-700 mb-1">Phone</label>
                      <div className="relative">
                        <input
                          value={patient.phone}
                          onChange={(e) => setPatient({ ...patient, phone: e.target.value })}
                          className="w-full rounded-xl border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400/50 pl-12 py-3 bg-white text-indigo-900 placeholder-indigo-400/70 transition-all duration-300"
                          placeholder="Enter Phone Number"
                        />
                        <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-500 group-hover:text-indigo-600" />
                      </div>
                    </div>
                    <div className="relative group">
                      <label className="block text-sm font-medium text-indigo-700 mb-1">Email</label>
                      <div className="relative">
                        <input
                          type="email"
                          value={patient.email}
                          onChange={(e) => setPatient({ ...patient, email: e.target.value })}
                          className="w-full rounded-xl border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400/50 pl-12 py-3 bg-white text-indigo-900 placeholder-indigo-400/70 transition-all duration-300"
                          placeholder="Enter Email Address"
                        />
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-500 group-hover:text-indigo-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="space-y-6 bg-indigo-50/50 p-6 rounded-xl border border-indigo-100">
                  <h2 className="text-2xl font-semibold text-indigo-800 flex items-center">
                    <AlertCircle className="mr-2 h-6 w-6 text-indigo-600" /> Emergency Contact
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="relative group">
                      <label className="block text-sm font-medium text-indigo-700 mb-1">Name</label>
                      <div className="relative">
                        <input
                          value={patient.emergencyContact.name}
                          onChange={(e) =>
                            setPatient({
                              ...patient,
                              emergencyContact: { ...patient.emergencyContact, name: e.target.value },
                            })
                          }
                          className="w-full rounded-xl border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400/50 pl-12 py-3 bg-white text-indigo-900 placeholder-indigo-400/70 transition-all duration-300"
                          placeholder="Contact Name"
                        />
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-500 group-hover:text-indigo-600" />
                      </div>
                    </div>
                    <div className="relative group">
                      <label className="block text-sm font-medium text-indigo-700 mb-1">Phone</label>
                      <div className="relative">
                        <input
                          value={patient.emergencyContact.phone}
                          onChange={(e) =>
                            setPatient({
                              ...patient,
                              emergencyContact: { ...patient.emergencyContact, phone: e.target.value },
                            })
                          }
                          className="w-full rounded-xl border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400/50 pl-12 py-3 bg-white text-indigo-900 placeholder-indigo-400/70 transition-all duration-300"
                          placeholder="Contact Phone"
                        />
                        <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-500 group-hover:text-indigo-600" />
                      </div>
                    </div>
                    <div className="relative group">
                      <label className="block text-sm font-medium text-indigo-700 mb-1">Relationship</label>
                      <div className="relative">
                        <input
                          value={patient.emergencyContact.relationship}
                          onChange={(e) =>
                            setPatient({
                              ...patient,
                              emergencyContact: { ...patient.emergencyContact, relationship: e.target.value },
                            })
                          }
                          className="w-full rounded-xl border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400/50 pl-12 py-3 bg-white text-indigo-900 placeholder-indigo-400/70 transition-all duration-300"
                          placeholder="Relationship"
                        />
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-500 group-hover:text-indigo-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Documents */}
                <div className="space-y-6 bg-indigo-50/50 p-6 rounded-xl border border-indigo-100">
                  <h2 className="text-2xl font-semibold text-indigo-800 flex items-center">
                    <FileText className="mr-2 h-6 w-6 text-indigo-600" /> Documents
                  </h2>
                  <div className="border-2 border-dashed border-indigo-300 rounded-xl p-8 text-center bg-white/50 hover:bg-indigo-50/70 transition-all duration-300">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer flex flex-col items-center justify-center"
                    >
                      <Upload className="h-10 w-10 text-indigo-500 mb-3" />
                      <span className="text-indigo-700 font-semibold text-lg">Drop files or click to upload</span>
                      <span className="text-sm text-indigo-600/80 mt-1">Supported formats: PDF, PNG, JPG</span>
                    </label>
                  </div>
                  {patient.documents.length > 0 && (
                    <div className="mt-4 space-y-3">
                      {patient.documents.map((doc, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-indigo-100/50 rounded-xl border border-indigo-200"
                        >
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-indigo-500 mr-3" />
                            <span className="text-indigo-900 font-medium">{doc.name}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeDocument(index)}
                            className="text-red-500 hover:text-red-600 transition-colors duration-200"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Notes */}
                <div className="space-y-6 bg-indigo-50/50 p-6 rounded-xl border border-indigo-100">
                  <h2 className="text-2xl font-semibold text-indigo-800 flex items-center">
                    <FileText className="mr-2 h-6 w-6 text-indigo-600" /> Notes
                  </h2>
                  <textarea
                    value={patient.notes}
                    onChange={(e) => setPatient({ ...patient, notes: e.target.value })}
                    className="w-full rounded-xl border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400/50 p-4 bg-white text-indigo-900 placeholder-indigo-400/70 h-48 transition-all duration-300"
                    placeholder="Enter additional patient notes..."
                  />
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-4 pt-6">
                  <Link
                    href="/patients"
                    className="px-8 py-3 bg-white border-2 border-indigo-300 text-indigo-700 rounded-xl hover:bg-indigo-50 hover:border-indigo-400 transition-all duration-300 flex items-center font-semibold shadow-md hover:shadow-lg"
                  >
                    <X className="mr-2 h-5 w-5 text-indigo-600" /> Cancel
                  </Link>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center font-semibold shadow-lg hover:shadow-xl"
                  >
                    <Save className="mr-2 h-5 w-5" /> Save Changes
                  </button>
                </div>
              </form>
            </div>
          {/* </div> */}
        </MainContent>
      </div>
    </div>
  );
};

export default PatientEditPage;