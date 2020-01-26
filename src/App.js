import ColourList, { getRandomColours } from "./components/ColourList";
import QuantityControls from "./components/QuantityControls";
import colourNames from "./colors";
import $ from "jquery";
import Cart from "./Cart";
import Colour from "./components/Colour";

export default class App {
	constructor(refs) {
		this.refs = refs;

		//create components
		this.components = {
			colourList: new ColourList(getRandomColours(18, colourNames)),
			quantityControls: new QuantityControls()
		};

		this.cart = new Cart();


		this.update = this.update.bind(this);
		this.load = this.load.bind(this);

		this.load();
	}

	load() {
		//attatch update handlers to components
		Object.keys(this.components).forEach(component => {
			this.components[component].addUpdateHandler(this.update);
		});

		//select first  colour
		this.components.colourList.setSelected(0);


		//attatch event handlers to modals
		this.refs.quantityModal.btnAccept.onclick = () => {
			$("#modal").modal("hide");
			this.refs.btnAddToCart.innerText = "Checkout now";

			this.cart.reset(); //we only support one item at a time
			//update cart items
			for (let i = 0; i < this.components.quantityControls.count; i++) {
				this.cart.addItem(this.components.colourList.getSelected())
			}

			//display cart total
			this.update();
			this.refs.price.innerHTML = `R ${this.cart.getTotal()}`


			//rebind add to cart button to checkout modal
			$("#addToCart").attr('data-target', "#checkout");
			const colour = this.cart.getItems()[0];
		
			this.refs.checkoutQuantity.innerText = `${this.cart.getItems().length} x `
			this.refs.checkoutColour.innerText = colour.name

			this.refs.checkoutPrice.innerText = '@ R ' + (colour.price)
			this.refs.checkoutTotal.innerText = `R ${this.cart.getTotal()}`


			this.refs.btnCheckout.onclick = () => {
				console.log('sending it')
				location.reload()
			}
		};
		this.refs.quantityModal.btnCancel.onclick = () => {
			$("#modal").modal("hide");
			this.refs.btnAddToCart.innerText = "Add to Cart";
			//reset quantity
			this.components.quantityControls.reset();
			this.cart.reset()
			this.update();
		};
	}

	update() {
		//render colourList
		this.refs.colourList.innerHTML = "";
		this.refs.colourList.appendChild(this.components.colourList.render());

		//render selectedColour names
		this.refs.selectedColourNames.forEach(
			el => (el.innerText = this.components.colourList.getSelected().name)
		);

		//render quantity controls
		this.refs.quantityControl.innerHTML = "";
		this.refs.quantityControl.appendChild(
			this.components.quantityControls.render()
		);

		//update selected quantities
		const count = this.components.quantityControls.count;
		this.refs.productCount.innerText = count;

		//render selectedColour count times
		this.refs.details.innerHTML = "";
		this.refs.details.appendChild(
			new ColourList(this.cart.getItems()).render()
		);

		//render selected colour price
		this.refs.price.innerHTML = `R ${this.components.colourList.getSelected().price}`
		this.refs.fullPrice.innerHTML = `R ${this.components.colourList.getSelected().price * 1.26}`

	}
}
