import React from 'react';
import Lesson from '../../types/Lesson';

interface LessonActionsProps {
    lesson: Lesson;
    onEdit: (lesson: Lesson) => void;
    onDelete: (lessonId: string) => void;
}

const LessonActions: React.FC<LessonActionsProps> = ({ lesson, onEdit, onDelete }) => (
    <div className="lesson-actions">
        <button onClick={() => onEdit(lesson)}>Edit</button>
        <button onClick={() => onDelete(lesson.id)}>Delete</button>
    </div>
);

export default LessonActions;