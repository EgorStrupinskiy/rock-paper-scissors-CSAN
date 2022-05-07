// function changeColor(newColor) {
//     var elem = document.getElementsByClassName("game__btn_paper input");
//     elem.style.background.changeColor(newColor);
// }

document.getElementById("name_button").addEventListener("click", (e) => {
    if (document.getElementById("name").value === '') {
        alert("Please, enter the name");
    } else {
        e.preventDefault()
        document.getElementById("form").style.display = "none"
        document.getElementById("game").style.display = "flex"
    }})

    function clearBtns(){
        document.getElementById("btn_paper_panel").style.background = "#ffed2b";
        document.getElementById("btn_rock_panel").style.background = "#ffed2b";
        document.getElementById("btn_scissors_panel").style.background = "#ffed2b";
    }

document.getElementById("game_button").addEventListener("click", (e) => {
    e.preventDefault()
    document.getElementById("final").style.display = "flex"
    document.getElementById("animation1").style.display = "block"
    document.getElementById("animation2").style.display = "block"
    document.getElementById("hands_and_btn").style.display = "none"
})


document.getElementById("elem1").addEventListener("click", (e) => {
    e.preventDefault()
    clearBtns()
    document.getElementById("btn_paper_panel").style.background = "#753dc6";
    document.getElementById("btn_paper_panel").style.borderColor = "#fff"
    document.getElementById("game_button").style.display = "block"
})

document.getElementById("elem2").addEventListener("click", (e) => {
    e.preventDefault()
    clearBtns()
    document.getElementById("btn_rock_panel").style.background = "#753dc6";
    document.getElementById("btn_rock_panel").style.borderColor = "#fff"
    document.getElementById("game_button").style.display = "block"
})

document.getElementById("elem3").addEventListener("click", (e) => {
    e.preventDefault()
    clearBtns()
    document.getElementById("btn_scissors_panel").style.background = "#753dc6";
    document.getElementById("btn_scissors_panel").style.borderColor = "#fff"
    document.getElementById("game_button").style.display = "block"
})