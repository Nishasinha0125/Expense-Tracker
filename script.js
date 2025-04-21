const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const totalAmount = document.getElementById('total-amount');
const toggleBtn = document.getElementById('dark-mode-toggle');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function renderExpenses() {
  expenseList.innerHTML = '';
  let total = 0;

  expenses.forEach((expense, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${expense.name} - ₹${expense.amount} (${expense.category})
      <button onclick="deleteExpense(${index})">X</button>
    `;
    expenseList.appendChild(li);
    total += Number(expense.amount);
  });

  totalAmount.textContent = total;
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  renderExpenses();
}

expenseForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('expense-name').value;
  const amount = document.getElementById('expense-amount').value;
  const category = document.getElementById('expense-category').value;

  expenses.push({ name, amount, category });
  renderExpenses();
  expenseForm.reset();
});

toggleBtn.addEventListener('change', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('darkMode', document.body.classList.contains('dark'));
});

// Load dark mode preference on page load
window.addEventListener('DOMContentLoaded', () => {
  const darkModeEnabled = JSON.parse(localStorage.getItem('darkMode'));
  if (darkModeEnabled) {
    document.body.classList.add('dark');
    toggleBtn.checked = true;
  }
  renderExpenses();
});