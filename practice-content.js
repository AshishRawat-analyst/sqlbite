const labChallenges = [
  ['Filtering', 'Show all employees in the Sales department.'],
  ['Sorting', 'List employees alphabetically by name.'],
  ['Counting', 'Count all employees.'],
  ['Grouping', 'Show average salary for each department.'],
  ['Selecting', 'Show only employee names and job titles.'],
  ['Filtering', 'Find employees earning more than 60,000.'],
  ['Filtering', 'Find employees hired after January 1, 2022.'],
  ['Sorting', 'Show the five employees with the lowest salaries.'],
  ['Distinct values', 'List the unique job titles in Employees.'],
  ['Multiple filters', 'Find HR employees with a salary below 55,000.'],
  ['Range', 'Find orders with amounts between 100 and 500.'],
  ['Membership', 'Find customers from India, Japan, or Nepal.'],
  ['Pattern match', 'Find product names that contain the word Pro.'],
  ['Missing values', 'Find products that do not have a category assigned.'],
  ['Aggregates', 'Calculate the total value of all orders.'],
  ['Aggregates', 'Find the minimum and maximum product prices.'],
  ['Grouping', 'Count customers in each country.'],
  ['Grouping', 'Calculate total sales for each customer.'],
  ['HAVING', 'Show customers who have placed at least three orders.'],
  ['HAVING', 'Show departments whose average salary exceeds 70,000.'],
  ['INNER JOIN', 'Show every order together with its customer name.'],
  ['LEFT JOIN', 'Find all customers, including those with no orders.'],
  ['JOIN', 'Show each order item with its product name and price.'],
  ['JOIN', 'List employee names alongside their department names.'],
  ['JOIN and filter', 'Show orders made by customers in India.'],
  ['JOIN and aggregate', 'Calculate total revenue for each product.'],
  ['CASE', 'Label products as Budget below 100, Mid-range up to 500, or Premium.'],
  ['CASE', 'Label employees as Senior when salary is at least 80,000.'],
  ['NULL handling', 'Show each employee bonus, replacing missing bonuses with zero.'],
  ['Text functions', 'Display customer names in uppercase.'],
  ['Text filtering', 'Find customers whose email ends in example.com.'],
  ['Date filtering', 'Find orders placed during the year 2025.'],
  ['Date grouping', 'Count orders by calendar month.'],
  ['Subquery', 'Find employees earning more than the company average.'],
  ['Subquery', 'Find products priced above the average product price.'],
  ['EXISTS', 'List customers who have placed at least one order.'],
  ['NOT EXISTS', 'List products that have never been ordered.'],
  ['Duplicates', 'Find duplicate customer email addresses.'],
  ['CTE', 'Use a CTE to calculate monthly order totals.'],
  ['ROW_NUMBER', 'Assign a row number to employees by descending salary.'],
  ['Ranking', 'Rank employees by salary within each department.'],
  ['Window aggregate', 'Show each order and the running total by order date.'],
  ['LAG', 'Compare each monthly sales total with the previous month.'],
  ['UNION', 'Combine customer names and supplier names into one result.'],
  ['INSERT', 'Add a new product with a name, category, and price.'],
  ['UPDATE', 'Increase the price of every product in one category by 10 percent.'],
  ['DELETE', 'Delete one order using its order_id.'],
  ['Schema', 'Create a Departments table with an integer primary key and name.'],
  ['Constraints', 'Make employee email values unique and required.'],
  ['Foreign key', 'Connect Orders.customer_id to Customers.customer_id.'],
  ['Transactions', 'Write a transaction that updates a balance and commits it.'],
  ['Transactions', 'Write a transaction that rolls back after a failed check.'],
  ['Indexes', 'Choose a column to index for frequent order lookups and explain why.'],
  ['Debugging', 'Fix a query that selects department but groups only by job_title.'],
  ['Challenge', 'Return the second-highest distinct salary without using LIMIT alone.']
];

