document.addEventListener("DOMContentLoaded", function() {
    // Seleção dos elementos
    let x = document.querySelector(".x");
    let o = document.querySelector(".o");
    let boxes = document.querySelectorAll(".box");
    let buttons = document.querySelectorAll("#buttons-container button");
    let messageContainer = document.querySelector("#message");
    let messageText = document.querySelector("#message p");
    let secondPlayer; // Modo selecionado: "2-players" ou "ai-player"
  
    // Contadores de jogadas e flag para controlar o fim do jogo
    let player1 = 0;
    let player2 = 0;
    let winnerDeclared = false;
  
    // --- Seleção do modo de jogo ---
    buttons.forEach(function(btn) {
      btn.addEventListener("click", function() {
        secondPlayer = this.getAttribute("id");
        // Oculta os botões de seleção
        document.getElementById("buttons-container").style.display = "none";
        // Após 500ms, remove o id "hide" e o atributo inline para exibir o tabuleiro
        setTimeout(function() {
          let board = document.getElementById("hide");
          if (board) {
            board.removeAttribute("id");
            board.style.display = "";
          }
        }, 500);
      });
    });
  
    // --- Evento de clique nos boxes ---
    boxes.forEach(function(box) {
      box.addEventListener("click", function() {
        if (winnerDeclared) return; // Impede novas jogadas se o jogo já terminou
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
              if (!isBoardFull() && !winnerDeclared) {
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
  
    // Função que define qual símbolo jogar
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
        let c1 = b1.children[0].className;
        let c2 = b2.children[0].className;
        let c3 = b3.children[0].className;
        if (c1 === c2 && c2 === c3) {
          declareWinner(c1);
          return;
        }
      }
      // Horizontal 2
      if (b4.children.length > 0 && b5.children.length > 0 && b6.children.length > 0) {
        let c4 = b4.children[0].className;
        let c5 = b5.children[0].className;
        let c6 = b6.children[0].className;
        if (c4 === c5 && c5 === c6) {
          declareWinner(c4);
          return;
        }
      }
      // Horizontal 3
      if (b7.children.length > 0 && b8.children.length > 0 && b9.children.length > 0) {
        let c7 = b7.children[0].className;
        let c8 = b8.children[0].className;
        let c9 = b9.children[0].className;
        if (c7 === c8 && c8 === c9) {
          declareWinner(c7);
          return;
        }
      }
      // Vertical 1
      if (b1.children.length > 0 && b4.children.length > 0 && b7.children.length > 0) {
        let c1 = b1.children[0].className;
        let c4 = b4.children[0].className;
        let c7 = b7.children[0].className;
        if (c1 === c4 && c4 === c7) {
          declareWinner(c1);
          return;
        }
      }
      // Vertical 2
      if (b2.children.length > 0 && b5.children.length > 0 && b8.children.length > 0) {
        let c2 = b2.children[0].className;
        let c5 = b5.children[0].className;
        let c8 = b8.children[0].className;
        if (c2 === c5 && c5 === c8) {
          declareWinner(c2);
          return;
        }
      }
      // Vertical 3
      if (b3.children.length > 0 && b6.children.length > 0 && b9.children.length > 0) {
        let c3 = b3.children[0].className;
        let c6 = b6.children[0].className;
        let c9 = b9.children[0].className;
        if (c3 === c6 && c6 === c9) {
          declareWinner(c3);
          return;
        }
      }
      // Diagonal principal
      if (b1.children.length > 0 && b5.children.length > 0 && b9.children.length > 0) {
        let c1 = b1.children[0].className;
        let c5 = b5.children[0].className;
        let c9 = b9.children[0].className;
        if (c1 === c5 && c5 === c9) {
          declareWinner(c1);
          return;
        }
      }
      // Diagonal secundária
      if (b3.children.length > 0 && b5.children.length > 0 && b7.children.length > 0) {
        let c3 = b3.children[0].className;
        let c5 = b5.children[0].className;
        let c7 = b7.children[0].className;
        if (c3 === c5 && c5 === c7) {
          declareWinner(c3);
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
      if (counter === boxes.length && !winnerDeclared) {
        declareWinner("Deu velha!");
      }
    }
  
    // --- Função para declarar o vencedor, atualizar o placar e reiniciar o jogo ---
    function declareWinner(winner) {
      if (winnerDeclared) return;
      winnerDeclared = true;
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
      // Aguarda 3000ms para esconder a mensagem e reiniciar o tabuleiro
      setTimeout(function() {
        messageContainer.classList.add("hide");
        // Reinicia os contadores e limpa o tabuleiro
        player1 = 0;
        player2 = 0;
        boxes.forEach(function(box) {
          if (box.children.length > 0) {
            box.removeChild(box.children[0]);
          }
        });
        winnerDeclared = false;
      }, 700);
    }
  
    // --- Função da jogada da IA ---
    function computerPlay() {
      if (winnerDeclared) return;
      let emptyBoxes = [];
      boxes.forEach(function(box) {
        if (box.children.length === 0) {
          emptyBoxes.push(box);
        }
      });
      if (emptyBoxes.length > 0 && !winnerDeclared) {
        let randomIndex = Math.floor(Math.random() * emptyBoxes.length);
        let chosenBox = emptyBoxes[randomIndex];
        let cloneO = o.cloneNode(true);
        chosenBox.appendChild(cloneO);
        player2++;
        checkWinCondition();
      }
    }
  
    // Função auxiliar para verificar se o tabuleiro está cheio
    function isBoardFull() {
      let counter = 0;
      boxes.forEach(function(box) {
        if (box.children.length > 0) counter++;
      });
      return counter === boxes.length;
    }
  });
  