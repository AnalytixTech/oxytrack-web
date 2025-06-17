import { FacilitiesService } from './services/facilitiesService.js';
import { CylindersService } from './services/cylindersService.js';

// Check if user is logged in
const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "login.html";
}

// Initialize services
const facilitiesService = new FacilitiesService(token);
const cylindersService = new CylindersService(token);

// Initialize page data when DOM is loaded
document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Load active facilities by default
        await loadFacilities();

        // Initialize logout button
        const logoutBtn = document.getElementById("logoutBtn");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", () => {
                localStorage.removeItem("token");
                window.location.href = "login.html";
            });
        }

        // Initialize facilities list button
        const viewFacilitiesBtn = document.getElementById("viewFacilitiesBtn");
        if (viewFacilitiesBtn) {
            viewFacilitiesBtn.onclick = async () => {
                facilitiesModal.style.display = "block";
                await loadFacilities();
            };
        }

        // Initialize cylinder inventory button
        const cylinderInventoryBtn = document.getElementById("cylinderInventoryBtn");
        if (cylinderInventoryBtn) {
            cylinderInventoryBtn.onclick = async () => {
                try {
                    const facilities = await facilitiesService.getFacilities("active");
                    const facilitySelect = document.getElementById("facility");
                    facilitySelect.innerHTML = facilities
                        .map(facility => `<option value="${facility._id}">${facility.name}</option>`)
                        .join('');
                    cylinderInventoryModal.style.display = "block";
                } catch (error) {
                    console.error("Error loading facilities for inventory:", error);
                }
            };
        }
    } catch (error) {
        console.error("Error initializing dashboard:", error);
    }
});

// Initialize logout functionality
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      console.log("Logging out...");
      localStorage.removeItem("token");
      window.location.href = "login.html";
    });
  } else {
    console.error("Logout button not found!");
  }
});

// Modal elements
const modal = document.getElementById("facilityModal");
const addFacilityBtn = document.getElementById("addFacilityBtn");
const closeBtn = document.getElementsByClassName("close")[0];
const facilityForm = document.getElementById("facilityForm");
const facilityMessage = document.getElementById("facilityMessage");

// Show modal
addFacilityBtn.onclick = function () {
  modal.style.display = "block";
};

// Close modal
closeBtn.onclick = function () {
  modal.style.display = "none";
  facilityMessage.textContent = "";
  facilityForm.reset();
};

// Click outside modal to close
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    facilityMessage.textContent = "";
    facilityForm.reset();
  }
};

// Handle facility registration
facilityForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById("facilityName").value,
    address: document.getElementById("facilityAddress").value,
    email: document.getElementById("facilityEmail").value,
    phone: document.getElementById("facilityPhone").value,
  };

  try {
    const response = await facilitiesService.createFacility(formData);


    const data = await response.json();
    console.log("Facility registration response:", data);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    if (response.ok) {
      facilityMessage.className = "message success";
      facilityMessage.textContent = "Facility registered successfully!";
      facilityForm.reset();
      setTimeout(() => {
        modal.style.display = "none";
        facilityMessage.textContent = "";
      }, 2000);
    } else {
      facilityMessage.className = "message error";
      facilityMessage.textContent = data.message || "Registration failed";
    }
  } catch (error) {
    facilityMessage.className = "message error";
    facilityMessage.textContent = "An error occurred. Please try again later.";
    console.error("Facility registration error:", error);
  }
});

// Facilities list modal elements
const facilitiesModal = document.getElementById("facilitiesListModal");
const viewFacilitiesBtn = document.getElementById("viewFacilitiesBtn");
const closeFacilitiesBtn =
  document.getElementsByClassName("close-facilities")[0];
const facilitiesList = document.getElementById("facilitiesList");

// Show facilities modal
viewFacilitiesBtn.onclick = async function () {
  facilitiesModal.style.display = "block";
  await loadFacilities();
};

// Close facilities modal
closeFacilitiesBtn.onclick = function () {
  facilitiesModal.style.display = "none";
};

// Click outside to close facilities modal
window.onclick = function (event) {
  if (event.target == facilitiesModal) {
    facilitiesModal.style.display = "none";
  }
  if (event.target == modal) {
    modal.style.display = "none";
    facilityMessage.textContent = "";
    facilityForm.reset();
  }
};

const facilityDetailsModal = document.getElementById("facilityDetailsModal");
const closeDetailsBtn = document.getElementsByClassName("close-details")[0];
const facilityDetailsForm = document.getElementById("facilityDetailsForm");
const saveDetailsBtn = document.getElementById("saveDetailsBtn");
const statusChangeBtn = document.getElementById("statusChangeBtn");
const activeToggle = document.getElementById("activeToggle");
const inactiveToggle = document.getElementById("inactiveToggle");

let isViewingActive = true;
let originalFacilityData = null;

