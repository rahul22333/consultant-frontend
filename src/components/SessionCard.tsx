type SessionCardProps = {
  title: string;
  duration: string;
  mode: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  description: string;
  videoUrl?: string;
};

export default function SessionCard({
  title,
  duration,
  mode,
  price,
  originalPrice,
  badge,
  description,
  videoUrl,
}: SessionCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">

      {/* TITLE */}
      <h2 className="text-xl font-bold mb-2">
        {title}
      </h2>

      {/* META */}
      <p className="text-gray-500 text-sm mb-2">
        ⏱ {duration} | 📞 {mode}
      </p>

      {/* PRICE */}
      <div className="flex items-center gap-2 mb-4">
        {originalPrice && (
          <span className="line-through text-gray-400">
            ₹{originalPrice}
          </span>
        )}

        <span className="text-lg font-bold">
          ₹{price}
        </span>

        {badge && (
          <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded">
            {badge}
          </span>
        )}
      </div>

      {/* VIDEO */}
      <div className="bg-gray-200 h-64 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
        {videoUrl ? (
          <video
            src={videoUrl}
            controls
            preload="metadata"
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <span className="text-gray-500 text-sm">
            ▶ Video Preview
          </span>
        )}
      </div>

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}