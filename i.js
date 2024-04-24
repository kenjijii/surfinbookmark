// クリック

// 最初の取引を押すとしたのが読まれる


async function sleep(ms) {
 return new Promise(resolve => setTimeout(resolve, ms));
};


document.getElementById('goShortcut-1').addEventListener('click', async (e) => {
 await sleep(1000);
 document.getElementById('main').contentDocument.getElementById('doOrderConfirm-1').addEventListener('click', (e) => {
ahert('取引しました');

  // ここに取引の処理を書く
  console.log('取引しました');
 });
});


// 初期値が配列にはいる



// モーダルを表示
// モーダルに値を入れていく 事前読み込みが望ましいか。＜＞なると。上記のgoshortcutで読ませること。で。下でモーダル表示。
// 配列から各地を設定。＜また、配列に入れ込んでから。となる。＜＞少し時間かかるか。


// 買わせるのは買わせたい。＜そのままモーダルの裏で動かし続けて。＜買いました。まで自動制御。

// モーダルには、今買った価格、その出口がある。




// モーダルの設定にてタイマー等


// 出口の実行

// function listRemoveAndAdd() {
//  const list = document.querySelector(".list");
//  const listItem = list.children;
//  const deleteButton = ".button--delete"
//  for (let i = 0; i < listItem.length; i++) {
//   const itemDeleteButton = listItem[i].querySelector(deleteButton);
//   itemDeleteButton.addEventListener("click", () => {
//    listItem[i].remove();
//   })
//  };
//  const addButton = document.querySelector(".button--add");
//  addButton.addEventListener("click", () => {
//   const listItemElement = document.createElement("li");
//   listItemElement.innerHTML = `

//      <button class="plus">１

//      </button>
//      <select class="stockname">
//       <option value="4014">日経225(2024)</option>
//       <option value="4024">DAX(2024)</option>
//       <option value="4034">FTSE100(2024)</option>
//       <option value="4044">NYダウ(2024)</option>
//       <option value="4074">NDX-100(2024)</option>
//       <option value="4084">RSL2000(2024)</option>
//       <option value="4054" selected="selected">金ETF(2024)</option>
//       <option value="4094">プラチナETF(2024)</option>
//       <option value="4104">銀ETF(2024)</option>
//       <option value="4064">原油ETF(2024)</option>
//       <!-- elect.options[1].selected = true; -->
//      </select>
//      <select class="numOfStock">
//       <option value="1">１</option>
//       <option value="2">２</option>
//       <option value="3">３</option>
//       <option value="4">４</option>
//       <option value="5">５</option>
//       <option value="6">６</option>
//       <option value="7">７</option>
//       <option value="8">８</option>
//       <option value="9">９</option>
//       <option value="10">１０</option>
//      </select>
//      <select class="sellbuy">
//       <option value="1">売</option>
//       <option value="2">買</option>
//      </select>
//      <!-- 買いの値 -->
//      <span class="settlementValue">35555</span>
//      <input class="timer" type="number">
//      <select name="" class="how">
//       <option value="alert">アラート</option>
//       <option value="relinquish">手放す</option>
//      </select>
//      <!-- アラートか、売るか、特殊な売り買いかかな。mutationに渡し動作させる -->
//      <button class="button button--delete">削除</button>

//    `;
//   const itemDeleteButton = listItemElement.querySelector(deleteButton);
//   itemDeleteButton.addEventListener("click", () => {
//    listItemElement.remove();
//   })
//   list.appendChild(listItemElement);
//  });
//  // https://musclecoding.com/javascript-child-element/#index_id6
// };



function listClone() {
 const list = document.querySelector(".list");
 const listItem = list.children;
 const addButton = document.querySelector(".plus");
 addButton.addEventListener("click", (e) => {
  const AddThis = e.target.parentNode;
  // liが入る
  const listItemElement = AddThis.cloneNode(true);
  listItemElement.querySelector('.stockname').disabled = true;
  listItemElement.querySelector('.plus').innerText = '　';
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







listClone();
listRemoveAndAdd();
// 配列から各値を設定する。
let ArrStockName = ['stock', 4044, 4074, 4084];
// 配列から各値を設定する
let CheckedBS = ['sellbuy', true, true, false];
//true is sell, false is buy
// getpricenowの配列
let ArrNowPrice = ['price', 3551155, 3552255, 3553355];
// タイマーの配列
let ArrTimer = ['timer', 5, 10, 15];
let ArrHow = ['alert', 'relinquish', 'alert', 'relinquish'];
// 建玉の位置の配列が必要・・・・
// 配列に入れる
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
getForArray(1);
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
async function sleep(ms) {
 return new Promise(resolve => setTimeout(resolve, ms));
};
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
sellThat('0');

