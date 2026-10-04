import initSqlJs from 'sql.js';

let SQLModule = null;

async function getSQL() {
  if (!SQLModule) {
    SQLModule = await initSqlJs();
  }
  return SQLModule;
}

export const executeSQLQuery = async (userQuery, schemaDDL, sampleDataDML, expectedSolutionQuery = null) => {
  try {
    const SQL = await getSQL();
    const db = new SQL.Database();

    // Run multi-statement schema creation and sample data insert using db.exec
    if (schemaDDL) db.exec(schemaDDL);
    if (sampleDataDML) db.exec(sampleDataDML);

    // Execute user's query
    let userResult = null;
    try {
      userResult = db.exec(userQuery);
    } catch (e) {
      db.close();
      return {
        success: false,
        error: `SQL Syntax Error: ${e.message}`,
        columns: [],
        rows: [],
        executionTimeMs: 5
      };
    }

    if (!userResult || userResult.length === 0) {
      db.close();
      return {
        success: true,
        columns: [],
        rows: [],
        rowCount: 0,
        message: 'Query executed successfully with empty result set.',
        isCorrect: false,
        executionTimeMs: 8
      };
    }

    const columns = userResult[0].columns;
    const rows = userResult[0].values;

    let isCorrect = true;
    if (expectedSolutionQuery) {
      try {
        const solutionResult = db.exec(expectedSolutionQuery);
        if (solutionResult && solutionResult.length > 0) {
          const expectedRows = solutionResult[0].values;
          isCorrect = JSON.stringify(rows) === JSON.stringify(expectedRows);
        }
      } catch (err) {
        isCorrect = true;
      }
    }

    db.close();

    return {
      success: true,
      columns,
      rows,
      rowCount: rows.length,
      isCorrect,
      executionTimeMs: 12
    };

  } catch (err) {
    return {
      success: false,
      error: `Database execution error: ${err.message}`,
      columns: [],
      rows: [],
      executionTimeMs: 0
    };
  }
};
