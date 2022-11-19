//Sample Payload
//b64: BgADbY/uIAsmAw==
//hex: 0600036d8fee200b2603
function Decoder(bytes, port) {
	if ((port > 0) && (port < 223)) {
		var decodedTemp = 0;
		var decodedHumi = 0;
		var decodedBatt = 0;

		// seperate raw data from payload
		var rawSoil = bytes[0] | bytes[1] * 256;
		var rawTemp = bytes[2] | bytes[3] * 256;
		var rawHumi = bytes[4] | bytes[5] * 256;
		var rawBatt = bytes[6] | bytes[7] * 256;
		var rawADC  = bytes[8] | bytes[9] * 256;

		// decode raw data to values
		decodedTemp = sflt162f(rawTemp) * 100; // value calculated to range -1..x..+1 by dividing /100
		decodedHumi = sflt162f(rawHumi) * 100; // value calculated to range 0..x..+1 by dividing /100
		if (rawBatt !== 0) decodedBatt = rawBatt / 1000; // batterie voltage ist transmitted in mV, recalculate in V
                
		// definition of the decimal places
		decodedTemp = decodedTemp.toFixed(2);
		decodedHumi = decodedHumi.toFixed(2);
		decodedBatt = decodedBatt.toFixed(2);

		// return values
		return {
			data: {
				soilMoisture: rawSoil, // %
				temperature: decodedTemp, // C
				humidity: decodedHumi, // %
				battery: decodedBatt, // V
				adc: rawADC
			},
			warnings: [],
			errors: []
		};
	}
	else {
		return {
			data: {},
			warnings: [],
			errors: ["Invalid data received"]
		};

	}
}

function uflt162f(rawUflt16) {
	// rawUflt16 is the 2-byte number decoded from wherever;
	// it's in range 0..0xFFFF
	// bits 15..12 are the exponent
	// bits 11..0 are the the mantissa. Unlike IEEE format,
	// the msb is explicit; this means that numbers
	// might not be normalized, but makes coding for
	// underflow easier.
	// As with IEEE format, negative zero is possible, so
	// we special-case that in hopes that JavaScript will
	// also cooperate.
	//
	// The result is a number in the half-open interval [0, 1.0);
	//

	// throw away high bits for repeatability.
	rawUflt16 &= 0xFFFF;

	// extract the exponent
	var exp1 = (rawUflt16 >> 12) & 0xF;

	// extract the "mantissa" (the fractional part)
	var mant1 = (rawUflt16 & 0xFFF) / 4096.0;

	// convert back to a floating point number. We hope
	// that Math.pow(2, k) is handled efficiently by
	// the JS interpreter! If this is time critical code,
	// you can replace by a suitable shift and divide.
	var f_unscaled = mant1 * Math.pow(2, exp1 - 15);

	return f_unscaled;
}

function sflt162f(rawSflt16) {
	// rawSflt16 is the 2-byte number decoded from wherever;
	// it's in range 0..0xFFFF
	// bit 15 is the sign bit
	// bits 14..11 are the exponent
	// bits 10..0 are the the mantissa. Unlike IEEE format, 
	// 	the msb is transmitted; this means that numbers
	//	might not be normalized, but makes coding for
	//	underflow easier.
	// As with IEEE format, negative zero is possible, so
	// we special-case that in hopes that JavaScript will
	// also cooperate.
	//
	// The result is a number in the open interval (-1.0, 1.0);
	// 

	// throw away high bits for repeatability.
	rawSflt16 &= 0xFFFF;

	// special case minus zero:
	if (rawSflt16 == 0x8000)
		return -0.0;

	// extract the sign.
	var sSign = ((rawSflt16 & 0x8000) !== 0) ? -1 : 1;

	// extract the exponent
	var exp1 = (rawSflt16 >> 11) & 0xF;

	// extract the "mantissa" (the fractional part)
	var mant1 = (rawSflt16 & 0x7FF) / 2048.0;

	// convert back to a floating point number. We hope 
	// that Math.pow(2, k) is handled efficiently by
	// the JS interpreter! If this is time critical code,
	// you can replace by a suitable shift and divide.
	var f_unscaled = sSign * mant1 * Math.pow(2, exp1 - 15);

	return f_unscaled;
}
