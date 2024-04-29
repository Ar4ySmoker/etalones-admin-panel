'use client'
import React, { useState } from 'react';

const SearchComponent = () => {
    const [query, setQuery] = useState('');
    const [candidates, setCandidates] = useState([]);
    const [error, setError] = useState('');

    const handleSearch = async (event) => {
        event.preventDefault();
        try {
          const response = await fetch(`/api/searchCandidate?query=${query}`, {
            method: 'GET'
          });
      
          if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
          }
      
          const data = await response.json();
          setCandidates(data);
          setError('');
        } catch (error) {
          console.error('Ошибка при загрузке кандидатов:', error);
          setError(error.message);
        }
      };
      

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Введите имя или номер телефона"
                />
                <button type="submit">Поиск</button>
            </form>
            {error && <p>Ошибка: {error}</p>}
            <div>
                {candidates.map(candidate => (
                    <div key={candidate._id}>
                        <p>Имя: {candidate.name}</p>
                        <p>Телефон: {candidate.phone}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchComponent;
// 'use client'
// import React, { useState } from 'react';

// const SearchComponent = ({ onSearch }) => {
//     const [input, setInput] = useState('');

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         onSearch(input); // Передаем значение в родительский компонент
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input
//                 type="text"
//                 value={input}
//                 onChange={e => setInput(e.target.value)}
//                 placeholder="Введите имя или номер телефона"
//             />
//             <button type="submit">Поиск</button>
//         </form>
//     );
// };

// export default SearchComponent;
