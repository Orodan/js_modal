// Wrap our code
(function() {

	// Constructor
	this.Modal = function () {

		// Global element references
		this.closeButton = null;
		this.modal = null;
		this.overlay = null;

		// Default options
		var defaults = {
			className: "fade-and-drop",
			closeButton: true,
			content: "",
			maxWidth: 600,
			minWidth: 280,
			overlay: true
		}

		// Extends default options if passed in arguments
		if (arguments[0] && typeof arguments[0] === "object")
			this.options = extendDefaults(defaults, arguments[0]);
	}

	function extendDefaults (source, properties) {

		var property;
		for(property in properties) {
			if(source.hasOwnProperty(property))
				source[property] = properties[property];
		}

		return source;
	}

}());