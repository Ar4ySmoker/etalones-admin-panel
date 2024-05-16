// Компонент для добавления комментариев к кандидату
import React from 'react';
import cls from "./AddCommentForm.module.css"

export function AddCommentForm({ candidateId }) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const commentText = formData.get('commentText'); // Убедитесь, что имя поля 'commentText' соответствует <textarea name="commentText">

    const response = await fetch('/api/addComment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ candidateId, commentText }), // Убедитесь, что ключи соответствуют ожиданиям API
    });

    if (response.ok) {
      console.log('Comment added');
    } else {
      console.error('Failed to add comment');
    }
  };

  return (
    <form className={cls.form} onSubmit={handleSubmit}>
      <textarea  name="commentText" required placeholder="Введите комментарий"></textarea>
      <button  type="submit">Добавить комментарий</button>
    </form>
  );
}

