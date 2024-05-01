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



// いちばん上の数値を割り出す
function getMaxNumberFromArray(ArrStockNumber) {
 ArrStockNumber = ArrStockNumber.filter(num => !isNaN(num)).map(Number);
 return Math.max(...ArrStockNumber);
};





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



async function getArrpage() {
 const col = document.getElementById('main').contentDocument.querySelector('#positionInquiry')
 for (let i = 0; i < col.rows.length; i++) {
  const stName = document.getElementById('main').contentDocument.querySelector(`#row${i} > td:nth-child(3) > div:nth-child(1)`).innerText;
  const stSB = document.getElementById('main').contentDocument.querySelector(`#row${i} > td:nth-child(4) > div:nth-child(1)`).innerText;;
  const stNum = document.getElementById('main').contentDocument.querySelector(`#row${i} > td:nth-child(9) > div:nth-child(1)`).innerText;;
  const stPrc = document.getElementById('main').contentDocument.querySelector(`#row${i} > td:nth-child(11) > div:nth-child(1)`).innerText;;
  const stNowPrc = document.getElementById('main').contentDocument.querySelector(`#row${i} > td:nth-child(12) > div:nth-child(1)`).innerText;;
  console.log(stName);
  console.log(stSB == '売' ? 1 : 2);
  console.log(stNum);
  console.log(stPrc);
  console.log(stNowPrc);
  // console.log(stLU);


  ArrStockName.push(stName);
  Pieces.push(stNum);
  CheckedBS.stSB == '売' ? 1 : 2;
  ArrNowPrice.push(stPrc);
 };
};





// ページから取得
document.getElementById('getPageArray').addEventListener('click', async function () {
 genericGetPage();
 await sleep(300);
 document.querySelector('#myModal.modal').style.display = 'block';
 await getArrpage();
 ArdrayToPage();

});
// 最初に側つくって、いれてるよんぴ。最初
function ArrayToPage() {
 clearPage();
 const list = document.querySelector(".list");
 const AddThis = list.children[0];
 //配列からページ各値を設定する
 function NumberFromArray(num) {
  const selectElement = document.querySelector('ul#sbi>li:nth-child(' + num + ')>select.numOfStock');

  selectElement.value = num;
 }
 function StocknameFromArray(num) {
  const selectElement = document.querySelector('ul#sbi>li:nth-child(' + num + ')>select.stockname');
  console.log('%c' + selectElement, 'color:deepblue; font-size:3em', 'This is good/');

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
  PiecesFromArray(i);
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
 // await sleep(1000);
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
 OrderButton.addEventListener('click', async function (event) {
  // event.preventDefault();
  document.querySelector('#myModal.modal').style.display = 'block';
  buttons();
  getPage();
  await sleep(1000);
  ArrayToPage();

  await sleep(1700);
  returnButton();
  await sleep(700);

 });

};

function returnButton() {
 const ReturnButton = document.getElementById('main').contentDocument.getElementById('returnButton');
 ReturnButton.addEventListener('click', async function (event) {
  alert('itswork')
  await sleep(500);
  orderdbutton();
 });


}

// ddd



document.querySelector('#goShortcut-1').addEventListener('click', async function () {
 await sleep(1800);
 orderdbutton()
 // event.preventDefault();
});

document.querySelector('#buyit').addEventListener('click', async function () {
 document.querySelector('#myModal.modal').style.display = 'none';

 await sleep(199);
 document.getElementById('main').contentDocument.getElementById('orderBtn').click();
});
document.querySelector('#cancel').addEventListener('click', async function () {
 document.querySelector('#myModddal.modal').style.display = 'none';
 await sleep(199);
 document.getElementById('main').contentDocument.getElementById('returnButton').click();
});


// LocalStock('stock');
// LocalStock('pieces');
// LocalStock('sellbuy');
// LocalStock('price');
// LocalStock('timer');
// LocalStock('alert');
// LocalStock('numberstock');
