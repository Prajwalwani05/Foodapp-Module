let url="https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json";


async function getMenu(){
    try{
        let res = await fetch(url)
        let data =await res.json()
        displayFoodItems(data);
        return new Promise((resolve,reject)=> resolve(data));
    }catch(err){
        console.log(err.message);
    }
}

function takeOrder (data) {
    return new Promise((resolve,reject)=>{
        setTimeout(async()=>{
            let selectedBurgers;
           try{
                selectedBurgers = select3Burgers(data);
                displaySelectedBurgers(selectedBurgers);
           }
           catch(e){
            console.log(e);
           }
           resolve(selectedBurgers);
        },2500);
    })
}
function orderPrep(data){
    let order={order_status:true, paid:false};
    return new Promise((resolve, reject) => {
        setTimeout(async()=>{
            try{
                orderStatus(data,order);
            }catch(err){
                console.log(err);
            }
            resolve(order);
        },1500);
    })
}

function payOrder(order){
    foodOrder={...order};
    foodOrder.paid=true;
    return new Promise((resolve,reject)=>{
        setTimeout(async()=>{
            try{
                placeOrder(foodOrder);
            }catch(err){
                console.log(err);
            }
            resolve(foodOrder);
        },1000)
    })
}

function thankYou(order){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                try {
                    if(order.paid){
                        successMsg();
                        resolve();
                    }
                    else reject(new Error("Payment Failed!"));
                } catch (error) {
                    console.log(error);
                }
            },1000);
        })
}

getMenu()
    .then((data)=>takeOrder(data))
    .then((burgers3)=>orderPrep(burgers3))
    .then((order)=>payOrder(order))
    .then((order)=>thankYou(order))
    .catch((err)=>console.log(err))


function select3Burgers (burgers) {
    let arr=[];
    arr.length=3;
    for(let i=0;i<3;i++){
        let rdnNum = randomNum(burgers.length);
        arr[i]=rdnNum;
        for(let j=0;j<i;j++){
            if(arr[i]==arr[j]){ 
                i--;
            }
        }
    }
    let selectedFood=[];
    arr.map((num)=>{
        selectedFood.push(burgers[num]);
    })
    return selectedFood;
}

function randomNum(max){
   return Math.floor(Math.random()*max);
}

function displayFoodItems (burgers) {
    console.log(burgers);
    burgers.map((burger)=>{
        let foodBox=document.createElement("div");
        foodBox.setAttribute("class","foodBox");
        let img=document.createElement("img");
         img.src=`${burger.imgSrc}`
        let id=document.createElement("span");
        id.innerHTML=`<strong>${burger.id}.`;
        let name=document.createElement("span");
        name.innerHTML=`<strong>${burger.name}`;
        let price=document.createElement("p");
        price.innerHTML=`<strong>$ ${burger.price}</strong>`;
        foodBox.append(img,id,name,price);
        document.querySelector("main").append(foodBox);
    })
}

function displaySelectedBurgers(burgers){
    console.log(burgers);
    document.querySelector(".modal").style.display="block";
    document.querySelector("#modalHeading").textContent="Selected Food Items";
    burgers.map((burger)=>{
        let orderBox=document.createElement("div");
        orderBox.setAttribute("class","orderBox")
        let img=document.createElement("img");
        img.src="https://source.unsplash.com/random/1920x1080/?cheeseburger";
        let name=document.createElement("p");
        name.innerHTML=`<strong>${burger.name}</strong>`;
        let price=document.createElement("p");
        price.innerHTML=`<strong></strong>$${burger.price}`
        orderBox.append(img,name,price);
        document.querySelector(".modal-content").append(orderBox);
    })
}

function orderStatus(burgers,order){
    console.log(order);
    document.querySelector("#orderStatus").innerHTML="";
    let total=0;
    burgers.map((burger)=>total+=burger.price);
    let status=document.createElement("p");
    status.innerHTML=`Make Payment of <strong>$${total}</strong> to place your order`;
    status.style.color="red";
    document.querySelector("#orderStatus").append(status);
}

function placeOrder(order){
    console.log(order);
    document.querySelector("#orderStatus").innerHTML="";
    let status=document.createElement("p");
    status.innerHTML=`Payment Done! ✅ Your order has been placed successfully`;
    status.style.color="green";
    document.querySelector("#orderStatus").append(status);
}

function successMsg(){
    console.log("Thank you!");
    alert("Thank you!")
    document.querySelector(".modal").style.display="none";
}