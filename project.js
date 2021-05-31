let now = new Date();
let date = document.querySelector("#Header_And_Time");
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let m = months[now.getMonth()];
let y = now.getFullYear();
date.innerHTML = `Available Budget in ${m} ${y}`

// _______________________________________________________כותרת + שנה וחודש 

let incomeMoney = new Number('0'); 
let ExpensesMoney = new Number('0');
let balanceMoney = new Number('0');

let Li_for_income = [];//מערך של רשימה של ההכנסות
let Li_For_Expenses = [];// מערך של רשימה של ההוצאות

let expenses_container = document.getElementById("list_of_expenses"); //קונטינר שמחזיק את הרשימה של ההוצאות
let income_container = document.getElementById("list_of_income");// קונטינר שמחזיק את ההכנסות

let Total_expenses_Element = document.getElementById("total_expenses_value"); // כמות ההוצאות סהכ
let Total_income_Element = document.getElementById("total_income_value");// כמות ההכנסות סהכ
console.log(Total_income_Element,Total_expenses_Element);
// __________________________________________________________________
function addItem() {

    //צור אובייקט חדש שיכיל את המידע הנדרש לכול פריט ברשימה
    let item = {};
    item.title = document.getElementById("item_title").value; // השם של ההכנסה או ההוצאה
    item.value = Number(document.getElementById("item_value").value); // כמות ההכנסה או ההוצאה


    let select_value = document.getElementById("item_type").value; // פעולת החיבור או החיסור שבוחרים
    item.value = (select_value == "+") ? item.value : (item.value - (item.value * 2));


    //מייצר אלמנט חדש שאותו אנחנו מכניסים לרשימה
    let listItem = document.createElement("li");
    listItem.setAttribute("item_title", item.title);
    listItem.setAttribute("item_type", select_value);

    listItem.innerHTML = `
                <span>${item.title}</span>
                <span style="border-radius:1px solid black;float:right;cursor: pointer;" class="glyphicon glyphicon-remove greenIcone" onClick="removeItem(event)"></span>
                 <span  style= "float:right";>${item.value}</span>
                 `;

    if (select_value == "+") {
        // הוסף למערך מידע של ההכנסות
        Li_for_income.push(item);
        //צייר על המסך לתןך הרשימה של ההכנסות
        income_container.appendChild(listItem);   //update income total
        // מחשבת ממוצע לפי הפריטים במערך אחרי זה מעדכנת את המשתנה שמחזיק את הסכום ואחרי זה מציירת במסך את הסכום החדש
        updateBalance(Li_for_income, select_value, Total_income_Element);
        presenege1.innerHTML = (ExpensesMoney/incomeMoney)*100;
          
    }
    else {
        //הוסף למערך של הוצאות
        Li_For_Expenses.push(item)
        //מצייר למסך לרשימת הוצאות
        expenses_container.appendChild(listItem);
        updateBalance(Li_For_Expenses, select_value, Total_expenses_Element);
        presenege1.innerHTML = (ExpensesMoney/incomeMoney)*100;
    };
    // מנקה את השדות שדות האינפוט
    clearFields();

}
// ________________________________________________________________________________________

function removeItem(event, target) {
    // let spanEl = event.target;
    // let listContainerEl = event.target.parentElement.parentElement;


    let listItemEl = event.target.parentElement;
    let itemTitle = listItemEl.getAttribute("item_title");
    let itemType = listItemEl.getAttribute("item_type");


    let listArray = (itemType == "+") ? Li_for_income : Li_For_Expenses;

    let selector = (itemType == "+") ? "total_income_value" : "total_expenses_value";

    let totalIncomeOrExoensesEl = document.getElementById(selector);



    // מערך שמחזיק את המידע של הרשימה  צריך למחוק ממנו את הפריט שמוסר
    listArray.forEach(function (item) {
        if (item.title == itemTitle) {
            listArray.pop(item);
            presenege1.innerHTML = (ExpensesMoney/incomeMoney)*100;
        }
    });


    //update sum variable and the html
    updateBalance(listArray, itemType, totalIncomeOrExoensesEl);


    //remove element from list from html
    listItemEl.remove();


}
// _____________________________________________________________________________________________

// 1. loop through list and get the sum , list can be expenses or income list
// 2. update sum variable  ,expenses or income 
// 3. update html element with the sum ,can be expenses or sum

function updateBalance(list, listType, el) {

    let tempSum = 0;
    list.forEach(function (item) {
        tempSum = tempSum + item.value;
    });

    listType == "+" ? (incomeMoney = tempSum) : (ExpensesMoney = tempSum)


    //update balance sum of expensess or incomes
    el.innerText = tempSum;


    // update total balance
    let totalBalance = Number(incomeMoney) + Number(ExpensesMoney);
    let totalEl = document.getElementById("Balance_Money");
    totalEl.innerText = totalBalance;
    presenege1.innerHTML = (ExpensesMoney/incomeMoney)*100;
     

}
// ____________________________________________________________________________


function clearFields() {
    document.getElementById("item_title").value = "";
    document.getElementById("item_value").value = "";
    document.getElementById("item_type").value = "+";    

}

// __________________________________________________________________________________________________________________

let add = document.getElementById("item_title").addEventListener("focus", function (e) { changecolor(e) })
let val = document.getElementById("item_value").addEventListener("focus", function (e) { changecolor(e) })
let aadd = document.getElementById("item_title").addEventListener("focusout", function (e) { changecolor(e) })
let vval = document.getElementById("item_value").addEventListener("focusout", function (e) { changecolor(e) })
let selecat_value = document.getElementById("item_type");

function changecolor(e) {
    if (e.type == "focus") {

        if (selecat_value.value == "+") {

            e.target.style.border = "solid 2px rgb(20, 233, 212)"
        } else {

            e.target.style.border = "solid 2px rgb(247, 12, 12)"
        }

    } else if (e.type == "focusout") { e.target.style.border = "";}
}

// ____________________________________________________________________________________________


let presenege1 = document.getElementById('aaa');
(ExpensesMoney/incomeMoney)*100
function presenege (){
  
}