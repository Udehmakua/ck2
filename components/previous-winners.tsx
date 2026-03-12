'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { WinnerCard } from './winner-card';

interface Winner {
  userId: string;
  rank: number;
  multiplier: number;
  driverTitle: string;
}

interface WeekData {
  week: number;
  dateRange: string;
  winners: Winner[];
}

interface PreviousWinnersProps {
  weeks: WeekData[];
}

type DriverTitle = 'Chairman of the Road' | 'Senior Driver' | 'Keke Pilot' | 'Owa Master';

const driverCategories: { title: DriverTitle; label: string; color: { bg: string; text: string } }[] = [
  { title: 'Chairman of the Road', label: 'Chairman of the Road', color: { bg: '#FFC400', text: '#001041' } },
  { title: 'Senior Driver', label: 'Senior Driver', color: { bg: '#001041', text: '#FFFFFF' } },
  { title: 'Keke Pilot', label: 'Keke Pilot', color: { bg: '#00BCD4', text: '#001041' } },
  { title: 'Owa Master', label: 'Owa Master', color: { bg: '#000000', text: '#FFFFFF' } }
];

function WeekAccordionItem({ week, dateRange, winners }: WeekData) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<DriverTitle>('Chairman of the Road');

  const filteredWinners = winners.filter(w => w.driverTitle === activeTab);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full transition-colors px-6 py-4 flex items-center justify-between"
        style={{ backgroundColor: '#EEF2FA' }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E0E8F5'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#EEF2FA'}
      >
        <h3 className="text-lg font-semibold" style={{ color: '#001041' }}>
          Week {week}: {dateRange}
        </h3>
        <ChevronDown
          className={`w-5 h-5 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          style={{ color: '#001041' }}
        />
      </button>

      {isOpen && (
        <div className="bg-white p-6 border-t border-gray-200 space-y-4">
          {winners.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-gray-500 text-lg">
                No winners yet, check next week
              </p>
            </div>
          ) : (
            <>
              {/* Tabs for Categories */}
              <div className="flex flex-wrap gap-2">
                {driverCategories.map((category) => (
                  <button
                    key={category.title}
                    onClick={() => setActiveTab(category.title)}
                    className="px-3 md:px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                    style={activeTab === category.title ? 
                      { backgroundColor: category.color.bg, color: category.color.text, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }
                      : { backgroundColor: '#F3F4F6', color: '#374151' }
                    }
                  >
                    <span className="hidden sm:inline">{category.label}</span>
                    <span className="sm:hidden text-xs">
                      {category.label.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>

              {/* Winners Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredWinners.map((winner) => (
                  <WinnerCard
                    key={`${winner.userId}-${winner.rank}`}
                    rank={winner.rank}
                    userId={winner.userId}
                    multiplier={winner.multiplier}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export function PreviousWinners({ weeks }: PreviousWinnersProps) {
  return (
    <section className="space-y-6">
      <h2 className="text-3xl md:text-4xl font-bold" style={{ color: '#001041' }}>
        View Previous Winners
      </h2>

      <div className="space-y-3">
        {weeks.map((week) => (
          <WeekAccordionItem
            key={week.week}
            week={week.week}
            dateRange={week.dateRange}
            winners={week.winners}
          />
        ))}
      </div>
    </section>
  );
}
