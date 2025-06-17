import { API_ENDPOINTS } from "../config/api.js";

export class CylindersService {
  constructor(token) {
    this.token = token;
    this.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  async createCylinder(cylinderData) {
    try {
      const response = await fetch(API_ENDPOINTS.cylinders.base, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(cylinderData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create cylinder");
      }

      return data;
    } catch (error) {
      console.error("Error creating cylinder:", error);
      throw error;
    }
  }

  async updateInventory(inventoryData) {
    try {
      // Validate input data
      if (
        !inventoryData.facilityId ||
        !inventoryData.cylinderId ||
        !inventoryData.status
      ) {
        throw new Error("Missing required fields");
      }

      // Prepare the request body
      const requestBody = {
        facilityId: inventoryData.facilityId,
        cylinderId: inventoryData.cylinderId,
        status: inventoryData.status,
      };

      // Only add purity and pressure for 'In Use' status
      if (inventoryData.status === "In Use") {
        if (!inventoryData.purity || !inventoryData.pressure) {
          throw new Error("Purity and pressure are required for In Use status");
        }
        requestBody.purity = parseFloat(inventoryData.purity);
        requestBody.pressure = parseFloat(inventoryData.pressure);
      }

      // Log request for debugging
      console.log("Sending inventory update:", requestBody);

      const response = await fetch(API_ENDPOINTS.entries.create, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log("Server response:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Server error while updating inventory"
        );
      }

      return data;
    } catch (error) {
      console.error("Inventory update error:", error);
      throw new Error(`Inventory update failed: ${error.message}`);
    }
  }

  async getCylinders() {
    try {
      const response = await fetch(API_ENDPOINTS.cylinders.base, {
        headers: this.headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch cylinders");
      }

      return Array.isArray(data) ? data : [data];
    } catch (error) {
      console.error("Error fetching cylinders:", error);
      throw error;
    }
  }

  async getCylinderHistory(cylinderId) {
    try {
      const response = await fetch(API_ENDPOINTS.entries.history, {
        headers: this.headers,
        body: JSON.stringify(cylinderId),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch cylinder history");
      }

      return Array.isArray(data) ? data : [data];
    } catch (error) {
      console.error("Error fetching cylinder history:", error);
      throw error;
    }
  }
}
