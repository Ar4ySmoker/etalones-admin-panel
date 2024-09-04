import { NextResponse } from 'next/server';
import { connectToDB } from '@/app/lib/utils';
import { Candidate, Task } from '@/app/lib/models';
// Убедитесь, что у вас есть правильный путь к вашей модели

export const GET = async (req) => {
  try {
    await connectToDB();

    // Получение query параметра для фильтрации
    const url = new URL(req.url, `http://${req.headers.host}`);
    const candidateId = url.searchParams.get('id');
    
    if (!candidateId) {
      return new NextResponse(JSON.stringify({ message: 'Candidate ID is required' }), { status: 400 });
    }
    
    // Находим одного кандидата по его ID
    const candidate = await Candidate.findById(candidateId);
    
    if (!candidate) {
      return new NextResponse(JSON.stringify({ message: 'Candidate not found' }), { status: 404 });
    }

    return new NextResponse(JSON.stringify(candidate), { status: 200 });
  } catch (error) {
    console.error('Server error:', error);
    return new NextResponse(JSON.stringify({ message: 'Internal server error', error: error.message }), { status: 500 });
  }
};


export const POST = async (req: Request) => {
  try {
    const { candidateId, title, date } = await req.json();

    await connectToDB();

    // Найти кандидата
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return new NextResponse(JSON.stringify({ message: 'Candidate not found' }), { status: 404 });
    }

    // Создать новую задачу
    const newTask = new Task({
      title: title,
      date: date,
      firstInterview: false,
      partnerInterview: false,
      sentDocuments: false,
      haLeft: false,
      onObject: false,
      fired: false
    });

    // Сохранить новую задачу
    await newTask.save();

    // Добавить задачу к кандидату
    candidate.tasks.push(newTask._id);
    await candidate.save();

    return new NextResponse(
      JSON.stringify({ message: 'Task added to candidate', candidateId: candidate._id, taskId: newTask._id }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Server error:', error);
    return new NextResponse(
      JSON.stringify({ message: 'Internal server error', error: error.message }),
      { status: 500 }
    );
  }
};
