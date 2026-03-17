'use client';

import { useState } from 'react';
import { WinnerCard } from './winner-card';

interface Winner {
  userId: string;
  rank: number;
  multiplier: number;
  driverTitle: string;
}

interface TodayWinnersProps {
  winners: Winner[];
}

type DriverTitle = 'Chairman of the Road' | 'Senior Driver' | 'Keke Pilot' | 'Owa Master';

const driverCategories: { title: DriverTitle; label: string; color: { bg: string; text: string }; rankRange: string }[] = [
  {
    title: 'Chairman of the Road',
    label: 'Chairman of the Road',
    color: { bg: '#FFC400', text: '#001041' },
    rankRange: 'Rank 1-5'
  },
  {
    title: 'Senior Driver',
    label: 'Senior Driver',
    color: { bg: '#001041', text: '#FFFFFF' },
    rankRange: 'Rank 6-15'
  },
  {
    title: 'Keke Pilot',
    label: 'Keke Pilot',
    color: { bg: '#1AFFFF', text: '#001041' },
    rankRange: 'Rank 16-40'
  },
  {
    title: 'Owa Master',
    label: 'Owa Master',
    color: { bg: '#000000', text: '#FFFFFF' },
    rankRange: 'Rank 41-100'
  }
];

export function TodayWinners({ winners }: TodayWinnersProps) {
  const [activeTab, setActiveTab] = useState<DriverTitle>('Chairman of the Road');

  const filteredWinners = winners.filter(w => w.driverTitle === activeTab);

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#001041' }}>
          Daily Leaderboard
        </h2>
        <p className="text-gray-600">
          Top 100 players for {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 md:gap-3">
        {driverCategories.map((category) => (
          <button
            key={category.title}
            onClick={() => setActiveTab(category.title)}
            className="px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold text-sm md:text-base transition-all"
            style={activeTab === category.title ? 
              { backgroundColor: category.color.bg, color: category.color.text, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }
              : { backgroundColor: '#F3F4F6', color: '#374151' }
            }
          >
            <span className="hidden sm:inline">{category.label}</span>
            <span className="sm:hidden">{category.label.split(' ')[0]}</span>
            <span className="text-xs md:text-sm opacity-75 block sm:inline sm:ml-2">
              {category.rankRange}
            </span>
          </button>
        ))}
      </div>

      {/* Winners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {filteredWinners.length > 0 ? (
          filteredWinners.map((winner) => (
            <WinnerCard
              key={`${winner.userId}-${winner.rank}`}
              rank={winner.rank}
              userId={winner.userId}
              multiplier={winner.multiplier}
            />
          ))
        ) : (
          <div className="col-span-full py-12 text-center">
            <p className="text-gray-500 text-lg">
              No winners in this category yet
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
