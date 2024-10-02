// Initialize an empty array to store orders
let orders = [];

// Function to handle user input and retrieve meals
async function getOrder() {
    const mainIngredient = prompt('Enter the main ingredient:');
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${mainIngredient}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.meals === null) {
            alert('No meals found for this ingredient. Please try another.');
            getOrder(); // Recurse to prompt again
        } else {
            const randomIndex = Math.floor(Math.random() * data.meals.length);
            const randomMeal = data.meals[randomIndex];
            const order = {
                description: randomMeal.strMeal,
                orderNumber: orders.length + 1,
                completionStatus: 'incomplete'
            };
            orders.push(order);
            sessionStorage.setItem('orders', JSON.stringify(orders));
            alert(`Order placed: ${order.description}`);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to display incomplete orders
function displayOrders() {
    const incompleteOrders = orders.filter(order => order.completionStatus === 'incomplete');
    if (incompleteOrders.length === 0) {
        alert('No incomplete orders.');
    } else {
        const orderNumbers = incompleteOrders.map(order => order.orderNumber).join(', ');
        alert(`Incomplete orders (order numbers): ${orderNumbers}`);
    }
}

// Function to mark an order as complete
function markComplete() {
    const orderNumber = parseInt(prompt('Enter the order number to mark as complete (or 0 to leave incomplete):'));
    const order = orders.find(order => order.orderNumber === orderNumber);
    if (order) {
        order.completionStatus = 'completed';
        sessionStorage.setItem('orders', JSON.stringify(orders));
        alert(`Order ${orderNumber} marked as complete.`);
    } else {
        alert(`Order ${orderNumber} not found.`);
    }
}

// Example usage:
getOrder(); // Prompt user for order
displayOrders(); // Display incomplete orders
markComplete(); // Mark an order as complete
