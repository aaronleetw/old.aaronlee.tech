function str(x) {
    return x.toString();
}

function compare(guess, ans) {
    var a = 0;
    var b = 0;
    for (var x = 0; x < 4; x++) {
        if (guess[x] == ans[x]) a++;
        else if (guess.indexOf(ans[x]) == 1) b++;
    }
    var response = str(a) + 'a' + str(b) + 'b';
    return response;
}
function CheckValid(num) {
    var number = 0;
    if (num.length != 4) return false;
    for (var x = 0; x < 11; x++) {
        if (num.indexOf(str(x)) == 1) number++;
        else if (num.indexOf(str(x)) > 1) return false;
    }
    if (number != 4) return false;
    return true;
}
function HintValid(hint) {
    try {
        // int(hint[0])>4 or int(hint[0])<0 or int(hint[2])>4 or int(hint[2])<0:
        if (parseInt(hint[0]) > 4 || parseInt(hint[0]) < 0 || parseInt(hint[2]) > 4 || parseInt(hint2) < 0)
            return false;
    } catch (e) {
        return false;
    } if (hint[1] != 'a' || hint[3] != 'b') return false;
    return true;
}
function CheckerMode() {
    var ans = document.getElementById("answer").value;
    while (CheckValid(ans) == false) {
        document.getElementById("result").innerHTML = "Invalid";
    }
}