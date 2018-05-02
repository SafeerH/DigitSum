var historyArr = [];
var historyCount = 10;
var historyOutputEl = document.querySelector('#history-output');

setOutputHistoryFromLs();
function onSubmit($event) {
    var input = document.getElementById('inputNumber');
    if (!input.value) {
        return;
    }
    var output = document.getElementById('output');
    var num = Number(input.value);
    var val = digitSum(num);
    output.innerHTML = val;

    if (historyArr.indexOf(num) == -1) {
        historyArr.unshift(num);
        addToHistoryOutput(num, val);
        addToLs(num, val);
    }
}
function digitSum(number) {
    return number == 0 ? 0 : (number + 8) % 9 + 1
}

function addToHistoryOutput(num, val) {
    var t = document.querySelector('#ls-item-tmpl');
    t.content.querySelector('.ls-num').innerHTML = num;
    t.content.querySelector('.ls-num-val').innerHTML = val;

    var clone = document.importNode(t.content, true);
    historyOutputEl.insertBefore(clone, historyOutputEl.firstChild);
}

function getLsHistory() {
    var lsHistory;
    try {
        lsHistory = JSON.parse(localStorage.getItem('history')) || [];
    } catch (e) {
        lsHistory = [];
    }
    return lsHistory;
}

function addToLs(num, val) {
    var lsHistory = getLsHistory();
    if (lsHistory.some(x => x.num == num)) {
        return;
    }
    lsHistory.unshift({ num: num, val: val });
    if (lsHistory.length > historyCount) {
        lsHistory.length = historyCount;
    }
    localStorage.setItem('history', JSON.stringify(lsHistory));
}

function setOutputHistoryFromLs() {
    historyOutputEl.innerHTML = "";
    var lsHistory = getLsHistory();
    lsHistory.reverse().forEach(i => {
        addToHistoryOutput(i.num, i.val);
    });
}

function clearLsHistory() {
    localStorage.setItem('history', JSON.stringify([]));
    setOutputHistoryFromLs();
    historyArr.length = 0;
}
