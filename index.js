import { menuArray } from "/data.js";
const menuItems = document.getElementById("menu_items");
const orderSection = document.getElementById("order-section");
const myOrderList = document.getElementById("my-order-list");
const totalPrice = document.getElementById("total_price");
const completeOrder = document.getElementById("complete-order");
const cardDetailsContainer = document.getElementById("card-details-container");
const pay = document.getElementById("pay");

let total = [];
const yourOrder = [];
console.log(total);
//your Order and section to enter the card details are hidden at the beginning
// cardDetailsContainer.classList.toggle("hidden");
orderSection.classList.toggle("hidden");

function renderMenu(arr) {
	return arr
		.map((menuItem) => {
			return `<div>
            <div id=${menuItem.id} class="menu_item">
                     <p class="emoji">${menuItem.emoji}</p>
                     <div class="about_the_dish">
                         <p class="dish_name">${menuItem.name}</p>
                         <p class="ingrediants">${menuItem.ingredients}</p>
                         <p class="price">$${menuItem.price}</p>
                     </div>
                     <button data-id="${menuItem.id}" id="plus_button" class="plus_button">➕</button>
                 </div>
                 <hr/>
                 </div>`;
		})
		.join("");
}

menuItems.innerHTML = renderMenu(menuArray);

//listen for clicks which item will be added to the total
menuItems.addEventListener("click", function (event) {
	//show Your order section only if there are items added to order
	if (orderSection.classList.contains("hidden")) {
		orderSection.classList.toggle("hidden");
	}
	//only do smth if the button is clicked inside the menuItems
	const button = event.target.closest(".plus_button");
	if (!button) {
		return;
	}
	const id = Number(button.dataset.id);
	const dish = menuArray.find(function (item) {
		return item.id === id;
	});

	renderYourOrder(dish);
	addItemToBasketArray(dish);
	countTotalPrice();
	console.log(yourOrder);
});

function addItemToBasketArray(dish) {
	yourOrder.push({ name: dish.name, price: dish.price });
}

function countTotalPrice() {
	total = [];

	//I need to save the prices into an array to show the total price
	for (let i = 0; i < yourOrder.length; i++) {
		console.log("your order", yourOrder);
		let priceItem = yourOrder[i].price;
		total.push(Number(priceItem));
	}
	console.log("total:", total);
	if (total.length === 0) {
		return;
	}
	let prices = total.reduce(function (total, current) {
		return total + current;
	});
	totalPrice.textContent = `$${prices}`;
}

function renderYourOrder(dish) {
	const dishDiv = document.createElement("div");
	dishDiv.classList.add("dish-div");
	myOrderList.appendChild(dishDiv);

	const dishName = document.createElement("p");
	dishName.classList.add("dish-name");
	dishName.textContent = dish.name;
	dishDiv.appendChild(dishName);

	const dishRemove = document.createElement("button");
	dishRemove.classList.add("dishRemoveBtn");
	dishDiv.appendChild(dishRemove);
	dishRemove.textContent = "remove";
	dishRemove.dataset.id = dish.id;
	console.log(dishRemove.dataset.id);

	const dishPrice = document.createElement("span");
	dishDiv.appendChild(dishPrice);
	dishPrice.textContent = `$${dish.price}`;
}

function removeItemFromBasketArray(button) {
	const id = Number(button.dataset.id);
	console.log(id);
	const dish = menuArray.find(function (item) {
		return item.id === id;
	});
	yourOrder.splice(`${dish}`, 1);
	countTotalPrice();
	myOrderList.removeChild(button.parentElement);
	return dish.price;
}

//listen for clicks for the remove button
orderSection.addEventListener("click", function (event) {
	//only do smth if the button is clicked inside the dish-div
	const button = event.target.closest(".dishRemoveBtn");
	if (!button) {
		return;
	}
	removeItemFromBasketArray(button);
	console.log(yourOrder);
	//if it was the last item in the order list, hide the order list:
	if (yourOrder.length === 0) {
		orderSection.classList.toggle("hidden");
		return;
	}
});

completeOrder.addEventListener("click", function () {
	cardDetailsContainer.style.opacity = 1;
	cardDetailsContainer.style.zIndex = 100;
	window.scrollTo(0, 0);
});

pay.addEventListener("click", function () {
	cardDetailsContainer.style.opacity = 0;
	cardDetailsContainer.style.zIndex = -1000;
});
