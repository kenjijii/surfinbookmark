// helpme
const {
 RUNTIME,
 aceVimMap,
 addSearchAlias,
 cmap,
 imap,
 imapkey,
 getBrowserName,
 getClickableElements,
 getFormData,
 map,
 unmap,
 unmapAllExcept,
 iunmap,
 vunmap,
 mapkey,
 readText,
 removeSearchAlias,
 tabOpenLink,
 vmap,
 vmapkey,
 Clipboard,
 Hints,
 Visual,
 Front
} = api;
settings.hintAlign = "left"
Hints.setCharacters('asdfgwertzxcvb')
Hints.style('font-family: Consolas; font-size: 18px; line-height: 1;');
Hints.style(`
          font-family: monospace;
          font-size: 19px;
          text-transform: lowercase;
          color:black;
          `,
 "text"
);
settings.nextLinkRegex = /((>>|next)|>|›|»|→|次へ|次のページ+)/i
settings.prevLinkRegex = /((<<|prev(ious)?)|<|‹|«|←|前へ|前のページ+)/i
// ---------------------------------------------------------
const shuntNormalKeys = (keys) => keys.forEach((key) => map(`!!${key}`, key))
const unmapNormalKeys = (keys) => keys.forEach((key) => unmap(key))
const unshuntNormalKeys = (keys) => keys.forEach((key) => unmap(`!!${key}`))
// ---------------------------------------------------------
const defaultNormalKeys = ["<Alt-s>", "<Alt-i>", "p", ";ql", "cf", ";m", ";fs", "O", "af", "C", "<Ctrl-h>", "<Ctrl-j>", "<Ctrl-i>", "q", "<Ctrl-Alt-i>", "cS", "cs", "j", "k", "yt", "yT", "g0", "g$", "gx0", "gxt", "gxT", "gx$", "gxx", "E", "R", "<Alt-p>", "<Alt-m>", "on", "gT", "gt", ";u", ";U", "B", "F", "<Ctrl-6>", "S", "D", "sg", "sd", "sb", "se", "sw", "ss", "sh", "sy", "yi", "ys", "yj", "yQ", "yp", "cq", "cc", ";pp", ";pj", "oi", "od", "ob", "oe", "H", "t", "m", "'", "<Ctrl-'>", ";pm", ";e", ";v", "gc", "gk", "gn", ";i", ";j", "cp", ";pa", ";pb", ";pd", ";ps", ";pc", ";cp", ";ap", "gr", ";s", ";ph", ";t", ";dh", ";db", ";yh"];
shuntNormalKeys(defaultNormalKeys);
unmapNormalKeys(defaultNormalKeys);
map("@@", "!!<Alt-s>")
map("@pt", "!!<Alt-i>")
map("@1pt", "!!p")
map(";F", "!!cf")
map("cf", "!!;fs")
map(";u", "!!O")
map("F", "!!af")
map(";mov", "!!<Ctrl-h>")
map(";mou", "!!<Ctrl-j>")
map(";f", "!!q")
map("cc", "!!cS")
map("c;", "!!cs")
map("j", "!!j")
map("s", "!!j")
map("k", "!!k")
// map("w", "!!k")
// map("cw;", "!!w")
map("ty", "!!yt")
map("tY", "!!yT")
map("t0", "!!g0")
map("t$", "!!g$")
map("tx0", "!!gx0")
map("txl", "!!gxt")
map("txr", "!!gxT")
map("tx$", "!!gx$")
map("txx", "!!gxx")
map("txp", "!!gxp")
map("E", "!!E")
map("J", "!!E")
map("R", "!!R")
map("K", "!!R")
map("tp", "!!<Alt-p>")
map("tm", "!!<Alt-m>")
map("tn", "!!on")
map("tgp", "!!gp")
map("t;", "!!<Ctrl-6>")
map("S", "!!S")
map("H", "!!S")
map("D", "!!D")
map("L", "!!D")
map("y@e", "!!yj")
map(";q", "!!cq")
map("@re", "!!;pj")
map("oH", "!!H")
map("a", "!!t")
map("@mk", "!!m")
map("m", "!!'")
map("M", "!!<Ctrl-'>")
map("@md", "!!;pm")
map("@e", "!!;e")
map("gj", "!!;j")
map("@R", "!!gr")
map("@pdf", "!!;s")
map("@ph", "!!;ph")
map("@t", "!!;t")
map("@yh", "!!;yh")
unshuntNormalKeys(defaultNormalKeys);
// ---------------------------------------------------------
unmap("s");
unmap("x");
unmap("p");
unmap("a");
mapkey('ymd', "Copy current page's link for markdown", function () {
 const url = new URL(window.location.href);
 var title = window.document.title.replace(/(<|>)/g, '\\$1')
 Clipboard.write(`[${title}](${url.href})`);
});
mapkey('ysc', "Copy current page's link for Scrapbox", function () {
 const url = new URL(window.location.href);
 var title = window.document.title.replace(/(<|>)/g, '\\$1')
 Clipboard.write(`[${url.href} ${title}]`);
});
// 翻訳
// registerInlineQueryで検索
api.Front.registerInlineQuery({
 // auto -> englishに翻訳
 url: function (q) {
  console.log(q)
  return `https://script.google.com/macros/s/AKfycbw0MeH6Chm85GiliVYHqNxaN0F5r0JfQeIJeUCunZzclyIdIXgjFEihWWg-TtmBAtcZrA/exec?text=when you are sad&source=en&target=ja`;
 },
 parseResult: function (res) {
  try {
   // ダブルクォート削除(こいつも値に含まれるのか…)
   const result = res.text.replace(/[\"]/g, "");
   return `<div>${result}</div>`;
  } catch (e) {
   return "";
  }
 }
}
);
// Weblio ※Surfingkeys不具合のため英和のみ
// https://github.com/brookhong/Surfingkeys/wiki/Register-inline-query
// api.Front.registerInlineQuery({
//     url: function(q) {
//         return `https://ejje.weblio.jp/content/${q}`;
//     },
//     parseResult: function(res) {
//         var parser = new DOMParser();
//         var doc = parser.parseFromString(res.text, "text/html");
//         var result = doc.querySelector("#summary .content-explanation");
//         if (result) {
//             return result.innerHTML;
//         }
//     }
// });
// YouTube - J/L: 10 secs skip
unmapAllExcept(['w', 's', 'e', 'd', 'f', 'r', 'gg', 'gi', 'J', 'K', 'L', 'H', 'x', 'ysc'], /youtube.com/);
unmapAllExcept([], /miro.com/);
// set theme
settings.theme = `
          .sk_theme {
          font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
          font-feature-settings: "palt";;
          font-size: 0.93rem;
          background: rgb(30 41 59 / 90%);
          backdrop-filter: blur(5px);
          box-shadow: 0px 2px 10px rgb(0 0 0 / 80%);
          border-radius: 0.5rem;
          color: #abb2bf;
          }
          .sk_theme input {
          font-family: monospace;
          letter-spacing: -0.03em;
          }
          .sk_theme tbody {
          color: #fff;
          }
          .sk_theme input {
          color: #d0d0d0;
          }
          .sk_theme .annotation {
          color: #56b6c2;
          }
          .sk_theme .omnibar_timestamp {
          color: #e5c07b;
          }
          .sk_theme .omnibar_visitcount {
          color: #98c379;
          }
          #sk_omnibar {
          width: 50%;
          left: 25%;
          opacity: 1 !important;
          }
          #sk_omnibar #sk_omnibarSearchArea {
          margin: 1.5rem;
          padding: 0.5rem;
          background-color: hsl(217deg 19% 32% / 90%);
          border-radius: 0.5rem;
          border: 0;
          }
          #sk_omnibar #sk_omnibarSearchResult {
          margin: 0 1.5rem;
          }
          #sk_omnibar #sk_omnibarSearchResult ul li {
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          margin-bottom: 0.5rem;
          background-color: hsl(215deg 25% 17% / 30%);
          }
          #sk_omnibar #sk_omnibarSearchResult .omnibar_highlight {
          font-weight: bold;
          color: inherit;
          background-color: rgba(255, 255, 0, 0.2);
          }
          #sk_omnibar #sk_omnibarSearchResult ul li.focused {
          background-image: linear-gradient(to right, hsl(239deg 84% 67% / 50%), hsl(199deg 89% 48% / 60%));
          color: #fff;
          }
          #sk_omnibar #sk_omnibarSearchResult li .url {
          color: rgb(56, 189, 248);
          font-weight: normal;
          font-family: monospace;
          letter-spacing: -0.03em;
          font-size: 0.95rem;
          margin-left: 1.45rem;
          }
          #sk_status, #sk_find {
          font-size: 1.25rem;
          }
          #sk_usage > div {
          width: 25%;
          margin-bottom: 2em;
          }
          #sk_usage span.annotation {
          padding-left: 16px;
          }
          #sk_bubble .sk_bubble_content {
          overflow: auto;
          }
          #sk_keystroke {
          background: rgb(30 41 59 / 90%);
          border-radius: 0.5rem 0 0;
          padding: 0.5rem 1rem;
          font-size: 1.25rem;
          }
          #sk_keystroke > div {
          display: flex;
          align-items: center;
          margin: 0.25em 0;
          }
          #sk_keystroke kbd {
          font-size: 1.5rem;
          line-height: 1;
          }
          #sk_keystroke kbd > .candidates {
          color: rgb(219 39 119);
          }
          #sk_keystroke .kbd-span {
          min-width: 2.5rem;
          }
          #sk_keystroke .annotation {
          padding-left: 0.5em;
          color: rgb(125 211 252);
          }
          #sk_keystroke:not(.expandRichHints) {
          font-size: 2rem;
          font-family: monospace;
          }
          #sk_status {
          padding: 4px 12px;
          }
          #sk_status > span {
          line-height: 1;
          display: inline-block;
          border: 0 !important;
          }
          `;
// 検索関係
// unmapAllExcept(['E','R','T','f'], /google.com|twitter.com/);
// unmapAllExcept(
//   [
//     'f','j','k','e','d','/'
//   ],
//   /www.google.com/
// );
// unmap("f", /google.com/);
mapkey('otw', '#8Open Search with alias tw', function () {
 Front.openOmnibar({ type: 'SearchEngine', extra: 'tw' })
})
addSearchAlias(
 'tf',
 'Twitter フォロワーのみ',
 'https://twitter.com/search?pf=on&q='
)
// Google jp 3ヶ月以内
addSearchAlias(
 '3',
 'Google 3ヶ月以内',
 'https://www.google.co.jp/search?q={0}&tbs=qdr:m3,lr:lang_1ja&lr=lang_ja'
)
// Google jp 10ヶ月以内
addSearchAlias(
 '10',
 'Google 10ヶ月以内',
 'https://www.google.co.jp/search?q={0}&tbs=qdr:m10,lr:lang_1ja&lr=lang_ja'
)
// mercari
addSearchAlias('wbr', 'brave', 'https://search.brave.com/search?q=')
addSearchAlias('wbi', 'bing', 'https://www.bing.com/search?q=')
// Yahoo!リアルタイム検索
addSearchAlias(
 'r',
 'Yahoo!リアルタイム検索',
 'http://realtime.search.yahoo.co.jp/search?ei=UTF-8&p='
)
mapkey('or', '#8Open Search with alias r', function () {
 Front.openOmnibar({ type: 'SearchEngine', extra: 'r' })
})
// 関数リスト
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
// 数秒待ってから出し分けする
function whtttl(callback, pageTitle) {
 const od = document.getElementById("mainFrame").contentDocument.querySelector('h2.hdg-l2-01').innerText;
 console.log(od)
 if (!od.includes(pageTitle)) {
  callback();
 }
};
// function reloader(callback) {
//     callback();
//     console.log('ユーザーが見てるよ！');
// };
// const reloadFX = () => {
//     document.getElementById("mainFrame").contentDocument.getElementById('img_update').click()
// };
function lookornot(pageTitle) {
 if (typeof document.hidden !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
   if (document.visibilityState === 'hidden') {
    console.log('ユーザーがどっかへ行ったよ');
   }
   else {
    whtttl(reloader(reloadFX()), pageTitle)
   }
  }, false);
 }
};
function setItvl(int, callback) {
 setInterval(() => {
  let stady = 'to'
  console.log('doing');
  callback();
  console.log(callback)
 }, int);
};
function SbiCfdClicker(params) {
 const btn3 = document.getElementById('goShortcut-3')
 // const btn4 = document.getElementById('goShortcut-4')
 let event = new Event('mousedown');
 btn3.dispatchEvent(event);
 // btn4.dispatchEvent(event);
}
function rakutenFX() {
 let OrderValue = 1
 let PipsValue = 15
 let Wpips = 4
 let GCurrency = 1;
 let CopyedNum = ''
 let hufu
 const ArrCurrency = ['ドル/円', 'ユーロ/円', 'ポンド/円', '豪ドル/円', 'ユーロ/ドル', 'ポンド/ドル', '豪ドル/ドル', 'メキシコペソ/円', 'NZドル/円', 'ランド/円', 'カナダドル/円', 'スイス/円', 'トルコリラ/円', '人民元/円', 'NZドル/ドル', 'ドル/カナダドル', 'ドル/スイス', 'ポンド/スイス', 'ユーロ/ポンド', 'ユーロ/スイス', '豪ドル/スイス', 'NZドル/スイス', '豪ドル/NZドル', '香港ドル/円', 'SGドル/円', 'Nクローネ/円', 'ユーロ/豪ドル', 'ポンド/豪ドル']
 const newpro = (sec) => {
  return new Promise(resolve => {
   setTimeout(() => {
    resolve();
   }, sec)
  })
 }
 let SellMoney = async (withpip) => {
  const exec = async () => {
   document.querySelector('#nav-order-open > a').click();
   hufu = await newpro(700);
   let local = SetLocalTo()
   // console.log(local)
   local = parseInt(local)
   if (isNaN(local)) {
    local = 1
   }
   if (local != 1) {
    const elem = document.getElementById("mainFrame").contentDocument.getElementById('orderFlashPanel').contentDocument.querySelector('body > div > div.StreamingNewOpen > div.CurrencyPairTitle > div > div > div');
    const evt = document.createEvent("MouseEvents")
    evt.initEvent("mousedown", false, true)
    elem.dispatchEvent(evt)
    // で発火。tabオープン
    hufu = await newpro(400)
    const targetNode = document.getElementById("mainFrame").contentDocument.getElementById('orderFlashPanel').contentDocument.querySelector("body > ul > li:nth-child(" + local + ")");
    const evtT = document.createEvent("MouseEvents")
    evtT.initEvent("mouseup", false, true)
    targetNode.dispatchEvent(evtT)
    console.log(targetNode)
   }
   hufu = await newpro(1000);
   document.getElementById("mainFrame").contentDocument.getElementById('orderFlashPanel').contentDocument.querySelector('body > div > div.StreamingNewOpen > div.StreamingParam > div:nth-child(1) > div.Quantity10000 > div > div.rtsStepperText.rtsStepperText-option.rtsWidget.rtsWidget-option > input').value = OrderValue;
   document.getElementById("mainFrame").contentDocument.getElementById('orderFlashPanel').contentDocument.querySelector('body > div > div.StreamingNewClose > div.LossPipsParam > div.LossPipsUseFlag.rtsWidget.rtsWidget-option > div > div.rtsCheckBoxContainer.rtsCheckBoxContainer-option > input').checked = true
   document.getElementById("mainFrame").contentDocument.getElementById('orderFlashPanel').contentDocument.querySelector('body > div > div.StreamingNewClose > div.LossPipsParam > div.LossPips > div > div.rtsStepperText.rtsStepperText-option.rtsWidget.rtsWidget-option > input').value = PipsValue
   //wingpips
   if (withpip == true) {
    hufu = await newpro(600);
    document.getElementById("mainFrame").contentDocument.getElementById('orderFlashPanel').contentDocument.querySelector('body > div > div.StreamingNewClose > div.ProfitPipsParam > div.ProfitPipsUseFlag.rtsWidget.rtsWidget-option > div > div.rtsCheckBoxContainer.rtsCheckBoxContainer-option > input').checked = true
    document.getElementById("mainFrame").contentDocument.getElementById('orderFlashPanel').contentDocument.querySelector('body > div > div.StreamingNewClose > div.ProfitPipsParam > div.ProfitPipsUseFlag.rtsWidget.rtsWidget-option > div > div.rtsCheckBoxContainer.rtsCheckBoxContainer-option > input').click()
    hufu = await newpro(300);
    document.getElementById("mainFrame").contentDocument.getElementById('orderFlashPanel').contentDocument.querySelector('body > div > div.StreamingNewClose > div.ProfitPipsParam > div.ProfitPips > div > div.rtsStepperText.rtsStepperText-option.rtsWidget.rtsWidget-option > input').value = Wpips
    //wingpips
   }
   hufu = await newpro(400);
   document.getElementById("mainFrame").contentDocument.getElementById('orderFlashPanel').contentDocument.querySelector('body > div > div.StreamingNewOpen > div.BidAskRate.Large > div.part.sell').click()
   hufu = await newpro(1000);
   document.querySelector('#nav-order-close > a').click();
  }
  exec()
 }
 let cutLoss = () => {
  document.querySelector('#nav-order-close > a').click();
  let pt = prompt('何番を切る？', 1)
  if (pt) {
   let pst = pt + 1
   const exec = async () => {
    hufu = await newpro(1000)
    let pst = pt - 1
    console.log(pt)
    document.getElementById("mainFrame").contentDocument.querySelector('#setExecQuantityBtn_' + pst + '').click();
    let fh = document.getElementById("mainFrame").contentDocument.querySelector('#frmOrder > div > table > tbody > tr:nth-child(' + pt + ') > td:nth-child(3)')
    document.getElementById("mainFrame").contentDocument.querySelector('#frmOrder > div > table > tbody > tr:nth-child(' + pt + ') > td:nth-child(3)')
    let fx = fh.textContent
    fx = fx.replace(',', '');
    fx = parseInt(fx)
    let frate = document.getElementById("mainFrame").contentDocument.querySelector('#frmOrder > div > table > tbody > tr:nth-child(' + pt + ') > td:nth-child(6)').innerText
    let ftd = document.getElementById("mainFrame").contentDocument.querySelector('#frmOrder > div > table > tbody > tr:nth-child(' + pt + ') > td:nth-child(2)').innerText;
    document.getElementById("mainFrame").contentDocument.querySelector('#setExecQuantityInp_' + pst + '').value = fx;
    document.getElementById("mainFrame").contentDocument.querySelector('#streamingBtn').click();
    hufu = await newpro(600)
    console.log('trying')
    document.getElementById("mainFrame").contentDocument.querySelector(" #main > div > div:nth-child(3)").innerText = frate + ' -go\=n- ' + ftd;
    // hufu = await newpro(1000)
    // document.getElementById("mainFrame").contentDocument.getElementById('orderFlashPanel').contentDocument.querySelector('body > div > div.BidAskRate.Large > div.part.sell').click();
    // document.getElementById("mainFrame").contentDocument.getElementById('orderFlashPanel').contentDocument.querySelector('body > div > div.BidAskRate.Large > div.part.buy').click();
    // ページ変遷
    // アウェイと
   }
   exec()
  }
 }
 const decide = async () => {
  document.getElementById("mainFrame").contentDocument.querySelector('#orderChangeListButton > li:nth-child(1) > input[type=image]').click();
  hufu = await newpro(500)
  document.getElementById("mainFrame").contentDocument.querySelector('#orderChangeListButton > li:nth-child(1) > input[type=image]').click();
 }
 const noPaste = async () => {
  alert('aac')
  document.getElementById("mainFrame").contentDocument.querySelector("#text_01").innerText(CopyedNum)
 }
 const noLoose = async () => {
  document.getElementById("mainFrame").contentDocument.querySelector("#text_01").value = CopyedNum
  document.getElementById("mainFrame").contentDocument.querySelector("#text_01").type = 'number'
  document.getElementById("mainFrame").contentDocument.querySelector("#text_01").step = '0.01'
  document.getElementById("mainFrame").contentDocument.querySelector("#text_01").focus()
 }
 const noLooseO = async () => {
  document.getElementById("mainFrame").contentDocument.querySelector("#text_02").value = CopyedNum
  document.getElementById("mainFrame").contentDocument.querySelector("#text_02").type = 'number'
  document.getElementById("mainFrame").contentDocument.querySelector("#text_02").step = '0.01'
  document.getElementById("mainFrame").contentDocument.querySelector("#text_02").focus()
 }
 const zen = () => {
  const exec = async () => {
   document.querySelector('#nav-order-closeall > a').click();
   hufu = await newpro(850);
   document.getElementById("mainFrame").contentDocument.querySelector('#frm > ul > li > input[type=image]').click();
   hufu = await newpro(800);
   document.getElementById("mainFrame").contentDocument.querySelector('#frm > ul > li:nth-child(2) > input[type=image]').click();
  }
  exec()
 }
 // ここまでローカルストレージにセットmap1
 const PromptNumberInput = () => {
  const cup = localStorage.getItem('keyName');
  GCurrency = window.prompt(ArrCurrency[cup - 1], cup)
  localStorage.setItem('keyName', GCurrency);
  console.log(GCurrency)
 }
 const SetLocalTo = () => {
  let cup = localStorage.getItem('keyName');
  console.log('cup')
  console.log(cup)
  if (!localStorage.getItem('keyName')) {
   cup = 1;
  }
  return cup
 }
 // タブい開き＜通貨を入力希望
 const insC = () => {
  const elem = document.getElementById("mainFrame").contentDocument.getElementById('orderFlashPanel').contentDocument.querySelector('body > div > div.StreamingNewOpen > div.CurrencyPairTitle > div > div > div');
  const evt = document.createEvent("MouseEvents")
  evt.initEvent("mousedown", false, true)
  elem.dispatchEvent(evt)
  // で発火。tabオープン
  const targetNode = document.getElementById("mainFrame").contentDocument.getElementById('orderFlashPanel').contentDocument.querySelector("body > ul > li:nth-child(" + local + ")");
  const evtT = document.createEvent("MouseEvents")
  evtT.initEvent("mouseup", false, true)
  targetNode.dispatchEvent(evtT)
  console.log(targetNode)
 }
 let getChartPair = () => {
  let NowCurrency = document.querySelector("#titleBar > div:nth-child(3) > div.chartHeaderRow > div:nth-child(2) > div > div").textContent
  const NumCurrency = ArrCurrency.indexOf(NowCurrency)
  alert(NumCurrency + 1 + NowCurrency)
  localStorage.setItem('keyName', NumCurrency + 1);
 }
 let sqIs = (sq) => {
  if (sq == true) {
   return '#text_02'
  } else {
   return '#text_01'
  }
 }
 const SellLossCut = (sq) => {
  /////////////////////////////////sqIs(sq)
  const txt = sqIs(sq)
  // 連続クリック上。
  const exec = async () => {
   document.querySelector('#nav-order-change > a').click();
   hufu = await newpro(280)
   document.getElementById("mainFrame").contentDocument.querySelector('#orderChangeListData > tbody > tr:nth-child(1) > td:nth-child(1) > input[type=checkbox]:nth-child(1)').click();
   hufu = await newpro(400)
   document.getElementById("mainFrame").contentDocument.querySelector('#orderChangeListButton > li:nth-child(1) > input[type=image]').click();
   // 最初変数作り
   hufu = await newpro(500)
   // 売り完成
   let NowVal = document.getElementById("mainFrame").contentDocument.querySelector(txt).value;
   NowVal.replace(',', '.');
   NowVal = (NowVal * 1000) - 100;
   const low = [...Array(10)].map((_, i) => (((i) * 10) + (NowVal)) / 1000)
   console.log(low)
   // hufu=await newpro(200)
   for (let i = 0; i < 12; i++) {
    try {
     if ((i % 2) === 0) {
      console.log('i/2')
      console.log(i / 2)
      hufu = await newpro(400)
      document.getElementById("mainFrame").contentDocument.querySelector(txt).value = low[i / 2];
     }
     hufu = await newpro(100)
     document.getElementById("mainFrame").contentDocument.querySelector('#frm > ul.nav-btn-01.roll > li:nth-child(2) > input[type=image]').click();
     console.log('e');
     console.log(i);
    } catch (e) {
     console.log(e)
     console.log('error')
    }
   }
  }
  exec();
 }
 const BuyLossCut = (sq) => {
  const txt = sqIs(sq)
  /////////////////////////////////iii
  // 連続クリック上。
  const exec = async () => {
   document.querySelector('#nav-order-change > a').click();
   hufu = await newpro(280)
   document.getElementById("mainFrame").contentDocument.querySelector('#orderChangeListData > tbody > tr:nth-child(1) > td:nth-child(1) > input[type=checkbox]:nth-child(1)').click();
   hufu = await newpro(400)
   document.getElementById("mainFrame").contentDocument.querySelector('#orderChangeListButton > li:nth-child(1) > input[type=image]').click();
   hufu = await newpro(50)
   // 最初変数作り
   hufu = await newpro(500)
   // かい完成
   let NowVal = document.getElementById("mainFrame").contentDocument.querySelector(txt).value;
   NowVal.replace(',', '.');
   NowVal = (NowVal * 1000) + 100;
   const low = [...Array(18)].map((_, i) => (((i) * -10) + (NowVal)) / 1000)
   console.log(low)
   // hufu=await newpro(200)
   for (let i = 0; i < 20; i++) {
    try {
     if ((i % 2) === 0) {
      console.log('i/2')
      console.log(i / 2)
      hufu = await newpro(400)
      document.getElementById("mainFrame").contentDocument.querySelector(txt).value = low[i / 2];
     }
     hufu = await newpro(100)
     document.getElementById("mainFrame").contentDocument.querySelector('#frm > ul.nav-btn-01.roll > li:nth-child(2) > input[type=image]').click();
     console.log('e');
     console.log(i);
    } catch (e) {
     console.log(e)
     console.log('error')
    }
   }
  }
  exec();
 }
 let Teiyaku;
 const copyPaste = (zanki) => {
  let NumOfCP = 1
  NumOfCP = prompt('どれを建値をコピペするか', NumOfCP)
  NumOfCP = NumOfCP - 1;
  const exec = async () => {
   document.querySelector('#nav-order-change > a').click();
   hufu = await newpro(700)
   let ag = [...document.getElementById("mainFrame").contentDocument.querySelectorAll('.align-R>div:nth-child(2)')].map((c) => c.textContent);
   const nP = ag.filter(c => c != ' ');
   // console.log(nP[NumOfCP])
   hufu = await newpro(20)
   document.getElementById("mainFrame").contentDocument.getElementsByName('checkBoxArr[' + NumOfCP + ']')[0].checked = true
   hufu = await newpro(700)
   document.getElementById("mainFrame").contentDocument.querySelector('#orderChangeListButton > li:nth-child(1) > input[type=image]').click();
   hufu = await newpro(700)
   if (zanki == true) {
    Teiyaku = nP[NumOfCP]
   } else {
    let t02Ari
    t02Ari = document.getElementById("mainFrame").contentDocument.querySelector('#text_02')
    if (t02Ari != null) {
     t02Ari.value = nP[NumOfCP]
    } else {
     console.log('appeal')
     document.getElementById("mainFrame").contentDocument.querySelector('#text_01').value = nP[NumOfCP]
    }
    hufu = await newpro(70)
    document.getElementById("mainFrame").contentDocument.querySelector('#frm > ul.nav-btn-01.roll > li:nth-child(2) > input[type=image]').click();
    hufu = await newpro(700)
    document.getElementById("mainFrame").contentDocument.querySelector('#frm > ul.nav-btn-01.roll > li:nth-child(2) > input[type=image]').click();
    // else内でコピペして処理してる。
   }
  }
  exec();
  if (NumOfCP != '0') {
  } else {
   console.log(';ab')
  }
 }
 mapkey('pc', "チャートから取得する", function () {
  // map1
  // 取得fromchart
  getChartPair()
 })
 mapkey('qe', "入れ込むる", function () {
  // map1
  // 取得fromchart
  insC()
 })
 mapkey('qc', "どの国？", function () {
  PromptNumberInput(GCurrency)
 })
 mapkey('ppl', 'pips', function () {
  PipsValue = prompt('損失幅', PipsValue)
 })
 mapkey('ppw', 'pips', function () {
  Wpips = prompt('利幅', Wpips)
 })
 mapkey('sb', '買う', function () {
  buyMoney('buy')
 });
 mapkey('ss', '売る', function () {
  buyMoney('sell')
 });
 mapkey('spb', '買う', function () {
  buyMoney(true)
 });
 mapkey('sps', '売る', function () {
  SellMoney(true)
 });
 mapkey('splb', '買う', async function () {
  buyMoney(true)
  hufu = await newpro(4000)
  await BuyLossCut(true)
 });
 mapkey('spls', '売る', async function () {
  SellMoney(true)
  hufu = await newpro(4000)
  await SellLossCut(true)
 });
 mapkey('sppp', '売る', async function () {
  SellLossCut(true)
 });
 mapkey('slb', '買う', async function () {
  buyMoney()
  hufu = await newpro(4000)
  await BuyLossCut()
 });
 mapkey('sls', '売る', async function () {
  SellMoney()
  hufu = await newpro(4000)
  await SellLossCut()
 });
 mapkey('xx', '何を切る？', function () {
  cutLoss()
 });
 mapkey('xc', '選択コピーペースト', function () {
  copyPaste()
 });
 mapkey('aai', '愛が止まらない', function () {
  noLoose()
 });
 mapkey('aac', 'text2', function () {
  noLooseO()
 });
 mapkey('ad', 'text2', function () {
  decide()
 });
 mapkey('aad', 'text2', function () {
  noLooseO()
 });
 // mapkey('aad', '貼り付ける。', function () {
 //     noPaste2()
 // });
 mapkey('z', 'oco選択コピーペースト', async function () {
  copyPaste(true)
  await sleep(2400);
  await modaq();
  console.log('sleepdone')
 });
 mapkey('aaa', "全決済注文　ぜんぶ決済ボタン", function () {
  zen()
 })
 mapkey('ps', 'priod saver', function () {
  let plusAlpha = window.prompt('プラス', 0.05)
  let nowplay = document.getElementById("mainFrame").contentDocument.querySelector("#text_01").value
  nowplay = nowplay * 1000
  nowplay = parseInt(nowplay)
  nowplay = nowplay + plusAlpha
  alert(nowplay)
  document.getElementById("mainFrame").contentDocument.querySelector("#text_01").value = nowplay
  console.log(nowplay)
 })
 mapkey('sqs', '売り１０', function () {
  SellLossCut();
 });
 mapkey('sqb', '買い少な目切り', function () {
  BuyLossCut();
 });
 mapkey('xt', '照会', async function () {
  document.getElementById("nav-inquiry").click();
  sleep(1000);
  document.querySelector('#nav-inquiry-execution > a:nth-child(1)').click();
 });
 async function keypress_ivent(e) {
  const buysel1 = document.getElementById("mainFrame").contentDocument.querySelector('#selectBuySell_01');
  const bana01 = document.querySelector('#bana_01');
  const bana02 = document.querySelector('#bana_02');
  const bana03 = document.querySelector('#bana_03');
  const text01 = document.getElementById("mainFrame").contentDocument.querySelector("#text_01");
  const text02 = document.getElementById("mainFrame").contentDocument.querySelector("#text_02");
  const text03 = document.getElementById("mainFrame").contentDocument.querySelector("#text_03");
  if (e.key === 'Enter' || e.key === 'Escape') {
   // エスケープ追加
   //Aキーが押された時の処理
   // 分岐　３まで。
   document.getElementById("myModal").style.visibility = "hidden";
   document.getElementById("myModal").style.opacity = 0;
   if (text03 != null) {
    text03.value = bana03.value
    text02.value = bana02.value
    text01.value = bana01.value
    // さしぎゃくさし
    // 指値逆差
    let sa1 = document.getElementById("mainFrame").contentDocument.querySelector('#selectExecCond_0');
    let sa2 = document.getElementById("mainFrame").contentDocument.querySelector('#selectExecCond_1');
    let sasiB = document.getElementById("sasiB");
    let gyakB = document.getElementById("gyakB");
    let buyB = document.getElementById("buyB");
    if (buyB.checked == true) {
     document.getElementById("mainFrame").contentDocument.querySelector('#selectBuySell_02').checked = true
    } else {
     document.getElementById("mainFrame").contentDocument.querySelector('#selectBuySell_01').checked = true
    }
    if (sa1.checked) {
     document.getElementById("mainFrame").contentDocument.querySelector('#selectExecCond_0').checked = true
    } else {
     document.getElementById("mainFrame").contentDocument.querySelector('#selectExecCond_1').checked = true
    }
    //購入数
    document.getElementById("mainFrame").contentDocument.querySelector('#amount1').value = document.querySelector('#bana_04').value;
    // たぶん期限
    document.getElementById("mainFrame").contentDocument.querySelector('#selectValidity_2').checked = true
    document.getElementById("mainFrame").contentDocument.querySelector('#selectValidity2_2').checked = true
    //購入数
    document.getElementById("mainFrame").contentDocument.querySelector('#amount1').value = document.querySelector('#bana_04').value;
   } else if (text02 != null) {
    text02.value = bana02.value
    text01.value = bana01.value
   } else {
    text01.value = bana01.value
   }
   document.removeEventListener('keypress', keypress_ivent);
   window.removeEventListener('click', windowRemove);
   if (e.key === 'Enter') {
    document.getElementById("mainFrame").contentDocument.querySelector('#frm > ul.nav-btn-01.roll > li:last-child > input[type=image]').click();
    hufu = await newpro(700)
    console.log('async 400')
    document.getElementById("mainFrame").contentDocument.querySelector('#frm > ul.nav-btn-01.roll > li:last-child > input[type=image]').click();
    hufu = await newpro(700)
    document.querySelector('#nav-order-close > a').click();
   }
  } else if (e.key === 'z') {
   console.log(e.target.id)
   e.target.step *= 0.1;
  } else if (e.key === 'x') {
   e.target.step *= 10;
   console.log('right')
  } else if (e.key === 'y') {
   console.log(bana01.value)
   alert(e.target.value)
  } else if (e.key === 'c') {
   console.log('c')
   document.getElementById("mainFrame").contentDocument.querySelector("#text_01").value = CopyedNum;
   console.log(CopyedNum)
  } else if (e.key === 'l') {
   // 指値逆差
   let sa1 = document.getElementById("mainFrame").contentDocument.querySelector('#selectExecCond_0');
   let sa2 = document.getElementById("mainFrame").contentDocument.querySelector('#selectExecCond_1');
   let sasiB = document.getElementById("sasiB");
   let gyakB = document.getElementById("gyakB");
   let buyB = document.getElementById("buyB");
   // 売り買い
   let bana = bana01.value * 1000;
   console.log(bana)
   if (buyB.checked) {
    console.log('buy')
    console.log(bana)
    console.log(buyB)
    console.log(text01.value)
    console.log(bana01.value)
    // 買いで
    if (text01.value < bana01.value) {
     // 今の値段が、設定値より高い
     sa1.checked = true;
     sasiB.checked = true;
     // 指値にチェック
    } else {
     // 今の値段が、設定値より低い
     sa2.checked = true;
     gyakB.checked = true;
     // 逆指値にチェック
    }
    bana02.value = (bana + 500) / 1000;
    // 利益値
    bana03.value = (bana - 500) / 1000;
    // 逆指値
   } else {
    console.log('sel')
    console.log(bana)
    console.log(buyB)
    console.log(text01.value)
    console.log(bana01.value)
    // 売り
    if (text01.value > bana01.value) {
     // 今の値段が、設定値より低い
     sa2.checked = true;
     sasiB.checked = true;
     // 指値にチェック
    } else {
     // 今の値段が、設定値より低い
     sa1.checked = true;
     gyakB.checked = true;
     // 逆指値にチェック
    }
    bana03.value = (bana + 500) / 1000;
    // 利益値
    bana02.value = (bana - 500) / 1000;
    // 逆指値
   }
   // 逆指値\
   // 売り買い
   if (buyB.checked) {
    document.getElementById("buyB").checked = true;
   } else {
    document.getElementById("sellB").checked = true;
   }
   // さしぎゃくさし
   // 売り買い
   // 逆指
   // hufu = await newpro(300)
   // console.log(bana)
   // console.log(b01)
   // bana01.value = 99.999;
   // text01.value = bana01.value;
  } else if (e.key === 'g') {
   // 売り買い
   if (buyB == true) {
    document.getElementById("mainFrame").contentDocument.querySelector('#selectBuySell_02').checked = true
   } else {
    document.getElementById("mainFrame").contentDocument.querySelector('#selectBuySell_01').checked = true
   }
   // さしぎゃくさし
   // 指値逆差
   let sa1 = document.getElementById("mainFrame").contentDocument.querySelector('#selectExecCond_0');
   let sa2 = document.getElementById("mainFrame").contentDocument.querySelector('#selectExecCond_1');
   let sasiB = document.getElementById("sasiB");
   let gyakB = document.getElementById("gyakB");
   let buyB = document.getElementById("buyB");
   if (sa1.checked) {
    document.getElementById("mainFrame").contentDocument.querySelector('#selectExecCond_0').checked = true
   } else {
    document.getElementById("mainFrame").contentDocument.querySelector('#selectExecCond_1').checked = true
   }
   //購入数
   document.getElementById("mainFrame").contentDocument.querySelector('#amount1').value = document.querySelector('#bana_04').value;
   // たぶん期限
   document.getElementById("mainFrame").contentDocument.querySelector('#selectValidity_2').checked = true
   document.getElementById("mainFrame").contentDocument.querySelector('#selectValidity2_2').checked = true
  }
  return false;
 }
 let golive = (bl) => {
  let fogMonkey;
  fogMonkey = document.getElementById("mainFrame").contentDocument.getElementById("error-message-order").innerText;
  fogMonkey = fogMonkey.slice(5)
  if (fogMonkey.includes('から')) {
   const migi = fogMonkey.split('から')[0].replace(/[^0-9^\\.]/g, '')
   const hida = fogMonkey.split('から')[1].replace(/[^0-9^\\.]/g, '')
   const blance = (migi * 1000) - (hida * 1000)
   if (bl == true) {
    if (blance < 0) {
     return migi;
    } else {
     return hida;
    }
   } else {
    if (blance < 0) {
     return hida;
    } else {
     return migi;
    }
   }
  }
  else {
   return 0;
  }
 }
 // キーログ
 let windowRemove = async (event) => {
  console.log('its living')
  let modal = document.getElementById("myModal")
  if (event.target == modal) {
   console.log('modaled')
   modal.style.visibility = "hidden";
   modal.style.opacity = 0;
   let somehtinggood = document.querySelector('#bana_01').value;
   document.getElementById("mainFrame").contentDocument.querySelector("#text_01").value = somehtinggood;
   document.removeEventListener('keypress', keypress_ivent);
   window.removeEventListener('click', windowRemove);
   document.getElementById("mainFrame").contentDocument.querySelector('#frm > ul > li:nth-child(2) > input[type=image]').click();
  }
  return false;
 }
 let askbid = () => {
  let bid;
  bid = document.getElementById("mainFrame").contentDocument.querySelector(".bid");
  let ask;
  ask = document.getElementById("mainFrame").contentDocument.querySelector(".ask");
  if (bid != null) {
   return '買い↓'
  } else if (ask != null) {
   return '売り↑'
  } else {
   return 'どっちもない'
  }
 }
 const modaq = async () => {
  console.log('modaqed')
  let sorrys;
  sorrys = document.getElementById("mainFrame").contentDocument.querySelector("#text_01");
  let t02Ari;
  t02Ari = document.getElementById("mainFrame").contentDocument.querySelector('#text_02');
  let t03Ari;
  t03Ari = document.getElementById("mainFrame").contentDocument.querySelector('#text_03');
  if (sorrys !== null) {
   if (typeof flag === 'undefined') {
    flag = true;
    (async () => {
     const cssUrl = 'https://kenjijii.github.io/surfinbookmark/input.css?f'
     fetch('https://kenjijii.github.io/surfinbookmark/modal.html?ssss') //ロード元URL
      .then(data => data.text())
      .then(html => document.body.insertAdjacentHTML('beforeend', html))
     var link = await document.createElement('link');
     link.rel = 'stylesheet';
     link.href = cssUrl;
     link.type = 'text/css';
     document.head.after(link);
    })()
    hufu = await newpro(300);
   } else {
    // alert('twoside')
    document.getElementById("myModal").style.visibility = "visible";
    document.getElementById("myModal").style.opacity = 1;
   }
   // text2 3があるかのチェックで分岐　表示の変更
   // 初期表示の設定
   // 2,3はあるか
   hufu = await newpro(300);
   const bana01 = document.querySelector('#bana_01');
   const bana02 = document.querySelector('#bana_02');
   const bana03 = document.querySelector('#bana_03');
   hufu = await newpro(500);
   bana01.step = '0.01';
   bana02.step = '0.01';
   bana03.step = '0.01';
   bana01.value = Teiyaku;
   bana02.value = '';
   bana03.value = '';
   // if (buyB .checked) {
   //     document.getElementById("buyB").checked = true;
   // } else {
   //     document.getElementById("sellB").checked = true;
   // }
   // hufu = await newpro(100);
   if (t03Ari != null) {
    bana01.value = sorrys.value;
    bana02.value = t02Ari.value;
    bana03.value = t03Ari.value;
   } else if (t02Ari != null) {
    document.getElementById("turu02").innerText = askbid();
    document.getElementById("turu01").innerText = '利';
    bana01.value = sorrys.value;
    if (golive() == 0) {
     bana01.value = t02Ari.value;
    } else {
     if (askbid() == '買い↓') {
      bana01.value = golive();
     } else {
      bana01.value = golive(true);
     }
    }
    // hufu = await newpro(400);
    bana02.focus();
   } else {
    document.getElementById("turu01").innerText = askbid();
    hufu = await newpro(400);
    bana01.focus();
    if (golive() == 0) {
     // bana01.value = sorrys.value;
    } else {
     if (askbid() == '買い↓') {
      bana01.value = golive();
     } else {
      bana01.value = golive(true);
     }
    }
   };
   // const bana04 = document.querySelector('#bana_04');
   document.getElementById("mainFrame").contentDocument.querySelectorAll(".clear-default").forEach((item) => { item.classList.remove('clear-default') });
   window.addEventListener('click', windowRemove);
   document.addEventListener('keypress', { name: 'peace', handleEvent: keypress_ivent });
   // document.getElementById("turu").innerHTML = douk;
  }
 };
 mapkey('qq', 'aag', function () {
  modaq();
 });
 mapkey('s5', "ifo", async function () {
  document.querySelector("#nav-order-open > a").click()
  hufu = await newpro(600)
  document.getElementById("mainFrame").contentDocument.querySelector("#frm > ul > li:nth-child(6) > a").click()
 });
 mapkey("s7", "chart Open New Window", function () {
  window.open("https://fx.rakuten-sec.co.jp/web/PIATT/chart.html?2.5", '', 'width=800, height=720');
 });
 mapkey('aaz', "もダル消す", async function () {
  document.getElementById("myModal").style.visibility = "hidden";
  document.getElementById("myModal").style.opacity = 0;
 });
 mapkey('pn', "paddingtop ", async function () {
  // document.querySelector('body').style.paddingTop = '100px'
  try {
   document.getElementById("mainFrame").contentDocument.querySelector('#frm > ul.nav-btn-01.roll > li:nth-child(2) > input[type=image]').click();
   document.getElementById("mainFrame").contentDocument.querySelector('#frm > ul.nav-btn-01.roll > li:nth-child(2) > input[type=image]').click();
   document.getElementById("mainFrame").contentDocument.querySelector('#frm > ul.nav-btn-01.roll > li:nth-child(2) > input[type=image]').click();
   document.getElementById("mainFrame").contentDocument.querySelector('#frm > ul.nav-btn-01.roll > li:nth-child(2) > input[type=image]').click();
  } catch (error) {
   document.getElementById("mainFrame").contentDocument.getElementById('orderFlashPanel').contentDocument.querySelector('body > div > div.BidAskRate.Large > div.part.sell').click();
   document.getElementById("mainFrame").contentDocument.getElementById('orderFlashPanel').contentDocument.querySelector('body > div > div.BidAskRate.Large > div.part.buy').click();
  } finally {
   document.getElementById("mainFrame").contentDocument.getElementById('orderFlashPanel').contentDocument.querySelector('body > div > div.BidAskRate.Large > div.part.sell').click();
   document.getElementById("mainFrame").contentDocument.getElementById('orderFlashPanel').contentDocument.querySelector('body > div > div.BidAskRate.Large > div.part.buy').click();
   document.getElementById("mainFrame").contentDocument.querySelector('#frm > ul.nav-btn-01.roll > li:nth-child(2) > input[type=image]').click();
   document.getElementById("mainFrame").contentDocument.querySelector('#frm > ul.nav-btn-01.roll > li:nth-child(2) > input[type=image]').click();
  }
 });
 mapkey('qz', "提示された条件で。", async function () {
  let Art1 = document.getElementById("mainFrame").contentDocument.querySelector("#text_01");
  let Art2 = document.getElementById("mainFrame").contentDocument.querySelector("#text_02");
  if (Art2 == null) {
   if (askbid() == '買い↓') {
    Art1.value = golive();
   } else {
    Art1.value = golive(true);
   }
  } else {
   if (askbid() == '買い↓') {
    Art2.value = golive();
   } else {
    Art2.value = golive(true);
   }
  }
 });
 mapkey('pz', "提示された条件で。", async function () {
  document.getElementById("mainFrame").contentDocument.querySelector('body > div > div.BidAskRate.Large > div.part.sell').click();
  document.getElementById("mainFrame").contentDocument.querySelector('body > div > div.BidAskRate.Large > div.part.sell').click();
 });
 unmap(';t')
 mapkey(';t', '#14google translate', () => {
  const selection = window.getSelection().toString()
  console.log(window.location.href)
  if (selection === '') {
   // 文字列選択してない場合はページ自体を翻訳にかける
   tabOpenLink(
    `https://translate.google.com/translate?js=n&sl=auto&tl=ja&u=${window.location.href}`
     `https://translate.google.com/translate?js=n&sl=auto&tl=ja&u=https://qiita.com/hush_in/items/09b549ca8e533340d834`
   )
  } else {
   // 選択している場合はそれを翻訳する
   tabOpenLink(
    `https://translate.google.com/?sl=auto&tl=ja&text=${encodeURI(selection)}`
   )
  }
 })
 // unmap("'");
 // mapkey("'", "google", () => {
 //   searchSelectedWith("https://www.google.com/search?q=", false, false, "");
 // });
 unmap(';alc');
 mapkey(';alc', "eowf", () => {
  searchSelectedWith("https://eowf.alc.co.jp/search?q=", false, false, "");
 });
 mapkey('cz', 'csschange', () => {
  const CastCss = document.createElement('style')
  CastCss.innerText = "* { background-color: white!important;color:#000!important;font-weight:bold!important}a{color:#000!important;text-decolation:underline!important}"
  document.head.appendChild(CastCss)
 })
 // document.getElementsByTagName('figure')[10].scrollIntoView()
 mapkey('cx', 'csschange', () => {
  const CastCss = document.createElement('style')
  CastCss.innerText = "* { background-color: #000!important;color:#fff!important;font-weight:bold!important}a{color:#fff!important;text-decolation:underline!important}"
  document.head.appendChild(CastCss)
 })
 mapkey('cb', 'csschange', () => {
  document.head.appendChild(document.createElement('style').innerText = "* { font-weight:bold!important}")
 })
 // testing
 mapkey('s1', "新規注文", function () {
  document.querySelector('#nav-order-open > a').click();
 });
 mapkey('s2', "決済注文", function () {
  document.querySelector('#nav-order-close > a').click();
 });
 mapkey('s3', "訂正・取り消し注文", function () {
  document.querySelector('#nav-order-change > a').click();
 });
 mapkey('s4', "全決済注文", function () {
  document.querySelector('#nav-order-closeall > a').click();
 });
 //数量ボタン
 const NoB = () => {
  document.getElementById("mainFrame").contentDocument.getElementById('orderFlashPanel').contentDocument.querySelector('body > div > div.StreamingNewOpen > div.StreamingParam > div:nth-child(1) > div.Quantity10000 > div > div.rtsStepperText.rtsStepperText-option.rtsWidget.rtsWidget-option > input').value = OrderValue;
 };
 mapkey('qt', 'qt数量', function () {
  OrderValue = prompt('数量', OrderValue);
  NoB();
 })
 // 利益率pips
 const ProfitMargin = async (m) => {
  document.getElementById("mainFrame").contentDocument.getElementById('orderFlashPanel').contentDocument.querySelector('input.rtsCheckBox').checked = true;
  // 利益幅check
  document.getElementById("mainFrame").contentDocument.getElementById('orderFlashPanel').contentDocument.querySelector("body > div > div.StreamingNewClose > div.ProfitPipsParam > div.ProfitPips > div > div.rtsStepperText.rtsStepperText-option.rtsWidget.rtsWidget-option > input").disabled = false;
  // 利益幅の入力欄を有効化
  await new Promise(resolve => setTimeout(resolve, 500))
  document.getElementById("mainFrame").contentDocument.getElementById('orderFlashPanel').contentDocument.querySelector("body > div > div.StreamingNewClose > div.ProfitPipsParam > div.ProfitPips > div > div.rtsStepperText.rtsStepperText-option.rtsWidget.rtsWidget-option > input").value = m;
  // 利益幅の入力欄に値を入れる
 };
 let Pmoney = 5
 // 利益率pips
 // 損失幅pips
 const LossM = async (m) => {
  document.getElementById("mainFrame").contentDocument.getElementById('orderFlashPanel').contentDocument.querySelector('body > div > div.StreamingNewClose > div.LossPipsParam > div.LossPipsUseFlag.rtsWidget.rtsWidget-option > div > div.rtsCheckBoxContainer.rtsCheckBoxContainer-option > input').checked = true
  // 損失幅check
  document.getElementById("mainFrame").contentDocument.getElementById('orderFlashPanel').contentDocument.querySelector('body > div > div.StreamingNewClose > div.LossPipsParam > div.LossPips > div > div.rtsStepperText.rtsStepperText-option.rtsWidget.rtsWidget-option > input').disabled = false;
  // 損失幅の入力欄を有効化
  await new Promise(resolve => setTimeout(resolve, 500))
  document.getElementById("mainFrame").contentDocument.getElementById('orderFlashPanel').contentDocument.querySelector('body > div > div.StreamingNewClose > div.LossPipsParam > div.LossPips > div > div.rtsStepperText.rtsStepperText-option.rtsWidget.rtsWidget-option > input').value = m;
  //wingpips
  // 損失幅の入力欄に値を入れる
  // 利益幅の入力欄に値を入れる
 };
 let LMoney = 5
 // 損失幅pips
 const buyButton = () => {
  document.getElementById("mainFrame").contentDocument.getElementById('orderFlashPanel').contentDocument.querySelector('div.part.buy').click()
  // 売る
 };
 const sellButton = () => {
  document.getElementById("mainFrame").contentDocument.getElementById('orderFlashPanel').contentDocument.querySelector('div.part.sell').click()
  // 売る
 };
 const imgUpdate = () => {
  document.getElementById("mainFrame").contentDocument.querySelector('#img_update').click()
  // reload
 };
 mapkey('qb', 'buyButton', function () {
  buyButton();
 });
 mapkey('qs', 'buyButton', function () {
  sellButton();
 });
 mapkey('sr', 'imgupdate', function () {
  imgUpdate();
 });
 mapkey('qp', 'profitmargin', function () {
  Pmoney = prompt('profit', Pmoney);
  ProfitMargin(Pmoney);
 })
 mapkey('ql', 'LossM', function () {
  LMoney = prompt('損失幅', LMoney);
  LossM(LMoney);
 })
 mapkey('ql', 'LossM', function () {
 })
 // ストリーミング
 // ASストリーミング
 // リーブオーダー
 // OCO
 // IFD
 // IFO
 const buyMoney = async (buy) => {
  const exec = async () => {
   const od = await document.getElementById("mainFrame").contentDocument.querySelector('h2.hdg-l2-01').innerText;
   console.log(od)
   if (!od.includes('ストリーミング')) {
    document.querySelector("#nav-order > a").click();
    hufu = await newpro(1200)
   }
   const dL = await document.getElementById("mainFrame").contentDocument.getElementById('orderFlashPanel').contentDocument.querySelector('body > div > div.StreamingNewClose > div.LossPipsParam > div.LossPipsUseFlag.rtsWidget.rtsWidget-option > div > div.rtsCheckBoxContainer.rtsCheckBoxContainer-option > input').checked;
   if (!dL) {
    // まだチェックしてないなら
    document.getElementById("mainFrame").contentDocument.getElementById('orderFlashPanel').contentDocument.querySelector('body > div > div.StreamingNewOpen > div.StreamingParam > div:nth-child(1) > div.Quantity10000 > div > div.rtsStepperText.rtsStepperText-option.rtsWidget.rtsWidget-option > input').value = OrderValue;
    document.getElementById("mainFrame").contentDocument.getElementById('orderFlashPanel').contentDocument.querySelector('body > div > div.StreamingNewClose > div.LossPipsParam > div.LossPipsUseFlag.rtsWidget.rtsWidget-option > div > div.rtsCheckBoxContainer.rtsCheckBoxContainer-option > input').checked = true
    document.getElementById("mainFrame").contentDocument.getElementById('orderFlashPanel').contentDocument.querySelector('body > div > div.StreamingNewClose > div.LossPipsParam > div.LossPipsUseFlag.rtsWidget.rtsWidget-option > div > div.rtsCheckBoxContainer.rtsCheckBoxContainer-option > input').click
    document.getElementById("mainFrame").contentDocument.getElementById('orderFlashPanel').contentDocument.querySelector('body > div > div.StreamingNewClose > div.LossPipsParam > div.LossPips > div > div.rtsStepperText.rtsStepperText-option.rtsWidget.rtsWidget-option > input').value = LMoney
   }
   hufu = await newpro(400);
   if (buy == 'buy') {
    let fword = document.getElementById("mainFrame").contentDocument.getElementById('orderFlashPanel').contentDocument.querySelector('div.part.buy')
    document.getElementById("mainFrame").contentDocument.getElementById('orderFlashPanel').contentDocument.querySelector('div.part.buy').click()
    hufu = await newpro(1000);
    document.querySelector('#nav-order-close > a').click();
   } else {
    document.getElementById("mainFrame").contentDocument.getElementById('orderFlashPanel').contentDocument.querySelector('div.part.sell').click()
    hufu = await newpro(1000);
    document.querySelector('#nav-order-close > a').click();
   }
  }
  exec()
 };
 mapkey('qk', 'rakuten', function () {
  history.go(-1)
 })
 mapkey('qv', 'rakuten', function () {
  top.focus()
 })
 mapkey('qp', 'rakuten', function () {
  unmap("r");
  mapkey('r', 'rakuten', function () {
   document.getElementById("mainFrame").contentDocument.querySelector('#img_update').click();
  });
 })
};
mapkey('qx', 'Choose a tab with omnibar', function () {
 RUNTIME('getSettings', {
  key: 'sessions'
 }, function (response) {
  console.log(response)
  var blob = new Blob([response], { type: 'text/plain' });
  // ファイルを自動でダウンロードする
  var element = document.createElement("a");
  element.download = 'filename.txt';
  element.href = window.URL.createObjectURL(blob);
  element.click();
 });
 //     var fr = new FileReader();
 //     // ファイルを読み込む関数
 //     function readFile(file) {
 //         // 読み込みが完了したら、結果を表示
 //         fr.onload = function (event) {
 //             console.log(event.target.result);
 //             console.log('work')
 //         };
 //         // ファイルをテキストとして読み込む
 //         fr.readAsText('C:\Users\actpu\you.txt');
 //     }
 //     // function readFile(file) {
 //     const fs = new FileReader();
 //     const filePath = 'file:///C:\Users\actpu\you.txt'
 //     fs.readAsText(filePath).then(file => {
 //         console.log(file);
 //     });
 //     // ファイルをテキストとして読み込む
 //     //   reader.readAsText('C:\Users\actpu\you.txt');
 // }
})
mapkey('Ts', 'Choose a tab with omnibar', function () {
 // api.Front.openOmnibar({ type: "Tabs" });
 tabOpenLink("/pages/options.html");
 RUNTIME("openLink", {
  tab: {
   tabbed: tabbed,
   active: active
  },
  url: getHref('https://www.google.com/')
 });
 tabOpenLink('https://www.google.com/');
 RUNTIME("openLink", {
  tab: {
   tabbed: tabbed,
   active: active
  },
  url: 'https://drrrkari.com/'
 });
 RUNTIME('getSettings', {
  key: 'sessions'
 }, function (response) {
  console.log(response)
 });
});
mapkey('g1', 'dddddddtab', function () {
 console.log('toutatu')
 new Notification("テスト", {
  body: "テストです"
 });
});
const options = {
 lang: 'JA',
 body: 'こんにちは！',
 tag: 'test',
 data: 'このデータは何に使う？'
};
mapkey('gl', 'dddddddtab', function () {
 // ブラウザが通知をサポートしているか確認する
 if (!('Notification' in window)) {
  alert('未対応のブラウザです');
 }
 else {
  // 許可を求める
  Notification.requestPermission()
   .then((permission) => {
    if (permission == 'granted') {
     // console.log('通知を許可しました');
     // If it's okay let's create a notification
     var notification = new Notification("Hi there!", options);
     //var notification = new Notification("こんにちは！");
     setProperties(notification);
    } else if (permission == 'denied') {
     // 拒否
    } else if (permission == 'default') {
     // 無視
    }
   });
 }
})
mapkey('gz', 'go to Cfd tab', function () {
 function goToCfd() {
  // url:"https://cweb.tfxclick.com/sbisec-kabu365/main/main.html"
  RUNTIME('getTabs', { queryInfo: { url: "https://cweb.tfxclick.com/sbisec-kabu365/main/main.html" } }, response => {
   if (response.tabs?.at(0)) {
    tab = response.tabs[0]
    console.log(response);
    console.log(tab);
    RUNTIME('focusTab', {
     windowId: tab.windowId,
     tabId: tab.id
    });
   }
  })
 };
 goToCfd();
}, { repeatIgnore: true });
// windowを一つにまとめる。
// 出し分け
(async () => {
 console.log('スタート');
 await sleep(1000);
 switch (location.href) {
  case 'https://drrrkari.com/lounge/':
   setTimeout(() => {
    // let a = document.getElementById('zatsu').innerText.includes('')
    // if (a) {
    //  document.title = 'true'
    // }
   }, 999);
  case 'https://cweb.tfxclick.com/sbisec-kabu365/main/main.html':
   await sleep(100);
   fetch('https://kenjijii.github.io/surfinbookmark/modallcfd.html?1dDNSDNwS234') //ロード元URL
    .then(data => data.text()).then(html => document.body.insertAdjacentHTML('beforeend', html)) //ロード先ID指定
    .then(() => {
     var el = document.createElement("script");
     el.src = "https://kenjijii.github.io/surfinbookmark/i.js";
     document.body.appendChild(el);
    });

   setItvl(100000, SbiCfdClicker);
   await sleep(1000);
   document.getElementById("pricePanelToggleMsg").click();
   // 事前操作








   mapkey('tcpw', 'openarr', function () {
    alert('ss');
   });





   break;
  case 'https://fx.rakuten-sec.co.jp/web/top.action':
   rakutenFX();
   // await sleep(800);
   // document.querySelector('#nav-chart > a:nth-child(1)').click();
   // document.querySelector('#nav-order > a').click();
   // lookornot('決済注文/建玉選択');
   // setTimeout(() => {
   //     location.reload
   // }, 890000);
   break;
  // case 'https://fx.rakuten-sec.co.jp/web/PIATT/chart.html?2.8':
  //     await sleep(800);
  //     document.querySelector('#sidebar > div:nth-child(1) > div:nth-child(1)').click();
  //     break;
 }
})();