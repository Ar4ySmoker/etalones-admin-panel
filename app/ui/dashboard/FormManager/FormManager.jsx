'use client';
import { useState } from "react";

import { useRouter } from "next/navigation";
import TextInput from "../../inputs/TextInput/TextInput";
const FormManager = () => {
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [telegram, setTelegram] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [viber, setViber] = useState('');
   

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file || !name || !phone || !location || !telegram || !whatsapp || !viber ) {
            alert('Please fill in all fields and select a file');
            return;
        }

        const data = new FormData();
        data.append('file', file);
        data.append('name', name);
        data.append('phone', phone);
        data.append('telegram', telegram);
        data.append('viber', viber);
        data.append('whatsapp', whatsapp);
       

        try {
            let result = await fetch('/api/manager', {
                method: "POST",
                body: data
            });
            result = await result.json();
            if (result.success) {
                alert("Менеджер добавлена!!");
            } else {
                alert("Ошибка при загрузке");
            }
            router.refresh();
            router.push("/dashboard/manager");
        } catch (error) {
            console.error("Ошибка при обновлении страницы:", error);
            alert("Failed to upload");
        }
    };

const router = useRouter()
    return (
        <>
            <h2>Создать менеджера</h2>
            <div className="grid grid-cols-2 gap-4">
            <form onSubmit={handleSubmit}>
            <input
            className="file-input file-input-bordered  w-full max-w-xs"
                    type='file'
                    name='file'
                    onChange={(e) => setFile(e.target.files?.[0])}
                />
     
           
                
                <TextInput 
                title="Имя менеджера"
                    type='text'
                    name='name'
                    placeholder='Имя'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextInput 
                title="Телефон"
                    type='text'
                    name='phone'
                    placeholder='+37368162565'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <TextInput 
                title="Telegram"
                    type='text'
                    placeholder="https//t"
                    name='telegram'
                    onChange={(e) => setTelegram(e.target.value)}
                />
                <TextInput 
                title="Whatsapp"
                    type='text'
                    placeholder="https//"
                    name='whatsapp'
                    onChange={(e) => setWhatsapp(e.target.value)}
                />
                <TextInput 
                title="Viber"
                    type='text'
                    placeholder="https"
                    name='viber'
                    onChange={(e) => setViber(e.target.value)}
                />
                              <button className="btn btn-success" type='submit'>Создать</button>
            </form>
           
            </div>
        </>
    );
};

export default FormManager;
