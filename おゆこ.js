async function sleep(ms) {
 return new Promise(resolve => setTimeout(resolve, ms));
};//sleep関数
// ローカルストレージから取得
(async function () {
 await sleep(1000);
 buttons();
 makelist();
 listClone();
})();
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
// 表のすべてを入れる。　getmaxで番号stocknumberの最大値を見つけ、それ以上のセルがある場合に追加する。としている。
function getArrpage() {
 function getMaxNumberFromArray(ArrS) {
  ArrS = ArrS.filter(num => !isNaN(num)).map(Number);
  return ArrS.length > 0 ? Math.max(...ArrS) + 1 : 1;
  // 0から始まってるから１にしたい。
 };
 const colLength = document.getElementById('main').contentDocument.querySelector('#positionInquiry').rows.length;
 //4
 genericGetPage();

 if (colLength > getMaxNumberFromArray(ArrStockNumber)) {
  for (let i = getMaxNumberFromArray(ArrStockNumber); i < colLength; i++) {
   const stName = document.getElementById('main').contentDocument.querySelector(`#row${i} > td:nth-child(3) > div:nth-child(1)`).innerText;
   const stSB = document.getElementById('main').contentDocument.querySelector(`#row${i} > td:nth-child(4) > div:nth-child(1)`).innerText;
   const stNum = document.getElementById('main').contentDocument.querySelector(`#row${i} > td:nth-child(7) > div:nth-child(1)`).innerText;
   const stPrc = document.getElementById('main').contentDocument.querySelector(`#row${i} > td:nth-child(9) > div:nth-child(1)`).innerText;
   const stNowPrc = document.getElementById('main').contentDocument.querySelector(`#row${i} > td:nth-child(12) > div:nth-child(1)`).innerText;
   ArrStockNumber.push(i);
   ArrStockName.push(stName);
   Pieces.push(stNum);
   CheckedBS.push(stSB == '売' ? 1 : 2);
   ArrNowPrice.push(stPrc);
  }
 };
};
// ページから取得
document.getElementById('getPageArray').addEventListener('click', async function () {
 // genericGetPage();
 await sleep(300);
 document.querySelector('#myModal.modal').style.display = 'block';
 getArrpage();
 ArrayToPage();
});
// 最初に側つくって、いれてるよんぴ。最初
function ArrayToPage() {
 //配列からページ各値を設定する
 function NumberFromArray(num) {
  const selectElement = document.querySelector('ul#sbi>li:nth-child(' + num + ')>input.numberstock');
  selectElement.value = ArrStockNumber[num];
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
 clearPage();
 // 0にしたい。少なくとも。＜
 // ここだけが最初だろう。何か・・。
 // クリアーと１の関係
 // リストの出し分けは。リストのlengthとArrStockNumのmaxを比較して。maxの最大値以上の部分を、追加。
 // 数字の割がおかしい。＜あと一aZzzzzzzzzzzzzzzzaaazzzzzzzzzzzzzzzaaaaaaazaAZaZ番目問題。
 // 追加の際の、項目のコピーは必要。特に数値か。あとは消せたら消したい　inactive
 const list = document.querySelector(".hide");
 const AddThis = list.children[0];
 for (let i = 1; i < ArrStockName.length; i++) {
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
function SetLocalStock(title, value) {
 // ローカルに保存
 localStorage.setItem(title, JSON.stringify(value));
}
function pageToArray() {
 const numbername = document.querySelectorAll('ul#sbi>li>input.numberstock');
 const stockname = document.querySelectorAll('ul#sbi>li>select.stockname');
 const pieces = document.querySelectorAll('ul#sbi>li>select.numOfStock');
 const sellbuy = document.querySelectorAll('ul#sbi>li>select.sellbuy');
 const price = document.querySelectorAll('ul#sbi>li>.settlementValue');
 const timer = document.querySelectorAll('ul#sbi>li>.timer');
 const how = document.querySelectorAll('ul#sbi>li>.how');
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
 console.log(ArrStockNumber);
 console.log(Pieces);
 console.log(CheckedBS);
 console.log(ArrNowPrice);
 console.log(ArrTimer);
 console.log(ArrHow);


 // await sleep(1000);
 // ローカルストレージに保存
 SetLocalStock('stock', ArrStockName);
 SetLocalStock('numberstock', ArrStockNumber);
 SetLocalStock('pieces', Pieces);
 SetLocalStock('sellbuy', CheckedBS);
 SetLocalStock('price', ArrNowPrice);
 SetLocalStock('timer', ArrTimer);
 SetLocalStock('alert', ArrHow);
};
// 機能
// これは、追加ボタン
// 初期追加ボタンにおいて、元のデータの元がそこになくては。
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
function cloneThis(AddThis, plusfalse = false) {
 const list = document.querySelector(".list");
 // liが入る
 const listItemElement = AddThis.cloneNode(true);
 if (plusfalse) {
  listItemElement.querySelector('.plus').disabled = true;
  list.insertBefore(listItemElement, AddThis.nextSibling);
  // Copy values from the original element to the cloned element
  const originalNumber = AddThis.querySelector('input.numberstock').value;
  const originalStock = AddThis.querySelector('select.stockname').value;
  const originalPieces = AddThis.querySelector('select.numOfStock').value;
  const originalSellBuy = AddThis.querySelector('select.sellbuy').value;
  const originalPrice = AddThis.querySelector('.settlementValue').textContent;
  const originalTimer = AddThis.querySelector('.timer').value;
  const originalHow = AddThis.querySelector('.how').value;
  const clonedNumber = listItemElement.querySelector('input.numberstock');
  // const clonedStock = listItemElement.querySelector('select.stockname');
  const clonedPieces = listItemElement.querySelector('select.numOfStock');
  const clonedSellBuy = listItemElement.querySelector('select.sellbuy');
  const clonedPrice = listItemElement.querySelector('.settlementValue');
  const clonedTimer = listItemElement.querySelector('.timer');
  const clonedHow = listItemElement.querySelector('.how');
  clonedNumber.value = originalNumber;
  clonedStock.value = originalStock;
  clonedPieces.value = originalPieces;
  clonedSellBuy.value = originalSellBuy;
  // clonedPrice.textContent = originalPrice;
  clonedPrice.style.color = "red";
  clonedTimer.value = originalTimer;
  clonedHow.value = originalHow;
 } else {
  list.insertBefore(listItemElement, null);
 };
 listItemElement.querySelector('.button--delete').addEventListener("click", (e) => {
  e.target.parentNode.remove();
 });
 listItemElement.querySelector('.plus').addEventListener("click", (e) => {
  cloneThis(e.target.parentNode, true);
 });
};
// これが＋ボタン
function listClone() {
 const addButton = document.querySelector(".plus");
 const list = document.querySelector(".list");
 const listItem = list.children;
 addButton.addEventListener("click", (e) => {
  const AddThis = e.target.parentNode;
  cloneThis(AddThis, true);
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


function clearArray() {
 ArrStockNumber = ['numberstock'];
 ArrStockName = ['stock'];
 Pieces = ['pieces'];
 CheckedBS = ['sellbuy'];
 ArrNowPrice = ['price'];
 ArrTimer = ['timer'];
 ArrHow = ['alert'];
};


function clearLocalStorage() {
 localStorage.clear('stock');
 localStorage.clear('pieces');
 localStorage.clear('sellbuy');
 localStorage.clear('price');
 localStorage.clear('timer');
 localStorage.clear('alert');
 clearPage();
}
function clearPage() {
 const list = document.querySelector(".list");
 while (list.children.length) {
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
 document.getElementById('clear').addEventListener('click', () => {
  clearArray();
  clearLocalStorage();
  clearPage();

 });
 // Save button
 document.getElementById('save').addEventListener('click', () => {

  clearArray();
  pageToArray();
 });
 document.getElementById('load').addEventListener('click', () => {
  clearPage();
  ArrayToPage();
 });
 document.getElementById('close').addEventListener('click', (e) => {
  document.getElementByarrId('myModal').style.display = 'none';
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
// document.querySelector('#goShortcut-1').addEventListener('click', async function () {
//  await sleep(1800);
//  orderdbutton()
//  // event.preventDefault();
// });
// document.querySelector('#buyit').addEventListener('click', async function () {
//  document.querySelector('#myModal.modal').style.display = 'none';
//  await sleep(199);
//  document.getElementById('main').contentDocument.getElementById('orderBtn').click();
// });
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
