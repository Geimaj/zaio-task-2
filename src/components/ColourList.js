import Component from "../Component";
import Colour from "./Colour";

export default class ColourList extends Component {
	constructor(colours) {
		super();
		this.colourNames = colours.map(colour => colour.name);
		this.colours = colours;
		this.colourObjects = []


		colours.forEach((colour, i) => {
			//create colour objects
			let col = new Colour(colour.name, colour.price)

			//attach click handlers
			col.onclick = () => this.colourClicked(i)
			this.colourObjects.push(col)
		});



		this.state = {
			selectedColourIndex: null
		};
	}

	getSelected() {
		return this.colourObjects[this.state.selectedColourIndex]
	}

	setSelected(index) {
		this.colourObjects.forEach(colour => colour.selected = false)
		if (index >= 0 && index <= this.colourNames.length) {
			this.setState({
				selectedColourIndex: index
			});
		}
	}

	colourClicked(i) {
		this.setSelected(i);
	}

	render() {
		//add border to selected
		if (this.state.selectedColourIndex !== null) {
			this.colourObjects[this.state.selectedColourIndex].select();
		}
		const colourElements = this.colourObjects.map(el => el.render());
		const list = document.createElement("ul");
		list.append(...colourElements);
		return list;
	}
}

export function getRandomColours(n = 18, colourNames) {
	let randomColours = [];

	while (randomColours.length <= n) {
		const random = Math.floor(Math.random() * colourNames.length);
		if (!randomColours.includes(colourNames[random])) {
			randomColours.push({
				name: colourNames[random],
				price: Math.floor(Math.random() * 175)
			});
		}
	}
	return randomColours;
}
