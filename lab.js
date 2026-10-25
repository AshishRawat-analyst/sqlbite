const practice = window.SQLBitePractice;
const challengeSelect = document.getElementById('challengeSelect');
const activeChallenge = document.getElementById('activeChallenge');
const activePrompt = document.getElementById('activePrompt');
const labTables = document.getElementById('labTables');
const sqlEditor = document.getElementById('sqlEditor');
const runQueryButton = document.getElementById('runQuery');
const showSolutionButton = document.getElementById('showSolution');
const resetDatabaseButton = document.getElementById('resetDatabase');
const engineStatus = document.getElementById('engineStatus');
const queryResult = document.getElementById('queryResult');
let database;
let sqlEngine;
let activeEntry;

const choices = practice.labChallenges.map((entry, index) => ({ index, entry }));

function selectedChoice() {
  return choices.find(choice => choice.index === Number(challengeSelect.value));
}

function renderTables(fixture) {
  labTables.replaceChildren();
  fixture.tables.forEach(table => {
    const block = document.createElement('details');
    block.className = 'lab-table';
    const summary = document.createElement('summary');
    summary.textContent = `${table.name} · ${table.columns.join(', ')}`;
    const wrapper = document.createElement('div');
    wrapper.className = 'sample-table-wrap';
    const grid = document.createElement('table');
    grid.className = 'sample-table';
    const head = document.createElement('thead');
    const headerRow = document.createElement('tr');
    table.columns.forEach(column => {
      const cell = document.createElement('th');
      cell.textContent = column;
      headerRow.append(cell);
    });
    head.append(headerRow);
    const body = document.createElement('tbody');
    table.rows.forEach(row => {
      const rowElement = document.createElement('tr');
      row.forEach(value => {
        const cell = document.createElement('td');
        cell.textContent = value === null ? 'NULL' : String(value);
        rowElement.append(cell);
      });
      body.append(rowElement);
    });
    grid.append(head, body);
    wrapper.append(grid);
    block.append(summary, wrapper);
    labTables.append(block);
  });
  if (!fixture.tables.length) {
    const note = document.createElement('p');
    note.className = 'lab-prompt';
    note.textContent = 'This question starts with an empty database so you can create the table yourself.';
    labTables.append(note);
  }
  if (fixture.setup) {
    const setup = document.createElement('details');
    setup.className = 'lab-table lab-setup';
    const summary = document.createElement('summary');
    summary.textContent = 'View CREATE TABLE and INSERT SQL';
    const code = document.createElement('pre');
    code.className = 'sql-example';
    code.textContent = fixture.setup;
    setup.append(summary, code);
    labTables.append(setup);
  }
}

function resetDatabase() {
  if (!sqlEngine) return;
  if (database) database.close();
  database = new sqlEngine.Database();
  const fixture = practice.getFixture(activeEntry);
  if (fixture.setup) database.exec(fixture.setup);
  renderTables(fixture);
  queryResult.replaceChildren();
  queryResult.className = 'query-result';
}

function chooseChallenge(choice) {
  if (!choice) return;
  activeEntry = choice.entry;
  activeChallenge.textContent = `Question ${String(choice.index + 1).padStart(2, '0')} · ${choice.entry[0]}`;
  activePrompt.textContent = choice.entry[1];
  sqlEditor.value = '';
  resetDatabase();
  if (database) {
    engineStatus.textContent = 'SQLite is ready. Your query runs only in this browser.';
    engineStatus.className = 'engine-status engine-ready';
  }
}

function appendResultTable(result) {
  const table = document.createElement('table');
  table.className = 'result-table';
  const head = document.createElement('thead');
  const headerRow = document.createElement('tr');
  result.columns.forEach(column => {
    const cell = document.createElement('th');
    cell.textContent = column;
    headerRow.append(cell);
  });
  head.append(headerRow);
  const body = document.createElement('tbody');
  result.values.forEach(row => {
    const rowElement = document.createElement('tr');
    row.forEach(value => {
      const cell = document.createElement('td');
      cell.textContent = value === null ? 'NULL' : String(value);
      rowElement.append(cell);
    });
    body.append(rowElement);
  });
  table.append(head, body);
  queryResult.append(table);
}

function executeQuery() {
  queryResult.replaceChildren();
  queryResult.className = 'query-result';
  const source = sqlEditor.value.trim();
  if (!source) {
    queryResult.textContent = 'Write a SQL query before running it.';
    queryResult.classList.add('query-error');
    return;
  }

  try {
    const results = database.exec(source);
    results.forEach(appendResultTable);
    const message = document.createElement('p');
    message.className = 'query-success';
    const changedRows = database.getRowsModified();
    message.textContent = results.length
      ? `Query ran successfully. ${results.reduce((sum, item) => sum + item.values.length, 0)} row(s) returned.`
      : `Query ran successfully. ${changedRows} row(s) changed.`;
    queryResult.prepend(message);
  } catch (error) {
    queryResult.textContent = `SQL error: ${error.message}`;
    queryResult.classList.add('query-error');
  }
}

choices.forEach(choice => {
  const option = document.createElement('option');
  option.value = String(choice.index);
  option.textContent = `Challenge ${String(choice.index + 1).padStart(2, '0')} · ${choice.entry[1]}`;
  challengeSelect.append(option);
});

const requested = new URLSearchParams(window.location.search);
const requestedIndex = Number(requested.get('id'));
const initialChoice = choices.find(choice => choice.index === requestedIndex) || choices[0];
challengeSelect.value = String(initialChoice.index);
activeEntry = initialChoice.entry;
activeChallenge.textContent = `Question ${String(initialChoice.index + 1).padStart(2, '0')} · ${initialChoice.entry[0]}`;
activePrompt.textContent = initialChoice.entry[1];
renderTables(practice.getFixture(activeEntry));

challengeSelect.addEventListener('change', () => chooseChallenge(selectedChoice()));
runQueryButton.addEventListener('click', executeQuery);
showSolutionButton.addEventListener('click', () => {
  const choice = selectedChoice();
  sqlEditor.value = choice.entry[2];
  sqlEditor.focus();
});
resetDatabaseButton.addEventListener('click', () => {
  try {
    resetDatabase();
    engineStatus.textContent = 'Sample tables and rows restored for this question.';
    engineStatus.className = 'engine-status engine-ready';
  } catch (error) {
    engineStatus.textContent = `Could not reset sample data: ${error.message}`;
    engineStatus.className = 'engine-status engine-error';
  }
});

if (typeof initSqlJs !== 'function') {
  engineStatus.textContent = 'Could not load the SQLite engine. Check your internet connection and reload this page.';
  engineStatus.className = 'engine-status engine-error';
} else {
  initSqlJs({
    locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${file}`
  }).then(engine => {
    sqlEngine = engine;
    try {
      resetDatabase();
      runQueryButton.disabled = false;
      resetDatabaseButton.disabled = false;
      engineStatus.textContent = 'SQLite is ready. Your query runs only in this browser.';
      engineStatus.className = 'engine-status engine-ready';
    } catch (error) {
      engineStatus.textContent = `Could not prepare this question's sample data: ${error.message}`;
      engineStatus.className = 'engine-status engine-error';
    }
  }).catch(error => {
    engineStatus.textContent = `Could not load the SQLite engine: ${error.message}`;
    engineStatus.className = 'engine-status engine-error';
  });
}
