export function PrizeTable() {
  const prizeData = [
    {
      rankRange: "1st - 5th",
      driverTitle: "Chairman of the Road",
      weeklyReward: "₦100,000 each"
    },
    {
      rankRange: "6th - 15th",
      driverTitle: "Senior Driver",
      weeklyReward: "₦50,000 each"
    },
    {
      rankRange: "16th - 40th",
      driverTitle: "Keke Pilot",
      weeklyReward: "₦15,000 each"
    },
    {
      rankRange: "41st - 100th",
      driverTitle: "Owa Master",
      weeklyReward: "₦4,000 each"
    }
  ];

  return (
    <div className="w-full rounded-lg overflow-hidden shadow-sm border border-gray-100" style={{ background: 'linear-gradient(to bottom right, #EEF2FA, white)' }}>
      <div className="p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#001041' }}>
          The Weekly Payout
        </h2>
        <p className="text-gray-600 mb-6">
          <span className="font-semibold" style={{ color: '#001041' }}>(₦1,615,000 Total)</span>
        </p>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '2px solid #001041' }}>
                <th className="text-left py-4 px-4 font-semibold" style={{ color: '#001041' }}>
                  Rank
                </th>
                <th className="text-left py-4 px-4 font-semibold" style={{ color: '#001041' }}>
                  Driver Title
                </th>
                <th className="text-left py-4 px-4 font-semibold" style={{ color: '#001041' }}>
                  Weekly Reward
                </th>
              </tr>
            </thead>
            <tbody>
              {prizeData.map((row, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 transition-colors"
                  style={{ backgroundColor: index % 2 === 0 ? '#FFF9E6' : 'white' }}
                >
                  <td className="py-4 px-4 font-medium" style={{ color: '#001041' }}>
                    {row.rankRange}
                  </td>
                  <td className="py-4 px-4" style={{ color: '#001041' }}>{row.driverTitle}</td>
                  <td className="py-4 px-4 font-semibold" style={{ color: '#FFC400' }}>
                    {row.weeklyReward}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {prizeData.map((row, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg border border-gray-200 space-y-2"
              >
                <div className="flex justify-between items-start">
                  <span className="text-sm text-gray-600 font-medium">Rank</span>
                  <span className="font-bold" style={{ color: '#001041' }}>{row.rankRange}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-sm text-gray-600 font-medium">
                    Driver Title
                  </span>
                  <span className="text-right font-medium" style={{ color: '#001041' }}>
                    {row.driverTitle}
                  </span>
                </div>
                <div className="flex justify-between items-start pt-2 border-t border-gray-100">
                  <span className="text-sm text-gray-600 font-medium">Reward</span>
                  <span className="font-bold" style={{ color: '#FFC400' }}>
                    {row.weeklyReward}
                  </span>
                </div>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
}
