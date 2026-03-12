interface WinnerCardProps {
  rank: number;
  userId: string;
  multiplier: number;
}

export function WinnerCard({ rank, userId, multiplier }: WinnerCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm" style={{ backgroundColor: '#FFC400', color: '#001041' }}>
            #{rank}
          </div>
          <div>
            <p className="text-sm text-gray-600">User ID</p>
            <p className="font-semibold" style={{ color: '#001041' }}>{userId}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-600 mb-1">Multiplier</p>
          <p className="font-bold text-lg" style={{ color: '#FFC400' }}>{multiplier}x</p>
        </div>
      </div>
    </div>
  );
}
