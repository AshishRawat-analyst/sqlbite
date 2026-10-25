
const lessons = [
{
title: "Introduction to SQL",
definition: "SQL stands for Structured Query Language. It is used to create, retrieve, update and delete data in relational databases.",
why: "A database stores organized information. A table contains rows and columns. A row represents a record and a column represents an attribute.",
syntax: `CREATE DATABASE College;
USE College;

CREATE TABLE Students (
  StudentID INT,
  StudentName VARCHAR(50),
  Age INT
);`,
output: "Database College and table Students are created.",
points: ["MySQL is a database management system that uses SQL.", "SQL keywords are commonly written in uppercase for readability.", "A semicolon terminates a statement in common MySQL usage."],
practice: ["What is SQL?", "Explain rows and columns.", "Create a database named Company."]
},
{
title: "SQL Data Types",
definition: "A data type defines the kind of value that a column can store.",
why: "Different columns store different information, such as names, whole numbers, prices and dates.",
syntax: `CREATE TABLE Employees (
  ID INT,
  Name VARCHAR(50),
  Gender CHAR(1),
  Salary DECIMAL(10,2),
  JoiningDate DATE,
  CreatedAt DATETIME
);`,
output: "INT: 25 | VARCHAR: 'Rahul' | CHAR: 'M' | DECIMAL: 45000.50 | DATE: '2026-10-25'",
points: ["INT stores whole numbers.", "VARCHAR(n) stores variable-length text.", "CHAR(n) stores fixed-length text.", "DECIMAL(p,s) stores exact decimal values.", "DATE stores a date; DATETIME stores date and time."],
practice: ["Choose a data type for salary.", "Explain CHAR vs VARCHAR.", "Which type stores date of birth?"]
},
{
title: "CREATE DATABASE and USE",
definition: "CREATE DATABASE creates a database. USE selects a database for subsequent commands.",
why: "Select the correct database before creating tables inside it.",
syntax: `CREATE DATABASE RetailStore;
USE RetailStore;

SHOW DATABASES;`,
output: "RetailStore is created and selected. SHOW DATABASES lists accessible databases.",
points: ["A database can contain multiple tables.", "USE does not create a database.", "CREATE DATABASE IF NOT EXISTS can avoid an error when the database already exists."],
practice: ["Create TrainingDB.", "Select TrainingDB.", "Which command lists databases?"]
},
{
title: "CREATE TABLE",
definition: "CREATE TABLE defines a new table, its columns and their data types.",
why: "A table structure defines how records will be stored.",
syntax: `CREATE TABLE Products (
  ProductID INT PRIMARY KEY,
  ProductName VARCHAR(80) NOT NULL,
  Price DECIMAL(10,2),
  Stock INT DEFAULT 0
);`,
output: "Products table created with four columns.",
points: ["Separate column definitions with commas.", "PRIMARY KEY uniquely identifies a row.", "NOT NULL requires a value.", "DEFAULT supplies a value when one is omitted."],
practice: ["Create a Courses table.", "Add a NOT NULL constraint.", "What is a primary key?"]
},
{
title: "INSERT INTO",
definition: "INSERT INTO adds new records to a table.",
why: "Use a column list to make insert statements clear and maintainable.",
syntax: `INSERT INTO Students
  (StudentID, StudentName, Age)
VALUES
  (1, 'Rahul', 21),
  (2, 'Priya', 22);

SELECT * FROM Students;`,
output: `StudentID | StudentName | Age
1         | Rahul       | 21
2         | Priya       | 22`,
points: ["Text values normally use single quotes.", "Values must match the specified columns.", "Multiple rows can be inserted in one statement."],
practice: ["Insert an employee.", "Insert two products in one query.", "Why specify column names?"]
},
{
title: "SELECT and DISTINCT",
definition: "SELECT retrieves data. DISTINCT removes duplicate combinations from the selected columns.",
why: "Retrieve only the columns needed for a report.",
syntax: `SELECT * FROM Employees;

SELECT Name, Salary
FROM Employees;

SELECT DISTINCT Department
FROM Employees;`,
output: "The queries return all columns, selected columns, and unique departments respectively.",
points: ["SELECT does not change stored data.", "The * symbol selects all columns.", "DISTINCT applies to the combination of selected columns."],
practice: ["Display product names and prices.", "List unique departments.", "Display all employee records."]
},
{
title: "WHERE and Comparison Operators",
definition: "WHERE filters rows according to a condition.",
why: "Retrieve only records that meet a requirement.",
syntax: `SELECT Name, Salary
FROM Employees
WHERE Salary > 45000;

SELECT *
FROM Employees
WHERE Department = 'IT';`,
output: "The first query returns salaries above 45000. The second returns IT employees.",
points: ["Operators include =, <>, >, <, >= and <=.", "Text values normally use quotes.", "Use IS NULL to check for missing values, not = NULL."],
practice: ["Find salary below 30000.", "Find salary at least 50000.", "Find employees not in HR."]
},
{
title: "AND, OR and NOT",
definition: "AND requires every condition to be true. OR requires at least one. NOT reverses a condition.",
why: "Combine multiple requirements in a single filter.",
syntax: `SELECT * FROM Employees
WHERE Department = 'IT'
AND Salary > 40000;

SELECT * FROM Employees
WHERE Department = 'HR'
OR Department = 'Sales';

SELECT * FROM Employees
WHERE NOT Department = 'IT';`,
output: "The queries filter IT employees, HR or Sales employees, and employees outside IT.",
points: ["AND is evaluated before OR.", "Use parentheses when mixing AND and OR.", "NOT can also be used with IN and LIKE."],
practice: ["Find IT employees earning above 50000 and under age 30.", "Find HR or Finance employees."]
},
{
title: "IN, BETWEEN and LIKE",
definition: "IN matches a list of values. BETWEEN checks an inclusive range. LIKE matches a text pattern.",
why: "These operators simplify common filtering tasks.",
syntax: `SELECT * FROM Employees
WHERE Department IN ('IT', 'HR');

SELECT * FROM Employees
WHERE Salary BETWEEN 30000 AND 50000;

SELECT * FROM Employees
WHERE Name LIKE 'A%';`,
output: "Returns IT/HR employees, salaries from 30000 through 50000, and names beginning with A.",
points: ["% matches zero or more characters.", "_ matches exactly one character.", "BETWEEN includes both endpoints.", "NOT IN can behave unexpectedly if its list contains NULL."],
practice: ["Find names ending in a.", "Find salaries between 25000 and 40000.", "Find IT, HR or Sales employees."]
},
{
title: "ORDER BY and LIMIT",
definition: "ORDER BY sorts results. LIMIT restricts the number of returned rows in MySQL.",
why: "Sort salaries from highest to lowest or return a short list of products.",
syntax: `SELECT Name, Salary
FROM Employees
ORDER BY Salary DESC;

SELECT *
FROM Products
ORDER BY Price ASC
LIMIT 5;`,
output: "The first query sorts highest salary first. The second returns five cheapest products.",
points: ["ASC means ascending and is the default.", "DESC means descending.", "LIMIT syntax differs across database systems.", "Use ORDER BY when result order matters."],
practice: ["Show the three lowest salaries.", "Display two youngest employees.", "Sort products alphabetically."]
},
{
title: "Aggregate Functions",
definition: "Aggregate functions calculate a summary from multiple rows.",
why: "They are used to calculate total sales, average salary and employee counts.",
syntax: `SELECT COUNT(*) AS TotalEmployees
FROM Employees;

SELECT SUM(Salary) AS TotalSalary,
       AVG(Salary) AS AverageSalary,
       MIN(Salary) AS LowestSalary,
       MAX(Salary) AS HighestSalary
FROM Employees;`,
output: "Returns counts, totals, averages, minimums and maximums.",
points: ["COUNT(*) counts rows.", "COUNT(column) ignores NULL values.", "SUM and AVG ignore NULL values.", "WHERE filters rows before aggregation."],
practice: ["Count IT employees.", "Find total sales.", "Calculate average salary above 30000."]
},
{
title: "GROUP BY and HAVING",
definition: "GROUP BY groups rows for aggregate calculations. HAVING filters the resulting groups.",
why: "Calculate total sales per region and keep only regions above a target.",
syntax: `SELECT Region, SUM(Sales) AS TotalSales
FROM Orders
GROUP BY Region;

SELECT Region, SUM(Sales) AS TotalSales
FROM Orders
GROUP BY Region
HAVING SUM(Sales) > 100000;`,
output: "The first query returns sales per region. The second keeps regions with total sales above 100000.",
points: ["WHERE filters individual rows before grouping.", "HAVING filters groups after aggregation.", "Selected non-aggregated columns must be valid for the GROUP BY query."],
practice: ["Count employees per department.", "Find departments with average salary above 40000.", "Find regions with more than 100 orders."]
},
{
title: "UPDATE and DELETE",
definition: "UPDATE changes existing values. DELETE removes rows.",
why: "These commands modify stored data, so verify the condition before execution.",
syntax: `UPDATE Employees
SET Salary = 48000
WHERE EmployeeID = 101;

DELETE FROM Employees
WHERE EmployeeID = 104;`,
output: "Employee 101's salary is updated. Employee 104's row is deleted.",
points: ["Without WHERE, UPDATE can affect every row.", "Without WHERE, DELETE removes every row.", "Test the condition with SELECT before a destructive query."],
practice: ["Increase IT salaries by 5%.", "Delete one specified employee.", "What happens if DELETE has no WHERE?"]
},
{
title: "ALTER TABLE",
definition: "ALTER TABLE changes a table's structure.",
why: "Add columns or change existing column definitions as requirements evolve.",
syntax: `ALTER TABLE Employees
ADD Bonus DECIMAL(10,2);

ALTER TABLE Employees
MODIFY COLUMN Salary DECIMAL(12,2);

ALTER TABLE Employees
DROP COLUMN Bonus;`,
output: "The queries add Bonus, modify Salary, and remove Bonus.",
points: ["These examples use MySQL syntax.", "Check existing data before changing a column type.", "DROP COLUMN removes the column and its data."],
practice: ["Add JoiningDate as DATE.", "Change Department to VARCHAR(50).", "Rename a column in MySQL."]
},
{
title: "TRUNCATE and DROP",
definition: "TRUNCATE removes all table rows. DROP TABLE removes the table structure and its data.",
why: "These commands are useful for resetting temporary data or removing obsolete tables.",
syntax: `TRUNCATE TABLE TempData;

DROP TABLE OldRecords;`,
output: "TempData remains but has no rows. OldRecords no longer exists.",
points: ["TRUNCATE has no WHERE clause.", "DROP TABLE removes the table definition.", "Treat destructive commands carefully and verify the table name."],
practice: ["Explain DELETE vs TRUNCATE.", "Explain TRUNCATE vs DROP.", "Which command removes a table?"]
},
{
title: "Constraints and Keys",
definition: "Constraints enforce data rules. Keys identify rows and connect related tables.",
why: "They help prevent duplicates, missing required values and invalid relationships.",
syntax: `CREATE TABLE Departments (
  DepartmentID INT PRIMARY KEY,
  DepartmentName VARCHAR(50) UNIQUE
);

CREATE TABLE Employees (
  EmployeeID INT PRIMARY KEY,
  Name VARCHAR(50) NOT NULL,
  DepartmentID INT,
  FOREIGN KEY (DepartmentID)
    REFERENCES Departments(DepartmentID)
);`,
output: "Departments has a primary key and unique name. Employees references Departments.",
points: ["PRIMARY KEY uniquely identifies each row and cannot be NULL.", "UNIQUE prevents duplicate values.", "NOT NULL requires a value.", "FOREIGN KEY preserves valid references."],
practice: ["Explain primary vs foreign key.", "Create a table with a primary key.", "What does NOT NULL do?"]
},
{
title: "SQL JOINS",
definition: "A JOIN combines related data from two or more tables.",
why: "Employee and department information may be stored separately but shown together in a report.",
syntax: `SELECT e.Name, d.DepartmentName
FROM Employees e
INNER JOIN Departments d
ON e.DepartmentID = d.DepartmentID;

SELECT e.Name, d.DepartmentName
FROM Employees e
LEFT JOIN Departments d
ON e.DepartmentID = d.DepartmentID;`,
output: "INNER JOIN returns matching rows. LEFT JOIN returns all employees, with NULL for unmatched department details.",
points: ["INNER JOIN returns matches.", "LEFT JOIN preserves every left-table row.", "RIGHT JOIN preserves every right-table row.", "A correct ON condition is essential.", "A self join joins a table to itself."],
practice: ["Display all employees and department names, including unmatched employees.", "Find customers with no orders.", "Explain INNER JOIN vs LEFT JOIN."]
},
{
title: "Subqueries",
definition: "A subquery is a query inside another SQL statement.",
why: "Use a subquery to compare each employee's salary with the overall average.",
syntax: `SELECT Name, Salary
FROM Employees
WHERE Salary > (
  SELECT AVG(Salary)
  FROM Employees
);`,
output: "Returns employees earning more than the average salary.",
points: ["A scalar subquery should return one value.", "IN can compare against a list.", "EXISTS checks whether rows exist.", "A correlated subquery references the outer query."],
practice: ["Find employees earning above average.", "Find customers who placed an order.", "Explain IN vs EXISTS."]
},
{
title: "CASE Expression",
definition: "CASE returns a value according to a sequence of conditions.",
why: "It can classify salaries or sales into meaningful business categories.",
syntax: `SELECT Name, Salary,
CASE
  WHEN Salary >= 60000 THEN 'High'
  WHEN Salary >= 35000 THEN 'Medium'
  ELSE 'Low'
END AS SalaryBand
FROM Employees;`,
output: "Each employee receives a High, Medium or Low salary label.",
points: ["Conditions are checked in order.", "ELSE is optional; unmatched rows return NULL if omitted.", "CASE can be used in SELECT and aggregate expressions."],
practice: ["Classify sales as High or Regular.", "Create a salary category.", "Explain CASE vs WHERE."]
},
{
title: "NULL and String Functions",
definition: "NULL represents missing or unknown data. String functions manipulate or inspect text.",
why: "Data analysts clean spaces, standardize names, extract text and locate missing values.",
syntax: `SELECT * FROM Employees
WHERE Department IS NULL;

SELECT UPPER(Name), LOWER(Name),
       TRIM(Name)
FROM Employees;

SELECT LEFT('Database', 4);
SELECT REPLACE('SQL Basic', 'Basic', 'Advanced');`,
output: "UPPER: uppercase text. LOWER: lowercase text. TRIM removes surrounding spaces. LEFT returns Data. REPLACE returns SQL Advanced.",
points: ["Use IS NULL rather than = NULL.", "RTRIM removes right-side spaces; LTRIM removes left-side spaces.", "Other functions include CONCAT, LENGTH, SUBSTRING, RIGHT and LOCATE."],
practice: ["Find employees without a department.", "Remove surrounding spaces.", "Replace Basic with Advanced."]
},
{
title: "Date Functions",
definition: "Date functions extract date parts and calculate date-related values.",
why: "They help analysts build monthly sales reports and filter records by time.",
syntax: `SELECT CURDATE();
SELECT NOW();

SELECT YEAR(OrderDate) AS OrderYear,
       MONTH(OrderDate) AS OrderMonth,
       COUNT(*) AS OrderCount
FROM Orders
GROUP BY YEAR(OrderDate), MONTH(OrderDate);`,
output: "CURDATE returns today's date. NOW returns date and time. The grouped query counts orders per month.",
points: ["Use DATE or DATETIME columns for dates.", "MySQL functions include YEAR, MONTH, DAY, DATEDIFF, DATE_ADD and DATE_FORMAT.", "Date function syntax can vary by database."],
practice: ["Count orders by year.", "Find orders in a date range.", "Explain DATE vs DATETIME."]
},
{
title: "CTEs and Window Functions",
definition: "A CTE names a temporary result for one statement. Window functions calculate across related rows without collapsing them into groups.",
why: "They help rank customers, calculate running totals and compare rows within regions.",
syntax: `WITH CustomerSales AS (
  SELECT Region, CustomerID,
         SUM(Sales) AS TotalSales
  FROM Orders
  GROUP BY Region, CustomerID
)
SELECT *,
       DENSE_RANK() OVER (
         PARTITION BY Region
         ORDER BY TotalSales DESC
       ) AS SalesRank
FROM CustomerSales;`,
output: "Customers are ranked by sales inside each region. Equal sales receive the same rank without skipping the next rank.",
points: ["A CTE applies to the statement that follows it.", "PARTITION BY defines each group.", "ROW_NUMBER, RANK, DENSE_RANK, LAG and LEAD are window functions.", "Window functions are available in modern MySQL versions."],
practice: ["Rank customers by region.", "Calculate a running sales total.", "Explain GROUP BY vs window functions."]
},
{
title: "Transactions and SQL Safety",
definition: "A transaction groups database changes so they can be committed or rolled back.",
why: "Related operations should be handled consistently, especially when one failure could leave data incomplete.",
syntax: `START TRANSACTION;

UPDATE Accounts
SET Balance = Balance - 500
WHERE AccountID = 1;

UPDATE Accounts
SET Balance = Balance + 500
WHERE AccountID = 2;

COMMIT;
-- Use ROLLBACK instead if checks fail.`,
output: "COMMIT saves transaction changes. ROLLBACK undoes uncommitted changes where supported.",
points: ["Check WHERE conditions before UPDATE or DELETE.", "Use parameterized queries in applications to reduce SQL injection risks.", "Transaction behaviour depends on database settings and storage engine."],
practice: ["Explain COMMIT vs ROLLBACK.", "Why is WHERE important?", "What is SQL injection?"]
}
];

