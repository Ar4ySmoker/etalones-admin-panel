'use client';
import { useState } from "react";
import Image from 'next/image';
import TransparentInput from "../../inputs/TransparentInput/TransparentInput";
import { useRouter } from "next/navigation";

const EditManagerForm = ({ manager }) => {
    const [file, setFile] = useState(null);
    const [name, setName] = useState(manager.name || '');
    const [phone, setPhone] = useState(manager.phone || '');
    const [telegram, setTelegram] = useState(manager.telegram || '');
    const [whatsapp, setWhatsapp] = useState(manager.whatsapp || '');
    const [viber, setViber] = useState(manager.viber || '');

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('telegram', telegram);
        formData.append('whatsapp', whatsapp);
        formData.append('viber', viber);
        
        if (file) {
            formData.append('file', file);
        }
    
        try {
            const response = await fetch(`/api/manager/${manager._id}`, {
                method: 'PUT',
                body: formData
            });
    
            if (!response.ok) {
                throw new Error('Failed to update manager');
            }
    
            const result = await response.json();
            if (result.success) {
                alert('Успешно обновлено!');
                router.refresh();
                router.push("/dashboard/managers");
            } else {
                alert('Не удалось обновить');
            }
        } catch (error) {
            console.error('Ошибка обновления manager:', error);
            alert('Не удалось обновить manager');
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <>
            <h2>Изменить менеджера</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        className="file-input file-input-bordered w-full max-w-xs"
                        type='file'
                        name='file'
                        onChange={handleFileChange}
                    />
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
                                ) : manager.image ? (
                                    <Image
                                        src={`data:${manager.image.contentType};base64,${Buffer.from(manager.image.data).toString('base64')}`}
                                        alt={manager.image.name}
                                        width={400}
                                        height={400}
                                    />
                                ) : (
                                    <p>Загрузите изображение</p>
                                )}
                            </figure>
                            <div className="card-body">
                                <TransparentInput
                                    value={name} type='text' name='name' onChange={(e) => setName(e.target.value)}
                                />
                                <p className="text-md font-semibold mt-2 w-max">
                                    📍<i className="bi bi-geo-alt-fill text-red-500"></i>
                                    <TransparentInput
                                        value={phone} type='text' name='phone' onChange={(e) => setPhone(e.target.value)}
                                    />
                                </p>
                                <p className="text-sm font-bold">
                                    💰 <i className="bi bi-cash ">Telegram</i>&nbsp;
                                    <TransparentInput
                                        value={telegram} type='text' name='telegram' onChange={(e) => setTelegram(e.target.value)}
                                    />
                                </p>
                                <p className="text-sm font-bold">
                                    🏠 <i className="bi bi-cash ">Whatsapp</i>&nbsp;
                                    <TransparentInput
                                        value={whatsapp} type='text' name='whatsapp' onChange={(e) => setWhatsapp(e.target.value)}
                                    />
                                </p>
                                <p className="text-sm font-bold">
                                    🚘 <i className="bi bi-cash ">Viber</i>&nbsp;
                                    <TransparentInput
                                        value={viber} type='text' name='viber' onChange={(e) => setViber(e.target.value)}
                                    />
                                </p>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-primary w-full max-w-xs" type="submit">
                        Обновить менеджера
                    </button>
                </form>
            </div>
        </>
    );
};

export default EditManagerForm;
