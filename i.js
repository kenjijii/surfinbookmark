let flag = true;
function openPage() {
 const consoleElement = document.getElementById('my-console');
 const conpane = document.getElementById('conpane');
 if (consoleElement.style.display === 'none') {
  consoleElement.style.display = 'flex';
  conpane.style.display = 'block';
 } else {
  consoleElement.style.display = 'none';
  conpane.style.display = 'none';
 }
};

document.getElementById('over').addEventListener('click', function () {
 openPage();
});

let StockName = [];
let StockBS = [];
let StockPrice = [];
let StockNum = [];

document.getElementById('stock').addEventListener('change', function () {
 document.getElementById('nowPrice').textContent = StockPrice[this.value];
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
function clearLocalStorage() {
 localStorage.removeItem('Order');
 localStorage.removeItem('timer');
 localStorage.removeItem('price');
 localStorage.removeItem('how');
};

load();


document.getElementById('loadP').addEventListener('click', function () {
 load();
 save();
});
document.getElementById('clearP').addEventListener('click', function () {
 clearLocalStorage();
});


document.querySelector('#saveP').addEventListener('click', function () {
 save();
});
document.querySelector('#plusOne').addEventListener('click', function () {
 Order.push(document.getElementById('stock').value);
 timer.push(document.getElementById('timer').value);
 price.push(document.getElementById('nowPrice').value);
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


// mutation とタイトルを表示している
document.querySelector('#sekai').addEventListener('click', async function (event) {
 StockName = [];
 StockBS = [];
 StockPrice = [];
 StockNum = [];
 // 画面クリアッ必要
 const MyConsoleDiv = document.getElementById('my-console');
 MyConsoleDiv.innerHTML = '';
 document.getElementById('goShortcut-3').click();
 await sleep(1000);
 openPage();
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
};
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