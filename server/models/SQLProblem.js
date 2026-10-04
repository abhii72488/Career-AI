import mongoose from 'mongoose';

const SQLProblemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  topic: { type: String, required: true }, // SELECT, JOIN, GROUP BY, Subqueries, Window Functions, CTE
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  description: { type: String, required: true },
  schemaDDL: { type: String, required: true }, // CREATE TABLE statements
  sampleDataDML: { type: String, required: true }, // INSERT statements
  expectedResult: {
    columns: [String],
    rows: []
  },
  starterQuery: { type: String, default: 'SELECT * FROM employees;' },
  solutionQuery: { type: String, required: true },
  explanation: { type: String, required: true }
}, { timestamps: true });

export default mongoose.models.SQLProblem || mongoose.model('SQLProblem', SQLProblemSchema);
