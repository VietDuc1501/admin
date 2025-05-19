import React, { useState, FormEvent } from 'react';
import Lesson from '../../types/Lesson';

type NewLesson = Omit<Lesson, 'id' | 'courseId'> & {
    referenceLink?: string;
    lessonDate?: string | null;
};

type AddLessonProps = {
    onAdd: (lesson: NewLesson) => void;
};

const AddLesson: React.FC<AddLessonProps> = ({ onAdd }) => {
    const [lesson, setLesson] = useState<NewLesson>({
        name: '',
        description: '',
        referenceLink: '',
        lessonDate: '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onAdd({
            ...lesson,
            lessonDate:
                lesson.lessonDate && lesson.lessonDate !== ''
                    ? new Date(lesson.lessonDate).toISOString()
                    : undefined,
        });
        setLesson({
            name: '',
            description: '',
            referenceLink: '',
            lessonDate: '',
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="lesson-name">Lesson Name</label>
                <input
                    id="lesson-name"
                    type="text"
                    placeholder="Lesson Name"
                    value={lesson.name}
                    onChange={e => setLesson({ ...lesson, name: e.target.value })}
                    required
                />
            </div>
            <div>
                <label htmlFor="lesson-description">Description</label>
                <textarea
                    id="lesson-description"
                    placeholder="Description"
                    value={lesson.description}
                    onChange={e => setLesson({ ...lesson, description: e.target.value })}
                    required
                />
            </div>
            <div>
                <label htmlFor="lesson-reference">Reference Link</label>
                <input
                    id="lesson-reference"
                    type="text"
                    placeholder="Reference Link"
                    value={lesson.referenceLink || ''}
                    onChange={e => setLesson({ ...lesson, referenceLink: e.target.value })}
                />
            </div>
            <div>
                <label htmlFor="lesson-date">Lesson Date</label>
                <input
                    id="lesson-date"
                    type="date"
                    value={lesson.lessonDate || ''}
                    onChange={e => setLesson({ ...lesson, lessonDate: e.target.value })}
                />
            </div>
            <button type="submit">Add Lesson</button>
        </form>
    );
};

export default AddLesson;