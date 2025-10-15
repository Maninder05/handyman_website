// backend/controllers/CreateServiceController.js
import Service from "../models/CreateService.js";

// Create a service (or draft)
export const createService = async (req, res) => {
  try {
    const { title, category, priceType, price, isDraft } = req.body;
    let imagePath = "";

    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    const newService = new Service({
      title,
      category,
      priceType,
      price: Number(price),
      image: imagePath,
      isDraft: isDraft === "true" || isDraft === true, // handle formData and JSON
    });

    await newService.save();
    res.status(201).json({ message: "Service created successfully ✅", service: newService });
  } catch (error) {
    console.error("Error creating service:", error.message);
    res.status(500).json({ message: "Failed to create service ❌", error: error.message });
  }
};

// Get all published services (isDraft: false)
export const getServices = async (req, res) => {
  try {
    const services = await Service.find({ isDraft: false }).sort({ createdAt: -1 });
    res.status(200).json(services);
  } catch (error) {
    console.error("Error fetching services:", error.message);
    res.status(500).json({ message: "Failed to fetch services ❌", error: error.message });
  }
};

// Get all drafts
export const getDrafts = async (req, res) => {
  try {
    const drafts = await Service.find({ isDraft: true }).sort({ updatedAt: -1 });
    res.status(200).json(drafts);
  } catch (error) {
    console.error("Error fetching drafts:", error.message);
    res.status(500).json({ message: "Failed to fetch drafts ❌", error: error.message });
  }
};

// Update service (also can publish/unpublish)
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, priceType, price, isDraft } = req.body;

    const existingService = await Service.findById(id);
    if (!existingService) {
      return res.status(404).json({ message: "Service not found ❌" });
    }

    // Update image if uploaded
    if (req.file) {
      existingService.image = `/uploads/${req.file.filename}`;
    }

    if (title !== undefined) existingService.title = title;
    if (category !== undefined) existingService.category = category;
    if (priceType !== undefined) existingService.priceType = priceType;
    if (price !== undefined) existingService.price = Number(price);
    if (isDraft !== undefined) existingService.isDraft = isDraft === "true" || isDraft === true;

    await existingService.save();

    res.status(200).json({
      message: "Service updated successfully ✅",
      service: existingService,
    });
  } catch (error) {
    console.error("Error updating service:", error.message);
    res.status(500).json({ message: "Failed to update service ❌", error: error.message });
  }
};

// Delete service
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      return res.status(404).json({ message: "Service not found ❌" });
    }

    res.status(200).json({ message: "Service deleted successfully ✅", service: deletedService });
  } catch (error) {
    console.error("Error deleting service:", error.message);
    res.status(500).json({ message: "Failed to delete service ❌", error: error.message });
  }
};
