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

	// Public methods

	Modal.prototype.open = function () {

	}

	// Private methods

	// Utility method to extend defaults with user options
	function extendDefaults (source, properties) {

		var property;
		for(property in properties) {
			if(source.hasOwnProperty(property))
				source[property] = properties[property];
		}

		return source;
	}

	function buildOut () {

		var content, contentHolder, docFrag;

		// If content is an HTML string, append the HTML string
		if (typeof this.options.content === "string")
			content = this.options.content;
		// Else content is a domNode, append its content
		else
			content = this.options.content.innerHTML;

		// Create a DocumentFragment to build with
		docFrag = document.createDocumentFragment();

		// Create modal element
		this.modal                = document.createElement("div");
		this.modal.className      = "my-modal" + this.options.className;
		this.modal.style.minWidth = this.options.minWidth + "px";
		this.modal.style.maxWidth = this.options.maxWidth + "px";

		// If closeButton option is true, add a close button
		if (this.options.closeButton === true) {
			this.closeButton           = document.createElement("button");
			this.closeButton.className = "my-modal-close close-button";
			this.closeButton.innerHTML = "x";
			this.modal.appendChild(this.closeButton);
		}

		// If overlay is true, add one
		if (this.options.overlay === true) {
			this.overlay = document.createElement("div");
			this.overlay.className = "my-modal-overlay" + this.options.classname;
			docFrag.appendChild(this.overlay);
		}

		// Create content area and append to modal
		contentHolder = document.createElement("div");
		contentHolder.className = "my-modal-content";
		contentHolder.innerHTML = content;
		this.modal.appendChild(contentHolder);

		// Append modal to DocumentFragment
		docFrag.appendChild(this.modal);

		// Append DocumentFragment to body
		document.body.appendChild(docFrag);
	}

}());