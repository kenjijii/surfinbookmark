let ArrStockName = LocalStock('stock');
let CheckedBS = LocalStock('sellbuy');
let ArrNowPrice = LocalStock('price');
let ArrTimer = LocalStock('timer');
let ArrHow = LocalStock('alert');
// ローカルに保存
async function sleep(ms) {
 return new Promise(resolve => setTimeout(resolve, ms));
};
function LocalStock(value) {
 // ローカルから取得して配列リターン
 const jsonFromLocal = localStorage.getItem(value);
 const ArrValue = jsonFromLocal ? JSON.parse(jsonFromLocal) : [value];
 return ArrValue;
};

function SetLocalStock(value) {
 // ローカルに保存
 localStorage.setItem('stock', JSON.stringify(value));
}





function getForArray(num) {
 const stockname = document.querySelectorAll('ul#sbi>li>select.stockname');
 const sellbuy = document.querySelectorAll('ul#sbi>li>select.sellbuy');
 const price = document.querySelectorAll('ul#sbi>li>.settlementValue');
 const timer = document.querySelectorAll('ul#sbi>li>.timer');
 const how = document.querySelectorAll('ul#sbi>li>.how');
 ArrStockName = ['stock'];
 CheckedBS = ['sellbuy'];
 ArrNowPrice = ['price'];
 ArrTimer = ['timer'];
 ArrHow = ['How'];
 for (let i = 1; i < stockname.length + 1; i++) {
  ArrStockName.push(stockname[i].value);
  CheckedBS.push(sellbuy[i].value);
  ArrNowPrice.push(price[i].textContent);
  ArrTimer.push(timer[i].value);
  ArrHow.push(how[i].value);
 }
};



function listClone() {
 const list = document.querySelector(".list");
 const listItem = list.children;
 const addButton = document.querySelector(".plus");
 addButton.addEventListener("click", (e) => {
  const AddThis = e.target.parentNode;
  // liが入る
  const listItemElement = AddThis.cloneNode(true);
  listItemElement.querySelector('.stockname').disabled = true;
  // listItemElement.querySelector('.plus').innerText = '　';
  listItemElement.querySelector('.plus').disabled = true;
  listItemElement.querySelector('.numOfStock').disabled = true;
  listItemElement.querySelector('.sellbuy').disabled = true;
  list.insertBefore(listItemElement, AddThis.nextSibling);
  listItemElement.querySelector('.button--delete').addEventListener("click", (e) => {
   e.target.parentNode.remove();
  });
  console.log(listItem);
 });
}

// 配列に入れる前の値をゲット
function getSelectedStockname(num) {
 const selectElement = document.querySelector('ul#sbi>li:nth-child(' + num + ') > select.stockname');
 var selectedValue = selectElement.value;
}
function getSelectedBuySell(num) {
 const selectElement = document.querySelector('ul#sbi>li:nth-child(' + num + ') > select.sellbuy');
 const selectedValue = selectElement.value;
 return selectedValue ? 'true' : 'false';
}
//配列からページ各値を設定する
function StocknameFromArray(num) {
 const selectElement = document.querySelector('ul#sbi>li:nth-child(' + num + ')>select.stockname');
 selectElement.value = ArrStockName[num];
};
function SellBuyFromArray(num) {
 const selectElement = document.querySelector('ul#sbi>li:nth-child(' + num + ')>.sellbuy');
 if (CheckedBS[num] === true) {
  selectElement.options[0].selected = true;
 } else {
  selectElement.options[1].selected = true;
 };
};
function PriceNowFromArray(num) {
 const priceNowElement = document.querySelector('ul#sbi>li:nth-child(' + num + ')>.settlementValue');
 priceNowElement.textContent = ArrNowPrice[num];
};
function TimerFromArray(num) {
 const timerElement = document.querySelector('ul#sbi>li:nth-child(' + num + ')>.timer');
 timerElement.value = ArrTimer[num];
}
function ArrHowFromArray(num) {
 const selectElement = document.querySelector('ul#sbi>li:nth-child(' + num + ')>.how');
 selectElement.value = ArrHow[num];
}
// 出口
// 決済する。
// 決済画面



async function sellThat(orderId) {
 document.getElementById('goShortcut-3').click();
 await sleep(1000)
 document.getElementById('main').contentDocument.getElementById('settlementEntryCiOrderId' + orderId).checked = true;
 await sleep(150)
 document.getElementById('main').contentDocument.getElementById('selectSettlementOrder').click();
 await sleep(1500)
 // document.getElementById('main').contentDocument.getElementById('doFinishReturn-1').click();
 document.getElementById('main').contentDocument.getElementById('doOrderConfirm-1').click();
 await sleep(700)
 document.getElementById('main').contentDocument.getElementById('orderSubmit').click();
}
