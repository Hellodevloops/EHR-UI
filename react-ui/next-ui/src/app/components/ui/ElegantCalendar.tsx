import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

interface ElegantCalendarProps {
  value: Date | Date[] | null;
  onChange: (date: Date | Date[] | null) => void;
  className?: string;
  title?: string;
  showNavigation?: boolean;
  showNeighboringMonth?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

const ElegantCalendar: React.FC<ElegantCalendarProps> = ({
  value,
  onChange,
  className = '',
  title = 'Calendar',
  showNavigation = true,
  showNeighboringMonth = false,
  minDate,
  maxDate,
}) => {
  const [activeStartDate, setActiveStartDate] = useState<Date | null>(null);

  const formatShortWeekday = (locale: string | undefined, date: Date) => {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return weekdays[date.getDay()];
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 border border-gray-200 
      transition-all duration-300 ease-in-out hover:shadow-xl max-w-md mx-auto ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <CalendarIcon className="w-6 h-6 text-blue-600" strokeWidth={2} />
          <h2 className="text-xl font-semibold text-gray-800">
            {title}
          </h2>
        </div>
      </div>

      {/* Calendar Container */}
      <div className="relative">
        <style>{`
          /* Calendar base styles */
          .react-calendar {
            width: 100%;
            background: white;
            font-family: inherit;
          }

          /* Navigation styles */
          .react-calendar__navigation {
            margin-bottom: 1rem;
          }

          /* Month view styles */
          .react-calendar__month-view {
            background: white;
            position: relative;
            z-index: 1;
          }

          /* Weekday headers */
          .react-calendar__month-view__weekdays {
            background-color: #f8fafc;
            border-radius: 8px;
            margin-bottom: 8px;
            padding: 8px 0;
            text-align: center;
          }
          
          .react-calendar__month-view__weekdays__weekday {
            font-size: 0.875rem;
            font-weight: 600;
            color: #475569;
            text-transform: uppercase;
            padding: 8px 0;
          }
          
          .react-calendar__month-view__weekdays__weekday abbr {
            text-decoration: none;
            border: none;
          }
          
          /* Weekend day headers */
          .react-calendar__month-view__weekdays__weekday:first-child,
          .react-calendar__month-view__weekdays__weekday:last-child {
            color: #94a3b8;
          }

          /* Calendar tiles */
          .react-calendar__tile {
            position: relative;
            z-index: 2;
            margin: 0;
            border: 1px solid #f1f5f9;
            background: none;
          }

          /* Month rows */
          .react-calendar__month-view__days {
            background: #ffffff;
          }

          /* Grid lines */
          .react-calendar__month-view__days__day {
            position: relative;
          }

          .react-calendar__month-view__days__day::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border: 1px solid #f1f5f9;
            pointer-events: none;
            z-index: 1;
          }

          /* Neighboring month days */
          .react-calendar__month-view__days__day--neighboringMonth {
            color: #cbd5e1;
          }
        `}</style>

        <Calendar
          onChange={onChange}
          value={value}
          activeStartDate={activeStartDate}
          onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate)}
          className="w-full border-none font-sans"
          showNeighboringMonth={showNeighboringMonth}
          minDate={minDate}
          maxDate={maxDate}
          formatShortWeekday={formatShortWeekday}
          tileClassName={({ date, view }) => {
            const isSelected =
              value instanceof Date &&
              date.getDate() === value.getDate() &&
              date.getMonth() === value.getMonth() &&
              date.getFullYear() === value.getFullYear();
            const isToday = date.toDateString() === new Date().toDateString();

            return `
              flex items-center justify-center
              w-10 h-10 mx-auto
              rounded-lg transition-all duration-200
              text-sm font-medium relative z-2
              ${
                isSelected
                  ? 'bg-blue-600 text-black shadow-md hover:bg-blue-700'
                  : isToday
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }
            `;
          }}
          tileContent={({ date, view }) => {
            const isSelected =
              value instanceof Date &&
              date.getDate() === value.getDate() &&
              date.getMonth() === value.getMonth() &&
              date.getFullYear() === value.getFullYear();
            return (
              <div className="relative flex items-center justify-center w-full h-full">
                {isSelected && (
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-black" />
                )}
              </div>
            );
          }}
          navigationLabel={({ label }) => (
            <span className="text-lg font-semibold text-gray-800">
              {label}
            </span>
          )}
          prevLabel={
            <ChevronLeft className="w-5 h-5 text-gray-600 hover:text-blue-600 transition-colors" />
          }
          nextLabel={
            <ChevronRight className="w-5 h-5 text-gray-600 hover:text-blue-600 transition-colors" />
          }
          prev2Label={null}
          next2Label={null}
          showNavigation={showNavigation}
        />
      </div>

      {/* Footer */}
      <div className="mt-6 flex justify-between items-center text-sm">
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Selected:</span>
          <span className="px-3 py-1.5 bg-gray-50 rounded-md text-gray-800 font-medium">
            {value instanceof Date ? value.toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            }) : 'None'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Today:</span>
          <span className="px-3 py-1.5 bg-gray-50 rounded-md text-gray-800 font-medium">
            {new Date().toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ElegantCalendar;