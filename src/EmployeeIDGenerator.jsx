import { useState } from 'react';

export default function EmployeeIDGenerator() {
  const [prefix, setPrefix] = useState('GIET');
  const [digits, setDigits] = useState(6);
  const [startNumber, setStartNumber] = useState(1);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [generatedIDs, setGeneratedIDs] = useState([]);
  const [batchSize, setBatchSize] = useState(5);
  const [specificNumber, setSpecificNumber] = useState('');
  
  // Generate a single sequential ID
  const generateSequentialID = () => {
    const id = `${prefix}${String(currentNumber).padStart(digits, '0')}`;
    setGeneratedIDs(prev => [...prev, id]);
    setCurrentNumber(prev => prev + 1);
  };
  
  // Generate a batch of sequential IDs
  const generateBatchSequential = () => {
    const newIDs = [];
    let number = currentNumber;
    
    for (let i = 0; i < batchSize; i++) {
      newIDs.push(`${prefix}${String(number).padStart(digits, '0')}`);
      number++;
    }
    
    setGeneratedIDs(prev => [...prev, ...newIDs]);
    setCurrentNumber(number);
  };
  
  // Generate a specific ID
  const generateSpecificID = () => {
    if (specificNumber) {
      const num = parseInt(specificNumber, 10);
      const id = `${prefix}${String(num).padStart(digits, '0')}`;
      setGeneratedIDs(prev => [...prev, id]);
      setSpecificNumber('');
    }
  };
  
  // Reset the counter
  const resetCounter = () => {
    setCurrentNumber(startNumber);
  };
  
  // Clear all generated IDs
  const clearGeneratedIDs = () => {
    setGeneratedIDs([]);
  };
  
  // Handle changes to the prefix input
  const handlePrefixChange = (e) => {
    setPrefix(e.target.value);
  };
  
  // Handle changes to the digits input
  const handleDigitsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setDigits(value);
    }
  };
  
  // Handle changes to the start number input
  const handleStartNumberChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setStartNumber(value);
      setCurrentNumber(value);
    }
  };
  
  // Handle changes to the batch size input
  const handleBatchSizeChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setBatchSize(value);
    }
  };
  
  // Handle changes to the specific number input
  const handleSpecificNumberChange = (e) => {
    setSpecificNumber(e.target.value);
  };
  
  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Employee ID Generator</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Configuration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prefix</label>
            <input
              type="text"
              value={prefix}
              onChange={handlePrefixChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Digits</label>
            <input
              type="number"
              value={digits}
              onChange={handleDigitsChange}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Number</label>
            <input
              type="number"
              value={startNumber}
              onChange={handleStartNumberChange}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Batch Size</label>
            <input
              type="number"
              value={batchSize}
              onChange={handleBatchSizeChange}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Generate IDs</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={generateSequentialID}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Generate Single ID
          </button>
          <button
            onClick={generateBatchSequential}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Generate Batch
          </button>
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <input
              type="number"
              value={specificNumber}
              onChange={handleSpecificNumberChange}
              placeholder="Enter a number"
              className="w-40 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={generateSpecificID}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Generate Specific ID
            </button>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-gray-700">Generated IDs</h2>
          <div className="flex gap-2">
            <button
              onClick={resetCounter}
              className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              Reset Counter
            </button>
            <button
              onClick={clearGeneratedIDs}
              className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Clear IDs
            </button>
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-md max-h-64 overflow-y-auto">
          {generatedIDs.length === 0 ? (
            <p className="text-gray-500">No IDs generated yet</p>
          ) : (
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {generatedIDs.map((id, index) => (
                <li key={index} className="px-3 py-2 bg-white border border-gray-200 rounded-md shadow-sm">
                  {id}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-md">
        <h3 className="font-medium text-blue-800 mb-2">Current Status</h3>
        <p className="text-blue-700">
          Next ID will be: <span className="font-mono font-bold">{`${prefix}${String(currentNumber).padStart(digits, '0')}`}</span>
        </p>
        <p className="text-blue-700 mt-1">
          Total IDs generated: <span className="font-bold">{generatedIDs.length}</span>
        </p>
      </div>
    </div>
  );
}