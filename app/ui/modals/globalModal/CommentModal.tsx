import { FaArrowDown } from "react-icons/fa";

export default function ModalComment({ candidate }) {

    return (      
        <div className="h-full w-full">
        <div>Имя: {candidate.name}</div>
        <div tabIndex={0} className="collapse bg-base-200">
        <h3 className="collapse-title text-xl font-medium flex items-center justify-between">
          Существующие комментарии <span><FaArrowDown /></span>
        </h3>
        <ul className=" overflow-y-auto collapse-content">
          {candidate?.comment?.map((c, index) => (
            <li key={index}><span className='badge badge-accent'>{new Date(c.date).toLocaleString().slice(0, 10)}</span> - {c.text}</li>
          ))}
        </ul>
      </div>
      </div>  
    );
  }