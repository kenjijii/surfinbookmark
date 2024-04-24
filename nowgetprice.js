配列　最初の処理
// 最初にローカルから変数をゲットして、配列に入れること。
function LocalStock() {
 // ローカルから取得して配列リターン
 let jnex = localStorage.getItem('stk');
 let strageValue = jnex ? JSON.parse(jnex) : [];
 console.log('strageValue' + strageValue);
 return strageValue;
}
LocalStock();
// ローカルに保存
// localStorage.setItem('stk', JSON.stringify(strageValue));



let ArrStockName = ['stock'];
// 配列から各値を設定する
let CheckedBS = ['sellbuy'];
//true is sell, false is buy
// getpricenowの配列
let ArrNowPrice = ['price'];
// タイマーの配列
let ArrTimer = ['timer'];
let ArrHow = ['alert'];
// 建玉の位置の配列が必要・・・・
// 配列に入れる
















function getSelectedBrand() { // 選択されているstock要素を取得する関数
 const selected_id = document.getElementById('main').contentDocument.getElementById('currencyPair-1').value;
 return selected_id; //4014
};
function getNumOfStockes() { // 選択されている番号を取得する関数
 const value = document.getElementById('main').contentDocument.getElementById('amount-1').value;
 return value;
};
function getCheckedBS() {//選択されている売り買いを取得する関数
 const checkedwhat = document.getElementById('main').contentDocument.getElementById('side-1-2').checked;
 if (checkedwhat) {
  // 売り
  return true;
 } else {
  // 買い
  return false;
 }
};
// price
function getPriceOfStockes() {
 let selected_id = getCheckedBS();
 const stockId = getSelectedBrand();
 const id = selected_id ? 'p2bid-p' + stockId : 'p2ask-p' + stockId;
 const price = document.getElementById(id).querySelector('span').innerText;
 return price;
};
// ページ上の処理
async function sleep(ms) {
 return new Promise(resolve => setTimeout(resolve, ms));
};



// 買った時点での、数値を入れていく。これに
document.getElementById('goShortcut-1').addEventListener('click', async (e) => {
 await sleep(1000);
 document.getElementById('main').contentDocument.getElementById('doOrderConfirm-1').addEventListener('click', (e) => {
  ArrStockName.push(getSelectedBrand());
  CheckedBS.push(getCheckedBS());
  ArrNowPrice.push(getPriceOfStockes());
  ArrTimer.push(getNumOfStockes());
  // 配列に入れる前の値をゲット
  // 入っている状態にはなる。

  // ここでモーダルを出して、配列の値を入れていく
  fetch('./modallcfd.html') //ロード元URL
   .then(data => data.text()).then(html => document.body.insertAdjacentHTML('beforeend', html)) //ロード先ID指定

   .then(() => {
    //ロード後の処理を記述   
    document.getElementById('close').addEventListener('click', function () {
     document.getElementById('myModal').style.display = 'none';
    });
    // alert('im on the sex on the beach')
   });
 });




});


