import {InitData} from "../../lib/js/vocabulary.js"
const list = `
<div id="lesson_vocabulary">
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

async function init() {
    var paramUrl = new URLSearchParams(window.location.search)
    var mode = paramUrl.get("mode") ? paramUrl.get("mode") : "list" //list/target/show
    var type = paramUrl.get("type") //vocabulary/grammar
    var lessonNumber = paramUrl.get("lesson")

    if (mode === "list") {
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
        var data = await InitData(type, lessonNumber)
        target(data)
    } else if (mode === "show") {
        var data = await InitData(type, lessonNumber)
        show(data)
    }
}

function show(data) {
    var listElement = `<div> <button id="back">Trở lại</button> <ul>`
    var listKeys = Object.keys(data)
    console.log(listKeys);
    for(let item =0 ; item < listKeys.length; item++) {
        var example = ""
        if(Array.isArray(data[listKeys[item]]["example"])) {
            example = data[listKeys[item]]["example"].join("</br>")
        }
        listElement += `
        <li>
            <div>
                <div>
                    <h3 class="word">${listKeys[item]}</h3>
                    <p class="word1">ちゅうごく</p>
                    <p class="word2">kata</p>
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

    document.getElementById("back").addEventListener("click", (e) => {
        var paramUrl =new URLSearchParams(window.location.search)
        paramUrl.set("mode", "list") //list/target
        window.location.search = paramUrl
    })
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
                <label for="trigger-result" class="result-cancel">Cancel</label>
                <button id="continue">Continue</button>
            </div>
        </div>
        <div for="trigger-result" class="base">
        </div>
    </div>
    `

    document.getElementById("trigger").addEventListener("click", (e) => {
        var listKey = Object.keys(data)
        console.log(listKey);
        answerKey = listKey[Math.floor(Math.random()*listKey.length)]
        var listElement = `<button onclick="skip('${answerKey}')" id="btn-skip">Skip</button><ul>`

        for (let index = 0; index < listKey.length; index++) {
            listElement += `<li onclick="checkAnswer('${listKey[index]}')">${data[listKey[index]]["mean_vn"].trim()}</li>`
        }
        listElement += "</ul>"
        document.getElementById("show-target").innerHTML = answerKey
        document.getElementById("list").innerHTML = listElement
    })
}

function checkAnswer(e) {
    console.log(e.target);
}