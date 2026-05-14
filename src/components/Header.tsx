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
    <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white p-4 flex items-center gap-3 relative">

      {/* BACK BUTTON */}
      {showBackButton && (
        <button
          onClick={onBack}
          className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-xl"
        >
          ←
        </button>
      )}

      {/* PROFILE */}
      <img
        src={image}
        alt={name}
        className="w-12 h-12 rounded-full border object-cover"
      />

      {/* TEXT */}
      <div>
        <h1 className="font-semibold">{name}</h1>
        <p className="text-sm opacity-80">{tagline}</p>
      </div>
    </div>
  );
}