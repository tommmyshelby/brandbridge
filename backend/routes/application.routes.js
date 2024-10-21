import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { applicationStatus, applyGigs, getAppliedGigs, getGigApplications } from "../controllers/application.controller.js";

const router = express.Router();
router.route('/apply').post(isAuthenticated,applyGigs);
router.route('/getAllGigs').get(isAuthenticated,getAppliedGigs);
router.route('/getGigApplications/:id').get(isAuthenticated,getGigApplications);
router.route('/updateStatus').post(isAuthenticated,applicationStatus);

//to get all applications related to particular gig
export default router;
