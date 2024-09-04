import React from 'react';
import CandidateDetails from '@/app/ui/dashboard/CandidateDetails/CandidateDetails';

const GlobalModal = () => {


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <button  className="absolute top-2 right-2 text-xl font-bold">
          &times;
        </button>
      </div>
    </div>
  );
};

export default GlobalModal;
