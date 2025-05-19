import React, { FormEvent } from 'react';
import Lesson from '../../types/Lesson';
import { updateLessonById } from '../../hooks/lesson/useLesson'; // Đổi đường dẫn nếu cần
import '../../styles/lesson/EditLessonForm.css'; // Đổi đường dẫn nếu cần
interface EditLessonFormProps {
    lesson: Lesson;
    onChange: (lesson: Lesson) => void;
    onCancel: () => void;
    onSuccess?: () => void;
}

const EditLessonForm: React.FC<EditLessonFormProps> = ({ lesson, onChange, onCancel, onSuccess }) => {
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await updateLessonById(lesson.id, lesson);
            alert("Cập nhật bài học thành công!");
            if (onSuccess) onSuccess();
            //f5 lại trang
            window.location.reload();
        } catch (err) {
            alert("Cập nhật thất bại!");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Edit Lesson</h3>
            <div>
                <label htmlFor="edit-lesson-name">Name:</label>
                <input
                    id="edit-lesson-name"
                    type="text"
                    value={lesson.name}
                    onChange={e => onChange({ ...lesson, name: e.target.value })}
                    required
                />
            </div>
            <div>
                <label htmlFor="edit-lesson-description">Description:</label>
                <textarea
                    id="edit-lesson-description"
                    value={lesson.description}
                    onChange={e => onChange({ ...lesson, description: e.target.value })}
                    required
                />
            </div>
            <div>
                <label htmlFor="edit-lesson-reference">Reference Link:</label>
                <input
                    id="edit-lesson-reference"
                    type="text"
                    value={lesson.referenceLink}
                    onChange={e => onChange({ ...lesson, referenceLink: e.target.value })}
                />
            </div>
            <div>
                <label htmlFor="lesson-date">Lesson Date</label>
                <input
                    id="lesson-date"
                    type="date"
                    value={lesson.lessonDate || ''}
                    onChange={e => onChange({ ...lesson, lessonDate: e.target.value })}
                />
            </div>
            <button type="submit">Update</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default EditLessonForm;