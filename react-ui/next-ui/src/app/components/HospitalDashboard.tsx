// src/components/HospitalDashboard.tsx
'use client';

import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { 
  Users, BedDouble, Activity, Stethoscope, Clock,
  Calendar as CalendarIcon  // Add this import
} from 'lucide-react';
import Sidebar from './layouts/Sidebar';
import Navbar from './layouts/Navbar';
import MainContent from './layouts/MainContent';
import StatCard from './ui/StatCard';
import DataTable from './ui/DataTable';
import ElegantCalendar from './ui/ElegantCalendar';

const HospitalDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const colors = {
    primary: '#4F46E5',
    secondary: '#6B7280',
    success: '#059669',
    warning: '#D97706',
    danger: '#DC2626',
    info: '#0891B2',
    background: '#F3F4F6',
    white: '#FFFFFF',
  };

  const stats = [
    { title: 'Total Patients', value: '1,234', icon: Users, color: colors.primary, change: '+5.2%', trend: 'up' },
    { title: 'Appointments', value: '45', icon: CalendarIcon, color: colors.success, change: '+2', trend: 'up' },
    { title: 'Available Beds', value: '12', icon: BedDouble, color: colors.warning, change: '-3', trend: 'down' },
    { title: 'Active Cases', value: '89', icon: Activity, color: colors.danger, change: '+1.5%', trend: 'up' },
  ];

  const patientTrendData = [
    { date: 'Feb 14', admitted: 120, discharged: 95 },
    { date: 'Feb 15', admitted: 135, discharged: 110 },
    { date: 'Feb 16', admitted: 128, discharged: 105 },
    { date: 'Feb 17', admitted: 145, discharged: 120 },
    { date: 'Feb 18', admitted: 139, discharged: 115 },
    { date: 'Feb 19', admitted: 152, discharged: 130 },
    { date: 'Feb 20', admitted: 148, discharged: 125 },
  ];

  const patientColumns = [
    { header: 'Patient', accessor: 'name' },
    { header: 'ID', accessor: 'id' },
    { 
      header: 'Status', 
      accessor: 'status', 
      render: (value: string) => (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
          value === 'Stable' ? 'bg-green-100 text-green-800' :
          value === 'Critical' ? 'bg-red-100 text-red-800' :
          'bg-amber-100 text-amber-800'
        }`}>
          <span className={`w-2 h-2 rounded-full mr-2 ${
            value === 'Stable' ? 'bg-green-500' :
            value === 'Critical' ? 'bg-red-500' :
            'bg-amber-500'
          }`} />
          {value}
        </span>
      )
    },
    { header: 'Room', accessor: 'room' },
    { header: 'Last Check', accessor: 'lastCheck', render: (value: string) => (
      <span className="flex items-center">
        <Clock className="w-4 h-4 mr-1 text-gray-500" />
        {value}
      </span>
    )},
  ];

  const patientData = [
    { name: 'John Doe', id: 'PAT-001', status: 'Stable', room: '101', lastCheck: '09:30 AM' },
    { name: 'Jane Smith', id: 'PAT-002', status: 'Critical', room: 'ICU-2', lastCheck: '10:15 AM' },
    { name: 'Mike Johnson', id: 'PAT-003', status: 'Recovery', room: '205', lastCheck: '11:00 AM' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-inter antialiased">
      <Navbar 
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        userName="Dr. Smith"
        className="bg-white shadow-sm px-4 py-3 md:px-6 md:py-4 sticky top-0 z-10"
      />

      <div className="flex">
        <Sidebar 
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          className="hidden md:block md:w-64 bg-white shadow-sm transition-all duration-300 fixed h-screen z-20"
        />

        <MainContent className="flex-1 p-4 md:p-6 lg:p-8 md:ml-64">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
              {stats.map((stat) => (
                <StatCard 
                  key={stat.title}
                  {...stat}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-4 md:p-6 border border-gray-100"
                />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6 flex items-center">
                  <Stethoscope className="w-5 h-5 mr-2 text-indigo-600" />
                  Patient Flow Trend
                </h2>
                <div className="h-[300px] md:h-[400px]">
                  <ResponsiveContainer>
                    <LineChart data={patientTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis 
                        dataKey="date"
                        stroke="#6B7280"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis 
                        stroke="#6B7280"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip 
                        contentStyle={{
                          borderRadius: '8px',
                          border: 'none',
                          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                          padding: '10px',
                        }}
                      />
                      <Legend verticalAlign="top" height={36} />
                      <Line 
                        type="monotone"
                        dataKey="admitted"
                        name="Admitted"
                        stroke={colors.primary}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line 
                        type="monotone"
                        dataKey="discharged"
                        name="Discharged"
                        stroke={colors.success}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <ElegantCalendar 
                value={selectedDate}
                onChange={setSelectedDate}
              />

              <div className="lg:col-span-3 bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
                <DataTable
                  columns={patientColumns}
                  data={patientData}
                  title="Current Patients"
                  onAddClick={() => console.log('Add patient clicked')}
                  className="w-full"
                  headerClassName="bg-gray-50 border-b border-gray-100 text-gray-700 py-3 md:py-4"
                  rowClassName="hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100 py-3 md:py-4"
                />
              </div>
            </div>
          </div>
        </MainContent>
      </div>
    </div>
  );
};

export default HospitalDashboard;