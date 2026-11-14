import { menuArray } from "/data.js";
const menuItems = document.getElementById("menu_items");
const orderSection = document.getElementById("order-section");
const myOrderList = document.getElementById("my-order-list");
const totalPrice = document.getElementById("total_price");

const total = [];

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

	const dishPrice = document.createElement("span");
	dishDiv.appendChild(dishPrice);
	dishPrice.textContent = `$${dish.price}`;

	//I need to save the prices into an array hmm
	total.push(Number(dish.price));
	countTotalPrice();
});

function countTotalPrice() {
	let prices = total.reduce(function (total, current) {
		return total + current;
	});
	console.log(prices);
	totalPrice.textContent = `$${prices}`;
}
