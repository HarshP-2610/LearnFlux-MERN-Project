import React, { useState } from 'react';
import { Plus, Trash2, CheckCircle } from 'lucide-react';
import { mockInstructorData } from '../../mockInstructorData';
import './QuestionBank.css';

const QuestionBank = () => {
    const [questions, setQuestions] = useState(mockInstructorData.questions);

    const [newQuestion, setNewQuestion] = useState({
        text: '',
        options: ['', '', '', ''],
        correct: '',
        difficulty: 'Medium'
    });

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...newQuestion.options];
        updatedOptions[index] = value;
        setNewQuestion({ ...newQuestion, options: updatedOptions });
    };

    const handleAddQuestion = (e) => {
        e.preventDefault();
        if (!newQuestion.text || newQuestion.options.some(o => !o) || !newQuestion.correct) {
            alert("Please fill all fields and select a correct answer.");
            return;
        }

        setQuestions([...questions, { ...newQuestion, id: `q${Date.now()}` }]);
        setNewQuestion({ text: '', options: ['', '', '', ''], correct: '', difficulty: 'Medium' });
    };

    return (
        <div className="question-bank">
            <div className="bank-header">
                <h2>Adaptive Question Bank</h2>
                <p className="subtitle">Create questions for AI-driven dynamic quizzes.</p>
            </div>

            <div className="qa-grid">
                <div className="qa-form-container">
                    <h3>Add New Question</h3>
                    <form className="qa-form" onSubmit={handleAddQuestion}>
                        <div className="form-row">
                            <label>Question Text</label>
                            <textarea
                                rows="3"
                                required
                                value={newQuestion.text}
                                onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
                                placeholder="E.g., What is the primary purpose of Context API?"
                            />
                        </div>

                        <div className="options-grid">
                            {newQuestion.options.map((option, index) => (
                                <div key={index} className="option-input-wrapper">
                                    <input
                                        type="radio"
                                        name="correctAnswer"
                                        checked={newQuestion.correct === option && option !== ''}
                                        onChange={() => setNewQuestion({ ...newQuestion, correct: option })}
                                        required
                                    />
                                    <input
                                        type="text"
                                        required
                                        placeholder={`Option ${index + 1}`}
                                        value={option}
                                        onChange={(e) => handleOptionChange(index, e.target.value)}
                                    />
                                </div>
                            ))}
                        </div>
                        <p className="hint">Select the radio button next to the correct answer.</p>

                        <div className="form-row">
                            <label>Difficulty Level</label>
                            <select
                                value={newQuestion.difficulty}
                                onChange={(e) => setNewQuestion({ ...newQuestion, difficulty: e.target.value })}
                            >
                                <option value="Easy">Easy (Fundamentals)</option>
                                <option value="Medium">Medium (Application)</option>
                                <option value="Hard">Hard (Advanced Topics)</option>
                            </select>
                        </div>

                        <button type="submit" className="btn-save-question">
                            <Plus size={18} /> Add to Bank
                        </button>
                    </form>
                </div>

                <div className="qa-list-container">
                    <h3>Available Questions ({questions.length})</h3>
                    <div className="qa-list">
                        {questions.map((q, index) => (
                            <div key={q.id} className="qa-card">
                                <div className="qa-card-header">
                                    <span className={`difficulty-tag ${q.difficulty.toLowerCase()}`}>
                                        {q.difficulty}
                                    </span>
                                    <button className="delete-q-btn" onClick={() => setQuestions(questions.filter(item => item.id !== q.id))}>
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                <p className="q-text"><strong>Q{index + 1}:</strong> {q.text}</p>
                                <ul className="q-options">
                                    {q.options.map((opt, i) => (
                                        <li key={i} className={opt === q.correct ? 'correct-opt' : ''}>
                                            {opt === q.correct && <CheckCircle size={14} className="check-icon" />}
                                            {opt}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionBank;
