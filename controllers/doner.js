// import express from "express";
// import { catchASyncError } from "../middlewares/catchASyncError.js";
// import ErrorHandler from "../middlewares/error.js";
// import User from "../models/userSchema.js";
// import Donation from "../models/foodSchema.js"

// export const donor_dashboard = catchASyncError(async (req, res, err ,next) =>{
// // router.get("/donor/dashboard", middleware.ensureDonorLoggedIn, async (req,res) => {
// 	const donorId = req.user._id;
// 	const numPendingDonations = await Donation.countDocuments({ donor: donorId, status: "pending" });
// 	const numAcceptedDonations = await Donation.countDocuments({ donor: donorId, status: "accepted" });
// 	const numAssignedDonations = await Donation.countDocuments({ donor: donorId, status: "assigned" });
// 	const numCollectedDonations = await Donation.countDocuments({ donor: donorId, status: "collected" });
// 	res.render("donor/dashboard", {
// 		title: "Dashboard",
// 		numPendingDonations, numAcceptedDonations, numAssignedDonations, numCollectedDonations
// 	});
// });

// // router.get("/donor/donate", middleware.ensureDonorLoggedIn, (req,res) => {
// // 	res.render("donor/donate", { title: "Donate" });
// // });


// export const donor_donate = catchASyncError(async (req, res, err ,next) =>{
// // router.post("/donor/donate", middleware.ensureDonorLoggedIn, async (req,res) => {
// 	try
// 	{
// 		const donation = req.body.donation;
// 		donation.status = "pending";
// 		donation.donor = req.user._id;
// 		const newDonation = new Donation(donation);
// 		await newDonation.save();
// 		req.flash("success", "Donation request sent successfully");
// 		res.redirect("/donor/donations/pending");
// 	}
// 	catch(err)
// 	{
// 		console.log(err);
// 		req.flash("error", "Some error occurred on the server.")
// 		res.redirect("back");
// 	}
// });

// export const donor_donation_pend = catchASyncError(async (req, res, err ,next) =>{
// // router.get("/donor/donations/pending", middleware.ensureDonorLoggedIn, async (req,res) => {
// 	try
// 	{
// 		const pendingDonations = await Donation.find({ donor: req.user._id, status: ["pending", "rejected", "accepted", "assigned"] }).populate("agent");
// 		res.render("donor/pendingDonations", { title: "Pending Donations", pendingDonations });
// 	}
// 	catch(err)
// 	{
// 		console.log(err);
// 		req.flash("error", "Some error occurred on the server.")
// 		res.redirect("back");
// 	}
// });

// export const donor_donation_prev = catchASyncError(async (req, res, err ,next) =>{
// // router.get("/donor/donations/previous", middleware.ensureDonorLoggedIn, async (req,res) => {
// 	try
// 	{
// 		const previousDonations = await Donation.find({ donor: req.user._id, status: "collected" }).populate("agent");
// 		res.render("donor/previousDonations", { title: "Previous Donations", previousDonations });
// 	}
// 	catch(err)
// 	{
// 		console.log(err);
// 		req.flash("error", "Some error occurred on the server.")
// 		res.redirect("back");
// 	}
// });

// export const donor_donation_deleterejected = catchASyncError(async (req, res, err ,next) =>{
// // router.get("/donor/donation/deleteRejected/:donationId", async (req,res) => {
// 	try
// 	{
// 		const donationId = req.params.donationId;
// 		await Donation.findByIdAndDelete(donationId);
// 		res.redirect("/donor/donations/pending");
// 	}
// 	catch(err)
// 	{
// 		console.log(err);
// 		req.flash("error", "Some error occurred on the server.")
// 		res.redirect("back");
// 	}
// });

// export const donor_profile = catchASyncError(async (req, res, err ,next) =>{
// // router.get("/donor/profile", middleware.ensureDonorLoggedIn, (req,res) => {
// 	res.render("donor/profile", { title: "My Profile" });
// });

// export const donor_profile_update = catchASyncError(async (req, res, err ,next) =>{
// // router.put("/donor/profile", middleware.ensureDonorLoggedIn, async (req,res) => {
// 	try
// 	{
// 		const id = req.user._id;
// 		const updateObj = req.body.donor;	// updateObj: {firstName, lastName, gender, address, phone}
// 		await User.findByIdAndUpdate(id, updateObj);
		
// 		req.flash("success", "Profile updated successfully");
// 		res.redirect("/donor/profile");
// 	}
// 	catch(err)
// 	{
// 		console.log(err);
// 		req.flash("error", "Some error occurred on the server.")
// 		res.redirect("back");
// 	}
	
// });
import express from "express";
import { catchASyncError } from "../middlewares/catchASyncError.js";
import ErrorHandler from "../middlewares/error.js";
import User from "../models/userSchema.js";
import Donation from "../models/foodSchema.js"

const router = express.Router();

export const donor_dashboard = catchASyncError(async (req, res, next) => {
    const donorId = req.user._id;
    const numPendingDonations = await Donation.countDocuments({ donor: donorId, status: "pending" });
    const numAcceptedDonations = await Donation.countDocuments({ donor: donorId, status: "accepted" });
    const numAssignedDonations = await Donation.countDocuments({ donor: donorId, status: "assigned" });
    const numCollectedDonations = await Donation.countDocuments({ donor: donorId, status: "collected" });

    res.status(200).json({
        success: true,
        data: {
            numPendingDonations,
            numAcceptedDonations,
            numAssignedDonations,
            numCollectedDonations
        }
    });
});

export const donor_donate = catchASyncError(async (req, res, next) => {
    try {
        const donation = req.body.donation;
        donation.status = "pending";
        donation.donor = req.user._id;
        const newDonation = new Donation(donation);
        await newDonation.save();
        res.status(200).json({
            success: true,
            message: "Donation request sent successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Some error occurred on the server."
        });
    }
});

export const donor_donation_pend = catchASyncError(async (req, res, next) => {
    try {
        const pendingDonations = await Donation.find({ donor: req.user._id, status: ["pending", "rejected", "accepted", "assigned"] }).populate("agent");
        res.status(200).json({
            success: true,
            pendingDonations
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Some error occurred on the server."
        });
    }
});

export const donor_donation_prev = catchASyncError(async (req, res, next) => {
    try {
        const previousDonations = await Donation.find({ donor: req.user._id, status: "collected" }).populate("agent");
        res.status(200).json({
            success: true,
            previousDonations
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Some error occurred on the server."
        });
    }
});

export const donor_donation_deleterejected = catchASyncError(async (req, res, next) => {
    try {
        const donationId = req.params.donationId;
        await Donation.findByIdAndDelete(donationId);
        res.status(200).json({
            success: true,
            message: "Donation deleted successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Some error occurred on the server."
        });
    }
});

export const donor_profile = catchASyncError(async (req, res, next) => {
    res.status(200).json({
        success: true,
        profile: req.user
    });
});

export const donor_profile_update = catchASyncError(async (req, res, next) => {
    try {
        const id = req.user._id;
        const updateObj = req.body.donor; // updateObj: {firstName, lastName, gender, address, phone}
        await User.findByIdAndUpdate(id, updateObj);
        res.status(200).json({
            success: true,
            message: "Profile updated successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Some error occurred on the server."
        });
    }
});

// export default router;
