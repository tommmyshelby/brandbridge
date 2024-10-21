import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { getAllGigs, getGigById, getGigsByUserId, postGig, updateGig } from "../controllers/gigs.controller.js";

const router = express.Router();
router.route("/postGig").post(isAuthenticated,postGig);
router.route("/getAllGigs").get(isAuthenticated,getAllGigs);
router.route("/getGig/:id").get(isAuthenticated,getGigById);
router.route("/getUserGigs/:userId").get(isAuthenticated,getGigsByUserId);
router.route("/updateGig").post(isAuthenticated,updateGig);


export default router;