const content = document.getElementById("pageContent");
const topicList = document.getElementById("topicList");
const search = document.getElementById("search");
const sidebar = document.getElementById("sidebar");
const spiral = document.getElementById("spiral");
const paper = document.getElementById("paper");
const flipSheet = document.getElementById("flipSheet");
const flipFrontContent = document.getElementById("flipFrontContent");
const flipBackContent = document.getElementById("flipBackContent");

let current = 0;
let isTurning = false;

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function renderTopics(filter = "") {
  topicList.innerHTML = "";

  lessons.forEach((lesson, index) => {
    if (!lesson.title.toLowerCase().includes(filter.toLowerCase())) {
      return;
    }

    const button = document.createElement("button");
    button.className = "topic-btn" + (index === current ? " active" : "");
    button.innerHTML =
      `<span class="topic-no">${String(index + 1).padStart(2, "0")}</span>
       <span>${escapeHTML(lesson.title)}</span>`;

    button.addEventListener("click", () => {
      turnToPage(index);
      sidebar.classList.remove("open");
    });

    topicList.appendChild(button);
  });

  if (!topicList.children.length) {
    topicList.innerHTML = "<p>No topics found.</p>";
  }
}

function lessonMarkup(lesson, index) {
  return `
    <div class="lesson-meta">
      LESSON ${String(index + 1).padStart(2, "0")} • SQL NOTES
    </div>

    <h1>${escapeHTML(lesson.title)}</h1>

    <h2>1. Definition</h2>
    <p>${escapeHTML(lesson.definition)}</p>

    <h2>2. Why do we use it?</h2>
    <p>${escapeHTML(lesson.why)}</p>

    <h2>3. Syntax and Examples</h2>
    <div class="code-card">${escapeHTML(lesson.syntax)}</div>

    <h2>4. Expected Output / Explanation</h2>
    <div class="output-card">${escapeHTML(lesson.output)}</div>

    <h2>5. Important Points</h2>
    <ul>${lesson.points.map(point =>
      `<li>${escapeHTML(point)}</li>`
    ).join("")}</ul>

    <div class="practice">
      <strong>✎ PRACTICE QUESTIONS</strong>
      <ol>${lesson.practice.map(question =>
        `<li>${escapeHTML(question)}</li>`
      ).join("")}</ol>
    </div>
  `;
}

