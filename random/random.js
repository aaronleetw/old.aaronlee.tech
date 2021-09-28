var listSel = 8; // 8: 9P 9: 9 H   |  0:customize //
var modeSel = 1; // 1:Single  |  0:wholeList //
function changeMode() {
    var e = document.getElementById("modeSel");
    let v = e.value;
    if (v == "single") modeSel = 1;
    else modeSel = 0;
    showHide_Interval();
}
function changeType() {
    let e = document.getElementById("listSel");
    let v = e.value;
    if (v == "8p") listSel = 8;
    if (v == "9h") listSel = 9;
    else listSel = 0;
    showHide_Customize();
}
function showHide_Customize() {
    var x = document.getElementById("customizeMenu");
    if (listSel == 0) {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
function showHide_Interval() {
    var x = document.getElementById("intervalMenu");
    if (modeSel == 0) {
        x.style.display = "flex";
    } else {
        x.style.display = "none";
    }
}
function getList() {
    var list = [];
    if (listSel == 9) {
        for (var i = 0; i < 5; i++) list.push(i + 1);
        for (var i = 6; i < 15; i++) list.push (i + 1);
        for (var i = 16; i < 32; i++) list.push(i + 1);
    } else if (listSel == 8) {
        for (var i = 0; i < 7; i++) list.push(i+1);
        for (var i = 8; i < 34; i++) list.push(i+1);
    } else if (listSel == 0) {
        var startVal = document.getElementById("startVal").value;
        var endVal = document.getElementById("endVal").value;
        for (var i = parseInt(startVal); i <= parseInt(endVal); i++) {
            list.push(i);
        }
    }
    return list;
}
function randomEveryone() {
    var list = getList();
    let listLen = list.length;
    var ans = [];
    for (var i = 0; i < listLen; i++) {
        let tmp = Math.floor(Math.random() * list.length);
        ans.push(list[tmp]);
        list.splice(tmp, 1);
    }
    return ans;
}
function randomSingle() {
    var list = getList();
    return list[Math.floor(Math.random() * list.length)];
}
function convertToString(inputList, start, end, interval) {
    var string = "";
    string += "[" + (parseInt(start) + 1).toString().padStart(2, "0") + "]";
    if ((parseInt(end) - parseInt(start)) - parseInt(interval) > 0) {
        for (var i = parseInt(start); i < parseInt(interval) + parseInt(start); i++)
            string += " " + parseInt(inputList[i]).toString().padStart(2, "0");
        return string + "<br>" + convertToString(inputList, start + interval, end, interval);
    } else {
        for (var i = start; i < end; i++)
            string += " " + parseInt(inputList[i]).toString().padStart(2, "0");
        return string;
    }
}
function createRandom() {
    let resultOutputPlace = document.getElementById("result");
    if (specialCircumstance(resultOutputPlace)) return;
    if (modeSel == 1) {
        resultOutputPlace.innerHTML = randomSingle();
    }
    else if (modeSel == 0) {
        let list = randomEveryone();
        let res = convertToString(list, 0, list.length, parseInt(document.getElementById("intervalInput").value));
        resultOutputPlace.innerHTML = res;
    }
}
function specialCircumstance(resultOutputPlace) {
    if (listSel == 0 && document.getElementById("startVal").value == "cflist") {
        let lot = ["Aaron", "Cindy", "Kate", "Hiro", "Alvin", "Catherine", "Summer", "Jessica"]
        var output = []
        var outputTxt = "";
        var i = 8;
        while (i > 0) {
            var tmp = Math.floor(Math.random() * 8)
            if (output.indexOf(lot[tmp]) == -1) {
                output.push(lot[tmp])
                i--;
            }
        }
        output.forEach(function (item, index, array) {
            outputTxt += (index + 1) + " : " + item + "<br>"
        })
        resultOutputPlace.innerHTML = outputTxt
        return true;
    }
    if (listSel == 0 && (isNaN(parseInt(document.getElementById("startVal").value)) || isNaN(parseInt(document.getElementById("endVal").value)))) {
        resultOutputPlace.innerHTML = "Please enter an integer. 請輸入整數";
        return true;
    }
    if (listSel == 0 && parseInt(document.getElementById("startVal").value) > parseInt(document.getElementById("endVal").value)) {
        resultOutputPlace.innerHTML = "Start Value cannot be larger than End Value. 起始值不可大於結束值";
        return true;
    }
    return false;
}
