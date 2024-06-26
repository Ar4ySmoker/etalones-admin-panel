// "use client";

// import { useState } from "react";

// export const FormUpload = ({ onUpload }) => {
//   const [fileName, setFileName] = useState("");

//   const handleFileChange = async (e) => {
//     const files = e.target.files;
//     if (files && files.length > 0) {
//       const formData = new FormData();
//       formData.append("file", files[0]);

//       try {
//         const response = await fetch("/api/upload", {
//           method: "POST",
//           body: formData,
//         });

//         const result = await response.json();
//         if (result.success) {
//           const uploadedFileName = result.name;
//           const filePath = `/uploads/${uploadedFileName}`;
//           setFileName(filePath);
//           onUpload(filePath);
//           alert("Upload ok: " + uploadedFileName);
//         } else {
//           alert("Upload failed");
//         }
//       } catch (error) {
//         console.error("Network error:", error);
//         alert("Network error");
//       }
//     }
//   };

//   return (
//     <label htmlFor="image">
//       <div>Изображение вакансии</div>
//       <input
//         className="file-input w-full max-w-xs"
//         type="file"
//         name="file"
//         onChange={handleFileChange}
//       />
//     </label>
//   );
// };
