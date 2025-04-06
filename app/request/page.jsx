'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import RequestForm from '../components/RequestForm';
import RequestCard from '../components/RequestCard';

export default function RequestPage() {
  const searchParams = useSearchParams();
  const viewOnly = searchParams.get('viewOnly') === 'true';

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-tr from-blue-50 via-white to-blue-100">
      <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">📦 Medicine Requests</h1>

      {!viewOnly && (
        <div className="mb-10">
          <RequestForm />
        </div>
      )}
      <RequestCard />
    </div>
  );
}
