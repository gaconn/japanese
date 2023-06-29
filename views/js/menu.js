var menuElement = document.getElementById("menu")
var headElement = document.getElementsByTagName('head')[0]
var arrBase = document.getElementById("menu-script").src.split("/")
arrBase.pop()
var tmp = window.location.href.split("/").pop()
var currentFile = tmp.split("?")[0]
var strBase = arrBase.join("/")
headElement.innerHTML += `<link rel="stylesheet" href="./views/css/menu.css">`

menuElement.innerHTML = `
<input type="checkbox" name="menu-trigger" id="menu-trigger" title="trigger" hidden>
<label for="menu-trigger"><img src="./images/icons/menu.png" alt="" class="menu-icon"></label>
<label for="menu-trigger" class="base"></label>
<div class="menu-content">
    <div class="menu-header">
        <img src="./images/icons/menu.png" alt="" class="menu-icon menu-content-icon">
        <label for="menu-trigger">
            <img src="./images/icons/erase.png" alt="" class="menu-icon menu-content-icon menu-content-icon-exit">
        </label>
    </div>
    <ul class="menu-body">
        <li ${currentFile ==="index.html" ? "class='current'": ""}>
            <a href="" id="alphabet-url">Bảng chữ cái</a>
        </li>
        <li ${currentFile ==="214kanji.html" ? "class='current'": ""}>
            <a href="" id="214kanji-url">214 Bộ thủ</a>
        </li>
        
        <li  ${currentFile ==="practice_kanji_stroke.html" ? "class='current'": ""}>
            <a href="" id="practice-kanji-stroke">Tập viết 214 bộ thủ</a>
        </li>

        <li ${currentFile ==="lesson.html" ? "class='current'": ""}>
            <a href="" id="lesson">Từ vựng</a>
        </li>
    </ul>
</div>
`
var url = window.location.href
var arrUrl = url.split("/")
arrUrl.pop()
var indexURL = [...arrUrl, "index.html"]
var kanjiStrokeURL = [...arrUrl, "214kanji.html"]
var practiceKanjiURL = [...arrUrl,"practice_kanji_stroke.html"]
var lesson = [...arrUrl,"lesson.html"]
document.getElementById("alphabet-url").href = indexURL.join("/")
document.getElementById("214kanji-url").href = kanjiStrokeURL.join("/")
document.getElementById("practice-kanji-stroke").href = practiceKanjiURL.join("/")
document.getElementById("lesson").href = lesson.join("/")