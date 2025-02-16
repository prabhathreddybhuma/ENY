// dashboard.js

// Check authentication on page load
function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }
    
    // Display user name
    const userName = localStorage.getItem('userName');
    document.getElementById('user-name').textContent = userName;
}

// Get the next 3 months of Sundays
function getUpcomingSundays() {
    const sundays = [];
    const today = new Date();
    const futureDate = new Date();
    futureDate.setMonth(futureDate.getMonth() + 3);

    for (let d = new Date(today); d <= futureDate; d.setDate(d.getDate() + 1)) {
        if (d.getDay() === 0) { // 0 = Sunday
            sundays.push(new Date(d));
        }
    }
    return sundays;
}

// Populate Sunday dropdown
function populateSundayDropdown() {
    const sundayPicker = document.getElementById('sunday-picker');
    const sundays = getUpcomingSundays();

    sundays.forEach(sunday => {
        const option = document.createElement('option');
        option.value = sunday.toISOString().split('T')[0];
        option.textContent = sunday.toLocaleDateString('en-US', { 
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        sundayPicker.appendChild(option);
    });

    // Add event listener for date selection
    sundayPicker.addEventListener('change', handleDateSelection);
}

// Handle date selection
function handleDateSelection(event) {
    const selectedDate = event.target.value;
    if (!selectedDate) return;

    // Display the selected date
    const formattedDate = new Date(selectedDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('selected-date-display').textContent = formattedDate;

    // Show locations section
    document.getElementById('locations-section').style.display = 'block';

    // Filter and display locations for the selected date
    displayLocations(selectedDate);
}

// Sample cleanup locations data
const locations = [
    {
        id: 1,
        name: 'Lake Cleanup - Khajaguda Hills',
        image: 'public/img1.jpeg',
        description: 'Help clean our beautiful beaches',
        time: '09:00 AM',
        slots: {
            '2025-03-02': 20,
            '2025-03-09': 15,
            '2025-03-16': 10
        }
    },
    {
        id: 2,
        name: 'City Park Restoration',
        image: 'public/img2.jpeg',
        description: 'Restore our city parks to their natural beauty',
        time: '10:00 AM',
        slots: {
            '2025-03-02': 15,
            '2025-03-09': 12,
            '2025-03-16': 8
        }
    },
    {
        id: 2,
        name: 'Dugram Cheruvu-Lake Cleanup',
        image: 'public/img2.jpeg',
        description: 'Restore our city parks to their natural beauty',
        time: '10:00 AM',
        slots: {
            '2025-03-16': 14,
            '2025-03-23':20,
            '2025-03-30':30
        }
    }


];

// Display locations for selected date
function displayLocations(selectedDate) {
    const locationsGrid = document.getElementById('locations-grid');
    
    // Filter locations that have slots for the selected date
    const availableLocations = locations.filter(location => 
        location.slots[selectedDate] && location.slots[selectedDate] > 0
    );

    if (availableLocations.length === 0) {
        locationsGrid.innerHTML = `
            <div class="no-locations">
                <p>No cleanup drives available for ${new Date(selectedDate).toLocaleDateString()}.</p>
                <p>Please select another date.</p>
            </div>
        `;
        return;
    } else{
        locationsGrid.innerHTML = `
        <p>Select a location for <span id="selected-date-display"></span></p>`
    }

    locationsGrid.innerHTML = availableLocations.map(location => `
        <div class="location-card">
            <img src="${location.image}" alt="${location.name}" class="location-image">
            <div class="location-info">
                <h3>${location.name}</h3>
                <p>${location.description}</p>
                <p><strong>Time:</strong> ${location.time}</p>
                <p class="slots-left">${location.slots[selectedDate]} slots left</p>
                <button onclick="showConfirmation('${location.id}', '${selectedDate}')" 
                        class="btn btn-primary">
                    Select Location
                </button>
            </div>
        </div>
    `).join('');
}

// Show confirmation modal
function showConfirmation(locationId, selectedDate) {
    const location = locations.find(loc => loc.id.toString() === locationId);
    if (!location) return;

    const modal = document.getElementById('confirmation-modal');
    const details = document.getElementById('booking-details');
    
    const formattedDate = new Date(selectedDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    details.innerHTML = `
        <div class="booking-details">
            <p><strong>Location:</strong> ${location.name}</p>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${location.time}</p>
            <p><strong>Available Slots:</strong> ${location.slots[selectedDate]}</p>
        </div>
    `;
    
    modal.style.display = 'flex';
}

// Close modal
function closeModal() {
    const modal = document.getElementById('locations-section');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Handle booking confirmation
function confirmBooking() {
    // Add your booking logic here
    alert('Booking confirmed successfully!');
    closeModal();
}

// Logout function
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    window.location.href = 'login.html';
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    populateSundayDropdown();
});

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('confirmation-modal');
    if (event.target === modal) {
        closeModal();
    }
}