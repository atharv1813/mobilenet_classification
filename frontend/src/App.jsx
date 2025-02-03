import React, { useState } from "react";
import "./App.css";
import ImageUploader from "./ImageUploader";

const App = () => {
  const [result, setResult] = useState(null);

  const handlePrediction = (data) => {
    setResult(data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Image Classification with MobileNet</h1>
      <ImageUploader onPrediction={handlePrediction} />
      {result && (
        <div className="mt-6 p-6 bg-white shadow-md rounded-lg w-full max-w-md flex flex-col items-center">
          <img src={result.image} alt="Uploaded" className="w-full max-w-xs rounded-lg shadow-lg" />
          <div className="text-center mt-4">
            <h3 className="text-lg font-semibold text-gray-700">Prediction: {result.label}</h3>
            <p className="text-sm text-gray-600">
              Confidence: {(result.confidence * 100).toFixed(2)}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
