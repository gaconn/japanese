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

async function getWord() {
    const allData = await getData()

    //random số nét
    const stroke_number = Math.floor(Math.random()*17)

    const processData = allData[`${stroke_number}_stroke`]
    const listKeyProcess = Object.keys(processData)

    // random chữ
    const keyTarget = listKeyProcess[Math.floor(Math.random()*listKeyProcess.length)]

    showSingleWord(keyTarget, processData[keyTarget])
}

function showSingleWord(keyTarget, value) {
    document.getElementById("show-writing").innerHTML = ""
    document.getElementById("show-target").innerHTML = value[0] 
    document.getElementById("word-meaning").innerHTML = value[1]
    var showElement = document.getElementById("show-answer")
    showElement.setAttribute("onclick", `showWriting("${keyTarget}")`)
}
function showWriting(keyTarget) {
    document.getElementById("show-writing").innerHTML =`<img src="./data/images/214/${keyTarget}.gif" alt="${keyTarget}"/>`
}
const triggerElement = document.getElementById("trigger")

triggerElement.addEventListener("click", (e) => {
    getWord()
})

