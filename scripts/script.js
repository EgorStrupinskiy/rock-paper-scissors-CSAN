var playerChoice = 0
const playerOptions = ['paper', 'rock', 'scissors'];
const computerOptions = ['paper', 'rock', 'scissors']
var computerChoice = 0
var state = "offline"

let userInfo = {
    userName: '',
    userChoice: '',
    sessionStatus: ''
}

var socket;

document.getElementById("name_button").addEventListener("click", (e) => {
    if (document.getElementById("name").value === '') {
        alert("Please, enter the name");
    } else {
        e.preventDefault()
        socket = new WebSocket("ws://26.192.55.23:8080/websocket")
        state = "online"
        socket.onopen = () => {
            userInfo['sessionStatus'] = 'start';
            userInfo['userName'] = document.getElementById("name").value;
            socket.send(JSON.stringify(userInfo));
            console.log("Socket is open");
        }
        document.getElementById("form").style.display = "none"
        document.getElementById("waiting_page").style.display = "flex"
        document.getElementById("pScore").textContent = "Your score: "
        socket.onmessage = (e) => {
            console.log("Message received");
            userInfo = JSON.parse(e.data);
            if (userInfo['sessionStatus'] === "start") {
                console.log("start message");
                document.getElementById("waiting_page").style.display = "none"
                document.getElementById("game").style.display = "flex"
                document.getElementById("cScore").textContent = userInfo.userName + ": "
            }
            if (userInfo['sessionStatus'] === "game") {
                console.log("game message");
                computerChoice = userInfo['userChoice'];
                document.getElementById("animation1").style.animation = 'example .4s 1'
                document.getElementById("animation2").style.animation = 'example .4s 1'
            }
        }


        socket.onclose = () => {
            console.log("Socket closed");
        }

        //document.getElementById("form").style.display = "none"
        //document.getElementById("game").style.display = "flex"
    }
})

document.getElementById("offline_button").addEventListener("click", (e) => {

    e.preventDefault()

    userInfo['userName'] = "Computer";
    document.getElementById("form").style.display = "none"
    console.log("start offline");
    document.getElementById("pScore").textContent = "Your score: 0"
    document.getElementById("game").style.display = "flex"
    document.getElementById("cScore").textContent = userInfo.userName + ": 0"}
)

function clearBtns() {
    document.getElementById("btn_paper_panel").style.background = "#ffed2b";
    document.getElementById("btn_rock_panel").style.background = "#ffed2b";
    document.getElementById("btn_scissors_panel").style.background = "#ffed2b";
}


document.getElementById("elem1").addEventListener("click", (e) => {
    e.preventDefault()
    clearBtns()
    playerChoice = 0
    document.getElementById("btn_paper_panel").style.background = "#753dc6";
    document.getElementById("btn_paper_panel").style.borderColor = "#fff"
    document.getElementById("game_button").style.display = "block"
})

document.getElementById("elem2").addEventListener("click", (e) => {
    e.preventDefault()
    clearBtns()
    playerChoice = 1
    document.getElementById("btn_rock_panel").style.background = "#753dc6";
    document.getElementById("btn_rock_panel").style.borderColor = "#fff"
    document.getElementById("game_button").style.display = "block"
})

document.getElementById("elem3").addEventListener("click", (e) => {
    e.preventDefault()
    clearBtns()
    playerChoice = 2
    document.getElementById("btn_scissors_panel").style.background = "#753dc6";
    document.getElementById("btn_scissors_panel").style.borderColor = "#fff"
    document.getElementById("game_button").style.display = "block"
})


document.getElementById("game_button").addEventListener("click", (e) => {
    e.preventDefault()
    console.log("game_button event")
    document.getElementById("rounds_left").style.display = "flex"
    document.getElementById("pScore").style.display = "flex"
    document.getElementById("cScore").style.display = "flex"
    document.getElementById("final").style.display = "flex"
    document.getElementById("animation1").style.display = "block"
    document.getElementById("animation2").style.display = "block"
    document.getElementById("hands_and_btn").style.display = "none"
    document.getElementById("repeat_button").style.display = "none"

    var lefthand = document.getElementById("animation1")
    var righthand = document.getElementById("animation2")
    document.getElementById("left_hand").src = `./indexAssets/hands/leftWait.png`;
    document.getElementById("right_hand").src = `./indexAssets/hands/rightWait.png`;
    document.getElementById('result').textContent = "Wait...";
    if (state === "offline") {
        lefthand.style.animation = 'example .4s 3'
        righthand.style.animation = 'example .4s 3'
    } else {
        lefthand.style.animation = 'example .4s infinite'
        righthand.style.animation = 'example .4s infinite'
    }

})

