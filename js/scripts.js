let x = document.querySelector(".x")
let o = document.querySelector(".o")

let boxes= document.querySelectorAll(".box")
let button = document.querySelectorAll("#buttons-container button")
let messageContainer = document.querySelector("#message")
let messageText = document.querySelector("#message p")
let secondPlayer

// Contador de jogadas

let player1 = 0
let player2 = 0

// Adicionando evento de click aos boxes

for(let i = 0; i< boxes.length; i++){
    boxes[i].addEventListener("click", () => {

        let el

        if (player1 == player2){
            //x
            el = x
        } else {
            //o
            el = o
        }

        let cloneEl = el.cloneNode(true)

        this.appendChild(cloneEl)


        //computar jogada
        if(player1 == player2){
            player1++
        }else {
            player2++
        }

    })
}

