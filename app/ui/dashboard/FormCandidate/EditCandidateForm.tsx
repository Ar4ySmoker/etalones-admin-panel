"use client";
 
import { useState } from "react";
import { useRouter } from "next/navigation";
 
export default function EditCandidateForm({id, name, age, phone, profession, locations, langue, status, manager}) {
    const [newName, setNewTitle] = useState(name);
    const [newAge, setNewAge] = useState(age);
    const [newPhone, setNewPhone] = useState(phone);
    const [newProfession, setNewProfession] = useState(profession);
    const [newLocations, setNewLocations] = useState(locations);
    const [newLangue, setNewLangue] = useState(langue);
    const [newStatus, setNewStatus] = useState(status);
    const [newManager, setNewManager] = useState(manager);
 
    const router = useRouter();
 
    const handleSubmit = async (e) => {
        e.preventDefault();
 
        try {
            const res = await fetch(`http://localhost:3000/api/products/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ newName, newAge, newPhone, newProfession, newLocations, newLangue, newStatus, newManager}),
            });
 
            if (!res.ok) {
                throw new Error("Failed to update Product");
            }
 
            router.refresh();
            router.push("/dashboard/candidates");
        } catch (error) {
            console.log(error);
        }
    };
 
    return (
        <>
        <div className="flex justify-between items-center">
            <h1 className="font-bold py-10 text-2xl">Update Product</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
                onChange={(e) => setNewTitle(e.target.value)}
                value={newName}
                className="input input-bordered input-accent w-full max-w-xs"
                type="text"
            />
 
            <input
                onChange={(e) => setNewAge(e.target.value)}
                value={newAge}
                className="input input-bordered input-accent w-full max-w-xs"
                type="text"
            />
            <input
                onChange={(e) => setNewPhone(e.target.value)}
                value={newPhone}
                className="input input-bordered input-accent w-full max-w-xs"
                type="text"
            />
            <input
                onChange={(e) => setNewProfession(e.target.value)}
                value={newProfession.name}
                className="input input-bordered input-accent w-full max-w-xs"
                type="text"
            />
             <input
                onChange={(e) => setNewLocations(e.target.value)}
                value={newLocations.name}
                className="input input-bordered input-accent w-full max-w-xs"
                type="text"
            />
              <input
                onChange={(e) => setNewLangue(e.target.value)}
                value={newLangue.name}
                className="input input-bordered input-accent w-full max-w-xs"
                type="text"
            />
              <input
                onChange={(e) => setNewStatus(e.target.value)}
                value={newStatus.name}
                className="input input-bordered input-accent w-full max-w-xs"
                type="text"
            />
            <input
                onChange={(e) => setNewManager(e.target.value)}
                value={newManager.name}
                className="input input-bordered input-accent w-full max-w-xs"
                type="text"
            />
 
            <button className="btn btn-primary w-full max-w-xs">
                Update Candidate
            </button>
        </form>
        </>
    );
}