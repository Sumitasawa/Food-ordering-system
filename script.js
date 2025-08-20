const toggleBtn = document.querySelector(".toggle-btn");
const sidebar = document.getElementById("sidebar");
const main = document.querySelector(".main");
const closeBtn = document.getElementById("close-btn");
toggleBtn.addEventListener("click", () => {
  sidebar.classList.add("active");
  main.classList.add("expanded");
});
closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("active");
  main.classList.remove("expanded");
});
window.onload = function () {
  alert("Order Your Food");
};


const btnOrder = document.getElementById("btnOrder");
const btnPrep = document.getElementById("btnPrep");
const btnPay = document.getElementById("btnPay");

let menuData = [];
let currentOrder = null;

function getMenu() {
  fetch("https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let container = document.getElementById("menu-container");

      data.forEach(function(item) {
        let card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
          <img src="${item.imgSrc}" alt="${item.name}">
          <div class="card-body">
            <h3>${item.name}</h3>
            <p>$${item.price}/-</p>
            <button class="add-btn">+</button>
          </div>
        `;

        container.appendChild(card);
      });
    })
    .catch(function(error) {
      console.error("Error loading menu:", error);
    });
}
getMenu(); 

  let order={
          items:[]
        };


function TakeOrder(){
  return new Promise(function(resolve){
    setTimeout(function(){
      fetch("https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json")
      .then(function(response){
        return response.json();
      }).then(function(data){
         order.items = [];
        for(let i=0;i<3;i++){
          let randomitem=Math.floor(Math.random()*data.length);
          order.items.push(data[randomitem]);
        }
        console.log("Order Placed",order);
        alert("Order Placed");
        resolve(order)
      })
    
    },2500);
  })
}

function orderPrep(currentOrder){
  return new Promise(function(resolve){
    setTimeout(function(){
      currentOrder.order_status = true;   
      currentOrder.paid = false;
      console.log("Order is begin prepared",currentOrder)
      alert("Order is begin prepared");
       resolve(currentOrder);
    },1500);
  })
}

function payOrder(currentOrder){
  return new Promise(function(resolve){
    setTimeout(function(){
      currentOrder.paid = true;
     console.log("Order has been paid:",currentOrder);
  
      alert("Order has been paid");
       resolve();
    },1000)
  })
}


function thankyouFnc(){
  alert("Thank you for eating with us today!");
}

TakeOrder()
.then(orderPrep)
.then(payOrder)
.then(thankyouFnc);