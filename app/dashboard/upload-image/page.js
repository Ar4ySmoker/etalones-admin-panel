// 'use client';

// import { useState } from "react";

// const UploadImage = () => {
//     const [file, setFile] = useState();
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         // console.log(file)
//         if(!file) {
//             alert('Please Select a File');
//             return;
//         }
//         const data = new FormData();
//         data.append('file', file);
//         try {
//             let result = await fetch('/api/upload-mongo-image', {
//                 method: "POST",
//                 body: data
//             })
//             result = await result.json();
//             if(result.success) {
//                 alert("Successfully Uploaded!!")
//             }
//             else {
//                 alert("Failed!!")
//             }
//         }
//         catch(error) {
//             console.log(error)
//             alert("Failed!!")
//         }
//     }
//   return (
//     <>
//      <h2>Upload Image in Next JS</h2>
//      <form onSubmit={handleSubmit}>
//         <input type='file' name='file' onChange={(e) => setFile(e.target.files?.[0])} /><br /><br />
//         <button type='submit'>Upload</button>
//      </form>
//     </>
//   );
// }

// export default UploadImage;

'use client';

import { useState } from "react";

const UploadImage = () => {
    const [file, setFile] = useState();
    const [title, setTitle] = useState('');
    const [salary, setSalary] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file || !title || !salary || !location) {
            alert('Please fill in all fields and select a file');
            return;
        }

        const data = new FormData();
        data.append('file', file);
        data.append('title', title);
        data.append('salary', salary);
        data.append('location', location);

        try {
            let result = await fetch('/api/upload-mongo-image', {
                method: "POST",
                body: data
            });
            result = await result.json();
            if (result.success) {
                alert("Successfully Uploaded!!");
            } else {
                alert("Failed!!");
            }
        } catch (error) {
            console.log(error);
            alert("Failed!!");
        }
    };

    return (
        <>
            <h2>Upload Image and Vacancy Details in Next.js</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='title'
                    placeholder='Job Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                /><br /><br />
                <input
                    type='text'
                    name='salary'
                    placeholder='Salary'
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                /><br /><br />
                <input
                    type='text'
                    name='location'
                    placeholder='Location'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                /><br /><br />
                <input
                    type='file'
                    name='file'
                    onChange={(e) => setFile(e.target.files?.[0])}
                /><br /><br />
                <button type='submit'>Upload</button>
            </form>
        </>
    );
};

export default UploadImage;
