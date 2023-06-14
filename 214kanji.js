const resultCount = {
    total: 0,
    correct: 0,
    incorrect: 0,
}
var processData = null;
async function getWord() {
    const queryString = window.location.search
    const urlParam = new URLSearchParams(queryString)
    const type = urlParam.get("type")
    const stroke_number = urlParam.get("stroke") ? urlParam.get("stroke") : "1"

    const kanjiStrokeData = await getData()
    processData = kanjiStrokeData[`${stroke_number}_stroke`]

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

function showData(list, arrKey, answerKey) {
    const showTargetElement =  document.getElementById("show-target")
    showTargetElement.innerText = answerKey
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
        (resolve, reject) =>fetch("./data/214kanji.json")
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

    if (type === "vn-kanji") {
        document.querySelector("#type > a:nth-child(2)").classList.add("current")
    } else {
        document.querySelector("#type > a:nth-child(1)").classList.add("current")
    }

    document.querySelector(`#stroke a:nth-child(${stroke_number})`).classList.add("current")
}
getCurrent()
const triggerElement = document.getElementById('trigger')
const skipElement = document.getElementById('skip')
const continueElement = document.getElementById('continue')
triggerElement.addEventListener('click', (e) => {getWord()})
continueElement.addEventListener('click', (e) => {
    const triggerElement = document.getElementById("trigger-result")
    triggerElement.checked = false
    getWord()
})