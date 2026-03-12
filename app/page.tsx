'use client';

import { useEffect, useState } from 'react';
import { PrizeTable } from '@/components/prize-table';
import { TodayWinners } from '@/components/today-winners';
import { PreviousWinners } from '@/components/previous-winners';

export default function LeaderboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [todayRes, week1Res, week2Res, week3Res] = await Promise.all([
          fetch('/data/today.json'),
          fetch('/data/week-1.json'),
          fetch('/data/week-2.json'),
          fetch('/data/week-3.json')
        ]);

        const [today, week1, week2, week3] = await Promise.all([
          todayRes.json(),
          week1Res.json(),
          week2Res.json(),
          week3Res.json()
        ]);

        setData({ today, week1, week2, week3 });
      } catch (error) {
        console.error('[v0] Error loading data:', error);
        setData({
          today: { winners: [] },
          week1: { week: 1, dateRange: '9th - 15th March', winners: [] },
          week2: { week: 2, dateRange: '16th - 22nd March', winners: [] },
          week3: { week: 3, dateRange: '23rd - 31st March', winners: [] }
        });
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(to bottom, #EEF2FA, white)' }}>
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p style={{ color: '#001041' }} className="font-semibold">Loading leaderboard...</p>
        </div>
      </main>
    );
  }

  const { today, week1, week2, week3 } = data || {};

  return (
    <main className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #EEF2FA, white)' }}>
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{ color: '#001041' }}>
            Leaderboard
          </h1>
          <p className="text-gray-600 text-lg">
            Daily rankings and rewards for our top performers
          </p>
        </div>

        {/* Prize Distribution Section */}
        <div className="mb-16 md:mb-20">
          <PrizeTable />
        </div>

        {/* Today's Winners Section */}
        <div className="mb-16 md:mb-20">
          <TodayWinners winners={today?.winners || []} />
        </div>

        {/* Previous Winners Section */}
        <div className="mb-12">
          <PreviousWinners
            weeks={[
              { week: 1, dateRange: week1?.dateRange || '9th - 15th March', winners: week1?.winners || [] },
              { week: 2, dateRange: week2?.dateRange || '16th - 22nd March', winners: week2?.winners || [] },
              { week: 3, dateRange: week3?.dateRange || '23rd - 31st March', winners: week3?.winners || [] }
            ]}
          />
        </div>
      </div>
    </main>
  );
}