function showPage(index) {
  current = Math.max(0, Math.min(index, lessons.length - 1));
  const lesson = lessons[current];
  content.innerHTML = lessonMarkup(lesson, current);

  document.getElementById("breadcrumb").textContent = lesson.title;
  document.getElementById("currentTitle").textContent = lesson.title;
  document.getElementById("pageNumber").textContent =
    `PAGE ${String(current + 1).padStart(2, "0")}`;

  document.getElementById("progressText").textContent =
    `${current + 1} / ${lessons.length}`;

  document.getElementById("progressBar").style.width =
    `${((current + 1) / lessons.length) * 100}%`;

  document.getElementById("prevBtn").disabled = current === 0;
  document.getElementById("nextBtn").disabled =
    current === lessons.length - 1;

  document.getElementById("dots").innerHTML =
    lessons.map((_, index) =>
      `<button class="${index === current ? "active" : ""}"
       data-page="${index}" aria-label="Page ${index + 1}"
       title="Page ${index + 1}" ${index === current ? 'aria-current="page"' : ""}></button>`
    ).join("");

  document.querySelectorAll("#dots button").forEach(button => {
    button.addEventListener("click", () => {
      turnToPage(Number(button.dataset.page));
    });
  });

  renderTopics(search.value);
}

function turnToPage(index) {
  const target = Math.max(0, Math.min(index, lessons.length - 1));
  if (isTurning || target === current) return;

  const direction = target > current ? "next" : "previous";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    showPage(target);
    return;
  }

  isTurning = true;
  flipFrontContent.innerHTML = lessonMarkup(lessons[current], current);
  flipBackContent.innerHTML = lessonMarkup(lessons[target], target);
  flipSheet.classList.toggle("previous", direction === "previous");
  flipSheet.classList.add("flipping");
  paper.setAttribute("aria-busy", "true");

  let finished = false;
  const finishTurn = () => {
    if (finished) return;
    finished = true;
    window.clearTimeout(fallback);
    flipSheet.removeEventListener("animationend", finishTurn);
    showPage(target);
    flipSheet.classList.remove("flipping", "previous");
    paper.removeAttribute("aria-busy");
    isTurning = false;
  };
  const fallback = window.setTimeout(finishTurn, 850);
  flipSheet.addEventListener("animationend", finishTurn, { once: true });
}