const employeeSetup = `CREATE TABLE Employees (
  employee_id INTEGER PRIMARY KEY, name TEXT, department TEXT,
  job_title TEXT, salary REAL, hired_at TEXT, manager_id INTEGER,
  bonus REAL, department_id INTEGER, email TEXT
);
INSERT INTO Employees VALUES
  (1, 'Alice Johnson', 'Sales', 'Analyst', 82000, '2021-04-12', NULL, 5000, 1, 'alice@example.com'),
  (2, 'Bob Smith', 'Sales', 'Associate', 54000, '2023-02-01', 1, NULL, 1, 'bob@example.com'),
  (3, 'Mira Patel', 'HR', 'Manager', 76000, '2020-09-15', NULL, 7000, 2, 'mira@example.com'),
  (4, 'Sam Chen', 'IT', 'Engineer', 91000, '2019-11-20', NULL, 9000, 3, 'sam@example.com'),
  (5, 'Ava Wilson', 'Finance', 'Analyst', 68000, '2022-06-30', 3, 3000, 4, 'ava@example.com'),
  (6, 'Arjun Kumar', 'Sales', 'Manager', 88000, '2018-01-08', NULL, 8000, 1, 'arjun@example.com'),
  (7, 'Noah Williams', 'IT', 'Support', 49000, '2024-03-10', 4, NULL, 3, 'noah@example.com'),
  (8, 'Isabella Rodriguez', 'HR', 'Associate', 52000, '2023-08-22', 3, NULL, 2, 'isabella@example.com');`;

const customerSetup = `CREATE TABLE Customers (
  customer_id INTEGER PRIMARY KEY, name TEXT, country TEXT, email TEXT
);
INSERT INTO Customers VALUES
  (1, 'Northwind Cafe', 'Canada', 'hello@northwind.test'),
  (2, 'Maple Market', 'Canada', 'sales@maple.test'),
  (3, 'Tokyo Tools', 'Japan', 'contact@tokyo.test'),
  (4, 'Himalaya Home', 'Nepal', 'info@himalaya.test'),
  (5, 'Solo Shopper', 'India', 'solo@example.com'),
  (6, 'Duplicate One', 'India', 'shared@example.com'),
  (7, 'Duplicate Two', 'India', 'shared@example.com');`;

const orderSetup = `${customerSetup}
CREATE TABLE Orders (
  order_id INTEGER PRIMARY KEY, customer_id INTEGER,
  order_date TEXT, amount REAL, status TEXT
);
INSERT INTO Orders VALUES
  (101, 1, '2025-01-15', 240.00, 'shipped'),
  (102, 1, '2025-02-04', 520.00, 'shipped'),
  (103, 2, '2025-02-18', 115.00, 'pending'),
  (104, 3, '2025-03-03', 860.00, 'shipped'),
  (105, 4, '2025-03-21', 75.00, 'cancelled'),
  (106, 6, '2025-04-10', 310.00, 'shipped');`;

const productSetup = `${orderSetup}
CREATE TABLE Products (
  product_id INTEGER PRIMARY KEY, name TEXT, category TEXT, price REAL
);
INSERT INTO Products VALUES
  (1, 'Pro Keyboard', 'Electronics', 120.00),
  (2, 'Desk Lamp', 'Home', 45.00),
  (3, 'Pro Monitor', 'Electronics', 480.00),
  (4, 'Notebook', NULL, 8.00),
  (5, 'Travel Mug', 'Home', 22.00),
  (6, 'Unused Cable', 'Electronics', 12.00);
CREATE TABLE OrderItems (
  order_id INTEGER, product_id INTEGER, quantity INTEGER
);
INSERT INTO OrderItems VALUES
  (101, 1, 2), (101, 2, 1), (102, 3, 1),
  (103, 5, 3), (104, 1, 1), (106, 2, 2);`;

