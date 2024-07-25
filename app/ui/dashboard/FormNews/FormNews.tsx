'use client';
import { useState } from "react";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import TextInput from "../../inputs/TextInput/TextInput";

const FormNews = () => {
    const [file, setFile] = useState(null);
    const [source, setSource] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState([{ title: '', content: '' }]);

    const handleContentChange = (index, field, value) => {
        const newContent = [...content];
        newContent[index][field] = value;
        setContent(newContent);
    };

    const addContentSection = () => {
        setContent([...content, { title: '', content: '' }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        if (file) data.append('file', file);
        data.append('source', source);
        data.append('title', title);
        data.append('category', category);
        data.append('description', description);
        data.append('content', JSON.stringify(content));

        try {
            let result = await fetch('/api/news', {
                method: "POST",
                body: data
            });

            const resultJson = await result.json(); // Преобразуем ответ в JSON

            if (resultJson.success) {
                alert("Новость добавлена!");
                router.refresh();
                router.push("/dashboard/news");
            } else {
                alert("Ошибка при загрузке");
            }
        } catch (error) {
            console.error("Ошибка при обновлении страницы:", error);
            alert("Failed to upload");
        }
    };

    const router = useRouter();
    return (
        <>
            <h2>Создать Новость</h2>
            <div className="grid grid-cols-2 gap-4">
                <form onSubmit={handleSubmit}>
                    <input
                        className="file-input file-input-bordered w-full max-w-xs"
                        type='file'
                        name='file'
                        onChange={(e) => setFile(e.target.files?.[0])}
                    />
                    <TextInput 
                        title="Источник"
                        type='text'
                        id='source'
                        placeholder='Источник'
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                    />
                    <TextInput 
                        title="Заголовок"
                        type='text'
                        id='title'
                        placeholder='Заголовок'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextInput 
                        title="Категория"
                        type='text'
                        id='category'
                        placeholder='Категория'
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
                        </div>
                    ))}
                    <button type="button" onClick={addContentSection} className="btn btn-primary">Добавить Раздел</button>
                    <button className="btn btn-success" type='submit'>Создать</button>
                </form>
                <div>
                    <div className="flex flex-wrap justify-center w-full h-max mt-8">
                        <div className="card w-96 glass m-4">
                            <figure>
                                {file ? (
                                    <Image
                                        src={URL.createObjectURL(file)}
                                        alt="Uploaded file"
                                        width={400} height={400}
                                    />
                                ) : (
                                    'No image'
                                )}
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title font-bold">{title}</h2>
                                <p className="text-md font-semibold mt-2">Источник: {source}</p>
                                <p className="text-md font-semibold mt-2">Категория: {category}</p>
                                <p className="text-md font-semibold mt-2">Описание: {description}</p>
                                {content.map((section, index) => (
                                    <div key={index}>
                                        <h3 className="font-bold">{section.title}</h3>
                                        <p>{section.content}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FormNews;
