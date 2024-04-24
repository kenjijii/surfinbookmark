// 配列から各値を設定する。


// 順番
var selectedValue = document.getElementById('stockname').selectedIndex;
console.log(selectedValue);


// 配列に入れる前の値をゲット
function getSelectedStockname() {
 const selectElement = document.getElementById('stockname');
 var selectedValue = selectElement.value;
}

function getSelectedBuySell() {
 const selectElement = document.getElementById('sellbuy');
 var selectedValue = selectElement.value;
}
document.querySelectorAll('.test>.ongoingplays').forEach((stockname) => {
 console.log(stockname.textContent);
});
document.querySelector('.test:nth-child(3)>.ongoingplays').textContent;
let ArrStockName = [4044, 4074, 4084];
// 配列から各値を設定する
let CheckedBS = [true, false, false];

function StocknameFromArray(stockname) {
 const selectElement = document.getElementById('stockname');
 selectElement.value = stockname;
 // 選択された値が存在しない場合、selectedIndexは-1になります
 if (selectElement.selectedIndex === -1) {
  console.log('The option with the given value does not exist');
 }
};

// StocknameFromArray(ArrStockName[0]);

function SellBuyFromArray(buysell) {
 const selectElement = document.getElementById('sellbuy');
 if (buysell === true) {
  selectElement.options[0].selected = true;
 } else {
  selectElement.options[1].selected = true;
 };
};

// SellBuyFromArray(CheckedBS[0]);


