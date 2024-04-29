'use client'
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";
import { updateCandidate } from "@/app/lib/myAction";

const handleUpdateCandidate = async (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  await updateCandidate(formData);
};

export default function UpdateForm({ candidate, locations, profession }) {
  return (
    <div className={styles.container}>
      <form onSubmit={handleUpdateCandidate} className={styles.form}>
        <input type="hidden" name="_id" value={candidate._id} />

        <input
          id="name"
          name="name"
          type="text"
          defaultValue={candidate.name} // Используйте defaultValue вместо placeholder
          required
        />

        <input
          id="phone"
          name="phone"
          type="text"
          defaultValue={candidate.phone} // Используйте defaultValue вместо placeholder
          required
        />
        <select
          id="profession"
          name="profession"
          className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          defaultValue={candidate.profession}
          aria-describedby="profession-error"
        >

          {profession.map((profession: any) => (
            <option key={profession._id} value={profession._id}>
              {profession.name}
            </option>
          ))}
        </select>
        <select id="location" name="location" defaultValue={candidate.location} required>
          {locations.map((location) => (
            <option key={location._id} value={location._id}>
              {location.name}
            </option>
          ))}
        </select>


        <button type="submit">Обновить кандидата</button>
      </form>
    </div>
  );
}
