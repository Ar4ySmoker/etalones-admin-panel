// 'use client';
// import { useState } from "react";
// import Image from 'next/image';
// // import PreviewNews from '@/app/ui/dashboard/FormNews/PreviewNews';
// import { useRouter } from "next/navigation";
// import TextInput from "../../inputs/TextInput/TextInput";

// const FormNews = ({ news }) => {
//     const [file, setFile] = useState(null);
//     const [title, setTitle] = useState(news.title || '');
//     const [source, setSource] = useState(news.source || '');
//     const [description, setDescription] = useState(news.description || '');
//     const [content, setContent] = useState(news.content || '');
//     const [category, setCategory] = useState(news.category || '');

//     const router = useRouter();

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         if (file) {
//             formData.append('file', file);
//         }
//         formData.append('title', title);
//         formData.append('source', source);
//         formData.append('description', description);
//         formData.append('content', content);
//         formData.append('category', category);

//         try {
//             const response = await fetch(`/api/news/${news._id}`, {
//                 method: 'PUT',
//                 body: formData
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to update news');
//             }

//             const result = await response.json();
//             if (result.success) {
//                 alert('Успешно обновлено!');
//                 router.refresh();
//                 router.push("/dashboard/news");
//             } else {
//                 alert('Не удалось обновить');
//             }
//         } catch (error) {
//             console.error('Ошибка обновления новости:', error);
//             alert('Не удалось обновить новость');
//         }
//     };

//     const handleFileChange = (e) => {
//         setFile(e.target.files[0]);
//     };

//     return (
//         <>
//             <h2>Изменить новость</h2>
//             <div>
//                 <form onSubmit={handleSubmit}>
//                     <div className="flex flex-wrap justify-center w-full h-max mt-8">
//                         <div className="card w-96 glass m-4">
//                             <figure>
//                                 {file ? (
//                                     <Image
//                                         src={URL.createObjectURL(file)}
//                                         alt="Uploaded file"
//                                         width={400}
//                                         height={400}
//                                     />
//                                 ) : (
//                                     <Image
//                                         src={`data:${news.image.contentType};base64,${Buffer.from(news.image.data).toString('base64')}`}
//                                         alt={news.image.name}
//                                         width={400}
//                                         height={400}
//                                     />
//                                 )}
//                             </figure>
//                             <div className="card-body">
//                                 <TextInput
//                                     title="Заголовок"
//                                     type="text"
//                                     id="title"
//                                     value={title}
//                                     onChange={(e) => setTitle(e.target.value)}
//                                 />
//                                 <TextInput
//                                     title="Источник"
//                                     type="text"
//                                     id="source"
//                                     value={source}
//                                     onChange={(e) => setSource(e.target.value)}
//                                 />
//                                 <TextInput
//                                     title="Описание"
//                                     type="text"
//                                     id="description"
//                                     value={description}
//                                     onChange={(e) => setDescription(e.target.value)}
//                                 />
//                                 <TextInput
//                                     title="Категория"
//                                     type="text"
//                                     id="category"
//                                     value={category}
//                                     onChange={(e) => setCategory(e.target.value)}
//                                 />
                               
//                                 <input
//                                     className="file-input file-input-bordered w-full max-w-xs"
//                                     type='file'
//                                     name='file'
//                                     onChange={handleFileChange}
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="divider"></div>
//                     <div className="grid grid-cols-2 gap-4">
//                         {/* <PreviewNews news={news} file={file} /> */}
//                         <div className="grid items-end">
//                             <label htmlFor="">
//                                 <div>Содержание новости</div>
//                                 <textarea
//                                     className="textarea textarea-accent md:w-[300px] h-[200px]"
//                                     placeholder="Содержание новости"
//                                     name='content'
//                                     value={content}
//                                     onChange={(e) => setContent(e.target.value)}
//                                 />
//                             </label>
//                             <button className="btn btn-primary w-full max-w-xs" type="submit">
//                                 Обновить новость
//                             </button>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </>
//     );
// };

// export default FormNews;
'use client';
import { useState } from "react";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import TextInput from "../../inputs/TextInput/TextInput";

const FormNews = ({ news }) => {
    const [file, setFile] = useState(null);
    const [source, setSource] = useState(news.source || '');
    const [title, setTitle] = useState(news.title || '');
    const [category, setCategory] = useState(news.category || '');
    const [description, setDescription] = useState(news.description || '');
    const [content, setContent] = useState(news.content || [{ title: '', content: '' }]);

    const router = useRouter();

    const handleContentChange = (index, field, value) => {
        const newContent = [...content];
        newContent[index][field] = value;
        setContent(newContent);
    };

    const addContentSection = () => {
        setContent([...content, { title: '', content: '' }]);
    };

    const removeContentSection = (index) => {
        const newContent = content.filter((_, i) => i !== index);
        setContent(newContent);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (file) formData.append('file', file);
        formData.append('source', source);
        formData.append('title', title);
        formData.append('category', category);
        formData.append('description', description);
        formData.append('content', JSON.stringify(content));

        try {
            const response = await fetch(`/api/news/${news._id}`, {
                method: 'PUT',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to update news');
            }

            const result = await response.json();
            if (result.success) {
                alert('Успешно обновлено!');
                router.refresh();
                router.push("/dashboard/news");
            } else {
                alert('Не удалось обновить');
            }
        } catch (error) {
            console.error('Ошибка обновления новости:', error);
            alert('Не удалось обновить новость');
        }
    };

    return (
        <>
            <h2>Изменить новость</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-wrap justify-center w-full h-max mt-8">
                        <div className="card w-96 glass m-4">
                            <figure>
                                {file ? (
                                    <Image
                                        src={URL.createObjectURL(file)}
                                        alt="Uploaded file"
                                        width={400}
                                        height={400}
                                    />
                                ) : (
                                    <Image
                                        src={`data:${news.image.contentType};base64,${Buffer.from(news.image.data).toString('base64')}`}
                                        alt={news.image.name}
                                        width={400}
                                        height={400}
                                    />
                                )}
                            </figure>
                            <div className="card-body">
                                <TextInput
                                    title="Заголовок"
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <TextInput
                                    title="Источник"
                                    type="text"
                                    id="source"
                                    value={source}
                                    onChange={(e) => setSource(e.target.value)}
                                />
                                <TextInput
                                    title="Категория"
                                    type="text"
                                    id="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                />
                                <textarea
                                    className="textarea textarea-accent md:w-[300px] h-[100px]"
                                    placeholder="Описание"
                                    name='description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <input
                                    className="file-input file-input-bordered w-full max-w-xs"
                                    type='file'
                                    name='file'
                                    onChange={(e) => setFile(e.target.files?.[0])}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="grid grid-cols-2 gap-4">
                        {content.map((section, index) => (
                            <div key={index}>
                                <TextInput
                                    title={`Заголовок Раздела ${index + 1}`}
                                    type='text'
                                    id={`content[${index}].title`}
                                    placeholder='Заголовок Раздела'
                                    value={section.title}
                                    onChange={(e) => handleContentChange(index, 'title', e.target.value)}
                                />
                                <textarea
                                    className="textarea textarea-accent md:w-[300px] h-[100px]"
                                    placeholder={`Содержание Раздела ${index + 1}`}
                                    name={`content[${index}].content`}
                                    value={section.content}
                                    onChange={(e) => handleContentChange(index, 'content', e.target.value)}
                                />
                                <button type="button" onClick={() => removeContentSection(index)} className="btn btn-danger">Удалить Раздел</button>
                            </div>
                        ))}
                        <button type="button" onClick={addContentSection} className="btn btn-primary">Добавить Раздел</button>
                        <button className="btn btn-success" type='submit'>Обновить новость</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default FormNews;
