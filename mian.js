let icon_shop = document.querySelector(".shop .shop");
let aside_bar = document.querySelector(".aside_bar");
let close_icon = document.querySelector(".close");
let up = document.querySelector("span.up");
let number_item = document.querySelector(".number_item");
icon_shop.onclick = function() {
    aside_bar.classList.toggle("active");
}
close_icon.onclick = function() {
    aside_bar.classList.remove("active");
}
window.onscroll = function() {
    if (this.scrollY > 300) {
        up.classList.add("active");
    } else {
        up.classList.remove("active");

    }
}
up.onclick = function() {
    window.scrollTo({
        behavior: "smooth",
        top: 0
    })
}

function store_item(img, name) {
    let call_item = JSON.parse(localStorage.getItem("items")) || [];
    let item = {
        img_item: img,
        name_item: name,
    };

    call_item.push(item);
    localStorage.setItem("items", JSON.stringify(call_item));
    display();
    incremeant();
}

function display() {
    let call_item = JSON.parse(localStorage.getItem("items")) || [];
    let number_card = document.querySelector(".number_buy");
    let section = document.querySelector(".aside_bar .content");
    section.innerHTML = '';
    let totalPrice = 0;

    call_item.forEach(item => {
        section.innerHTML += `
            <div class="box">
                <div class="image">
                    <img src="${item.img_item}" alt="">
                </div>
                <div class="price">
                    <span>${item.name_item}</span>
                </div>
                <div class="icon">
                    <i class="fa-solid fa-trash" onclick="remove_item(${item.id})"></i>
                </div>
            </div>
            <hr>
        `;
        totalPrice += Number(item.name_item);
    });

    number_card.innerHTML = "$" + totalPrice.toFixed(2);
}

function remove_item(id) {
    let call_item = JSON.parse(localStorage.getItem("items")) || [];
    let updated_items = call_item.filter(item => item.id !== id);
    localStorage.setItem("items", JSON.stringify(updated_items));
    decrement();
    display();
}

function decrement() {
    let number_item = document.querySelector(".number_item");

    let count = parseInt(localStorage.getItem("itemCount")) || 0;

    count--;
    number_item.innerHTML = count;

    localStorage.setItem("itemCount", count);
}

function incremeant() {
    let number_item = document.querySelector(".number_item");

    let count = parseInt(localStorage.getItem("itemCount")) || 0;

    count++;
    number_item.innerHTML = count;

    localStorage.setItem("itemCount", count);
}