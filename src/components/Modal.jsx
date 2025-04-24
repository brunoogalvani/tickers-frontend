export default function Modal({ onClose }) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full relative">
          <h2 className="text-xl font-semibold mb-4">Defina seu local</h2>
          <p className="mb-4 text-gray-700">
            locais proximos.
          </p>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    );
  }
  