import { NextResponse } from 'next/server';
import { connectToDB } from '@/app/lib/utils';
import { Candidate, Task } from '@/app/lib/models';

export const GET = async (req) => {
  try {
    await connectToDB();

    // Получение query параметра для фильтрации
    const url = new URL(req.url, `http://${req.headers.host}`);
    const paidFilter = url.searchParams.get('paid');
    
    // Формируем фильтр
    const filter = paidFilter ? { paid: paidFilter === 'true' } : {};
    
    const tasks = await Task.find(filter).populate('candidate').populate('partner');
    return new NextResponse(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    console.error('Server error:', error);
    return new NextResponse(JSON.stringify({ message: 'Internal server error', error: error.message }), { status: 500 });
  }
};

export const POST = async (req) => {
  try {
    const { candidateId, partnerId, dateOfCompletion, title, text, checkboxes } = await req.json(); // Извлекаем checkbox состояния также

    await connectToDB();

    // Найти кандидата
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return new NextResponse(JSON.stringify({ message: 'Candidate not found' }), { status: 404 });
    }

    // Создать новую задачу
    const newTask = new Task({
      text,
      paid: false,
      candidate: candidateId,
      partner: partnerId,
      title,
      dateOfCompletion,
      // date,
      ...checkboxes, // Передаем состояния чекбоксов
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
