document.addEventListener("DOMContentLoaded", () => {
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');
    const categoryInput = document.getElementById('category');
    const dateInput = document.getElementById('date');
    const totalExpenseDisplay = document.getElementById('total-expenses');
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expenses');

    let expenses = [];

    // Handle form submission
    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Get input values
        const description = descriptionInput.value.trim();
        const amount = parseFloat(amountInput.value.trim());
        const category = categoryInput.value.trim();
        const date = dateInput.value.trim();

        // Check for valid input
        if (description && !isNaN(amount) && amount > 0 && category) {
            const newExpense = {
                id: Date.now(),
                description,
                amount,
                category,
                date
            };
            expenses.push(newExpense);
            displayExpenses();
            updateTotal();
            expenseForm.reset();  // Clear the form
        }
    });

    // Function to display all expenses
    function displayExpenses() {
        expenseList.innerHTML = ""; // Clear current list

        expenses.forEach(expense => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${expense.description} - $${expense.amount.toFixed(2)} (${expense.category}) on ${expense.date}
                <button class="edit-btn" data-id="${expense.id}">Edit</button>
                <button class="delete-btn" data-id="${expense.id}">Delete</button>
            `;
            expenseList.appendChild(li);

            // Attach edit and delete button functionality
            li.querySelector('.edit-btn').addEventListener('click', () => editExpense(expense.id));
            li.querySelector('.delete-btn').addEventListener('click', () => deleteExpense(expense.id));
        });
    }

    // Function to calculate total expenses
    function calculateTotal() {
        return expenses.reduce((sum, expense) => sum + expense.amount, 0);
    }

    // Function to update the displayed total
    function updateTotal() {
        const totalAmount = calculateTotal();
        totalExpenseDisplay.textContent = totalAmount.toFixed(2);
    }

    // Function to edit an expense
    function editExpense(id) {
        const expense = expenses.find(exp => exp.id === id);
        if (expense) {
            descriptionInput.value = expense.description;
            amountInput.value = expense.amount;
            categoryInput.value = expense.category;
            dateInput.value = expense.date;

            deleteExpense(id);  // Remove original entry, then re-add on submit
        }
    }

    // Function to delete an expense
    function deleteExpense(id) {
        expenses = expenses.filter(expense => expense.id !== id);
        displayExpenses();
        updateTotal();
    }
});
