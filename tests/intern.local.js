define([
	"./intern"
], function (intern) {
	intern.tunnel = "NullTunnel";
	intern.tunnelOptions = {
		hostname: "localhost",
		port: 4444
	};

	intern.environments = [
		{ browserName: "firefox" },
		{ browserName: "safari" },
		{ browserName: "chrome" }
	];

	return intern;
});