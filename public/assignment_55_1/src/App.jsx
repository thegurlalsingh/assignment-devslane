import React, { useState } from 'react';

function App() {
  const [num1, setNum1] = useState(2);
  const [num2, setNum2] = useState(3);

  function showTable(number) {
    let rows = [];

    for (let i = 1; i <= 4; i++) {
      rows.push(
        <p key={i}>
          {number} x {i} = {number * i}
        </p>
      );
    }

    return rows;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold text-center mb-8">Multiplication Tables</h1>

      <div className="flex justify-center gap-10 flex-wrap">
        <div className="bg-white p-6 rounded-lg w-52 shadow-md">
          <h2 className="text-xl font-semibold text-center mb-4">Table of {num1}</h2>
          <div className="text-gray-800">{showTable(num1)}</div>
          <button
            onClick={() => setNum1(num1 + 1)}
            className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded"
          >
            Next
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg w-52 shadow-md">
          <h2 className="text-xl font-semibold text-center mb-4">Table of {num2}</h2>
          <div className="text-gray-800">{showTable(num2)}</div>
          <button
            onClick={() => setNum2(num2 + 1)}
            className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
