const execidf = async (buy) => {
 document.querySelector('#nav-order-open>a').click();
 await sleep(1000)
 document.getElementById("mainFrame").contentDocument.querySelector('li.order:nth-child(6) > a').click();
 await sleep(1000);
 let urikai = buy;
 // ここにスリープが必要。
 let text;
 let t = window.prompt("Enter the amout1", 1);
 let ri = window.prompt("利確", 0.2);
 let son = window.prompt("損切り", 0.2);
 document.getElementById("mainFrame").contentDocument.getElementById('amount1').value = t;
 const firsstPrice = document.getElementById("mainFrame").contentDocument.querySelector('#text_01').value;
 try {
  text = await navigatorrd.readText();
 } catch (error) {
  text = 156.5
 }
 const text01 = document.getElementById("mainFrame").contentDocument.getElementById('text_01');
 const text02 = document.getElementById("mainFrame").contentDocument.getElementById('text_02');
 const text03 = document.getElementById("mainFrame").contentDocument.getElementById('text_03');
 text01.classList.remove('clear-default');
 text02.classList.remove('clear-default');
 text03.classList.remove('clear-default');
 document.getElementById("mainFrame").contentDocument.getElementById('selectValidity_0');
 document.getElementById("mainFrame").contentDocument.getElementById('selectValidity_1');
 const sl1 = document.getElementById("mainFrame").contentDocument.getElementById('selectBuySell_01');
 const sl2 = document.getElementById("mainFrame").contentDocument.getElementById('selectBuySell_02');
 const g1 = document.getElementById("mainFrame").contentDocument.getElementById('selectExecCond_0');
 const g2 = document.getElementById("mainFrame").contentDocument.getElementById('selectExecCond_1');
 urikai ? sl1.checked = true : sl2.checked = true;
 urikai ? sl1.checked = true : sl2.checked = true;
 if (Number(firsstPrice) < Number(text)) {
  // 買いの時、逆止
  urikai ? g1.checked = true : g2.checked = true;
 } else {
  urikai ? g2.checked = true : g1.checked =
   true;
 };
 urikai ? text02 = Number(text) + Number(ri) : Number(text) - Number(ri);
 urikai ? text03 = Number(text) - Number(son) : Number(text) + Number(son);
 text02.value = Number(text) + son
 text03.value = Number(text) - 0.01
 text01.value = text;
};
execidf();
