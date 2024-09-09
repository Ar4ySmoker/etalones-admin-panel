// 'use client';
// import React, { useEffect } from 'react';
// import CandidateDetails from "@/app/ui/dashboard/CandidateDetails/CandidateDetails";
// import { useCandidate } from '@/app/context/CandidateContext'; // Обновите путь к файлу

// interface EditCandidateProps {
//   params: {
//     id: string;
//   };
// }

// const EditCandidate: React.FC<EditCandidateProps> = ({ params }) => {
//   const { id } = params;
//   const { candidate, fetchCandidateById } = useCandidate();

//   useEffect(() => {
//     fetchCandidateById(id);
//   }, [id, fetchCandidateById]);

//   return (
//     <div>
//       {candidate ? (
//         <CandidateDetails candidate={candidate} />
//       ) : (
//         <p>Loading candidate...</p>
//       )}
//     </div>
//   );
// };

// export default EditCandidate;

// // //app\editProduct\[id]\page.js

// // import CandidateDetails from "@/app/ui/dashboard/CandidateDetails/CandidateDetails";

 
// // const getCandidateById = async (id: any) => {
// //     try {
// //         const res = await fetch(`http://localhost:3000/api/candidates/${id}`, {
// //             cache: "no-store",
// //         });
// //         // const res = await fetch(`https://www.candidat.store/api/candidates/${id}`, {
// //         //     cache: "no-store",
// //         // });
 
// //         if (!res.ok) {
// //             throw new Error("Failed to fetch candidate");
// //         }
 
// //         return res.json();
// //     } catch (error) {
// //         console.log(error);
// //     }
// // };
 
// // export default async function EditCandidate({ params }) {
// //     const { id } = params;
// //     const { candidate } = await getCandidateById(id);
    
// //     return <CandidateDetails  candidate={candidate} />;
// // }

'use client';

import React, { useEffect } from 'react';
import CandidateDetails from "@/app/ui/dashboard/CandidateDetails/CandidateDetails";
import { useCandidate } from '@/app/context/CandidateContext';

interface EditCandidateProps {
  params: {
    id: string;
  };
}

const EditCandidate: React.FC<EditCandidateProps> = ({ params }) => {
  const { id } = params;
  const { candidate, fetchCandidateById } = useCandidate();

  useEffect(() => {
    if (id) {
      fetchCandidateById(id);
    }
  }, [id]); // Зависимость только на `id`

  return (
    <div>
      {candidate ? (
        <CandidateDetails candidate={candidate} />
      ) : (
        <p>Loading candidate...</p>
      )}
    </div>
  );
};

export default EditCandidate;
