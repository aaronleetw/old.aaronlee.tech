var apiKey = "60ae4552318a330b62f58746";
var idU;
var guessTimes = 0;
var gameCode;
var answer;
var host_client; // true: client  |   false: host //
var get = {
    "async": true,
    "crossDomain": true,
    "url": "https://abgametest1-573e.restdb.io/rest/game",
    "method": "GET",
    "headers": {
        "content-type": "application/json",
        "x-apikey": apiKey,
        "cache-control": "no-cache"
    }
};
var post = (jsonData) => {
    return {
        "async": true,
        "crossDomain": true,
        "url": "https://abgametest1-573e.restdb.io/rest/game",
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "x-apikey": apiKey,
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(jsonData)
    }
};
var put = (objectID, jsonData) => {
    return {
        "async": true,
        "crossDomain": true,
        "url": "https://abgametest1-573e.restdb.io/rest/game/" + objectID,
        "method": "PUT",
        "headers": {
            "content-type": "application/json",
            "x-apikey": apiKey,
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(jsonData)
    };
};
var del = (objectID) => {
    return {
        "async": true,
        "crossDomain": true,
        "url": "https://abgametest1-573e.restdb.io/rest/game/" + objectID.toString(),
        "method": "DELETE",
        "headers": {
            "content-type": "application/json",
            "x-apikey": apiKey,
            "cache-control": "no-cache"
        }
    }
};


function initGame(ans) {
    answer = ans.toString(); guessTimes = 0;
    document.getElementById("game").innerHTML = "Game " + gameCode.toString() + " started.";
    document.getElementById("guessTimesView").innerHTML = "Guess Times: 0";
    document.getElementById("sneakpeek").innerHTML = "sneakpeek answer: " + answer.toString();
    document.getElementById("guessOptionsMenu").style.display = "block";
    document.getElementById("waitingForClient").style.display = "none";
    document.getElementById("startSessionMenu").style.display = "none";
    document.getElementById("result").innerHTML = "";
}

function finishGame() {
    document.getElementById("waitingForFinish").style.display = "block";
    document.getElementById("guessOptionsMenu").style.display = "none";
    getAndUpdateDB(true);
}

function getAndUpdateDB(win) {
    if (host_client) {
        // CLIENT //
        $.ajax(get).done(function (response) {
            for (var i = 0; i < response.length; i++) {
                console.log(response[i]._id);
                if (response[i]._id == idU) {
                    var resVal = response[i];
                    resVal['clientGuess'] = guessTimes;
                    resVal['clientWin'] = win;
                    $.ajax(put(idU, resVal)).done(function (responsePUT) {
                        console.log("PUT_CLIENTGUESS: ");
                        console.log(responsePUT);
                        try {
                            if (resVal['hostWin'] == true && resVal['hostGuess'] < guessTimes) document.getElementById("result").innerHTML = "You Lost!";
                            else if (resVal['clientWin'] == true && guessTimes < resVal['hostGuess']) document.getElementById("result").innerHTML = "You Win!";
                            else if (resVal['hostWin'] == true && resVal['clientWin'] == true) {
                                if (resVal['hostGuess'] > resVal['clientGuess'])
                                    document.getElementById("result").innerHTML = "You Win!";
                                else if (resVal['clientGuess'] > resVal['hostGuess'])
                                    document.getElementById("result").innerHTML = "You Lost!";
                                else document.getElementById("result").innerHTML = "Draw";
                            }
                        } catch { }
                    });
                }
            }
        });
    }
    else {
        // HOST //
        $.ajax(get).done(function (response) {
            for (var i = 0; i < response.length; i++) {
                if (response[i]._id == idU) {
                    var resVal = response[i];
                    resVal['hostGuess'] = guessTimes;
                    resVal['hostWin'] = win;
                    $.ajax(put(idU, resVal)).done(function (responsePUT) {
                        console.log("PUT_HOSTGUESS: ");
                        console.log(responsePUT);
                        try {
                            if (resVal['clientWin'] == true && resVal['clientGuess'] < guessTimes) document.getElementById("result").innerHTML = "You Lost!";
                            else if (resVal['hostWin'] == true && guessTimes < resVal['clientGuess']) document.getElementById("result").innerHTML = "You Win!";
                            else if (resVal['hostWin'] == true && resVal['clientWin'] == true) {
                                if (resVal['hostGuess'] > resVal['clientGuess'])
                                    document.getElementById("result").innerHTML = "You Lost!";
                                else if (resVal['clientGuess'] > resVal['hostGuess'])
                                    document.getElementById("result").innerHTML = "You Win!";
                                else document.getElementById("result").innerHTML = "Draw";
                            }
                        } catch { }
                    });
                }
            }
        });
    }
}

function Guess() {
    var A = 0, B = 0;
    if (!evalAns(document.getElementById("yourGuess").value)) { document.getElementById("result").innerHTML = "Invalid Guess"; return; }
    guessTimes++;
    document.getElementById("guessTimesView").innerHTML = "Guess Times: " + guessTimes;
    var guess = document.getElementById("yourGuess").value.toString();
    if (guess === answer) {
        document.getElementById("result").innerHTML = "4A0B: CORRECT!";
        finishGame();
        return;
    }
    for (var i = 0; i < 4; i++) {
        if (guess[i] == answer[i]) A++;
        else for (var j = 0; j < 4; j++) {
            if (guess[i] == answer[j]) { B++; break; }
        }
    }
    document.getElementById("result").innerHTML = A + "A" + B + "B";
    getAndUpdateDB(false);
    return;
}

function evalAns(ans) {
    try {
        let s = parseInt(ans).toString();
        if (s.length != 4) { return false; }
        for (var i = 0; i < 4; i++)
            for (var j = i + 1; j < 4; j++)
                if (s[i] == s[j])
                    return false;
        return true;
    } catch (e) {
        return false;
    }
}

function Refresh() {
    document.getElementById("result").innerHTML = "Loading...";
    $.ajax(get).done(function (response) {
        for (var i = 0; i < response.length; i++) {
            try {
                if (response[i]._id == idU && response[i].startGame == true) {
                    initGame(response[i].clientVal);
                }
            } catch { }
        }
    });
}

function JoinGame() {
    document.getElementById("result").innerHTML = "Loading...";
    let ans = document.getElementById("yourAnswer").value;
    var found = false;
    if (!evalAns(ans)) { document.getElementById("result").innerHTML = "Invalid Answer"; return; }
    $.ajax(get).done(function (response) {
        for (var i = 0; i < response.length; i++) {
            var responseVal = response[i];
            console.log(responseVal);
            if (responseVal.startGame == false && responseVal.gameCode == parseInt(document.getElementById("gameCode").value)) {
                gameCode = parseInt(document.getElementById("gameCode").value);
                document.getElementById("game").innerHTML = "Joined Game " + gameCode;
                found = true;
                responseVal.clientVal = parseInt(ans);
                responseVal.startGame = true;
                console.log("_id:" + responseVal._id + "\nresponseVal:" + JSON.stringify(responseVal));
                $.ajax(put(responseVal._id, responseVal)).done(function (responsePut) {
                    idU = responseVal._id;
                    host_client = true;
                    initGame(responsePut.hostVal);
                });
                break;
            }
        }
    });
}

function CreateNewGame() {
    let ans = document.getElementById("yourAnswer").value;
    document.getElementById("result").innerHTML = "Loading...";
    if (!evalAns(ans)) { document.getElementById("result").innerHTML = "Invalid Answer"; return; }
    $.ajax(post({ "hostVal": parseInt(ans), "startGame": false })).done(function (response) {
        idU = response._id;
        host_client = false;
        document.getElementById("game").innerHTML = "Created Game " + response.gameCode + ".";
        gameCode = response.gameCode;
        document.getElementById("startSessionMenu").style.display = "none";
        document.getElementById("waitingForClient").style.display = "block";
    });
}