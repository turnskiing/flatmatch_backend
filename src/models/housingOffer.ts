import mongoose, { Schema } from "mongoose"

const housingOfferSchema = new mongoose.Schema({
	tenant: {
		type: Schema.Types.ObjectId,
		ref: "Tenant",
		required: true,
	},
	flatmates: [{
		type: Schema.Types.ObjectId,
		ref: "Tenant",
	}],
	price: {
		currency: {
			type: String,
			required: true
		},
		amount: Number,
	},
	location: {
		country: {
			type: String,
			required: true
		},
		city: {
			type: String,
			required: true
		},
		zipCode: {
			type: String,
			required: true
		},
		address: {
			type: String,
			required: true
		},
		latitude: {
			type: Number,
			required: false
		},
		longitude: {
			type: Number,
			required: false
		}
	},
	description: {
		type: String,
		requried: true
	},
	roomSize: {
		type: Number,
		required: true
	},
	yearConstructed: {
		type: Date,
		required: false
	},
	title: {
		type: String,
		requried: true
	},
	ageRange: {
		minAge: {
			type: Number,
			min: 0,
			max: 120,
			required: true
		},
		maxAge: {
			type: Number,
			min: 0,
			max: 120,
			required: true
		}
	},
	moveInDate: {
		type: Date,
		required: true
	},
	furnished: {
		type: Boolean,
		required: true
	},
	numberOfRooms: {
		type: Number,
		requried: true
	},
	values: [{
		type: String,
		required: true
	}],
	smoking: Boolean,
})

// Limit number of pictures to 20
function arrayLimit(val: any) {
	return val.length <= 20
}


export interface IHousingOffer {
	tenant: string
	flatmates: [string]
	price: {
		currency: string
		amount: number
	}
	location: {
		country: string
		city: string
		zipCode: string
		address?: string
		latitude?: number
		longitude?: number
	}
	description: string
	roomSize: number
	yearConstructed?: Date
	title: string
	ageRange?: {
		minAge?: number
		maxAge?: number
	}
	moveInDate: Date
	furnished: boolean
	numberOfRooms?: number
	values: [string]
	smoking: boolean
}

export interface HousingOfferDoc extends IHousingOffer, mongoose.Document {
	id: number
	_doc: any
}

interface HousingOfferModelInterface extends mongoose.Model<HousingOfferDoc> {
	build(attr: IHousingOffer): any
}

housingOfferSchema.statics.build = (attr: IHousingOffer) => {
	return new HousingOffer(attr)
}

const HousingOffer = mongoose.model<HousingOfferDoc, HousingOfferModelInterface>("HousingOffer", housingOfferSchema)

export { HousingOffer }
