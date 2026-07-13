

function PriceSlider({ min = 0, max = 200, value, onChange, step = 1 }) {
  const [lo, hi] = value;

  const handleLo = (e) => {
    const next = Math.min(Number(e.target.value), hi - step);
    onChange([next, hi]);
  };
  const handleHi = (e) => {
    const next = Math.max(Number(e.target.value), lo + step);
    onChange([lo, next]);
  };

  const percent = (val) => ((val - min) / (max - min)) * 100;

  const rangeClass =
    "pointer-events-none absolute inset-0 w-full appearance-none bg-transparent " +
    "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full " +
    "[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-red-700 " +
    "[&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 " +
    "[&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto " +
    "[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full " +
    "[&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-red-700 [&::-moz-range-thumb]:bg-white " +
    "[&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto";

  return (
    <div className="w-full pt-1">
      <div className="mb-4 flex items-center justify-between text-sm font-medium text-white">
        <span>${lo}</span>
        <span>${hi}</span>
      </div>

      <div className="relative w-full h-4">
        {/* Base track */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 h-1.5 w-full rounded-full bg-white/20" />
        {/* Active range track between the two thumbs */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-red-700"
          style={{
            left: `${percent(lo)}%`,
            width: `${percent(hi) - percent(lo)}%`,
          }}
        />

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={lo}
          onChange={handleLo}
          aria-label="Minimum price"
          className={rangeClass}
        />

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={hi}
          onChange={handleHi}
          aria-label="Maximum price"
          className={rangeClass}
        />
      </div>
    </div>
  );
}

export default PriceSlider