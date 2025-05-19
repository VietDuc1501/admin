import Lesson from '../../types/Lesson';

export const fetchLessonsByCourseId = async (courseId: string): Promise<Lesson[]> => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/lessons/course/${courseId}`);
    if (!res.ok) throw new Error('Failed to fetch lessons');
    return res.json();
};

export const addLessonToCourse = async (courseId: string, lesson: Partial<Lesson>): Promise<Lesson> => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/lessons`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...lesson, courseId }),
    });
    if (!res.ok) throw new Error('Failed to add lesson');
    return res.json();
};

export const updateLessonById = async (lessonId: string, lesson: Partial<Lesson>): Promise<Lesson> => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/lessons/${lessonId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lesson),
    });
    if (!res.ok) throw new Error('Failed to update lesson');
    return res.json();
};

export const deleteLessonById = async (lessonId: string): Promise<void> => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/lessons/${lessonId}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete lesson');
};