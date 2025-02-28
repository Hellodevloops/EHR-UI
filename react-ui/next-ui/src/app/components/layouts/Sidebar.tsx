// src/components/layouts/Sidebar.tsx
'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Users,
  Calendar,
  BedDouble,
  Stethoscope,
  FileText,
  DollarSign,
  UserCog,
  Pill,
  BarChart2,
  Settings,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  href?: string;
  subItems?: SidebarSubItem[];
}

interface SidebarSubItem {
  label: string;
  href: string;
}

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const sidebarItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  {
    icon: Users,
    label: 'Patients',
    subItems: [
      { label: 'All Patients', href: '/patients' },
      { label: 'New Patient', href: '/patients/new' },
      { label: 'Patient Records', href: '/patients/records' },
    ],
  },
  {
    icon: Calendar,
    label: 'Appointments',
    subItems: [
      { label: 'Schedule', href: '/appointments' },
      { label: 'Today’s Appointments', href: '/appointments/today' },
      { label: 'Pending Requests', href: '/appointments/requests' },
    ],
  },
  {
    icon: BedDouble,
    label: 'Ward Management',
    subItems: [
      { label: 'Ward Overview', href: '/wards' },
      { label: 'Bed Allocation', href: '/wards/beds' },
      { label: 'Ward Reports', href: '/wards/reports' },
    ],
  },
  {
    icon: Stethoscope,
    label: 'Doctors',
    subItems: [
      { label: 'Doctor List', href: '/doctors' },
      { label: 'Schedules', href: '/doctors/schedules' },
      { label: 'Specialties', href: '/doctors/specialties' },
    ],
  },
  { icon: FileText, label: 'Medical Records', href: '/records' },
  {
    icon: DollarSign,
    label: 'Billing',
    subItems: [
      { label: 'Invoices', href: '/billing/invoices' },
      { label: 'Payments', href: '/billing/payments' },
      { label: 'Insurance Claims', href: '/billing/claims' },
    ],
  },
  {
    icon: UserCog,
    label: 'Staff',
    subItems: [
      { label: 'All Staff', href: '/staff' },
      { label: 'Roles', href: '/staff/roles' },
      { label: 'Shifts', href: '/staff/shifts' },
    ],
  },
  {
    icon: Pill,
    label: 'Pharmacy',
    subItems: [
      { label: 'Inventory', href: '/pharmacy/inventory' },
      { label: 'Prescriptions', href: '/pharmacy/prescriptions' },
      { label: 'Suppliers', href: '/pharmacy/suppliers' },
    ],
  },
  { icon: BarChart2, label: 'Reports & Analytics', href: '/reports' },
  { icon: Settings, label: 'Settings', href: '/settings' },
  {
    icon: AlertTriangle,
    label: 'Emergencies',
    subItems: [
      { label: 'Active Cases', href: '/emergencies/active' },
      { label: 'Emergency Protocols', href: '/emergencies/protocols' },
    ],
  },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const pathname = usePathname();
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>({});

  const toggleSubMenu = (label: string) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <aside
      className={`${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 fixed inset-y-0 left-0 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 md:relative md:shadow-none border-r border-indigo-100`}
    >
     
      <nav className="mt-4 px-4 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = item.href ? pathname === item.href : false;
          const hasSubItems = !!item.subItems;
          const isSubMenuOpen = openSubMenus[item.label];

          return (
            <div key={item.label}>
              <div
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-indigo-100 text-indigo-700 shadow-sm'
                    : 'text-indigo-800 hover:bg-indigo-50 hover:text-indigo-600'
                }`}
                onClick={hasSubItems ? () => toggleSubMenu(item.label) : undefined}
              >
                <div className="flex items-center">
                  <item.icon className="h-5 w-5 mr-3" />
                  <span className="font-medium">{item.label}</span>
                </div>
                {hasSubItems && (
                  <span className="text-indigo-500">
                    {isSubMenuOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                  </span>
                )}
              </div>
              {hasSubItems && isSubMenuOpen && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.subItems?.map((subItem) => {
                    const isSubActive = pathname === subItem.href;
                    return (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className={`block px-4 py-2 rounded-lg transition-all duration-200 text-sm ${
                          isSubActive
                            ? 'bg-indigo-50 text-indigo-700 font-semibold'
                            : 'text-indigo-700 hover:bg-indigo-50 hover:text-indigo-600'
                        }`}
                      >
                        {subItem.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;