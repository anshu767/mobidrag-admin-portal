import api from "./api";

// dashboard data
export const getDashboard = () => api.get("/admin/dashboard");

// deals
export const getDeals = () => api.get("/admin/deals");

// partners
export const getPartners = () => api.get("/admin/partners");

// applications
export const getApplications = () => api.get("/admin/applications");

// payouts
export const getPayouts = () => api.get("/admin/payouts");