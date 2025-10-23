'use client';

import React from 'react';
import { ExcelTable } from '@codvista/cvians-core';

const testData = [
  { name: 'John Doe', age: 30, city: 'New York', active: true },
  { name: 'Jane Smith', age: 25, city: 'San Francisco', active: false },
  { name: 'Bob Johnson', age: 35, city: 'Chicago', active: true },
];

export default function TestPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Cvians Excel Table Test</h1>
      <ExcelTable data={testData} />
    </div>
  );
}