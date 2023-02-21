const objHiragana = {
    a: "あ",
    i: "い",
    u: "う",
    e: "え",
    o: "お",
    ka: "か",
    ki: "き",
    ku: "く",
    ke: "け",
    ko: "こ",
    ga: "が",
    gi: "ぎ",
    gu: "ぐ",
    ge: "げ",
    go: "ご",
    sa: "さ",
    shi: "し",
    su: "す",
    se: "せ",
    so: "そ",
    za: "ざ",
    ji: "じ",
    zu: "ず",
    ze: "ぜ",
    zo: "ぞ ",
    ta: "た",
    chi: "ち",
    tsu: "つ",
    te: "て",
    to: "と",
    da: "だ",
    ji2: "ぢ",
    zu2: "づ",
    de: "で",
    do: "ど",
    na: "な",
    ni: "に",
    nu: "ぬ",
    ne: "ね",
    no: "の",
    ha: "は",
    hi: "ひ",
    fu: "ふ",
    he: "へ",
    ho: "ほ",
    ba: "ば",
    bi: "び",
    bu: "ぶ",
    be: "べ",
    bo: "ぼ",
    pa: "ぱ",
    pi: "ぴ",
    pu: "ぷ",
    pe: "ぺ",
    po: "ぽ",
    ma: "ま",
    mi: "み",
    mu: "む",
    me: "め",
    mo: "も",
    ya: "や",
    yu: "ゆ",
    yo: "よ",
    ra: "ら",
    ri: "り",
    ru: "る",
    re: "れ",
    ro: "ろ",
    wa: "わ",
    wo: "を",
    n: "ん",
}

const objHiraCombination = {
    kya: "きゃ",
    kyu: "きゅ",
    kyo: "きょ",
    gya: "ぎゃ",
    gyu: "ぎゅ",
    gyo: "ぎょ",
    sha: "しゃ",
    shu: "しゅ",
    sho: "しょ",
    ja : "じゃ",
    ju: "じゅ",
    jo: "じょ",
    cha: "ちゃ",
    chu: "ちゅ",
    cho: "ちょ",
    nya: "にゃ",
    nyu: "にゅ",
    nyo: "にょ",
    hya: "ひゃ",
    hyu: "ひゅ",
    hyo: "ひょ",
    bya: "びゃ",
    byu: "びゅ",
    byo: "びょ",
    pya: "ぴゃ",
    pyu: "ぴゅ",
    pyo: "ぴょ",
    mya: "みゃ",
    myu: "みゅ",
    myo: "みょ",
    rya: "りゃ",
    ryu: "りゅ",
    ryo: "りょ",
}

const objKatakana = {
    a: "ア",
    i: "イ",
    u: "ウ",
    e: "エ",
    o: "オ",
    ka: "カ",
    ki: "キ",
    ku: "ク",
    ke: "ケ",
    ko: "コ",
    ga: "ガ",
    gi: "ギ",
    gu: "グ",
    ge: "ゲ",
    go: "ゴ",
    sa: "サ",
    shi: "シ",
    su: "ス",
    se: "セ",
    so: "ソ",
    za: "ザ",
    ji: "ジ",
    zu: "ズ",
    ze: "ゼ",
    zo: "ゾ",
    ta: "タ",
    chi: "チ",
    tsu: "ツ",
    te: "テ",
    to: "ト",
    da: "ダ",
    ji2: "ヂ",
    zu2: "ヅ",
    de: "デ",
    do: "ド",
    na: "ナ",
    ni: "ニ",
    nu: "ヌ",
    ne: "ネ",
    no: "ノ",
    ha: "ハ",
    hi: "ヒ",
    fu: "フ",
    he: "ヘ",
    ho: "ホ",
    ba: "バ",
    bi: "ビ",
    bu: "ブ",
    be: "ベ",
    bo: "ボ",
    pa: "パ",
    pi: "ピ",
    pu: "プ",
    pe: "ペ",
    po: "ポ",
    ma: "マ",
    mi: "ミ",
    mu: "ム",
    me: "メ",
    mo: "モ",
    ya: "ヤ",
    yu: "ユ",
    yo: "ヨ",
    ra: "ラ",
    ri: "リ",
    ru: "ル",
    re: "レ",
    ro: "ロ",
    wa: "ワ",
    wo: "ヲ",
    n: "ン",
}

