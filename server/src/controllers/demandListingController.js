import * as demandListingService from '../services/demandListingService.js';

export const createDemandListingController = async (req, res) => {
  try {
    const vendorId = req.user.id;
    const listing = await demandListingService.createDemandListing(vendorId, req.body);
    res.status(201).json({ success: true, data: listing });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getActiveDemandListingsController = async (req, res) => {
  try {
    const listings = await demandListingService.getActiveDemandListings();
    res.status(200).json({ success: true, data: listings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getVendorDemandListingsController = async (req, res) => {
  try {
    const vendorId = req.user.id;
    const listings = await demandListingService.getVendorDemandListings(vendorId);
    res.status(200).json({ success: true, data: listings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteDemandListingController = async (req, res) => {
  try {
    const { id } = req.params;
    const vendorId = req.user.id;
    await demandListingService.deleteDemandListing(parseInt(id), vendorId);
    res.status(200).json({ success: true, message: 'Listing deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
