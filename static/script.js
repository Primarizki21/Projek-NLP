function getIdealGridSize(questions) {
  let maxRow = 0, maxCol = 0;

  questions.forEach(q => {
    let endRow = q.row;
    let endCol = q.col;

    if (q.direction === "across") {
      endCol = q.col + q.answer.length - 1;
    } else {
      endRow = q.row + q.answer.length - 1;
    }

    maxRow = Math.max(maxRow, q.row, endRow);
    maxCol = Math.max(maxCol, q.col, endCol);
  });

  return Math.max(maxRow, maxCol) + 1;
}

window.onload = () => {
  const crossword = document.getElementById("crossword");
  const gridContainer = document.querySelector(".crossword-grid");
  const gridSize = getIdealGridSize(questions);

  gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 40px)`;
  gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 40px)`;
  
  // Buat grid kosong
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      let div = document.createElement("div");
      div.classList.add("cell", "empty"); // default kosong
      div.dataset.row = r;
      div.dataset.col = c;
      crossword.appendChild(div);
    }
  }

  // Isi grid sesuai soal
  questions.forEach(q => {
    let row = q.row;
    let col = q.col;
    for (let i = 0; i < q.answer.length; i++) {
      let cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
      if (cell) {
        cell.classList.remove("empty"); // hilangkan tanda kosong
        if (!cell.classList.contains("empty") && !cell.querySelector("input")) {
          let input = document.createElement("input");
          input.maxLength = 1;
          cell.appendChild(input);
        }
        if (i === 0) {
          cell.dataset.number = q.number;
          cell.classList.add("number");
        }
      }
      if (q.direction === "across") {
        col++;
      } else {
        row++;
      }
    }
  });
};

function checkAnswers() {
  let correct = 0;
  questions.forEach(q => {
    let row = q.row;
    let col = q.col;
    let answer = "";
    for (let i = 0; i < q.answer.length; i++) {
      let cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"] input`);
      if (cell) {
        answer += cell.value.toLowerCase();
      }
      if (q.direction === "across") {
        col++;
      } else {
        row++;
      }
    }
    if (answer === q.answer.toLowerCase()) {
      correct++;
    }
  });
  alert(`Benar ${correct} dari ${questions.length} soal`);
}
