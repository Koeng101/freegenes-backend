module.exports = function(app) {
	
	// landing page route
	app.get("/", (req, res) => {
		let jsonResponse = {
			message: "Welcome to the OpenFoundry API."
		};
		res.json(jsonResponse);
	});
	
};	