export default {
	colourList: document.querySelector("#colours"),
	selectedColourNames: document.querySelectorAll(".selectedColourName"),
	quantityControl: document.querySelector("#quantity-controls"),
	productCount: document.querySelector("#productCount"),
	details: document.querySelector("#details"),
	quantityModal: {
		btnAccept: document.querySelector("#quantity-accept"),
		btnCancel: document.querySelector("#quantity-cancel")
	},
	btnAddToCart: document.querySelector("#addToCart"),
	price: document.querySelector("#price"),
	fullPrice: document.querySelector("#full-price"),
	btnCheckout: document.querySelector("#btnCheckout"),
	checkoutContent: document.querySelector("#checkout-content"),
	checkoutColour: document.querySelector(".col.colours"),
	checkoutPrice: document.querySelector(".col.price"),
	checkoutQuantity: document.querySelector(".col.quantity"),
	checkoutTotal: document.querySelector("span.total")
};
