const axios = require('axios');

module.exports = (req, res, next) => {
	// if no zip code present, just move on to next function
	if (!req.params.zipCode && !req.body.zipcode) return next();
	// else update lat/lon via zip code given
	return axios.get(`https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=json&singleLine=${ req.params.zipCode || req.body.zipcode }&outFields=Match_addr,Addr_type`)
		.then(res => {
			const { location } = res.data.candidates[0];
			req.lat = location.x;
			req.lon = location.y;
			return next();
		})
		.catch(err => res.status(500).json({ errorMessage: `Error getting lat/lon from zip code: ${ err }`}));
};
