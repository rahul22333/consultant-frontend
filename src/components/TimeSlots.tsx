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

  // ✅ CHECK IF SELECTED DATE IS TODAY
  const todayDate = new Date()
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });

  const isToday =
    selectedDate.date === todayDate;

  // ✅ CURRENT TIME
  const now = new Date();

  // ✅ FILTER + HIDE PAST SLOTS
  const filteredSlots = slots.filter((slot) => {

    const [time, modifier] =
      slot.time.split(" ");

    let [hours, minutes] =
      time.split(":").map(Number);

    // convert to 24h
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

    // create slot date object
    const slotDate = new Date();

    slotDate.setHours(hours);
    slotDate.setMinutes(minutes);
    slotDate.setSeconds(0);

    // ❌ HIDE PAST SLOTS ONLY FOR TODAY
    if (isToday && slotDate <= now) {
      return false;
    }

    // ✅ FILTER LOGIC
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
    <div className="bg-white rounded-xl p-4 shadow-sm">

      {/* TITLE */}
      <h3 className="font-semibold mb-3">
        When should we connect?
      </h3>

      {/* DATE SELECTOR */}
      <div className="flex gap-2 overflow-x-auto mb-4 snap-x">

        {dates.map((d) => {

          const isActive =
            selectedDate.date === d.date;

          return (
            <button
              key={d.date}
              onClick={() =>
                onDateChange(d)
              }
              className={`min-w-[80px] snap-start border rounded-lg p-2 text-center transition

              ${
                isActive
                  ? "border-purple-600 text-purple-600"
                  : "border-gray-300"
              }
              `}
            >
              <div className="text-xs">
                {d.day}
              </div>

              <div className="font-semibold">
                {d.date}
              </div>

              <div className="text-xs text-green-500">
                {availableCount} slots
              </div>
            </button>
          );
        })}
      </div>

      {/* FILTER */}
      <div className="flex gap-2 mb-4">

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
            className={`px-3 py-1 rounded-full text-sm capitalize transition

            ${
              filter === f
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-gray-700"
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

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">

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
                className={`p-2 rounded-lg border text-sm transition

                ${
                  slot.isBooked
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
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
      <p className="text-xs text-gray-500 mt-4">
        🌍 Asia/Kolkata (GMT +5:30)
      </p>
    </div>
  );
}