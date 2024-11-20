const users = [
    { username: 'admin', password: '1234' },
    { username: 'user', password: 'abcd' }
];

const vehicles = [
    { id: 1, model: 'Toyota Corolla', year: 2020 },
    { id: 2, model: 'Honda Civic', year: 2019 },
    { id: 3, model: 'Ford Focus', year: 2021 }
];

let cart = [];

// Funciones
function displayVehicles(filteredVehicles) {
    const vehicleList = document.getElementById('vehicle-list');
    vehicleList.innerHTML = ''; // Limpiar la lista

    filteredVehicles.forEach(vehicle => {
        const li = document.createElement('li');
        li.textContent = `${vehicle.model} - ${vehicle.year}`;
        
        const addButton = document.createElement('button');
        addButton.textContent = 'Agregar al Carrito';
        addButton.onclick = () => addToCart(vehicle);
        
        li.appendChild(addButton);
        vehicleList.appendChild(li);
    });
}

function addToCart(vehicle) {
    cart.push(vehicle);
    displayCart();
}

function displayCart() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = ''; // Limpiar la lista del carrito

    cart.forEach(vehicle => {
        const li = document.createElement('li');
        li.textContent = `${vehicle.model} - ${vehicle.year}`;
        cartList.appendChild(li);
    });
}

function filterVehicles(event) {
    const searchTerm = event.target.value.toLowerCase();
    const filteredVehicles = vehicles.filter(vehicle => 
        vehicle.model.toLowerCase().includes(searchTerm)
    );
    displayVehicles(filteredVehicles);
}

function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('vehicles-container').style.display = 'block';
        displayVehicles(vehicles);
    } else {
        document.getElementById('login-message').textContent = 'Usuario o contraseña incorrectos';
    }
}

function logout() {
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('vehicles-container').style.display = 'none';
    cart = []; // Limpiar el carrito al cerrar sesión
    displayCart(); // Actualizar la vista del carrito
}

// Eventos
document.getElementById('login-form').addEventListener('submit', login);
document.getElementById('logout-button').addEventListener('click', logout);
document.getElementById('search-input').addEventListener('input', filterVehicles);