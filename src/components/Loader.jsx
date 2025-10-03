// src/components/Loader.jsx
export default function Loader({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-pink-600 border-solid mb-4"></div>
      <p className="text-lg font-semibold">{message}</p>
    </div>
  );
}