const objKataCombination = {
    kya: "キャ",
    kyu: "キュ",
    kyo: "キョ",
    gya: "ギャ",
    gyu: "ギュ",
    gyo: "ギョ",
    sha: "シャ",
    shu: "シュ",
    sho: "ショ",
    ja: "ジャ",
    ju: "ジュ",
    jo: "ジョ",
    cha: "チャ",
    chu: "チュ",
    cho: "チョ",
    nya: "ニャ",
    nyu: "ニュ",
    nyo: "ニョ",
    hya: "ヒャ",
    hyu: "ヒュ",
    hyo: "ヒョ",
    bya: "ビャ",
    byu: "ビュ",
    byo: "ビョ",
    pya: "ピャ",
    pyu: "ピュ",
    pyo: "ピョ",
    mya: "ミャ",
    myu: "ミュ",
    myo: "ミョ",
    rya: "リャ",
    ryu: "リュ",
    ryo: "リョ",
}
const resultCount = {
    total: 0,
    correct: 0,
    incorrect: 0,
}
var list = {}
function getWord() {
    const queryString = window.location.search
    const urlParam = new URLSearchParams(queryString)
    const type = urlParam.get("type")
    if(type === "hiragana") {
        list = {...objHiragana, ...objHiraCombination}
    } else if( type == "katakana") {
        list = {...objKatakana, ...objKataCombination}
    } else {
        window.location.href = "/error.html"
    }

    //get random property
    const listKeyTarget = Object.keys(list)
    const keyTarget = listKeyTarget[Math.floor(Math.random()* listKeyTarget.length)]
    
    //show
    const showTargetElement = document.getElementById("show-target")
    showTargetElement.innerText = keyTarget

    //show list
    var listElement = "<ul>"
    const lengthListKey = listKeyTarget.length
    for (let i = 0; i < lengthListKey; i++) {
        var count = listKeyTarget.length
        const index = Math.floor(Math.random() * count)
        const key = listKeyTarget[index]
        listElement += `<li onclick="checkAnswer('${keyTarget}', '${list[key]}')">${list[key]}</li>`
        listKeyTarget.splice(index, 1)
    }
    listElement += "</ul>"
    const listContainerElement = document.getElementById('list')
    listContainerElement.innerHTML = listElement
}

function checkAnswer(key, value) {
    const answerElement = document.getElementById("answer")
    const triggerElement = document.getElementById("trigger-result")
    const continueElement = document.getElementById('continue')
    triggerElement.checked = true
    resultCount.total++
    if(list[key] === value) {
        resultCount.correct++
        answerElement.className = "answer correct"
        answerElement.innerText = "Correct"
        continueElement.className = ""
    } else {
        resultCount.incorrect++
        answerElement.className = "answer incorrect"
        answerElement.innerText = "Incorrect"
        continueElement.className = "hidden"
    }
    showAnalyse()
}
function showAnalyse() {
    const totalElement          = document.getElementById("result-total")
    const correctElement        = document.getElementById("result-correct")
    const incorrectElement      = document.getElementById("result-incorrect")
    totalElement.innerText      = "Total: " + resultCount.total
    correctElement.innerText    = "Correct: " + resultCount.correct
    incorrectElement.innerText  = "Incorrect: " + resultCount.incorrect
}
const triggerElement = document.getElementById('trigger')
const continueElement = document.getElementById('continue')
triggerElement.addEventListener('click', (e) => {getWord()})
continueElement.addEventListener('click', (e) => {
    const triggerElement = document.getElementById("trigger-result")
    triggerElement.checked = false
    getWord()
})