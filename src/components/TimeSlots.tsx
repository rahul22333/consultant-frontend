type Slot = {
  time: string;
  isBooked: boolean;
};

type DateType = {
  day: string;
  date: string;
};

type TimeSlotsProps = {
  dates: DateType[];
  selectedDate: DateType;
  slots: Slot[];
  selectedSlot: string | null;

  filter: "all" | "morning" | "midday" | "evening";

  onFilterChange: (
    filter: "all" | "morning" | "midday" | "evening"
  ) => void;

  loading: boolean;

  onDateChange: (date: DateType) => void;

  onSlotSelect: (slot: string) => void;
};

export default function TimeSlots({
  dates,
  selectedDate,
  slots,
  selectedSlot,
  filter,
  onFilterChange,
  loading,
  onDateChange,
  onSlotSelect,
}: TimeSlotsProps) {

  const todayDate = new Date()
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });

  const isToday =
    selectedDate.date === todayDate;

  const now = new Date();

  const filteredSlots = slots.filter((slot) => {

    const [time, modifier] =
      slot.time.split(" ");

    let [hours, minutes] =
      time.split(":").map(Number);

    if (
      modifier === "PM" &&
      hours !== 12
    ) {
      hours += 12;
    }

    if (
      modifier === "AM" &&
      hours === 12
    ) {
      hours = 0;
    }

    const slotDate = new Date();

    slotDate.setHours(hours);
    slotDate.setMinutes(minutes);
    slotDate.setSeconds(0);

    if (isToday && slotDate <= now) {
      return false;
    }

    if (filter === "all") {
      return true;
    }

    if (filter === "morning") {
      return hours < 12;
    }

    if (filter === "midday") {
      return hours >= 12 && hours < 17;
    }

    if (filter === "evening") {
      return hours >= 17;
    }

    return true;
  });

  const availableCount =
    filteredSlots.filter(
      (s) => !s.isBooked
    ).length;

  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">

      {/* TITLE */}
      <h3 className="text-lg md:text-xl font-semibold mb-4">
        When should we connect?
      </h3>

      {/* DATE SELECTOR */}
      <div className="flex gap-3 overflow-x-auto pb-1 mb-5 snap-x scrollbar-hide">

        {dates.map((d) => {

          const isActive =
            selectedDate.date === d.date;

          return (
            <button
              key={d.date}
              onClick={() =>
                onDateChange(d)
              }
              className={`min-w-[84px] md:min-w-[95px] snap-start border rounded-2xl p-3 text-center transition shrink-0

              ${
                isActive
                  ? "border-purple-600 bg-purple-50 text-purple-700"
                  : "border-gray-200 bg-white"
              }
              `}
            >
              <div className="text-xs font-medium">
                {d.day}
              </div>

              <div className="font-bold text-lg">
                {d.date}
              </div>

              <div className="text-xs text-green-500 mt-1">
                {availableCount} slots
              </div>
            </button>
          );
        })}
      </div>

      {/* FILTER */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-5">

        {[
          "all",
          "morning",
          "midday",
          "evening",
        ].map((f) => (
          <button
            key={f}
            onClick={() =>
              onFilterChange(f as any)
            }
            className={`px-4 py-2 rounded-full text-sm capitalize whitespace-nowrap transition font-medium

            ${
              filter === f
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-700"
            }
            `}
          >
            {f}
          </button>
        ))}
      </div>

      {/* SLOTS */}
      {loading ? (

        <p className="text-gray-400 text-sm">
          Loading slots...
        </p>

      ) : filteredSlots.length === 0 ? (

        <p className="text-gray-400 text-sm">
          No slots available
        </p>

      ) : (

        <div className="grid grid-cols-2 gap-3">

          {filteredSlots.map((slot) => {

            const isSelected =
              selectedSlot === slot.time;

            return (
              <button
                key={slot.time}
                disabled={slot.isBooked}
                onClick={() => {
                  if (!slot.isBooked) {
                    onSlotSelect(slot.time);
                  }
                }}
                className={`h-12 rounded-xl border text-sm font-medium transition

                ${
                  slot.isBooked
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                    : "hover:border-purple-400"
                }

                ${
                  isSelected
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-white"
                }
                `}
              >
                {slot.time}
              </button>
            );
          })}
        </div>
      )}

      {/* TIMEZONE */}
      <p className="text-xs text-gray-500 mt-5">
        🌍 Asia/Kolkata (GMT +5:30)
      </p>
    </div>
  );
}