export default function Loader() {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 opacity-75 z-50 flex items-center justify-center">
      <svg className="animate-spin h-10 w-10 text-white" viewBox="0 0 24 24">
        <circle
          cx="12"
          cy="12"
          r="10"
          fill="none"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-color="currentColor"
        ></circle>
      </svg>
    </div>
  );
}
