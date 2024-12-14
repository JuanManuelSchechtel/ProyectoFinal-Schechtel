const users = [
    { username: 'admin', password: '1234' },
    { username: 'user', password: 'abcd' }
];

let cart = [];
let vehicles = [];

async function fetchVehicles() {
    try {
        const response = await fetch('https://carapi.app/api/vehicles');
        vehicles = await response.json();
        displayVehicles(vehicles);
    } catch (error) {
        console.error('Error al obtener vehículos:', error);
    }
}

function displayVehicles(filteredVehicles) {
    const vehicleList = document.getElementById('vehicle-list');
    vehicleList.innerHTML = ''; 

    filteredVehicles.forEach(vehicle => {
        const li = document.createElement('li');
        li.textContent = `${vehicle.make} ${vehicle.model} - ${vehicle.year}`;
        
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
    cartList.innerHTML = '';

    cart.forEach(vehicle => {
        const li = document.createElement('li');
        li.textContent = `${vehicle.make} ${vehicle.model} - ${vehicle.year}`;
        cartList.appendChild(li);
    });
}

function filterVehicles(event) {
    const searchTerm = event.target.value.toLowerCase();
    const filteredVehicles = vehicles.filter(vehicle => 
        vehicle.make.toLowerCase().includes(searchTerm) || 
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
        fetchVehicles();
    } else {
        document.getElementById('login-message').textContent = 'Usuario o contraseña incorrectos';
    }
}

function logout() {
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('vehicles-container').style.display = 'none';
    cart = []; 
    displayCart(); 
}

document.getElementById('login-form').addEventListener('submit', login);
document.getElementById('logout-button').addEventListener('click', logout);
document.getElementById('search-input').addEventListener('input', filterVehicles);
