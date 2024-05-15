let flag = true;
document.getElementById('over').addEventListener('click', function () {
 const consoleElement = document.getElementById('my-console');
 const conpane = document.getElementById('conpane');
 if (consoleElement.style.display === 'none') {
  consoleElement.style.display = 'flex';
  conpane.style.display = 'block';
 } else {
  consoleElement.style.display = 'none';
  conpane.style.display = 'none';
 }
});
let Order = [];
let timer = [];
let price = [];
let how = [];
function load() {
 Order = JSON.parse(localStorage.getItem('Order'));
 timer = JSON.parse(localStorage.getItem('timer'));
 price = JSON.parse(localStorage.getItem('price'));
 how = JSON.parse(localStorage.getItem('how'));
}
document.getElementById('loadP').addEventListener('click', function () {
 load();
 save();
});
document.querySelector('#saveP').addEventListener('click', function () {
 save();
});
document.querySelector('#plusOne').addEventListener('click', function () {
 Order.push(document.getElementById('stock').value);
 timer.push(document.getElementById('nowPrice').value);
 price.push(document.getElementById('timer').value);
 how.push(document.getElementById('how').value);
 save();
});
function save() {
 document.querySelectorAll('.timer').forEach((element) => {
  element.remove();
 });
 for (let i = 0; i < timer.length; i++) {
  const elementTimers = document.createElement('div');
  elementTimers.classList.add('timer');
  const order = document.createElement('order');
  order.classList.add('order');
  order.textContent = Order[i] + '番';
  elementTimers.appendChild(order);
  const priceElement = document.createElement('span');
  priceElement.classList.add('price');
  priceElement.textContent = price[i];
  elementTimers.appendChild(priceElement);
  const howElement = document.createElement('span');
  howElement.classList.add('how');
  howElement.textContent = how[i] == 1 ? 'alert' : 'll';
  elementTimers.appendChild(howElement);
  // elementTimers.textContent = timer[i];
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Del';
  deleteButton.addEventListener('click', function () {
   const parentElement = this.parentElement;
   const orderNumber = parentElement.querySelector('.order').textContent.replace('番', '');
   Order.splice(orderNumber - 1, 1);
   timer.splice(orderNumber - 1, 1);
   price.splice(orderNumber - 1, 1);
   how.splice(orderNumber - 1, 1);
   parentElement.remove();
  });
  elementTimers.appendChild(deleteButton);
  if (document.querySelector('div.stock' + Order[i] + ' >.orders')) {
   document.querySelector('div.stock' + Order[i] + ' >.orders').insertAdjacentElement('beforeend', elementTimers);
  } else {
   // alert('no');
  }
 };
 localStorage.setItem('Order', JSON.stringify(Order));
 localStorage.setItem('timer', JSON.stringify(timer));
 localStorage.setItem('price', JSON.stringify(price));
 localStorage.setItem('how', JSON.stringify(how));
};
document.querySelector('#getPage').addEventListener('click', async function () {
 await sleep(1200);
 document.querySelector('#myModal.modal').style.display = 'block';
 console.log('this');
 getArrpage();
 ArrayToPage();
});
document.querySelector('#sekai').addEventListener('click', async function (event) {
 let StockName = [];
 let StockBS = [];
 let StockPrice = [];
 let StockNum = [];
 // 画面クリアッ必要
 const MyConsoleDiv = document.getElementById('my-console');
 MyConsoleDiv.innerHTML = '';
 document.getElementById('goShortcut-3').click();
 await sleep(1000);
 const colLength = document.getElementById('main').contentDocument.querySelector('#positionInquiry').rows.length;
 for (let i = 0; i < colLength; i++) {
  const stName = document.getElementById('main').contentDocument.querySelector(`#row${i} > td:nth-child(5) > div:nth-child(1)`).innerText;
  const stSB = document.getElementById('main').contentDocument.querySelector(`#row${i} > td:nth-child(3) > div:nth-child(1)`).innerText;
  const stPrc = document.getElementById('main').contentDocument.querySelector(`#row${i} > td:nth-child(9) > div:nth-child(1)`).innerText;
  const stNowPrc = document.getElementById('main').contentDocument.querySelector(`#row${i} > td:nth-child(12) > div:nth-child(1)`).innerText;
  StockName.push(stName);
  StockBS.push(stSB == '売' ? 1 : 2)
  StockPrice.push(stPrc);
  StockNum.push(i)
 };
 if (flag) {
  const col = document.querySelector('.hide #positionInquiry').rows.length + colLength;
  for (let i = colLength; i < col; i++) {
   const is = i - colLength;
   const stName = document.querySelector(`.hide #row${is} > td:nth-child(5) > div:nth-child(1)`).innerText;
   const stSB = document.querySelector(`.hide #row${is} > td:nth-child(3) > div:nth-child(1)`).innerText;
   const stPrc = document.querySelector(`.hide #row${is} > td:nth-child(9) > div:nth-child(1)`).innerText;
   const stNowPrc = document.querySelector(`.hide #row${is} > td:nth-child(12) > div:nth-child(1)`).innerText;
   StockName.push(stName);
   StockBS.push(stSB == '売' ? 1 : 2)
   StockPrice.push(stPrc);
   StockNum.push(i)
  };
 };
 StockNum.forEach((number) => {
  const div = document.createElement('div');
  div.classList.add('stock' + number);
  const titleStock = document.createElement('div');
  titleStock.classList.add('titleStock');
  titleStock.textContent = StockName[number] + '\n' + (StockBS[number] == 1 ? '売' : '買') + '\n' + StockPrice[number];
  const orders = document.createElement('div');
  orders.classList.add('orders');
  div.appendChild(titleStock);
  div.appendChild(orders);
  MyConsoleDiv.appendChild(div);
  // save(number);
  const target = targetElements.find(target => target.name === StockName[number]);
  const BS = StockBS[number] == 1 ? target.askElement : target.bidElement;
  mutationRecords(BS, number);
 });
});
// Log generator function
function generateLog(flag) {
 const logElement = document.getElementById('my-console');
 const log = 'New log entry';
 logElement.insertAdjacentText('beforeend', log + '\n');
 // Scroll to bottom
}
let Scrollflag = true;
// let intervalId;
document.getElementById('scrollStopButton').addEventListener('click', function () {
 Scrollflag = !Scrollflag;
});
document.getElementById('prevent').addEventListener('click', function (event) {
 const button = event.target;
 const modalContent = document.querySelector('#my-console');
 if (modalContent.style.pointerEvents === 'none') {
  modalContent.style.pointerEvents = 'auto';
  button.textContent = 'Disable';
 } else {
  modalContent.style.pointerEvents = 'none';
  button.textContent = 'Enable';
 }
});
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
// これに最新のプッシュを追加
function genericGetPage() {
 ArrStockName = LocalStock('stock');
 Pieces = LocalStock('pieces');
 ArrBS = LocalStock('sellbuy');
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
 for (let i = getMaxNumberFromArray(ArrStockNumber) - 1; i < colLength; i++) {
  const stName = document.getElementById('main').contentDocument.querySelector(`#row${i} > td:nth-child(5) > div:nth-child(1)`).innerText;
  const stSB = document.getElementById('main').contentDocument.querySelector(`#row${i} > td:nth-child(3) > div:nth-child(1)`).innerText;
  const stNum = document.getElementById('main').contentDocument.querySelector(`#row${i} > td:nth-child(7) > div:nth-child(1)`).innerText;
  const stPrc = document.getElementById('main').contentDocument.querySelector(`#row${i} > td:nth-child(9) > div:nth-child(1)`).innerText;
  const stNowPrc = document.getElementById('main').contentDocument.querySelector(`#row${i} > td:nth-child(12) > div:nth-child(1)`).innerText;
  console.log(stName);
  ArrStockNumber.push(i);
  ArrStockName.push(stName);
  Pieces.push(stNum);
  ArrBS.push(stSB == '売' ? 1 : 2);
  ArrNowPrice.push(stPrc);
 };
};
// ページから取得
document.getElementById('getPageArray').addEventListener('click', async function () {
 // document.getElementById('goShortcut-3').click();
 // await sleep(20);
 await sleep(1200);
 document.querySelector('#myModal.modal').style.display = 'block';
 console.log('this');
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
  selectElement.value = ArrBS[num];
 };
 function PriceNowFromArray(num) {
  const priceNowElement = document.querySelector('ul#sbi>li:nth-child(' + num + ')>.settlementValue');
  priceNowElement.value = ArrNowPrice[num];
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
};
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
  ArrBS.push(sellbuy[i].value);
  ArrNowPrice.push(price[i].textContent);
  ArrTimer.push(timer[i].value);
  ArrHow.push(how[i].value);
 };
 console.log(ArrStockName);
 console.log(ArrStockNumber);
 console.log(Pieces);
 console.log(ArrBS);
 console.log(ArrNowPrice);
 console.log(ArrTimer);
 console.log(ArrHow);
 // await sleep(1000);
 // ローカルストレージに保存
 SetLocalStock('stock', ArrStockName);
 SetLocalStock('numberstock', ArrStockNumber);
 SetLocalStock('pieces', Pieces);
 SetLocalStock('sellbuy', ArrBS);
 SetLocalStock('price', ArrNowPrice);
 SetLocalStock('timer', ArrTimer);
 SetLocalStock('alert', ArrHow);
};
// 機能
// これは、追加ボタン
// 初期追加ボタンにおいて、元のデータの元がそこになくては。
function makelist() {
 document.getElementById('pureadd').addEventListener('click', (e) => {
  const list = document.querySelector(".hide");
  const listItem = list.children;
  const listItemElement = listItem[0].cloneNode(true);
  const listSecond = document.querySelector(".list");
  listSecond.appendChild(listItemElement);
  listItemElement.querySelector('.button--delete').addEventListener("click", (e) => {
   e.target.parentNode.remove();
  });
  listItemElement.querySelector('.plus').addEventListener("click", (e) => {
   cloneThis(e.target.parentNode, true);
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
  const originalPrice = AddThis.querySelector('.settlementValue').value;
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
 ArrBS = ['sellbuy'];
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
 console.log(ArrBS);//"sellbuy", false 
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
  await sleep(500);
  orderdbutton();
 });
}
document.querySelector('#cancel').addEventListener('click', async function () {
 document.querySelector('#myModddal.modal').style.display = 'none';
 await sleep(199);
 document.getElementById('main').contentDocument.getElementById('returnButton').click();
});
function MyConsole(log, number) {
 document.querySelector('#my-console>div:nth-child(' + number + ')').insertAdjacentText('beforeend', log + '\n');
 if (Scrollflag) {
  const logElement = document.querySelector('#my-console>div:nth-child(' + number + ')');
  logElement.scrollTop = logElement.scrollHeight;
 };
};
function logscroll() {
 const logElement = document.querySelector('#my-console>div:nth-child(1)');
 logElement.scrollTop = logElement.scrollHeight;
};
const sbiMutgation = (mutation, number) => {
 const mTxt = mutation.addedNodes[0].innerHTML.replace(/,/g, '.') - 0;
 number = Number(number) + 1;
 MyConsole(mTxt, number);
 let sbiAlertPrice = 222;
 if (mTxt > sbiAlertPrice) {
  alert('sbiAlertPrice')
 }
};
const MutationProsesser = (mutation, number) => {
 // mutationを加工する各ページごとの処理 各関数を。
 sbiMutgation(mutation, number);
};
function mutationRecords(target, number = 1,) {
 //いまのとこ、これは、000等になる。number間違えている。
 const callback = (mutations) => {
  mutations.forEach((mutation) => {
   MutationProsesser(mutation, number);
  })
 }
 // オブザーバー宣言
 const observer = new MutationObserver(callback);
 const config = {
  subtree: true,
  childList: true,
  attributes: true,
  characterData: true,
  subtree: true,
 };
 observer.disconnect();
 document.getElementById('SM').addEventListener('click', function () {
  observer.disconnect();
 });
 observer.observe(target, config);
}
// mutationRecords(target);
// modalとつなげる。ボタンで、じゃなくて。もだるの数値いれてセーブしたらその通り動きたいので。
// モーダルのテスト用のものを作る必要があるの。
// モーダル追加ボタン何もないとやっぱできないこと。＜つまり、モーダルに追加するボタンが必要。＜エミュレート用に。
// 売り買いのタイミング計りたい。
const targets = `日経225(2024) p2bid-p4014 p2ask-p4014
金ETF(2024) p2bid-p4054 p2ask-p4054
NYダウ(2024) p2bid-p4044 p2ask-p4044
NDX-100(2024) p2bid-p4074 p2ask-p4074
プラチナETF(2024) p2bid-p4094 p2ask-p4094
銀ETF(2024) p2bid-p4104 p2ask-p4104
原油ETF(2024) p2bid-p4064 p2ask-p4064
DAX(2024) p2bid-p4024 p2ask-ask24
FTSE100(2024) p2bid-p4034 p2bid-p4034`;
const targetElements = targets.split('\n').map(target => {
 const [name, bidId, askId] = target.split(' ');
 return {
  name,
  bidElement: document.getElementById(bidId),
  askElement: document.getElementById(askId)
 };
});