import {InitData} from "../../lib/js/vocabulary.js"
const list = `
<div id="lesson_vocabulary">
    <div class="lesson_vocabulary_item" id="vocabulary_1">Từ vựng bài 1</div>
    <div class="lesson_vocabulary_item" id="vocabulary_2">Từ vựng bài 2</div>
    <div class="lesson_vocabulary_item" id="vocabulary_3">Từ vựng bài 3</div>
    <div class="lesson_vocabulary_item" id="vocabulary_4">Từ vựng bài 4</div>
</div>
<div id="lesson_kanji_vocabulary">
    <div class="lesson_kanji_vocabulary_item" id="vocabulary-kanji_1">Từ vựng kanji bài 1</div>
</div>
<div id="lesson_grammar">
    <div class="lesson_grammar_item">grammar 1</div>
</div>
`   
init()

var Data = null

async function init() {
    menuHandler()
    var paramUrl = new URLSearchParams(window.location.search)
    var mode = paramUrl.get("mode") ? paramUrl.get("mode") : "list" //list/target/show/write
    var type = paramUrl.get("type") //vocabulary/grammar
    var lessonNumber = paramUrl.get("lesson")
    
    if (mode === "list") {
        document.getElementById("type").innerHTML = `<img src="./images/icons/house.png" alt="house" />`
        var layoutLessonElement = document.getElementById("layout_lesson")
        layoutLessonElement.innerHTML = list
        layoutLessonElement.childNodes.forEach((e) => {
            e.childNodes.forEach((e)=> {
                e.addEventListener("click", async (node) => {
                    var paramUrl =new URLSearchParams(window.location.search)
                    var arr = node.target.id.split("_")
                    if (arr.length != 2) return
                    var type = arr[0]
                    var number = arr[1]
                    paramUrl.set("mode", "target") //list/target
                    paramUrl.set("type", type)
                    paramUrl.set("lesson", number)
                    window.location.search = paramUrl
                })
            })
        })
    } else if (mode === "target") {
        Data = await InitData(type, lessonNumber)
        target(Data)
    } else if (mode === "show") {
        Data = await InitData(type, lessonNumber)
        show(Data)
    } else if (mode === "write") {
        Data = await InitData(type, lessonNumber)
        write(Data)
    }
}

function menuHandler() {
    document.querySelector("#type a:nth-child(1)").addEventListener("click", e=> {
        e.preventDefault()
        var paramUrl =new URLSearchParams(window.location.search)
        var type = paramUrl.get("type") //vocabulary/grammar
        var lessonNumber = paramUrl.get("lesson")
        paramUrl.set("mode", "list") //list/target
        paramUrl.set("type", type)
        paramUrl.set("lesson", lessonNumber)
        window.location.search = paramUrl
    })
    document.querySelector("#type a:nth-child(2)").addEventListener("click", e=> {
        e.preventDefault()
        var paramUrl =new URLSearchParams(window.location.search)
        var type = paramUrl.get("type") //vocabulary/grammar
        var lessonNumber = paramUrl.get("lesson")
        paramUrl.set("mode", "show") //list/target
        paramUrl.set("type", type)
        paramUrl.set("lesson", lessonNumber)
        window.location.search = paramUrl
    })
    document.querySelector("#type a:nth-child(3)").addEventListener("click", e=> {
        e.preventDefault()
        var paramUrl =new URLSearchParams(window.location.search)
        var type = paramUrl.get("type") //vocabulary/grammar
        var lessonNumber = paramUrl.get("lesson")
        paramUrl.set("mode", "target") //list/target
        paramUrl.set("type", type)
        paramUrl.set("lesson", lessonNumber)
        window.location.search = paramUrl
    })
    document.querySelector("#type a:nth-child(4)").addEventListener("click", e=> {
        e.preventDefault()
        var paramUrl =new URLSearchParams(window.location.search)
        var type = paramUrl.get("type") //vocabulary/grammar
        var lessonNumber = paramUrl.get("lesson")
        paramUrl.set("mode", "write") //list/target
        paramUrl.set("type", type)
        paramUrl.set("lesson", lessonNumber)
        window.location.search = paramUrl
    })
}
function show(data) {
    var listElement = `<div id="list-show"><ul>`
    var listKeys = Object.keys(data)
    console.log(listKeys);
    for(let item =0 ; item < listKeys.length; item++) {
        var example = ""
        if(Array.isArray(data[listKeys[item]]["example"])) {
            example = data[listKeys[item]]["example"].join("</br>")
        }
        listElement += `
        <li>
            <div class="target-content">
                <div >
                    <h3 class="word">${listKeys[item]}</h3>
                    ${data[listKeys[item]]["hiragana"] ? `<p class="word1">${data[listKeys[item]]["hiragana"]}</p>` : ""}
                    ${data[listKeys[item]]["katakana"] ? `<p class="word2">${data[listKeys[item]]["katakana"]}</p>` : ""}
                </div>
                <div class="type">(${data[listKeys[item]]["type"]})</div>
                <div class="mean">${data[listKeys[item]]["mean_vn"]}</div>
            </div>
            <div class="example">${example}</div>
        </li>
        `
    }
    listElement += "</ul></div>"
    var layoutLessonElement = document.getElementById("layout_lesson")
    layoutLessonElement.innerHTML = listElement
}
var answerKey =""
function target(data) {
    var layoutLessonElement = document.getElementById("layout_lesson")
    
    layoutLessonElement.innerHTML = `
    <div class="container">
        <div class="show">
            <div class="target" id="show-target">---</div>
            <div id="word-meaning"></div>
            <button class="trigger" id="trigger">Get word</button>
            
            <div>
                <span id="result-total">Total: 0</span>
                <span id="result-correct">Correct: 0</span>
                <span id="result-incorrect">Incorrect: 0</span>
            </div>
        </div>
        <div id="list"></div>
    </div>
    <input type="checkbox" id="trigger-result" hidden>
    <div class="panel">
        <div class="box">
            <div class="answer correct" id="answer">Correct</div>
            <div class="control">
                <label for="trigger-result" class="result-cancel" id="cancel">Cancel</label>
                <button id="continue">Continue</button>
            </div>
        </div>
        <div for="trigger-result" class="base">
        </div>
    </div>
    `

    document.getElementById("trigger").addEventListener("click", ()=> getWord(data))
    document.getElementById("continue").addEventListener("click", ()=> getWord(data))
}

