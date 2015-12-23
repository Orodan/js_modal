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

		// Buidl out our modal
		buildOut.call(this);

		// Initialize our event listeners
		initializeEvents.call(this);

		// Force the browser to recalc and recognize our added elements
		window.getComputedStyle(this.modal).height;

		// Add our classes
		// If the modal is taller than the window, we add our anchored class
		this.modal.className = this.modal.className + 
			(this.modal.offsetHeight > window.innerHeight ? 
				" my-modal-open my-modal-anchored" : "my-modal-open");
		this.overlay.className - this.overlay.className + " my-modal-open";

	}

	Modal.prototype.close = function () {

		var that = this;

		// Remove the open class name
		this.modal.className   = this.modal.className.replace(" my-modal-open", "");
		this.overlay.className = this.modal.className.replace(" my-modal-open", "");

		// Listen for css transitionned events and then remove the nodes from the DOM
		this.modal.addEventListener(this.transitionEnd, function () {
			that.modal.parentNode.removeChild(that.modal);
		});
		this.modal.addEventListener(this.transitionEnd, function () {
			if (thath.overlay.parentNode)
				that.overlay.parentNode.removeChild(that.overlay);
		});
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

	// Build out our modal
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

	// Initialize and bind events to our modal
	function initializeEvents () {

		if (this.closeButton)
			this.closeButton.addEventListener('click', this.close.bind(this));

		if (this.overlay)
			this.overlay.addEventListener('click', this.close.bind(this));
	}

}());