function turnPage(direction) {
  turnToPage(current + direction);
}

document.getElementById("nextBtn").addEventListener("click",
  () => turnPage(1));

document.getElementById("prevBtn").addEventListener("click",
  () => turnPage(-1));

document.getElementById("nextEdge").addEventListener("click",
  () => turnPage(1));

document.getElementById("previousEdge").addEventListener("click",
  () => turnPage(-1));

search.addEventListener("input", () => renderTopics(search.value));

document.getElementById("menuBtn").addEventListener("click", () => {
  const isOpen = sidebar.classList.toggle("open");
  document.getElementById("menuBtn").setAttribute("aria-expanded", String(isOpen));
});

const siteMenuButton = document.getElementById("siteMenuBtn");
const siteNav = document.getElementById("siteNav");
siteMenuButton.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  siteMenuButton.setAttribute("aria-expanded", String(isOpen));
  siteMenuButton.setAttribute("aria-label", isOpen ? "Close site navigation" : "Open site navigation");
});

siteNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  siteNav.classList.remove("open");
  siteMenuButton.setAttribute("aria-expanded", "false");
  siteMenuButton.setAttribute("aria-label", "Open site navigation");
}));

window.addEventListener("resize", () => {
  if (window.innerWidth > 800) {
    siteNav.classList.remove("open");
    siteMenuButton.setAttribute("aria-expanded", "false");
    siteMenuButton.setAttribute("aria-label", "Open site navigation");
  }
  if (window.innerWidth > 600) {
    sidebar.classList.remove("open");
    document.getElementById("menuBtn").setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("keydown", event => {
  if (event.target instanceof Element && event.target.matches("input, textarea, select, [contenteditable='true']")) return;

  if (event.key === "ArrowRight") turnPage(1);
  if (event.key === "ArrowLeft") turnPage(-1);
});

for (let i = 0; i < 16; i++) {
  const ring = document.createElement("span");
  spiral.appendChild(ring);
}

showPage(0);
