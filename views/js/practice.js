document.getElementById("layout_pactice").innerHTML = `
<div class="container">
    <div class="show">
        <div class="target" id="show-target">---</div>
    
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