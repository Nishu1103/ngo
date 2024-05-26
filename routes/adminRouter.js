import express from "express";

import {
  // admin_dashboard,
  admin_donation_pending,
  admin_donation_previous,
  admin_donation_view,
  admin_donation_accept,
  admin_donation_reject,
  admin_donation_assign,
  admin_donation_assign_agent,
  admin_dashboard_agents,
  admin_profile,
  admin_profile_update,
} from "../controllers/admin.js";

import { isAuthorized } from "../middlewares/auth.js";
const router = express.Router();

// router.get("/admin/dashboard",isAuthorized, admin_dashboard);
router.get("/admin/donations/pending",isAuthorized, admin_donation_pending);
router.get("/admin/donations/previous",isAuthorized, admin_donation_previous);
router.get("/admin/donation/view/:donationId",isAuthorized, admin_donation_view);
router.get("/admin/donation/accept/:donationId",isAuthorized, admin_donation_accept);
router.get("/admin/donation/reject/:donationId",isAuthorized, admin_donation_reject);
router.get("/admin/donation/assign/:donationId",isAuthorized, admin_donation_assign);
router.post("/admin/donation/assign/:donationId",isAuthorized, admin_donation_assign_agent);
router.get("/admin/agents",isAuthorized, admin_dashboard_agents);
router.get("/admin/profile",isAuthorized, admin_profile);
router.post("/admin/profile",isAuthorized, admin_profile_update);

export default router;
