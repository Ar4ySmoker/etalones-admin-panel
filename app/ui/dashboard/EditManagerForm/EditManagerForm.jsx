'use client';
import { useState } from "react";
import Image from 'next/image';
import TransparentInput from "../../inputs/TransparentInput/TransparentInput";
import { useRouter } from "next/navigation";

const EditManagerForm = ({ manager }) => {
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [telegram, setTelegram] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [viber, setViber] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('file', file);
        data.append('name', name);
        data.append('phone', phone);
        data.append('telegram', telegram);
        data.append('viber', viber);
        data.append('whatsapp', whatsapp);

        try {
            const response = await fetch(`/api/manager/${manager._id}`, {
                method: 'PUT',
                body: data
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
const router = useRouter()
    return (
        <>
            <h2>Изменить менеджера</h2>
            <div >
                <form onSubmit={handleSubmit} >
                <input
                     className="file-input file-input-bordered  w-full max-w-xs"
                        type='file'
                        name='file'
                        onChange={handleFileChange}
                    />
                <div className="flex flex-wrap justify-center w-full h-max mt-8">
                        <div className="card w-96 glass m-4">
                            <figure>
                            {/* {file ? (
            <Image
                src={URL.createObjectURL(file)}
                alt="Uploaded file"
                width={400}
                height={400}
            />
        ) : (
            <Image
                src={`data:${manager.image.contentType};base64,${Buffer.from(manager.image.data).toString('base64')}`}
                alt={manager.image.name}
                width={400}
                height={400}
            />
        )} */}
                            </figure>
                            <div className="card-body">
                                <TransparentInput className='font-bold bg-transparent'
                                    defaultValue={manager.name} type='text' name='name' onChange={(e) => setName(e.target.value)}/>
                                <p className="text-md font-semibold mt-2 w-max">📍<i className="bi bi-geo-alt-fill text-red-500"></i>
                                    <TransparentInput className='font-bold bg-transparent'
                                        defaultValue={manager.phone} type='text' name='phone' onChange={(e) => setPhone(e.target.value)}/></p>
                          
                                <p className="text-sm font-bold">💰 <i className="bi bi-cash ">Зарплата</i>&nbsp;
                                <TransparentInput className='font-bold bg-transparent'
                                        defaultValue={manager.telegram} type='text' name='telegran' onChange={(e) => setTelegram(e.target.value)}/>
                                 </p>
                                <p className="text-sm font-bold">🏠 <i className="bi bi-cash ">Проживание</i>&nbsp;
                                <TransparentInput className='font-bold bg-transparent'
                                        defaultValue={manager.whatsapp} type='text' name='whatsapp' onChange={(e) => setWhatsapp(e.target.value)}/>
                                 </p>
                                <p className="text-sm font-bold">🚘 <i className="bi bi-cash ">Транспорт</i>&nbsp;
                                <TransparentInput className='font-bold bg-transparent'
                                        defaultValue={manager.viber} type='text' name='viber' onChange={(e) => setViber(e.target.value)}/>
                                 </p>
                                 
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-primary w-full max-w-xs" type="submit">
                        Обновить мененджера
                    </button>
                </form>
            </div>
        </>
    );
};

export default EditManagerForm;


