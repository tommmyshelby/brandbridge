import express from 'express';
import { getBrandProfile, getInfluencerProfile, login, logout, register, updateBrandProfile, updateInfluencerProfile } from '../controllers/user.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
import { getAppliedGigs } from '../controllers/application.controller.js';

const router =express.Router();

router.route('/register').post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);

router.route('/brand/getMyProfile').get(isAuthenticated,getBrandProfile);
router.route('/influencer/getMyProfile').get(isAuthenticated,getInfluencerProfile);

router.route('/brand/updateProfile').post(isAuthenticated,updateBrandProfile);
router.route('/influencer/updateProfile').post(isAuthenticated,updateInfluencerProfile);

router.route('/influencer/getAppliedGigs').get(isAuthenticated,getAppliedGigs);


export default router;