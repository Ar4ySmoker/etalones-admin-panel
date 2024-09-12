// Пример функции для получения задач из базы данных
export async function getTasksFromDatabase(): Promise<Array<{ 
    _id: string, 
    candidate: string, 
    partner: string, 
    paid: boolean, 
    title: string, 
    text: string, 
    dateOfCompletion: string, 
    firstInterview: boolean, 
    partnerInterview: boolean, 
    sentDocuments: boolean, 
    haLeft: boolean, 
    onObject: boolean, 
    fired: boolean, 
    createdAt: string, 
    updatedAt: string 
  }>> {
    // Здесь должна быть ваша логика получения задач из базы данных
    // Это может быть вызов к API, запрос к базе данных и т.д.
    // Пример:
    // return fetch('https://your-database-api/tasks').then(res => res.json());
  
    // Здесь возвращаем фиктивные данные для примера
    return [
      {
        _id: '66e13c1e6237adfa51910c28',
        candidate: '66d6fc38e611259472671a2b',
        partner: '664ef7b445d2ae8110a3ac19',
        paid: false,
        title: '',
        text: 'Кандидат Новый кандидат для тестов отправлен на собеседование к партнёру.',
        dateOfCompletion: '2024-09-12T00:00:00.000+00:00',
        firstInterview: true,
        partnerInterview: true,
        sentDocuments: false,
        haLeft: false,
        onObject: false,
        fired: false,
        createdAt: '2024-09-11T06:43:42.680+00:00',
        updatedAt: '2024-09-11T06:43:42.680+00:00',
      },
    ];
  }
  