// Add toggle event listeners
activeToggle.addEventListener("click", () => {
  if (!isViewingActive) {
    isViewingActive = true;
    activeToggle.classList.add("active");
    inactiveToggle.classList.remove("active");
    loadFacilities();
  }
});

inactiveToggle.addEventListener("click", () => {
  if (isViewingActive) {
    isViewingActive = false;
    inactiveToggle.classList.add("active");
    activeToggle.classList.remove("active");
    loadFacilities();
  }
});

// Add a variable to store loaded facilities
let loadedFacilities = [];

// Update loadFacilities function to use new API structure
async function loadFacilities() {
  try {
    loadedFacilities = await facilitiesService.getFacilities(
      isViewingActive ? "active" : "inactive"
    );
    displayFacilities(loadedFacilities);
  } catch (error) {
    document.getElementById("facilitiesList").innerHTML = `
            <div class="no-facilities">
                Error loading facilities. Please try again later.
            </div>
        `;
  }
}

// Update displayFacilities function to use _id
function displayFacilities(facilities) {
  const facilitiesListElement = document.getElementById("facilitiesList");

  if (!facilities || facilities.length === 0) {
    facilitiesListElement.innerHTML = `
            <div class="no-facilities">
                No ${isViewingActive ? "active" : "inactive"} facilities found.
            </div>
        `;
    return;
  }

  facilitiesListElement.innerHTML = facilities
    .map(
      (facility) => `
        <div class="facility-item" onclick="showFacilityDetails('${
          facility._id
        }')">
            ${facility.name || "Unnamed Facility"}
        </div>
    `
    )
    .join("");
}

// Update showFacilityDetails function to use _id
function showFacilityDetails(facilityId) {
  console.log("Looking for facility with ID:", facilityId);

  const facility = loadedFacilities.find((f) => f._id === facilityId);

  if (!facility) {
    console.error("Facility not found. ID:", facilityId);
    document.getElementById("detailsMessage").className = "message error";
    document.getElementById("detailsMessage").textContent =
      "Facility details could not be loaded";
    return;
  }

  originalFacilityData = { ...facility };

  // Populate details form
  document.getElementById("detailsFacilityId").value = facility._id;
  document.getElementById("detailsName").value = facility.name || "";
  document.getElementById("detailsAddress").value = facility.address || "";
  document.getElementById("detailsEmail").value = facility.email || "";
  document.getElementById("detailsPhone").value = facility.phone || "";

  // Set up status change button
  statusChangeBtn.textContent = facility.isActive
    ? "Deactivate Facility"
    : "Reactivate Facility";
  statusChangeBtn.setAttribute(
    "aria-label",
    facility.isActive ? "Deactivate this facility" : "Reactivate this facility"
  );

  // Show modal and reset state
  facilityDetailsModal.style.display = "block";
  saveDetailsBtn.disabled = true;
  document.getElementById("detailsMessage").textContent = "";
}

// Add form change detection
facilityDetailsForm.addEventListener("input", () => {
  const hasChanges = checkForChanges();
  saveDetailsBtn.disabled = !hasChanges;
});

function checkForChanges() {
  const currentData = {
    name: document.getElementById("detailsName").value,
    address: document.getElementById("detailsAddress").value,
    email: document.getElementById("detailsEmail").value,
    phone: document.getElementById("detailsPhone").value,
  };

  return Object.keys(currentData).some(
    (key) => currentData[key] !== originalFacilityData[key]
  );
}

// Handle save changes
facilityDetailsForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const facilityId = document.getElementById("detailsFacilityId").value;
    const formData = {
        name: document.getElementById("detailsName").value,
        address: document.getElementById("detailsAddress").value,
        email: document.getElementById("detailsEmail").value,
        phone: document.getElementById("detailsPhone").value,
    };

    try {
        const response = await facilitiesService.updateFacility(facilityId, formData);

        document.getElementById("detailsMessage").className = "message success";
        document.getElementById("detailsMessage").textContent = "Facility updated successfully";

        setTimeout(() => {
            facilityDetailsModal.style.display = "none";
            loadFacilities();
        }, 1500);

    } catch (error) {
        console.error("Error:", error);
        document.getElementById("detailsMessage").className = "message error";
        document.getElementById("detailsMessage").textContent = error.message || "An error occurred while updating facility";
    }
});

// Update the status change handler
statusChangeBtn.addEventListener("click", async () => {
  const facilityId = document.getElementById("detailsFacilityId").value;
  const facility = loadedFacilities.find((f) => f._id === facilityId);
  const action = facility.isActive ? "deactivate" : "reactivate";

  try {
    const response = await facilitiesService.toggleFacilityStatus(
      facilityId,
      facility.isActive
    );

    if (response.ok) {
      document.getElementById("detailsMessage").className = "message success";
      document.getElementById(
        "detailsMessage"
      ).textContent = `Facility ${action}d successfully`;

      setTimeout(() => {
        facilityDetailsModal.style.display = "none";
        loadFacilities();
      }, 1500);
    } else {
      const data = await response.json();
      document.getElementById("detailsMessage").className = "message error";
      document.getElementById("detailsMessage").textContent =
        data.message || `Error ${action}ing facility`;
    }
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("detailsMessage").className = "message error";
    document.getElementById("detailsMessage").textContent =
      "An error occurred while updating facility status";
  }
});