function write(data) {
    document.getElementById("layout_lesson").innerHTML = `
    <div class="container">
        <div class="show">
            <div class="target" id="show-target">---</div>
            <div id="word-meaning"></div>
            <button class="trigger" id="trigger">Get word</button>
            <button id="write-show" hidden>Xem kết quả</button>
        </div>
        <div id="write-result"></div>
    </div>
    `
    document.getElementById("trigger").addEventListener("click", ()=> getWriteWord(data))
}

function getWord(data) {
    document.getElementById("trigger-result").checked = false
    var listKey = Object.keys(data)
    answerKey = listKey[Math.floor(Math.random()*listKey.length)]
    var listElement = `<button id="btn-skip">Skip</button><ul>`

    for (let index = 0; index < listKey.length; index++) {
        listElement += `<li target-value="${listKey[index]}" class="check-answer">${data[listKey[index]]["mean_vn"].trim()}</li>`
    }
    listElement += "</ul>"
    document.getElementById("show-target").innerHTML = answerKey
    document.getElementById("list").innerHTML = listElement
    document.getElementById("btn-skip").addEventListener("click", skip)
    var tmpElement = document.getElementsByClassName("check-answer")
    for (let index = 0; index < tmpElement.length; index++) {
        tmpElement[index].addEventListener("click", checkAnswer)
    }
}

function getWriteWord(data) {
    var listKey = Object.keys(data)
    answerKey = listKey[Math.floor(Math.random()*listKey.length)]
    var arr = data[answerKey]["mean_vn"].split("(")
    var wordMeaningElement = document.getElementById("word-meaning")
    wordMeaningElement.innerText = arr[1]? arr[1].replace(")", "") : ""
    document.getElementById("show-target").innerHTML = arr[0].trim()
    var writeShowBtnElement = document.getElementById("write-show")
    var writeResult = document.getElementById("write-result")
    writeResult.setAttribute("hidden", "true")
    writeShowBtnElement.removeAttribute("hidden")
    writeShowBtnElement.addEventListener("click", () => {
        writeResult.innerText = answerKey
        writeResult.removeAttribute("hidden")
    })
}

function checkAnswer(e) {
    var choice = e.target.getAttribute("target-value")
    
    if (choice != answerKey) {
        alertSound(false)
        setPoint(false)
        showAlert()
    } else {
        alertSound(true)
        setPoint(true)
        showAnswer(answerKey, Data[answerKey])
    }
}

function alertSound(isCorrect) {
    if (isCorrect) {
        document.getElementById("correct-sound").play()
    } else {
        document.getElementById("incorrect-sound").play()
    }
}
function skip() {
    alertSound(false)
    showAnswer(answerKey, Data[answerKey])
}

function showAnswer(answerKey, info) {
    document.getElementById("trigger-result").checked = "true"
    var example = Array.isArray(info["example"]) ? 
    info["example"].reduce((returnElement, item, init="") => (returnElement + `<div class='skip-example-item'> ${item} </div>`)) 
    :  ""
    var skipElement = `
    <div id="check-container">
        <div id="check-word"> ${answerKey} </div>
        <div id="check-mean"> ${info["mean_vn"]}
        ${info["hiragana"] ? `<div id="check-hiragana">Hiragana: ${info["hiragana"]} </div>`: ""}
        ${Data["katakana"] ? `<div id="check-katakana">Katakana: ${Data["katakana"]} </div>` : ""}
        ${example ? `<div id="check-example">Example: ${example} </div>`: ""}
    </div>
    `
    const answerElement     = document.getElementById("answer")
    answerElement.innerHTML = skipElement
    answerElement.className = "answer corect"
    document.getElementById('continue').className = "display"
    document.getElementById("cancel").setAttribute("hidden", "true")
}

function showAlert() {
    document.getElementById("trigger-result").checked = "true"
    document.getElementById("cancel").removeAttribute("hidden")
    const answerElement         = document.getElementById("answer")
    const continueElement       = document.getElementById('continue')
    answerElement.className     = "answer incorrect"
    answerElement.innerText     = "Incorrect"
    continueElement.className   = "hidden"
}

const resultCount = {
    total: 0,
    correct: 0,
    incorrect: 0,
}
function setPoint(isCorrect) {
    if(isCorrect) {
        resultCount.correct++
    } else {
        resultCount.incorrect++
    }
    resultCount.total = resultCount.correct + resultCount.incorrect
    document.getElementById("result-total").innerText      = "Total: " + resultCount.total
    document.getElementById("result-correct").innerText    = "Correct: " + resultCount.correct
    document.getElementById("result-incorrect").innerText  = "Incorrect: " + resultCount.incorrect
}