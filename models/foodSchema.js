import Mongoose  from "mongoose";

const foodSchema = new Mongoose.Schema({
	donor: {
		type: Mongoose.Schema.Types.ObjectId,
		ref: "users",
		required: true
	},
	agent: {
		type: Mongoose.Schema.Types.ObjectId,
		ref: "users",
	},
	foodType: {
		type: String,
		required: true
	},
	quantity: {
		type: String,
		required: true
	},
	cookingTime: {
		type: Date,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	phone: {
		type: Number,
		required: true
	},
	donorToAdminMsg: String,
	adminToAgentMsg: String,
	collectionTime: {
		type: Date,
	},
	status: {
		type: String,
		enum: ["pending", "rejected", "accepted", "assigned", "collected"],
		required: true
	},
});

export default Mongoose.model("Donation", foodSchema);