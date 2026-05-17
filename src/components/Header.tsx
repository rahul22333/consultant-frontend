type HeaderProps = {
  name: string;
  tagline: string;
  image: string;
  showBackButton?: boolean;
  onBack?: () => void;
};

export default function Header({
  name,
  tagline,
  image,
  showBackButton = false,
  onBack,
}: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-fuchsia-600 to-purple-700 text-white shadow-md">

      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3 relative">

        {/* BACK BUTTON */}
        {showBackButton && (
          <button
            onClick={onBack}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-xl"
          >
            ←
          </button>
        )}

        {/* IMAGE */}
        <img
          src={image}
          alt={name}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-white/30 shrink-0"
        />

        {/* TEXT */}
        <div className="min-w-0">

          <h1 className="text-base md:text-xl font-semibold truncate">
            {name}
          </h1>

          <p className="text-xs md:text-sm text-white/80 truncate">
            {tagline}
          </p>

        </div>
      </div>
    </header>
  );
}