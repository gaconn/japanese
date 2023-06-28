const resultCount = {
    total: 0,
    correct: 0,
    incorrect: 0,
}
var processData = null;
var kanjiStrokeData 
async function initData() {
    kanjiStrokeData = await getData()
}
async function getWord() {
    const queryString = window.location.search
    const urlParam = new URLSearchParams(queryString)
    const type = urlParam.get("type")
    const stroke_number = urlParam.get("stroke") ? urlParam.get("stroke") : "1"

    if(type === "random") {
        const flow = urlParam.get("flow") ? urlParam.get("flow") : "kanji-vn"
        processData = generateRandomProcessData(kanjiStrokeData, flow)
    } else {
        processData = kanjiStrokeData[`${stroke_number}_stroke`]
    }

    switch (type) {
        case "vn-kanji":
            processData = generateListConvert(processData)
            break;
        default:
            break;
    }
    
    const arrKey = Object.keys(processData)
    // Get target will display
    const index = Math.floor(Math.random()*arrKey.length)
    const keyTarget = arrKey[index]
    const valueTarget = processData[arrKey[index]]
    showData(processData, arrKey, keyTarget);
}

/**
 * Random ra 10 giá trị random không trùng nhau
 * @param {} kanjiStrokeData 
 * @returns {${number}_${stroke}_${intRandomIndexWord}:true}
 */
function generateRandomListIndex(kanjiStrokeData) {
    console.log(kanjiStrokeData);
    var objList = {}
    var number = 1;
    while (number <= 10) {
        var stroke = Math.floor(Math.random()*16 +1)
        let arrListWord = Object.keys(kanjiStrokeData[`${stroke}_stroke`])
        let intRandomIndexWord = Math.floor(Math.random() * arrListWord.length)

        if(objList[`${stroke}_${arrListWord[intRandomIndexWord]}`] === true) {
            continue
        } else {
            objList[`${stroke}_${arrListWord[intRandomIndexWord]}`] = true
            number++
        }
    }
    return objList
}

/**
 * 
 * @param {*} kanjiStrokeData 
 * @param {*} type kanji-vn / vn-kanji
 * @returns {word: array[meaning][vn_meaning][explain]}
 */
function generateRandomProcessData(kanjiStrokeData, type) {
    const objList = generateRandomListIndex(kanjiStrokeData)
    const arrItems = Object.keys(objList)
    const objProcessData = {}
    if(type === "kanji-vn") {
        for (let index = 0; index < arrItems.length; index++) {
            let arrItem = arrItems[index].split("_")
            objProcessData[arrItem[1]] = kanjiStrokeData[`${arrItem[0]}_stroke`][arrItem[1]]
        }
    } else if (type === "vn-kanji") {
        for (let index = 0; index < arrItems.length; index++) {
            let arrItem = arrItems[index].split("_")
            objProcessData[kanjiStrokeData[`${arrItem[0]}_stroke`][arrItem[1]]] = arrItem[1]
        }
    }
    return objProcessData
}
function showData(list, arrKey, answerKey) {
    const showTargetElement =  document.getElementById("show-target")
    const wordMeaning = document.getElementById("word-meaning")
    const arrSplitKey = answerKey.split(",")
    if (arrSplitKey.length > 1) {
        showTargetElement.innerText = arrSplitKey[0]
        wordMeaning.innerText = answerKey
    } else {
        showTargetElement.innerText = answerKey
    }
    listElement = `<button onclick="skip('${answerKey}')" id="btn-skip">Skip</button><ul>`
    for(var i = 0; i< arrKey.length; i++) {
        arrMean = list[arrKey[i]]
        listElement += `<li onclick="checkAnswer('${answerKey}', '${arrKey[i]}')">${arrMean[0].trim()}</li>`
    }
    listElement += "</ul>"
    const listContainerElement = document.getElementById('list')
    listContainerElement.innerHTML = listElement
}

function getData() {
    const promise = new Promise(
        (resolve, reject) =>fetch("data/214kanji.json")
        .then(data => data.json())
        .then((data) => {
            resolve(data)
        })
        .catch((err) => reject(err))
    )
    return promise
}

function skip(keyAnswer) {
    const answerElement = document.getElementById("answer")
    const triggerElement = document.getElementById("trigger-result")
    const continueElement = document.getElementById('continue')
    triggerElement.checked = true
    resultCount.total++
    const arrMean = processData[keyAnswer]
    explain = arrMean[0].trim() + "\n"
    explain += "Nghĩa là: " + arrMean[1].trim() + "\n"
    explain += arrMean[2] ? ("Chi tiết: " + arrMean[2].trim()) : ""
    resultCount.incorrect++
    answerElement.className = "answer skip"
    answerElement.innerText = explain
    continueElement.className = ""
}

function checkAnswer(keyAnswer, keyPick) {
    const answerElement = document.getElementById("answer")
    const triggerElement = document.getElementById("trigger-result")
    const continueElement = document.getElementById('continue')
    triggerElement.checked = true
    resultCount.total++
    if(keyAnswer === keyPick) {
        const arrMean = processData[keyAnswer]
        explain = `<h3 class="meaning">${arrMean[0].trim()}</h3> </br>`
        explain += "Nghĩa là: " + arrMean[1].trim() + "\n"
        explain += arrMean[2] ? ("Chi tiết: " + arrMean[2].trim()) : ""
        resultCount.correct++
        answerElement.className = "answer correct"
        answerElement.innerHTML = explain
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

function generateListConvert(data) {
    const arrKey = Object.keys(data)
    var output = {}
    for (let key of arrKey) {
        var mean = data[key][0].trim()
        var arrMean = [key, data[key][1]]
        if (data[key][2]) arrMean.push(data[key][2])
        output = {...output, [mean] : arrMean}
    }
    return output
}

function getCurrent() {
    const queryString = window.location.search
    const urlParam = new URLSearchParams(queryString)
    const type = urlParam.get("type")
    const stroke_number = urlParam.get("stroke") ? urlParam.get("stroke") : "1"
    const flow = urlParam.get("flow") ? urlParam.get("flow") : "kanji-vn"
    if (type === "vn-kanji") {
        document.querySelector("#type > a:nth-child(2)").classList.add("current")
    } else if(type === "random" && flow === "kanji-vn") {
        document.querySelector("#type > a:nth-child(3)").classList.add("current")
    } else if(type === "random" && flow === "vn-kanji") {
        document.querySelector("#type > a:nth-child(4)").classList.add("current")
    } else {
        document.querySelector("#type > a:nth-child(1)").classList.add("current")
    }

    document.querySelector(`#stroke a:nth-child(${stroke_number})`).classList.add("current")
}

function renderNavbar() {
    const queryString = window.location.search
    const urlParam = new URLSearchParams(queryString)
    const type = urlParam.get("type") ? urlParam.get("type") :"kanji" 
    const stroke_number = urlParam.get("stroke") ? urlParam.get("stroke") : "1"
    const navContainerElement = document.getElementById("stroke")
    var navList = ""
    for(let i=1; i< 18 ; i++) {
        navList += `<a href="?type=${type}&stroke=${i}">${i}</a>`
    }
    navContainerElement.innerHTML = navList
}
renderNavbar()
getCurrent()
initData()
const triggerElement = document.getElementById('trigger')
const skipElement = document.getElementById('skip')
const continueElement = document.getElementById('continue')
triggerElement.addEventListener('click', (e) => {getWord()})
continueElement.addEventListener('click', (e) => {
    const triggerElement = document.getElementById("trigger-result")
    triggerElement.checked = false
    getWord()
})
