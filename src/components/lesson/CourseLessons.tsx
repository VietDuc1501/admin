import React, { useEffect, useState, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import Lesson from '../../types/Lesson';
import { fetchLessonsByCourseId, updateLessonById, deleteLessonById, addLessonToCourse } from '../../hooks/lesson/useLesson';
import EditLessonForm from './EditLessonForm';
import LessonActions from './LessonActions';
import AddLesson from './AddLesson';
import '../../styles/lesson/CourseLessons.css';

type NewLesson = Omit<Lesson, 'id' | 'courseId'> & { referenceLink?: string; lessonDate?: string | null };

const CourseLessons: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        if (!courseId) return;
        const fetchLessons = async () => {
            const data = await fetchLessonsByCourseId(courseId);
            setLessons(data);
        };
        fetchLessons();
    }, [courseId]);

    const handleEditLesson = (lesson: Lesson) => setEditingLesson({ ...lesson });

    const handleDeleteLesson = async (lessonId: string) => {
        await deleteLessonById(lessonId);
        setLessons(lessons.filter(l => l.id !== lessonId));
    };

    // Sử dụng AddLesson component
    const handleAddLesson = async (lesson: NewLesson) => {
        if (!courseId) return;
        const lessonToAdd = { ...lesson, courseId };
        const added = await addLessonToCourse(courseId, lessonToAdd);
        setLessons([...lessons, added]);
        setShowAddForm(false);
    };

    return (
        <div className="course-lessons-container">
            <h2>Lessons of Course</h2>
            <button className="add-lesson-btn" onClick={() => setShowAddForm(!showAddForm)}>
                {showAddForm ? 'Close Add Lesson' : 'Add Lesson'}
            </button>
            {showAddForm && (
                <AddLesson onAdd={handleAddLesson} />
            )}
            {editingLesson && (
                <EditLessonForm
                    lesson={editingLesson}
                    onChange={setEditingLesson}
                    onCancel={() => setEditingLesson(null)}
                />
            )}
            <ul className="lesson-list">
                {lessons.map(lesson => (
                    <li key={lesson.id}>
                        <strong>{lesson.name}</strong>
                        <div>{lesson.description}</div>
                        {lesson.referenceLink && (
                            <div>
                                <a href={lesson.referenceLink} target="_blank" rel="noopener noreferrer">
                                    Reference
                                </a>
                            </div>
                        )}
                        {lesson.lessonDate && (
                            <div>
                                Date: {new Date(lesson.lessonDate).toLocaleDateString('vi-VN')}
                            </div>
                        )}
                        <LessonActions lesson={lesson} onEdit={handleEditLesson} onDelete={handleDeleteLesson} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CourseLessons;