const departmentSetup = `${employeeSetup}
CREATE TABLE Departments (department_id INTEGER PRIMARY KEY, name TEXT);
INSERT INTO Departments VALUES
  (1, 'Sales'), (2, 'HR'), (3, 'IT'), (4, 'Finance');
UPDATE Employees SET department_id = CASE department
  WHEN 'Sales' THEN 1 WHEN 'HR' THEN 2 WHEN 'IT' THEN 3 ELSE 4 END;`;

const supplierSetup = `${customerSetup}
CREATE TABLE Suppliers (supplier_id INTEGER PRIMARY KEY, name TEXT);
INSERT INTO Suppliers VALUES (1, 'Acme Supply'), (2, 'Maple Wholesale');`;

const eventSetup = `CREATE TABLE Events (event_type TEXT, event_date TEXT);
INSERT INTO Events VALUES
  ('view', '2025-01-01'), ('purchase', '2025-01-01'),
  ('view', '2025-01-02'), ('view', '2025-01-02');`;

const accountsSetup = `CREATE TABLE Accounts (account_id INTEGER PRIMARY KEY, balance REAL);
INSERT INTO Accounts VALUES (1, 1000), (2, 2500), (3, 500);`;
const emptySetup = { setup: '', tables: [] };

const employeeColumns = ['employee_id', 'name', 'department', 'job_title', 'salary', 'hired_at', 'manager_id', 'bonus', 'department_id', 'email'];
const customerColumns = ['customer_id', 'name', 'country', 'email'];
const orderColumns = ['order_id', 'customer_id', 'order_date', 'amount', 'status'];
const productColumns = ['product_id', 'name', 'category', 'price'];
const fixtures = {
  employees: { setup: employeeSetup, tables: [{ name: 'Employees', columns: employeeColumns, rows: [[1, 'Alice Johnson', 'Sales', 'Analyst', 82000, '2021-04-12', null, 5000, 1, 'alice@example.com'], [2, 'Bob Smith', 'Sales', 'Associate', 54000, '2023-02-01', 1, null, 1, 'bob@example.com'], [3, 'Mira Patel', 'HR', 'Manager', 76000, '2020-09-15', null, 7000, 2, 'mira@example.com']] }] },
  customers: { setup: customerSetup, tables: [{ name: 'Customers', columns: customerColumns, rows: [[1, 'Northwind Cafe', 'Canada', 'hello@northwind.test'], [2, 'Maple Market', 'Canada', 'sales@maple.test'], [5, 'Solo Shopper', 'India', 'solo@example.com']] }] },
  orders: { setup: orderSetup, tables: [{ name: 'Customers', columns: customerColumns, rows: [[1, 'Northwind Cafe', 'Canada', 'hello@northwind.test'], [2, 'Maple Market', 'Canada', 'sales@maple.test'], [5, 'Solo Shopper', 'India', 'solo@example.com']] }, { name: 'Orders', columns: orderColumns, rows: [[101, 1, '2025-01-15', 240, 'shipped'], [102, 1, '2025-02-04', 520, 'shipped'], [103, 2, '2025-02-18', 115, 'pending']] }] },
  products: { setup: productSetup, tables: [{ name: 'Products', columns: productColumns, rows: [[1, 'Pro Keyboard', 'Electronics', 120], [2, 'Desk Lamp', 'Home', 45], [3, 'Pro Monitor', 'Electronics', 480], [4, 'Notebook', null, 8]] }, { name: 'OrderItems', columns: ['order_id', 'product_id', 'quantity'], rows: [[101, 1, 2], [101, 2, 1], [102, 3, 1]] }, { name: 'Orders', columns: orderColumns, rows: [[101, 1, '2025-01-15', 240, 'shipped'], [102, 1, '2025-02-04', 520, 'shipped']] }] },
  departments: { setup: departmentSetup, tables: [{ name: 'Employees', columns: employeeColumns, rows: [[1, 'Alice Johnson', 'Sales', 'Analyst', 82000, '2021-04-12', null, 5000, 1, 'alice@example.com'], [2, 'Bob Smith', 'Sales', 'Associate', 54000, '2023-02-01', 1, null, 1, 'bob@example.com']] }, { name: 'Departments', columns: ['department_id', 'name'], rows: [[1, 'Sales'], [2, 'HR'], [3, 'IT']] }] },
  suppliers: { setup: supplierSetup, tables: [{ name: 'Customers', columns: customerColumns, rows: [[1, 'Northwind Cafe', 'Canada', 'hello@northwind.test'], [2, 'Maple Market', 'Canada', 'sales@maple.test']] }, { name: 'Suppliers', columns: ['supplier_id', 'name'], rows: [[1, 'Acme Supply'], [2, 'Maple Wholesale']] }] },
  events: { setup: eventSetup, tables: [{ name: 'Events', columns: ['event_type', 'event_date'], rows: [['view', '2025-01-01'], ['purchase', '2025-01-01'], ['view', '2025-01-02']] }] },
  accounts: { setup: accountsSetup, tables: [{ name: 'Accounts', columns: ['account_id', 'balance'], rows: [[1, 1000], [2, 2500], [3, 500]] }] }
};

