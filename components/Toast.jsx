export default function Toast({ message, onClose }) {
  return (
    <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded shadow-lg z-10">
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 text-white">
          X
        </button>
      </div>
    </div>
  );
}
