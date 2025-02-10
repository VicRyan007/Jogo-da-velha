document.addEventListener("DOMContentLoaded", function() {
    // Seleção dos elementos
    let x = document.querySelector(".x");
    let o = document.querySelector(".o");
    let boxes = document.querySelectorAll(".box");
    let buttons = document.querySelectorAll("#buttons-container button");
    let messageContainer = document.querySelector("#message");
    let messageText = document.querySelector("#message p");
    let secondPlayer; // Modo selecionado: "2-players" ou "ai-player"
  
    // Contadores de jogadas
    let player1 = 0;
    let player2 = 0;
  
    // --- Seleção do modo de jogo ---
    buttons.forEach(function(btn) {
      btn.addEventListener("click", function() {
        secondPlayer = this.getAttribute("id");
        // Oculta os botões de seleção
        document.getElementById("buttons-container").style.display = "none";
        // Após 500ms, remove o id "hide" e o atributo inline "display: none" para exibir o tabuleiro
        setTimeout(function() {
          let board = document.getElementById("hide");
          if (board) {
            board.removeAttribute("id"); // remove o id "hide"
            board.style.display = "";     // remove o inline display: none
          }
        }, 500);
      });
    });
  
    // --- Evento de clique nos boxes (mantém a lógica original) ---
    boxes.forEach(function(box) {
      box.addEventListener("click", function() {
        // Permite jogada apenas se o box estiver vazio
        if (this.children.length === 0) {
          let el = checkEl(player1, player2);
          let cloneEl = el.cloneNode(true);
          this.appendChild(cloneEl);
  
          // Computa a jogada
          if (player1 === player2) {
            player1++;
            if (secondPlayer === "ai-player") {
              checkWinCondition();
              if (!isBoardFull()) {
                computerPlay();
              }
            }
          } else {
            player2++;
          }
          checkWinCondition();
        }
      });
    });
  
    // Função para definir qual símbolo jogar
    function checkEl(p1, p2) {
      return (p1 === p2) ? x : o;
    }
  
    // --- Função para verificar as condições de vitória ---
    function checkWinCondition() {
      let b1 = document.getElementById("block-1");
      let b2 = document.getElementById("block-2");
      let b3 = document.getElementById("block-3");
      let b4 = document.getElementById("block-4");
      let b5 = document.getElementById("block-5");
      let b6 = document.getElementById("block-6");
      let b7 = document.getElementById("block-7");
      let b8 = document.getElementById("block-8");
      let b9 = document.getElementById("block-9");
  
      // Horizontal 1
      if (b1.children.length > 0 && b2.children.length > 0 && b3.children.length > 0) {
        let b1Child = b1.children[0].className;
        let b2Child = b2.children[0].className;
        let b3Child = b3.children[0].className;
        if (b1Child === "x" && b2Child === "x" && b3Child === "x") {
          declareWinner("x");
          return;
        } else if (b1Child === "o" && b2Child === "o" && b3Child === "o") {
          declareWinner("o");
          return;
        }
      }
      // Horizontal 2
      if (b4.children.length > 0 && b5.children.length > 0 && b6.children.length > 0) {
        let b4Child = b4.children[0].className;
        let b5Child = b5.children[0].className;
        let b6Child = b6.children[0].className;
        if (b4Child === "x" && b5Child === "x" && b6Child === "x") {
          declareWinner("x");
          return;
        } else if (b4Child === "o" && b5Child === "o" && b6Child === "o") {
          declareWinner("o");
          return;
        }
      }
      // Horizontal 3
      if (b7.children.length > 0 && b8.children.length > 0 && b9.children.length > 0) {
        let b7Child = b7.children[0].className;
        let b8Child = b8.children[0].className;
        let b9Child = b9.children[0].className;
        if (b7Child === "x" && b8Child === "x" && b9Child === "x") {
          declareWinner("x");
          return;
        } else if (b7Child === "o" && b8Child === "o" && b9Child === "o") {
          declareWinner("o");
          return;
        }
      }
      // Vertical 1
      if (b1.children.length > 0 && b4.children.length > 0 && b7.children.length > 0) {
        let b1Child = b1.children[0].className;
        let b4Child = b4.children[0].className;
        let b7Child = b7.children[0].className;
        if (b1Child === "x" && b4Child === "x" && b7Child === "x") {
          declareWinner("x");
          return;
        } else if (b1Child === "o" && b4Child === "o" && b7Child === "o") {
          declareWinner("o");
          return;
        }
      }
      // Vertical 2
      if (b2.children.length > 0 && b5.children.length > 0 && b8.children.length > 0) {
        let b2Child = b2.children[0].className;
        let b5Child = b5.children[0].className;
        let b8Child = b8.children[0].className;
        if (b2Child === "x" && b5Child === "x" && b8Child === "x") {
          declareWinner("x");
          return;
        } else if (b2Child === "o" && b5Child === "o" && b8Child === "o") {
          declareWinner("o");
          return;
        }
      }
      // Vertical 3
      if (b3.children.length > 0 && b6.children.length > 0 && b9.children.length > 0) {
        let b3Child = b3.children[0].className;
        let b6Child = b6.children[0].className;
        let b9Child = b9.children[0].className;
        if (b3Child === "x" && b6Child === "x" && b9Child === "x") {
          declareWinner("x");
          return;
        } else if (b3Child === "o" && b6Child === "o" && b9Child === "o") {
          declareWinner("o");
          return;
        }
      }
      // Diagonal principal
      if (b1.children.length > 0 && b5.children.length > 0 && b9.children.length > 0) {
        let b1Child = b1.children[0].className;
        let b5Child = b5.children[0].className;
        let b9Child = b9.children[0].className;
        if (b1Child === "x" && b5Child === "x" && b9Child === "x") {
          declareWinner("x");
          return;
        } else if (b1Child === "o" && b5Child === "o" && b9Child === "o") {
          declareWinner("o");
          return;
        }
      }
      // Diagonal secundária
      if (b3.children.length > 0 && b5.children.length > 0 && b7.children.length > 0) {
        let b3Child = b3.children[0].className;
        let b5Child = b5.children[0].className;
        let b7Child = b7.children[0].className;
        if (b3Child === "x" && b5Child === "x" && b7Child === "x") {
          declareWinner("x");
          return;
        } else if (b3Child === "o" && b5Child === "o" && b7Child === "o") {
          declareWinner("o");
          return;
        }
      }
      // Verifica se deu velha (empate)
      let counter = 0;
      boxes.forEach(function(box) {
        if (box.children.length > 0) {
          counter++;
        }
      });
      if (counter === boxes.length) {
        declareWinner("Deu velha!");
      }
    }
  
    // --- Função para declarar o vencedor, atualizar o placar e reiniciar o jogo ---
    function declareWinner(winner) {
      let scoreboardX = document.querySelector("#scoreboard-1");
      let scoreboardY = document.querySelector("#scoreboard-2");
      let msg = "";
      if (winner === "x") {
        scoreboardX.textContent = parseInt(scoreboardX.textContent) + 1;
        msg = "O jogador 1 venceu!";
      } else if (winner === "o") {
        scoreboardY.textContent = parseInt(scoreboardY.textContent) + 1;
        msg = "O jogador 2 venceu!";
      } else {
        msg = "Deu velha!";
      }
      messageText.textContent = msg;
      messageContainer.classList.remove("hide");
      setTimeout(function() {
        messageContainer.classList.add("hide");
      }, 1300);
      // Reinicia os contadores e remove os símbolos do tabuleiro
      player1 = 0;
      player2 = 0;
      boxes.forEach(function(box) {
        if (box.children.length > 0) {
          box.removeChild(box.children[0]);
        }
      });
    }
  
    // --- Função da jogada da IA (contra IA) ---
    function computerPlay() {
      let emptyBoxes = [];
      boxes.forEach(function(box) {
        if (box.children.length === 0) {
          emptyBoxes.push(box);
        }
      });
      if (emptyBoxes.length > 0) {
        let randomIndex = Math.floor(Math.random() * emptyBoxes.length);
        let chosenBox = emptyBoxes[randomIndex];
        let cloneO = o.cloneNode(true);
        chosenBox.appendChild(cloneO);
        player2++; // Incrementa o contador da jogada da IA
        checkWinCondition();
      }
    }
  
    // Função auxiliar para verificar se o tabuleiro está cheio
    function isBoardFull() {
      let counter = 0;
      boxes.forEach(function(box) {
        if (box.children.length > 0) {
          counter++;
        }
      });
      return counter === boxes.length;
    }
  });
  