const mongoose = require('mongoose'); // Needed for special mongodb types.
module.exports = {
	name : {
		type : String,
		required : true,
	},
	parents : {
		type : Array,
		required : true,
	},
	num : {
		type : Number,
		required : true,
	},
	ket : {
		type : String,
		required : true,
	},
	grades: {
		agama: {
			pr: {
				pr1: {type: Number},
				pr2: {type: Number}
			},
			ph1: {
				ph1: {type: Number},
				ph2: {type: Number},
				r: {type: Number}
			},
			ph2: {
				ph1: {type: Number},
				ph2: {type: Number},
				r: {type: Number}
			},
			ps: {
				ps1: {type: Number},
				ps2: {type: Number},
				ps3: {type: Number}
			},
			nrb: {type: Number},
			pts: {
				p: {type: Number},
				r: {type: Number},
				a: {type: Number}
			},
			rph: {type: Number}
		},
		kwn: {
			pr: {
				pr1: {type: Number},
				pr2: {type: Number}
			},
			ph1: {
				ph1: {type: Number},
				ph2: {type: Number},
				r: {type: Number}
			},
			ph2: {
				ph1: {type: Number},
				ph2: {type: Number},
				r: {type: Number}
			},
			ps: {
				ps1: {type: Number},
				ps2: {type: Number},
				ps3: {type: Number}
			},
			nrb: {type: Number},
			pts: {
				p: {type: Number},
				r: {type: Number},
				a: {type: Number}
			},
			rph: {type: Number}
		},
		bahasa: {
			pr: {
				pr1: {type: Number},
				pr2: {type: Number}
			},
			ph1: {
				ph1: {type: Number},
				ph2: {type: Number},
				r: {type: Number}
			},
			ph2: {
				ph1: {type: Number},
				ph2: {type: Number},
				r: {type: Number}
			},
			ps: {
				ps1: {type: Number},
				ps2: {type: Number},
				ps3: {type: Number}
			},
			nrb: {type: Number},
			pts: {
				p: {type: Number},
				r: {type: Number},
				a: {type: Number}
			},
			rph: {type: Number}
		},
		mat: {
			pr: {
				pr1: {type: Number},
				pr2: {type: Number}
			},
			ph1: {
				ph1: {type: Number},
				ph2: {type: Number},
				r: {type: Number}
			},
			ph2: {
				ph1: {type: Number},
				ph2: {type: Number},
				r: {type: Number}
			},
			ps: {
				ps1: {type: Number},
				ps2: {type: Number},
				ps3: {type: Number}
			},
			nrb: {type: Number},
			pts: {
				p: {type: Number},
				r: {type: Number},
				a: {type: Number}
			},
			rph: {type: Number}
		},
		ipa: {
			pr: {
				pr1: {type: Number},
				pr2: {type: Number}
			},
			ph1: {
				ph1: {type: Number},
				ph2: {type: Number},
				r: {type: Number}
			},
			ph2: {
				ph1: {type: Number},
				ph2: {type: Number},
				r: {type: Number}
			},
			ps: {
				ps1: {type: Number},
				ps2: {type: Number},
				ps3: {type: Number}
			},
			nrb: {type: Number},
			pts: {
				p: {type: Number},
				r: {type: Number},
				a: {type: Number}
			},
			rph: {type: Number}
		},
		ips: {
			pr: {
				pr1: {type: Number},
				pr2: {type: Number}
			},
			ph1: {
				ph1: {type: Number},
				ph2: {type: Number},
				r: {type: Number}
			},
			ph2: {
				ph1: {type: Number},
				ph2: {type: Number},
				r: {type: Number}
			},
			ps: {
				ps1: {type: Number},
				ps2: {type: Number},
				ps3: {type: Number}
			},
			nrb: {type: Number},
			pts: {
				p: {type: Number},
				r: {type: Number},
				a: {type: Number}
			},
			rph: {type: Number}
		},
		seni: {
			pr: {
				pr1: {type: Number},
				pr2: {type: Number}
			},
			ph1: {
				ph1: {type: Number},
				ph2: {type: Number},
				r: {type: Number}
			},
			ph2: {
				ph1: {type: Number},
				ph2: {type: Number},
				r: {type: Number}
			},
			ps: {
				ps1: {type: Number},
				ps2: {type: Number},
				ps3: {type: Number}
			},
			nrb: {type: Number},
			pts: {
				p: {type: Number},
				r: {type: Number},
				a: {type: Number}
			},
			rph: {type: Number}
		},
		jasmani: {
			pr: {
				pr1: {type: Number},
				pr2: {type: Number}
			},
			ph1: {
				ph1: {type: Number},
				ph2: {type: Number},
				r: {type: Number}
			},
			ph2: {
				ph1: {type: Number},
				ph2: {type: Number},
				r: {type: Number}
			},
			ps: {
				ps1: {type: Number},
				ps2: {type: Number},
				ps3: {type: Number}
			},
			nrb: {type: Number},
			pts: {
				p: {type: Number},
				r: {type: Number},
				a: {type: Number}
			},
			rph: {type: Number}
		},
		sunda: {
			pr: {
				pr1: {type: Number},
				pr2: {type: Number}
			},
			ph1: {
				ph1: {type: Number},
				ph2: {type: Number},
				r: {type: Number}
			},
			ph2: {
				ph1: {type: Number},
				ph2: {type: Number},
				r: {type: Number}
			},
			ps: {
				ps1: {type: Number},
				ps2: {type: Number},
				ps3: {type: Number}
			},
			nrb: {type: Number},
			pts: {
				p: {type: Number},
				r: {type: Number},
				a: {type: Number}
			},
			rph: {type: Number}
		},
		inggris: {
			pr: {
				pr1: {type: Number},
				pr2: {type: Number}
			},
			ph1: {
				ph1: {type: Number},
				ph2: {type: Number},
				r: {type: Number}
			},
			ph2: {
				ph1: {type: Number},
				ph2: {type: Number},
				r: {type: Number}
			},
			ps: {
				ps1: {type: Number},
				ps2: {type: Number},
				ps3: {type: Number}
			},
			nrb: {type: Number},
			pts: {
				p: {type: Number},
				r: {type: Number},
				a: {type: Number}
			},
			rph: {type: Number}
		},
		komputer: {
			pr: {
				pr1: {type: Number},
				pr2: {type: Number}
			},
			ph1: {
				ph1: {type: Number},
				ph2: {type: Number},
				r: {type: Number}
			},
			ph2: {
				ph1: {type: Number},
				ph2: {type: Number},
				r: {type: Number}
			},
			ps: {
				ps1: {type: Number},
				ps2: {type: Number},
				ps3: {type: Number}
			},
			nrb: {type: Number},
			pts: {
				p: {type: Number},
				r: {type: Number},
				a: {type: Number}
			},
			rph: {type: Number}
		},
	},
	no_induk : {
		type : Number,
		required : true,
	},
	paidMonths : [
		{
			type : String,
		},
	],
};