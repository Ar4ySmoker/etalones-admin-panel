'use client';
import { useState, useEffect } from 'react';

export default function ManagerSelect() {
    const [managers, setManagers] = useState([]);
    const [selectedManager, setSelectedManager] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchManagers();
    }, []);

    const fetchManagers = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/manager');
            const data = await response.json();

            console.log("Fetched managers:", data);

            const extractedManagers = data.managers;

            if (Array.isArray(extractedManagers)) {
                setManagers(extractedManagers);
                setIsLoading(false);
            } else {
                console.error("Data.managers is not an array:", data);
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching managers:", error);
            setIsLoading(false);
        }
    };

    const handleSelectChange = (event) => {
        const managerId = event.target.value;
        const manager = managers.find((mgr) => mgr._id === managerId);
        setSelectedManager(manager);
    };

    if (isLoading) {
        return <p>Loading managers...</p>;
    }

    return (
        <div>
            <select onChange={handleSelectChange} defaultValue="">
                <option value="" disabled>Выберите менеджера</option>
                {managers.map((manager) => (
                    <option key={manager._id} value={manager._id}>
                        {manager.name}
                    </option>
                ))}
            </select>

        
        </div>
    );
}