function getFixture(entry) {
  const text = entry.slice(0, 2).join(' ').toLowerCase();
  if (entry[0] === 'CREATE TABLE' || entry[0] === 'Schema') return emptySetup;
  if (/supplier/.test(text)) return fixtures.suppliers;
  if (/event/.test(text)) return fixtures.events;
  if (/account|balance|transaction/.test(text)) return fixtures.accounts;
  if (/employee.*department|department.*employee|department_id/.test(text)) return fixtures.departments;
  if (/product|orderitem|order item/.test(text)) return fixtures.products;
  if (/employee|salary|manager|bonus|hired/.test(text)) return fixtures.employees;
  if (/order|sales|monthly|revenue/.test(text)) return fixtures.orders;
  if (/customer|email|country/.test(text)) return fixtures.customers;
  return fixtures.employees;
}

const labSolutions = [
  "SELECT * FROM Employees WHERE department = 'Sales';",
  'SELECT name FROM Employees ORDER BY name;',
  'SELECT COUNT(*) AS employee_count FROM Employees;',
  'SELECT department, AVG(salary) AS average_salary FROM Employees GROUP BY department;',
  'SELECT name, job_title FROM Employees;',
  'SELECT * FROM Employees WHERE salary > 60000;',
  "SELECT * FROM Employees WHERE hired_at > '2022-01-01';",
  'SELECT * FROM Employees ORDER BY salary LIMIT 5;',
  'SELECT DISTINCT job_title FROM Employees;',
  "SELECT * FROM Employees WHERE department = 'HR' AND salary < 55000;",
  'SELECT * FROM Orders WHERE amount BETWEEN 100 AND 500;',
  "SELECT * FROM Customers WHERE country IN ('India', 'Japan', 'Nepal');",
  "SELECT * FROM Products WHERE name LIKE '%Pro%';",
  'SELECT * FROM Products WHERE category IS NULL;',
  'SELECT SUM(amount) AS total_order_value FROM Orders;',
  'SELECT MIN(price) AS lowest_price, MAX(price) AS highest_price FROM Products;',
  'SELECT country, COUNT(*) AS customer_count FROM Customers GROUP BY country;',
  'SELECT Customers.customer_id, Customers.name, SUM(Orders.amount) AS total_sales FROM Customers JOIN Orders ON Customers.customer_id = Orders.customer_id GROUP BY Customers.customer_id, Customers.name;',
  'SELECT Customers.name, COUNT(Orders.order_id) AS order_count FROM Customers JOIN Orders ON Customers.customer_id = Orders.customer_id GROUP BY Customers.customer_id HAVING COUNT(Orders.order_id) >= 3;',
  'SELECT department, AVG(salary) AS average_salary FROM Employees GROUP BY department HAVING AVG(salary) > 70000;',
  'SELECT Orders.order_id, Customers.name FROM Orders JOIN Customers ON Orders.customer_id = Customers.customer_id;',
  'SELECT Customers.name, Orders.order_id FROM Customers LEFT JOIN Orders ON Customers.customer_id = Orders.customer_id;',
  'SELECT OrderItems.order_id, Products.name, Products.price FROM OrderItems JOIN Products ON OrderItems.product_id = Products.product_id;',
  'SELECT Employees.name, Departments.name AS department_name FROM Employees JOIN Departments ON Employees.department_id = Departments.department_id;',
  "SELECT Orders.* FROM Orders JOIN Customers ON Orders.customer_id = Customers.customer_id WHERE Customers.country = 'India';",
  'SELECT Products.name, SUM(OrderItems.quantity * Products.price) AS revenue FROM Products JOIN OrderItems ON Products.product_id = OrderItems.product_id GROUP BY Products.product_id;',
  "SELECT name, CASE WHEN price < 100 THEN 'Budget' WHEN price <= 500 THEN 'Mid-range' ELSE 'Premium' END AS price_band FROM Products;",
  "SELECT name, CASE WHEN salary >= 80000 THEN 'Senior' ELSE 'Standard' END AS level FROM Employees;",
  'SELECT name, COALESCE(bonus, 0) AS bonus FROM Employees;',
  'SELECT UPPER(name) AS name FROM Customers;',
  "SELECT * FROM Customers WHERE email LIKE '%example.com';",
  "SELECT * FROM Orders WHERE order_date >= '2025-01-01' AND order_date < '2026-01-01';",
  "SELECT strftime('%Y-%m', order_date) AS month, COUNT(*) AS order_count FROM Orders GROUP BY month ORDER BY month;",
  'SELECT name, salary FROM Employees WHERE salary > (SELECT AVG(salary) FROM Employees);',
  'SELECT name, price FROM Products WHERE price > (SELECT AVG(price) FROM Products);',
  'SELECT * FROM Customers WHERE EXISTS (SELECT 1 FROM Orders WHERE Orders.customer_id = Customers.customer_id);',
  'SELECT * FROM Products WHERE NOT EXISTS (SELECT 1 FROM OrderItems WHERE OrderItems.product_id = Products.product_id);',
  'SELECT email, COUNT(*) AS occurrences FROM Customers GROUP BY email HAVING COUNT(*) > 1;',
  "WITH monthly AS (SELECT strftime('%Y-%m', order_date) AS month, SUM(amount) AS total FROM Orders GROUP BY month) SELECT * FROM monthly ORDER BY month;",
  'SELECT name, ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num FROM Employees;',
  'SELECT name, department, RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS salary_rank FROM Employees;',
  'SELECT order_id, order_date, amount, SUM(amount) OVER (ORDER BY order_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total FROM Orders;',
  "WITH monthly AS (SELECT strftime('%Y-%m', order_date) AS month, SUM(amount) AS total FROM Orders GROUP BY month) SELECT month, total, LAG(total) OVER (ORDER BY month) AS previous_month FROM monthly;",
  'SELECT name FROM Customers UNION SELECT name FROM Suppliers;',
  "INSERT INTO Products (product_id, name, category, price) VALUES (7, 'New Product', 'Home', 35);",
  "UPDATE Products SET price = price * 1.10 WHERE category = 'Home';",
  'DELETE FROM Orders WHERE order_id = 105;',
  'CREATE TABLE Departments (department_id INTEGER PRIMARY KEY, name TEXT);',
  'CREATE TABLE EmployeeEmails (employee_id INTEGER PRIMARY KEY, email TEXT NOT NULL UNIQUE);',
  'CREATE TABLE OrderReferences (order_id INTEGER PRIMARY KEY, customer_id INTEGER REFERENCES Customers(customer_id));',
  'BEGIN TRANSACTION; UPDATE Accounts SET balance = balance - 100 WHERE account_id = 1; UPDATE Accounts SET balance = balance + 100 WHERE account_id = 2; COMMIT;',
  'BEGIN TRANSACTION; UPDATE Accounts SET balance = balance - 100 WHERE account_id = 1; ROLLBACK;',
  'CREATE INDEX idx_orders_customer_id ON Orders(customer_id);',
  'SELECT department, job_title, COUNT(*) AS employee_count FROM Employees GROUP BY department, job_title;',
  'SELECT MAX(salary) AS second_highest_salary FROM Employees WHERE salary < (SELECT MAX(salary) FROM Employees);'
];

