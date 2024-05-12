"use client";
 
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditCandidateForm({ id, candidate, professions, langues, locations, statuses, managers }) {
    const [newName, setNewName] = useState(candidate.name);
    const [newAge, setNewAge] = useState(candidate.age);
    const [newPhone, setNewPhone] = useState(candidate.phone);
    const [newProfession, setNewProfession] = useState(candidate.profession.name);
    const [newLocations, setNewLocations] = useState(candidate.locations.name);
    const [newLangue, setNewLangue] = useState(candidate.langue.name);
    const [newStatus, setNewStatus] = useState(candidate.status.name);
    const [newManager, setNewManager] = useState(candidate.manager.name);
 
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
 
        try {
            const res = await fetch(`http://localhost:3000/api/candidates/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ newName, newAge, newPhone, newProfession, newLocations, newLangue, newStatus, newManager }),
            });
 
            if (!res.ok) {
                throw new Error("Failed to update Candidate");
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
            <h1 className="font-bold py-10 text-2xl">Update Candidate</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
                onChange={(e) => setNewName(e.target.value)}
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
            <select
    onChange={(e) => setNewProfession(e.target.value)}
    value={candidate.profession._id}
    className="input input-bordered input-accent w-full max-w-xs"
>
    {professions.map(profession => (
        <option key={profession._id} value={profession._id}>{profession.name}</option>
    ))}
</select>

        <select
          onChange={(e) => setNewLocations(e.target.value)}
          value={candidate.locations._id}
          className="input input-bordered input-accent w-full max-w-xs"
        >
          {locations.map(location => (
            <option key={location._id} value={location._id}>{location.name}</option>
          ))}
        </select>
           
             <select
          onChange={(e) => setNewLangue(e.target.value)}
          value={candidate.langue.name}
          className="input input-bordered input-accent w-full max-w-xs"
        >
          {langues.map(langues => (
            <option key={langues._id} value={langues._id}>{langues.name}</option>
          ))}
        </select>
        <select
          onChange={(e) => setNewStatus(e.target.value)}
          value={candidate.status.name}
          className="input input-bordered input-accent w-full max-w-xs"
        >
          {statuses.map(statuses => (
            <option key={statuses._id} value={statuses._id}>{statuses.name}</option>
          ))}
        </select>
        <select
          onChange={(e) => setNewManager(e.target.value)}
          value={candidate.manager.name}
          className="input input-bordered input-accent w-full max-w-xs"
        >
          {managers.map(managers => (
            <option key={managers._id} value={managers._id}>{managers.name}</option>
          ))}
        </select>
     
 
            <button className="btn btn-primary w-full max-w-xs">
                Update Candidate
            </button>
        </form>
        </>
    );
}
