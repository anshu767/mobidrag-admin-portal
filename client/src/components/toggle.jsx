export default function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-5 w-9 rounded-full ${
        checked ? "bg-violet-600" : "bg-gray-300"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-4 w-4 bg-white rounded-full transition ${
          checked ? "translate-x-4" : ""
        }`}
      />
    </button>
  );
}