// New modal elements
const addCylinderModal = document.getElementById("addCylinderModal");
const cylinderInventoryModal = document.getElementById("cylinderInventoryModal");
const addCylinderBtn = document.getElementById("addCylinderBtn");
const cylinderInventoryBtn = document.getElementById("cylinderInventoryBtn");
const viewCylindersBtn = document.getElementById("viewCylindersBtn");

// Add Cylinder form elements
const addCylinderForm = document.getElementById("addCylinderForm");
const cylinderInventoryForm = document.getElementById("cylinderInventoryForm");

// Show/Hide modals
addCylinderBtn.onclick = function() {
    addCylinderModal.style.display = "block";
}

cylinderInventoryBtn.onclick = async function() {
    // Load active facilities for dropdown
    try {
        const response = await facilitiesService.getFacilities("active");
        
        const data = await response.json();
        const facilities = Array.isArray(data) ? data : [];
        
        const facilitySelect = document.getElementById("facility");
        facilitySelect.innerHTML = facilities.map(facility => 
            `<option value="${facility._id}">${facility.name}</option>`
        ).join('');
        
        cylinderInventoryModal.style.display = "block";
    } catch (error) {
        console.error("Error loading facilities:", error);
    }
}

// Handle status change in inventory form
document.getElementsByName("status").forEach(radio => {
    radio.addEventListener("change", (e) => {
        const purityInput = document.getElementById("purity");
        const pressureInput = document.getElementById("pressure");
        
        if (e.target.value === "In Use") {
            purityInput.disabled = false;
            pressureInput.disabled = false;
        } else {
            purityInput.disabled = true;
            pressureInput.disabled = true;
            purityInput.value = "";
            pressureInput.value = "";
        }
    });
});

// Handle Add Cylinder form submission
addCylinderForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    try {
        const formData = {
            cylinderId: document.getElementById("cylinderId").value,
            serialNumber: document.getElementById("serialNumber").value,
            size: document.getElementById("size").value,
            manufactureDate: document.getElementById("manufactureDate").value,
            lastInspectionDate: document.getElementById("lastInspectionDate").value
        };

        // Log the request data for debugging
        console.log('Submitting cylinder data:', formData);

        const result = await cylindersService.createCylinder(formData);
        console.log('Cylinder creation response:', result);

        document.getElementById('addCylinderMessage').className = 'message success';
        document.getElementById('addCylinderMessage').textContent = 'Cylinder added successfully!';
        addCylinderForm.reset();
        
        setTimeout(() => {
            addCylinderModal.style.display = 'none';
            document.getElementById('addCylinderMessage').textContent = '';
        }, 2000);
    } catch (error) {
        console.error('Error creating cylinder:', error);
        document.getElementById('addCylinderMessage').className = 'message error';
        document.getElementById('addCylinderMessage').textContent = 
            error.message || 'Failed to create cylinder. Please try again.';
    }
});

// Handle Cylinder Inventory form submission
cylinderInventoryForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const messageElement = document.getElementById('inventoryMessage');
    const status = document.querySelector('input[name="status"]:checked')?.value;

    try {
        // Validate form inputs
        if (!status) {
            throw new Error('Please select a status');
        }

        const formData = {
            facilityId: document.getElementById('facility').value,
            cylinderId: document.getElementById('inventoryCylinderId').value,
            status: status
        };

        // Add purity and pressure only for "In Use" status
        if (status === 'In Use') {
            const purity = document.getElementById('purity').value;
            const pressure = document.getElementById('pressure').value;
            
            if (!purity || !pressure) {
                throw new Error('Purity and pressure are required for In Use status');
            }

            formData.purity = purity;
            formData.pressure = pressure;
        }

        await cylindersService.updateInventory(formData);

        // Show success message
        messageElement.className = 'message success';
        messageElement.textContent = 'Inventory updated successfully!';

        // Reset form and close modal
        cylinderInventoryForm.reset();
        setTimeout(() => {
            cylinderInventoryModal.style.display = 'none';
            messageElement.textContent = '';
        }, 2000);

    } catch (error) {
        console.error('Form submission error:', error);
        messageElement.className = 'message error';
        messageElement.textContent = error.message || 'Failed to update inventory';
    }
});

// Update window click handler to include new modals
window.onclick = function(event) {
    if (event.target == addCylinderModal || 
        event.target == cylinderInventoryModal || 
        event.target == facilitiesModal || 
        event.target == facilityDetailsModal || 
        event.target == modal) {
        event.target.style.display = "none";
    }
}
