/**
 * Calculates candidate's Placement Readiness Score dynamically based on:
 * 1. DSA Solved Problems (20% weight)
 * 2. SQL Solved Problems (15% weight)
 * 3. Aptitude Test Accuracy (15% weight)
 * 4. Resume Compatibility Score (15% weight)
 * 5. Development Skills (15% weight)
 * 6. Mock Interview Performance (10% weight)
 * 7. Communication Practice (10% weight)
 */
export const calculateDynamicReadiness = (userScores = {}) => {
  const dsa = userScores.dsa || 65;
  const sql = userScores.sql || 55;
  const aptitude = userScores.aptitude || 80;
  const resume = userScores.resume || 75;
  const development = userScores.development || 85;
  const interview = userScores.interview || 60;
  const communication = userScores.communication || 50;

  const weightedScore = (
    (dsa * 0.20) +
    (sql * 0.15) +
    (aptitude * 0.15) +
    (resume * 0.15) +
    (development * 0.15) +
    (interview * 0.10) +
    (communication * 0.10)
  );

  return Math.min(100, Math.max(0, Math.round(weightedScore)));
};
