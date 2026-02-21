import { useEffect } from 'react';
import { useGlobalState } from '../context/GlobalStateContext';

export const useLearnFluxSync = () => {
    const { enrollments, updateStudentProgress, addNotification } = useGlobalState();

    useEffect(() => {
        const interval = setInterval(() => {
            // Randomly pick an enrollment to update
            if (enrollments && enrollments.length > 0) {
                const randomEnrollmentIndex = Math.floor(Math.random() * enrollments.length);
                const randomEnrollment = enrollments[randomEnrollmentIndex];

                // Simulate progress increment
                let newProgress = randomEnrollment.progress + Math.floor(Math.random() * 5);
                if (newProgress > 100) newProgress = 100;

                // Simulate grade changes
                let newGrade = randomEnrollment.grade;
                if (newProgress > 90) newGrade = 'A';
                else if (newProgress > 75) newGrade = 'B';
                else if (newProgress > 60) newGrade = 'C';

                if (newProgress !== randomEnrollment.progress) {
                    updateStudentProgress(randomEnrollment.studentId, randomEnrollment.courseId, newProgress, newGrade);

                    // Add a notification occasionally
                    if (Math.random() > 0.7) {
                        addNotification(`Student ${randomEnrollment.studentId} just reached ${newProgress}% in course ${randomEnrollment.courseId}!`);
                    }
                }
            }
        }, 30000); // Every 30 seconds

        return () => clearInterval(interval);
    }, [enrollments, updateStudentProgress, addNotification]);
};
