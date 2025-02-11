// admin.js

// Check admin authentication
function checkAdminAuth() {
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin');
    
    if (!token || !isAdmin) {
        window.location.href = 'login.html';
        return;
    }
    
    // Display admin name
    const adminName = localStorage.getItem('userName');
    document.getElementById('admin-name').textContent = adminName;
}

// Sample data for demonstration
let locations = [
    {
        id: 1,
        name: 'Beach Cleanup - Miami Shore',
        date: '2025-03-01',
        time: '09:00 AM',
        totalSlots: 20,
        availableSlots: 5,
        image: 'images/beach.jpg',
        description: 'Help clean our beautiful beaches'
    },
    {
        id: 2,
        name: 'City Park Restoration',
        date: '2025-03-15',
        time: '10:00 AM',
        totalSlots: 15,
        availableSlots: 8,
        image: 'images/park.jpg',
        description: 'Restore our city parks to their natural beauty'
    }
];

let volunteers = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
        locationId: 1,
        registrationDate: '2025-02-10'
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '098-765-4321',
        locationId: 2,
        registrationDate: '2025-02-11'
    }
];

// Update dashboard statistics
function updateStats() {
    document.getElementById('total-locations').textContent = locations.length;
    document.getElementById('total-volunteers').textContent = volunteers.length;
    document.getElementById('active-events').textContent = locations.filter(loc => new Date(loc.date) >= new Date()).length;
    document.getElementById('available-slots').textContent = locations.reduce((sum, loc) => sum + loc.availableSlots, 0);
}

// Display locations in table
function displayLocations() {
    const locationsTable = document.getElementById('locations-table');
    if (!locationsTable) return;

    locationsTable.innerHTML = locations.map(location => `
        <tr>
            <td>${location.name}</td>
            <td>${location.date} ${location.time}</td>
            <td>${location.totalSlots}</td>
            <td>${location.availableSlots}</td>
            <td>
                <button onclick="editLocation(${location.id})" class="btn btn-outline">Edit</button>
                <button onclick="deleteLocation(${location.id})" class="btn btn-outline">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Display volunteers in table
function displayVolunteers() {
    const volunteersTable = document.getElementById('volunteers-table');
    if (!volunteersTable) return;

    volunteersTable.innerHTML = volunteers.map(volunteer => `
        <tr>
            <td>${volunteer.name}</td>
            <td>${volunteer.email}</td>
            <td>${volunteer.phone}</td>
            <td>${locations.find(loc => loc.id === volunteer.locationId)?.name || 'Unknown'}</td>
            <td>${new Date(volunteer.registrationDate).toLocaleDateString()}</td>
        </tr>
    `).join('');
}

// Show add location modal
function showAddLocationModal() {
    document.getElementById('add-location-modal').style.display = 'flex';
}

// Close add location modal
function closeAddLocationModal() {
    document.getElementById('add-location-modal').style.display = 'none';
    document.getElementById('add-location-form').reset();
}

// Submit new location
function submitLocation() {
    const form = document.getElementById('add-location-form');
    const formData = {
        id: locations.length + 1,
        name: document.getElementById('location-name').value,
        date: document.getElementById('location-date').value.split('T')[0],
        time: new Date(document.getElementById('location-date').value).toLocaleTimeString(),
        totalSlots: parseInt(document.getElementById('location-slots').value),
        availableSlots: parseInt(document.getElementById('location-slots').value),
        description: document.getElementById('location-description').value,
        image: 'images/default-location.jpg' // In real app, handle image upload
    };

    // Validate form
    if (!formData.name || !formData.date || !formData.totalSlots || !formData.description) {
        alert('Please fill in all required fields');
        return;
    }

    // Add new location
    locations.push(formData);
    
    // Update UI
    displayLocations();
    updateStats();
    closeAddLocationModal();
    alert('Location added successfully!');
}

// Edit location
function editLocation(locationId) {
    const location = locations.find(loc => loc.id === locationId);
    if (!location) return;

    // Implement edit functionality
    alert('Edit functionality to be implemented');
}

// Delete location
function deleteLocation(locationId) {
    if (!confirm('Are you sure you want to delete this location?')) return;

    locations = locations.filter(loc => loc.id !== locationId);
    displayLocations();
    updateStats();
}

// Search volunteers
document.getElementById('volunteer-search')?.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredVolunteers = volunteers.filter(volunteer =>
        volunteer.name.toLowerCase().includes(searchTerm) ||
        volunteer.email.toLowerCase().includes(searchTerm)
    );
    
    const volunteersTable = document.getElementById('volunteers-table');
    if (!volunteersTable) return;

    volunteersTable.innerHTML = filteredVolunteers.map(volunteer => `
        <tr>
            <td>${volunteer.name}</td>
            <td>${volunteer.email}</td>
            <td>${volunteer.phone}</td>
            <td>${locations.find(loc => loc.id === volunteer.locationId)?.name || 'Unknown'}</td>
            <td>${new Date(volunteer.registrationDate).toLocaleDateString()}</td>
        </tr>
    `).join('');
});

// Logout function
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('isAdmin');
    window.location.href = 'login.html';
}

// Initialize admin dashboard
document.addEventListener('DOMContentLoaded', () => {
    checkAdminAuth();
    updateStats();
    displayLocations();
    displayVolunteers();
});

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('add-location-modal');
    if (event.target === modal) {
        closeAddLocationModal();
    }
}