labChallenges.forEach((entry, index) => { entry.push(labSolutions[index]); });

function escapeMarkup(value) {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

function renderSampleTables(entry) {
  const fixture = getFixture(entry);
  const sampleTables = fixture.tables.map(table => {
    const headers = table.columns.map(column => `<th>${escapeMarkup(column)}</th>`).join('');
    const rows = table.rows.map(row => `<tr>${row.map(value => `<td>${escapeMarkup(value === null ? 'NULL' : value)}</td>`).join('')}</tr>`).join('');
    return `<div class="sample-table-wrap"><strong>${escapeMarkup(table.name)}</strong><table class="sample-table"><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table></div>`;
  }).join('');
  const setup = fixture.setup
    ? `<details class="setup-sql"><summary>View CREATE TABLE and INSERT SQL</summary><pre class="sql-example"><code>${escapeMarkup(fixture.setup)}</code></pre></details>`
    : '<p class="lab-prompt">This question starts with an empty database so you can create the table yourself.</p>';
  return `<details class="sample-data"><summary>View sample tables and data</summary>${sampleTables}${setup}</details>`;
}

function addQuestionCards(listId, countId, entries) {
  const list = document.getElementById(listId);
  const count = document.getElementById(countId);
  if (!list || !count) return;

  entries.forEach((entry, index) => {
    const card = document.createElement('article');
    card.className = 'content-card question-card';

    const number = document.createElement('span');
    number.className = 'question-number';
    number.textContent = `QUESTION ${String(index + 1).padStart(2, '0')} · ${entry[0]}`;
    card.append(number);

    const prompt = document.createElement('p');
    prompt.textContent = entry[1];
    card.append(prompt);

    card.insertAdjacentHTML('beforeend', renderSampleTables(entry));

    const link = document.createElement('a');
    link.className = 'btn btn-outline question-lab-link';
    link.href = `lab.html?id=${index}`;
    link.textContent = 'Open this question in SQL Lab';
    card.append(link);

    card.dataset.search = entry.join(' ').toLowerCase();
    list.append(card);
  });

  count.textContent = `${entries.length} practice challenges available`;
}

addQuestionCards('labList', 'labCount', labChallenges);
window.SQLBitePractice = { labChallenges, getFixture };

function enableQuestionSearch(inputId, listId, countId, emptyId, noun) {
  const input = document.getElementById(inputId);
  const list = document.getElementById(listId);
  const count = document.getElementById(countId);
  const empty = document.getElementById(emptyId);
  if (!input || !list || !count || !empty) return;

  const cards = [...list.querySelectorAll('.question-card')];
  const total = cards.length;
  input.addEventListener('input', () => {
    const term = input.value.trim().toLowerCase();
    let visible = 0;
    cards.forEach(card => {
      const matches = !term || card.dataset.search.includes(term);
      card.hidden = !matches;
      if (matches) visible++;
    });
    count.textContent = term ? `Showing ${visible} of ${total} ${noun}` : `${total} ${noun} available`;
    empty.hidden = visible > 0;
  });
}

enableQuestionSearch('labSearch', 'labList', 'labCount', 'labEmpty', 'challenges');
