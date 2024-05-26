// import express from "express";
// import { catchASyncError } from "../middlewares/catchASyncError.js";
// import ErrorHandler from "../middlewares/error.js";
// import User from "../models/userSchema.js";
// import Donation from "../models/foodSchema.js"
// export const agent_dashboard = catchASyncError(async (req, res, err, next) => {
//   // router.get("/agent/dashboard", middleware.ensureAgentLoggedIn, async (req,res) => {
//   const agentId = req.user._id;
//   const numAssignedDonations = await Donation.countDocuments({
//     agent: agentId,
//     status: "assigned",
//   });
//   const numCollectedDonations = await Donation.countDocuments({
//     agent: agentId,
//     status: "collected",
//   });
//   res.render("agent/dashboard", {
//     title: "Dashboard",
//     numAssignedDonations,
//     numCollectedDonations,
//   });
// });
// export const agent_collection_pend = catchASyncError(
//   async (req, res, err, next) => {
//     // router.get("/agent/collections/pending", middleware.ensureAgentLoggedIn, async (req,res) => {
//     try {
//       const pendingCollections = await Donation.find({
//         agent: req.user._id,
//         status: "assigned",
//       }).populate("donor");
//       res.render("agent/pendingCollections", {
//         title: "Pending Collections",
//         pendingCollections,
//       });
//     } catch (err) {
//       console.log(err);
//       req.flash("error", "Some error occurred on the server.");
//       res.redirect("back");
//     }
//   }
// );

// export const agent_collection_prev = catchASyncError(
//   async (req, res, err, next) => {
//     // router.get("/agent/collections/previous", middleware.ensureAgentLoggedIn, async (req,res) => {
//     try {
//       const previousCollections = await Donation.find({
//         agent: req.user._id,
//         status: "collected",
//       }).populate("donor");
//       res.render("agent/previousCollections", {
//         title: "Previous Collections",
//         previousCollections,
//       });
//     } catch (err) {
//       console.log(err);
//       req.flash("error", "Some error occurred on the server.");
//       res.redirect("back");
//     }
//   }
// );
// export const agent_collectionView = catchASyncError(
//   async (req, res, err, next) => {
//     // router.get("/agent/collection/view/:collectionId", middleware.ensureAgentLoggedIn, async (req,res) => {
//     try {
//       const collectionId = req.params.collectionId;
//       const collection = await Donation.findById(collectionId).populate(
//         "donor"
//       );
//       res.render("agent/collection", {
//         title: "Collection details",
//         collection,
//       });
//     } catch (err) {
//       console.log(err);
//       req.flash("error", "Some error occurred on the server.");
//       res.redirect("back");
//     }
//   }
// );
// export const agent_collecton_collect = catchASyncError(
//   async (req, res, err, next) => {
//     // router.get("/agent/collection/collect/:collectionId", middleware.ensureAgentLoggedIn, async (req,res) => {
//     try {
//       const collectionId = req.params.collectionId;
//       await Donation.findByIdAndUpdate(collectionId, {
//         status: "collected",
//         collectionTime: Date.now(),
//       });
//       req.flash("success", "Donation collected successfully");
//       res.redirect(`/agent/collection/view/${collectionId}`);
//     } catch (err) {
//       console.log(err);
//       req.flash("error", "Some error occurred on the server.");
//       res.redirect("back");
//     }
//   }
// );

// export const agent_profile = catchASyncError(async (req, res, err, next) => {
//   // router.get("/agent/profile", middleware.ensureAgentLoggedIn, (req,res) => {
//   res.render("agent/profile", { title: "My Profile" });
// });
// export const agent_profile_update = catchASyncError(
//   async (req, res, err, next) => {
//     // router.put("/agent/profile", middleware.ensureAgentLoggedIn, async (req,res) => {
//     try {
//       const id = req.user._id;
//       const updateObj = req.body.agent; // updateObj: {firstName, lastName, gender, address, phone}
//       await User.findByIdAndUpdate(id, updateObj);

//       req.flash("success", "Profile updated successfully");
//       res.redirect("/agent/profile");
//     } catch (err) {
//       console.log(err);
//       req.flash("error", "Some error occurred on the server.");
//       res.redirect("back");
//     }
//   }
// );
// export const agent_googlemaps = catchASyncError(async (req, res, err, next) => {
//   // router.get("/agent/profile/google-maps", middleware.ensureAgentLoggedIn, (req, res) => {
//   res.render("agent/googleMaps", { title: "Google Maps" });
// });

import express from "express";
import { catchASyncError } from "../middlewares/catchASyncError.js";
import ErrorHandler from "../middlewares/error.js";
import User from "../models/userSchema.js";
import Donation from "../models/foodSchema.js";

const router = express.Router();

export const agent_dashboard = catchASyncError(async (req, res, next) => {
    const agentId = req.user._id;
    const numAssignedDonations = await Donation.countDocuments({
        agent: agentId,
        status: "assigned",
    });
    const numCollectedDonations = await Donation.countDocuments({
        agent: agentId,
        status: "collected",
    });

    res.status(200).json({
        success: true,
        data: {
            numAssignedDonations,
            numCollectedDonations
        }
    });
});

export const agent_collection_pend = catchASyncError(async (req, res, next) => {
    const pendingCollections = await Donation.find({
        agent: req.user._id,
        status: "assigned",
    }).populate("donor");

    res.status(200).json({
        success: true,
        pendingCollections
    });
});

export const agent_collection_prev = catchASyncError(async (req, res, next) => {
    const previousCollections = await Donation.find({
        agent: req.user._id,
        status: "collected",
    }).populate("donor");

    res.status(200).json({
        success: true,
        previousCollections
    });
});

export const agent_collectionView = catchASyncError(async (req, res, next) => {
    const collectionId = req.params.collectionId;
    const collection = await Donation.findById(collectionId).populate("donor");

    if (!collection) {
        return res.status(404).json({
            success: false,
            message: "Collection not found"
        });
    }

    res.status(200).json({
        success: true,
        collection
    });
});

export const agent_collection_collect = catchASyncError(async (req, res, next) => {
    const collectionId = req.params.collectionId;
    await Donation.findByIdAndUpdate(collectionId, {
        status: "collected",
        collectionTime: Date.now(),
    });

    res.status(200).json({
        success: true,
        message: "Donation collected successfully"
    });
});

export const agent_profile = catchASyncError(async (req, res, next) => {
    res.status(200).json({
        success: true,
        profile: req.user
    });
});

export const agent_profile_update = catchASyncError(async (req, res, next) => {
    const id = req.user._id;
    const updateObj = req.body.agent; // updateObj: {firstName, lastName, gender, address, phone}
    await User.findByIdAndUpdate(id, updateObj);

    res.status(200).json({
        success: true,
        message: "Profile updated successfully"
    });
});

export const agent_googlemaps = catchASyncError(async (req, res, next) => {
    res.status(200).json({
        success: true,
        title: "Google Maps"
    });
});

export default router;
