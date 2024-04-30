async function sleep(ms) {
 return new Promise(resolve => setTimeout(resolve, ms));
};//sleep関数
// ローカルストレージから取得
makelist();
listClone();
let ArrStockName;
let Pieces;
let CheckedBS;
let ArrNowPrice;
let ArrTimer;
let ArrHow;
let ArrStockNumber;
// ローカルから持ってくる軽い奴
function LocalStock(value) {
 // ローカルから取得して配列リターン
 const jsonFromLocal = localStorage.getItem(value);
 const ArrValue = jsonFromLocal ? JSON.parse(jsonFromLocal) : [value];
 return ArrValue;
};
// これ本番ページで使いますから。でも使ってない。＜これのテストをする。すべき。
// 最初 >ローカルストレージから取得あと>ページから配列にプッシュ・。
function getPage() {
 function getSelectedBrand() { // 選択されているstock要素を取得する関数
  const selected_id = document.getElementById('main').contentDocument.getElementById('currencyPair-1').value;
  return selected_id; //4014
 };
 function getNumOfStockes() { // 数量を取得する関数
  const value = document.getElementById('main').contentDocument.getElementById('amount-1').value;
  return value;
 };
 function getCheckedBS() {//選択されている売り買いを取得する関数
  const checkedwhat = document.getElementById('main').contentDocument.getElementById('side-1-2').checked;
  if (checkedwhat) {
   // 売り
   return "1";
  } else {
   // 買い
   return "2";
  }
 };
 // price
 function getPriceOfStockes() {
  // 現在の価格を取得する関数
  let selected_id = getCheckedBS();
  const stockId = getSelectedBrand();
  const id = selected_id ? 'p2bid-p' + stockId : 'p2ask-p' + stockId;
  const price = document.getElementById(id).querySelector('span').innerText;
  return price;
 };
 ArrStockName = LocalStock('stock');
 Pieces = LocalStock('pieces');
 CheckedBS = LocalStock('sellbuy');
 ArrNowPrice = LocalStock('price');
 ArrTimer = LocalStock('timer');
 ArrHow = LocalStock('alert');
 ArrStockNumber = LocalStock('numberstock');

 ArrStockNumber = push(getMaxNumberFromArray(ArrStockNumber));
 ArrStockName.push(getSelectedBrand());
 Pieces.push(getNumOfStockes());
 CheckedBS.push(getCheckedBS());
 ArrNowPrice.push(getPriceOfStockes());
};



// いちばん上の数値を割り出す
function getMaxNumberFromArray(ArrStockNumber) {
 ArrStockNumber = ArrStockNumber.filter(num => !isNaN(num)).map(Number);
 return Math.max(...ArrStockNumber);
};
getMaxNumberFromArray(ArrStockNumber);





