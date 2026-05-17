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
    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 w-full overflow-hidden">

      {/* TITLE */}
      <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-3">
        {title}
      </h2>

      {/* META */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-gray-500 text-sm md:text-base mb-4">

        <span>
          ⏱ {duration}
        </span>

        <span>
          📞 {mode}
        </span>

      </div>

      {/* PRICE */}
      <div className="flex flex-wrap items-center gap-2 mb-5">

        {originalPrice && (
          <span className="line-through text-gray-400 text-lg">
            ₹{originalPrice}
          </span>
        )}

        <span className="text-3xl font-bold text-gray-900">
          ₹{price}
        </span>

        {badge && (
          <span className="bg-yellow-100 text-yellow-700 text-xs md:text-sm px-3 py-1 rounded-md font-medium">
            {badge}
          </span>
        )}
      </div>

      {/* VIDEO */}
      <div className="bg-gray-100 aspect-video rounded-xl mb-5 flex items-center justify-center overflow-hidden">

        {videoUrl ? (
          <video
            src={videoUrl}
            controls
            preload="metadata"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-400 text-sm md:text-base">
            ▶ Video Preview
          </span>
        )}
      </div>

      {/* DESCRIPTION */}
      <p className="text-sm md:text-base text-gray-600 leading-7">
        {description}
      </p>
    </div>
  );
}