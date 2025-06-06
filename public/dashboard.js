// Check authentication
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/index.html';
    }
});

// DOM Elements
const addPatientBtn = document.getElementById('addPatientBtn');
const patientModal = document.getElementById('patientModal');
const deleteModal = document.getElementById('deleteModal');
const patientForm = document.getElementById('patientForm');
const searchInput = document.getElementById('searchInput');
const searchType = document.getElementById('searchType');
const searchBtn = document.getElementById('searchBtn');
const logoutBtn = document.getElementById('logoutBtn');
const closeButtons = document.getElementsByClassName('close');
const cancelBtn = document.getElementById('cancelBtn');
const confirmDelete = document.getElementById('confirmDelete');
const cancelDelete = document.getElementById('cancelDelete');

let currentPatientId = null;

// Event Listeners
addPatientBtn.addEventListener('click', () => {
    openPatientModal();
});

Array.from(closeButtons).forEach(button => {
    button.addEventListener('click', () => {
        closeModals();
    });
});

cancelBtn.addEventListener('click', () => {
    closeModals();
});

searchBtn.addEventListener('click', () => {
    searchPatients();
});

logoutBtn.addEventListener('click', () => {
    logout();
});

// Modal Functions
function openPatientModal(patientData = null) {
    currentPatientId = patientData ? patientData._id : null;
    document.getElementById('modalTitle').textContent = patientData ? 'Edit Patient' : 'Add New Patient';
    
    if (patientData) {
        // Fill form with patient data
        Object.keys(patientData).forEach(key => {
            const input = document.getElementById(`patient${key.charAt(0).toUpperCase() + key.slice(1)}`);
            if (input) {
                input.value = patientData[key];
            }
        });
    } else {
        patientForm.reset();
    }
    
    patientModal.style.display = 'block';
}

function closeModals() {
    patientModal.style.display = 'none';
    deleteModal.style.display = 'none';
    currentPatientId = null;
}

// Form Submission
patientForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(patientForm);
    const patientData = Object.fromEntries(formData.entries());

    try {
        const url = currentPatientId 
            ? `/api/patients/${currentPatientId}`
            : '/api/patients';
        
        const method = currentPatientId ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(patientData)
        });

        if (response.ok) {
            closeModals();
            loadPatients();
            alert(currentPatientId ? 'Patient updated successfully!' : 'Patient added successfully!');
        } else {
            alert('Operation failed. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});

// Load Patients
async function loadPatients() {
    try {
        const response = await fetch('/api/patients', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            const patients = await response.json();
            displayPatients(patients);
        } else {
            alert('Failed to load patients.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while loading patients.');
    }
}

// Display Patients
function displayPatients(patients) {
    const tableBody = document.getElementById('patientsTableBody');
    tableBody.innerHTML = '';

    patients.forEach(patient => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${patient._id}</td>
            <td>${patient.name}</td>
            <td>${patient.age}</td>
            <td>${patient.gender}</td>
            <td>${patient.contact}</td>
            <td>${new Date(patient.lastVisit).toLocaleDateString()}</td>
            <td>
                <button onclick="editPatient('${patient._id}')" class="btn-secondary">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deletePatient('${patient._id}')" class="btn-danger">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Edit Patient
async function editPatient(patientId) {
    try {
        const response = await fetch(`/api/patients/${patientId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            const patient = await response.json();
            openPatientModal(patient);
        } else {
            alert('Failed to load patient data.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while loading patient data.');
    }
}

// Delete Patient
function deletePatient(patientId) {
    currentPatientId = patientId;
    deleteModal.style.display = 'block';
}

confirmDelete.addEventListener('click', async () => {
    try {
        const response = await fetch(`/api/patients/${currentPatientId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            closeModals();
            loadPatients();
            alert('Patient deleted successfully!');
        } else {
            alert('Failed to delete patient.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while deleting patient.');
    }
});

cancelDelete.addEventListener('click', () => {
    closeModals();
});

// Search Patients
async function searchPatients() {
    const searchValue = searchInput.value.trim();
    const searchBy = searchType.value;

    if (!searchValue) {
        loadPatients();
        return;
    }

    try {
        const response = await fetch(`/api/patients/search?${searchBy}=${searchValue}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            const patients = await response.json();
            displayPatients(patients);
        } else {
            alert('Search failed. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during search.');
    }
}

// Logout
function logout() {
    localStorage.removeItem('token');
    window.location.href = '/index.html';
}

// Initial load
loadPatients(); 