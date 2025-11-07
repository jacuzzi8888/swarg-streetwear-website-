import React from 'react';

interface VisualizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  imageUrl: string;
  error: string;
  productName: string;
}

export const VisualizeModal: React.FC<VisualizeModalProps> = ({
  isOpen,
  onClose,
  isLoading,
  imageUrl,
  error,
  productName,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative bg-gray-900 border border-gray-700 rounded-lg shadow-xl w-11/12 max-w-2xl p-4 sm:p-6 text-white transition-transform duration-300 scale-95"
        onClick={(e) => e.stopPropagation()}
        style={isOpen ? { opacity: 1, transform: 'scale(1)' } : {}}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors z-10"
          aria-label="Close"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        <h2 className="text-xl font-bold mb-4 pr-8">AI Model View: {productName}</h2>

        <div className="aspect-w-3 aspect-h-4 bg-gray-800 rounded-md flex items-center justify-center min-h-[400px]">
          {isLoading && (
            <div className="flex flex-col items-center justify-center text-gray-400">
              <svg
                className="animate-spin h-8 w-8 text-cyan-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <p className="mt-4">Generating image with Gemini...</p>
            </div>
          )}
          {error && <p className="text-red-400 p-4 text-center">{error}</p>}
          {imageUrl && !isLoading && (
            <img
              src={imageUrl}
              alt={`AI generated image of a model wearing ${productName}`}
              className="object-contain h-full w-full rounded-md"
            />
          )}
        </div>
      </div>
    </div>
  );
};