document.getElementById("repeat_button").addEventListener("click", (e) => {
    e.preventDefault()
    document.getElementById("final").style.display = "none"
    document.getElementById("animation1").style.display = "none"
    document.getElementById("animation2").style.display = "none"
    document.getElementById("hands_and_btn").style.display = "none"
    document.getElementById("repeat_button").style.display = "none"

    document.getElementById("hands_and_btn").style.display = "block"

})

document.getElementById("leave_button").addEventListener("click", (e) => {
    e.preventDefault()
    window.location.reload();
})

const game = () => {
    let playerScore = 0;
    let computerScore = 0;
    let moves = 0;


    document.getElementById("animation1").addEventListener('animationend', function (e) {
        document.getElementById("left_hand").src = `./indexAssets/hands/${playerOptions[playerChoice]}Left.png`;
        document.getElementById("left_hand").style.transform = 'rotate(30deg)';
        document.getElementById("right_hand").src = `./indexAssets/hands/${computerChoice}Right.png`;
        document.getElementById("right_hand").style.transform = 'rotate(-30deg)';
        winner(playerOptions[playerChoice], computerChoice)
    });


    // Function to
    const playGame = () => {

        // Function to start playing game

        document.getElementById("game_button").addEventListener('click', function () {
            console.log("playerGame game_button event")
            const movesLeft = document.getElementById('rounds_left');
            moves++;
            movesLeft.textContent = `Rounds Left: ${10 - moves}`;
            if (state === "online") {
                userInfo['sessionStatus'] = 'game';
                userInfo['userChoice'] = playerOptions[playerChoice];
                socket.send(JSON.stringify(userInfo));
            } else {
                const choiceNumber = Math.floor(Math.random() * 3);
                computerChoice = computerOptions[choiceNumber];
            }
            // Function to check who wins


            // Calling gameOver function after 10 moves
            if (moves == 10) {
                gameOver(playerOptions, movesLeft);
            }
        })
    }



    // Function to decide winner

    const winner = (player, computer) => {
        const result = document.getElementById('result');
        const playerScoreBoard = document.getElementById('pScore');
        const opponentScoreBoard = document.getElementById('cScore');
        if (player === computer) {
            result.textContent = 'Tie'
        }
        else if (player == 'rock') {
            if (computer == 'paper') {
                result.textContent = 'Opponent Won';
                computerScore++;
            } else {
                result.textContent = 'Player Won'
                playerScore++;
            }
        }
        else if (player == 'scissors') {
            if (computer == 'rock') {
                result.textContent = 'Opponent Won';
                computerScore++;
            } else {
                result.textContent = 'Player Won';
                playerScore++;
            }
        }
        else if (player == 'paper') {
            if (computer == 'scissors') {
                result.textContent = 'Opponent Won';
                computerScore++;
            } else {
                result.textContent = 'Player Won';
                playerScore++;
            }
        }
        opponentScoreBoard.textContent = `${userInfo['userName']}: ${computerScore}`;
        playerScoreBoard.textContent = `Your score: ${playerScore}`;
        document.getElementById("repeat_button").style.display = "flex";
    }


    const gameOver = (playerOptions, movesLeft) => {

        const result1 = document.getElementById("final_title");
        result1.style.display = "flex"
        document.getElementById("result").style.display = "none"
        document.getElementById("animation1").style.display = "none"
        document.getElementById("animation2").style.display = "none"
        document.getElementById("hands_and_btn").style.display = "none"
        if (playerScore > computerScore) {
            result1.innerText = 'You Won The Game'
            result1.style.color = '#308D46';
        }
        else if (playerScore < computerScore) {
            result1.innerText = 'You Lost The Game';
            result1.style.color = 'red';
        }
        else {
            result1.innerText = 'Tie';
        }
        document.getElementById("repeat_button").innerText = 'Restart';
        document.getElementById("repeat_button").addEventListener('click', () => {
            window.location.reload();
        })
    }


    // Calling playGame function inside game
    playGame();

}

// Calling the game function
game();