// ARR完成
// genericやねｎこれで、ローカルストックから持ってきてるがジェネリック
// これに最新のプッシュを追加でケナン製。
function genericGetPage() {
 ArrStockName = LocalStock('stock');
 Pieces = LocalStock('pieces');
 CheckedBS = LocalStock('sellbuy');
 ArrNowPrice = LocalStock('price');
 ArrTimer = LocalStock('timer');
 ArrHow = LocalStock('alert');
 ArrStockNumber = LocalStock('numberstock');
};
// 最初に側つくって、いれてるよんぴ。最初
async function ArrayToPage() {
 const list = document.querySelector(".list");
 const AddThis = list.children[0];
 //配列からページ各値を設定する
 function NumberFromArray(num) {
  const selectElement = document.querySelector('ul#sbi>li:nth-child(' + num + ')>select.numOfStock');
  selectElement.value = num;
 }
 function StocknameFromArray(num) {
  const selectElement = document.querySelector('ul#sbi>li:nth-child(' + num + ')>select.stockname');
  selectElement.value = ArrStockName[num];
 };
 function PiecesFromArray(num) {
  const selectElement = document.querySelector('ul#sbi>li:nth-child(' + num + ')>select.numOfStock');
  selectElement.value = Pieces[num];
 };
 function SellBuyFromArray(num) {
  const selectElement = document.querySelector('ul#sbi>li:nth-child(' + num + ')>.sellbuy');
  selectElement.value = CheckedBS[num];
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
 for (let i = 1; i < ArrStockName.length - 1; i++) {
  cloneThis(AddThis);
 }
 for (let i = 1; i < ArrStockName.length; i++) {
  NumberFromArray(i);
  StocknameFromArray(i);
  PiecesFromArray(i)
  SellBuyFromArray(i);
  PriceNowFromArray(i);
  TimerFromArray(i);
  ArrHowFromArray(i);
 }
};
// 最後ちうかsaveボタン
// 現在のページから配列に入れ込む(保存)
async function pageToArray() {
 function SetLocalStock(title, value) {
  // ローカルに保存
  localStorage.setItem(title, JSON.stringify(value));
 }
 const numbername = document.querySelectorAll('ul#sbi>li>input.numberstock');
 const stockname = document.querySelectorAll('ul#sbi>li>select.stockname');
 const pieces = document.querySelectorAll('ul#sbi>li>select.numOfStock');
 const sellbuy = document.querySelectorAll('ul#sbi>li>select.sellbuy');
 const price = document.querySelectorAll('ul#sbi>li>.settlementValue');
 const timer = document.querySelectorAll('ul#sbi>li>.timer');
 const how = document.querySelectorAll('ul#sbi>li>.how');
 ArrStockNumber = ['numberstock'];
 ArrStockName = ['stock'];
 Pieces = ['pieces'];
 CheckedBS = ['sellbuy'];
 ArrNowPrice = ['price'];
 ArrTimer = ['timer'];
 ArrHow = ['alert'];
 for (let i = 0; i < stockname.length; i++) {
  ArrStockNumber.push(numbername[i].value);
  ArrStockName.push(stockname[i].value);
  Pieces.push(pieces[i].value);
  CheckedBS.push(sellbuy[i].value);
  ArrNowPrice.push(price[i].textContent);
  ArrTimer.push(timer[i].value);
  ArrHow.push(how[i].value);
 };
 console.log(ArrStockName);
 console.log(Pieces);
 console.log(CheckedBS);
 console.log(ArrNowPrice);
 console.log(ArrTimer);
 console.log(ArrHow);
 await sleep(1000);
 // ローカルストレージに保存
 SetLocalStock('stock', ArrStockName);
 SetLocalStock('pieces', Pieces);
 SetLocalStock('sellbuy', CheckedBS);
 SetLocalStock('price', ArrNowPrice);
 SetLocalStock('timer', ArrTimer);
 SetLocalStock('alert', ArrHow);
};
// 機能
// これは、追加ボタン
function makelist() {
 document.getElementById('pureadd').addEventListener('click', (e) => {
  const list = document.querySelector(".list");
  const listItem = list.children;
  const listItemElement = listItem[0].cloneNode(true);
  const addButton = listItemElement.querySelector(".plus");
  addButton.addEventListener("click", (e) => {
   const AddThis = e.target.parentNode;
   cloneThis(AddThis);
  });
  // listItemElement.querySelector('.plus').disabled = true;
  list.appendChild(listItemElement);
  listItemElement.querySelector('.button--delete').addEventListener("click", (e) => {
   e.target.parentNode.remove();
  });
 });
};
function cloneThis(AddThis) {
 const list = document.querySelector(".list");
 // liが入る
 const listItemElement = AddThis.cloneNode(true);
 listItemElement.querySelector('.plus').disabled = true;

 list.insertBefore(listItemElement, AddThis.nextSibling);
 listItemElement.querySelector('.button--delete').addEventListener("click", (e) => {
  e.target.parentNode.remove();
 });
};
// これが＋ボタン
function listClone() {
 const list = document.querySelector(".list");
 const listItem = list.children;
 const addButton = document.querySelector(".plus");
 addButton.addEventListener("click", (e) => {
  const AddThis = e.target.parentNode;
  cloneThis(AddThis);
 });
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
function clearLocalStorage() {
 localStorage.clear(ArrStockName);
 clearPage();
}
function clearPage() {
 const list = document.querySelector(".list");
 while (list.children.length > 1) {
  list.removeChild(list.lastChild);
 }
};
function cl() {
 console.log(ArrStockName);
 console.log(Pieces);
 console.log(CheckedBS);//"sellbuy", false 
 console.log(ArrNowPrice);//price", "38,670"
 console.log(ArrTimer);
 console.log(ArrHow);
 console.log(ArrStockNumber);
}
function buttons() {
 document.getElementById('clearPage').addEventListener('click', () => {
  clearPage();

 });
 document.getElementById('clear').addEventListener('click', () => {
  clearPage();
  clearLocalStorage();
 });
 // Save button
 document.getElementById('save').addEventListener('click', () => {
  pageToArray();
 });
 document.getElementById('load').addEventListener('click', () => {

  clearPage();

  ArrayToPage();
 });
 document.getElementById('close').addEventListener('click', (e) => {
  document.getElementById('myModal').style.display = 'none';
 });
};
// 伝播禁止
document.querySelector('#myModal').addEventListener('click', async function (event) {
 document.getElementById('myModal').style.display = 'none';
 event.stopPropagation();
});
document.querySelector('.modal-content').addEventListener('click', async function (event) {
 event.stopPropagation();
});


document.querySelector('#getPage').addEventListener('click', async function (event) {
 getPage();
});
document.querySelector('#sekai').addEventListener('click', async function (event) {
 document.querySelector('#myModal.modal').style.display = 'block';
 buttons();
 // getPage();
 ArrayToPage();

});



// 伝播禁止


function orderdbutton() {
 const OrderButton = document.getElementById('main').contentDocument.getElementById('doOrderConfirm-1');
 OrderButton.addEventListener('click', function (event) {
  document.querySelector('#myModal.modal').style.display = 'block';
  buttons();
  getPage();
  ArrayToPage();
  makelist();
  listClone();
 });

};



// ddd



document.querySelector('#goShortcut-1').addEventListener('click', async function () {
 await sleep(1800);
 orderdbutton()
 // event.preventDefault();
});
// LocalStock('stock');
// LocalStock('pieces');
// LocalStock('sellbuy');
// LocalStock('price');
// LocalStock('timer');
// LocalStock('alert');
// LocalStock('numberstock');
