const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;
const COLOR_MAPPING = [
    'red',
    'orange',
    'green',
    'purple',
    'blue',
    'cyan',
    'yellow',
    'white',
];
const WHITE_COLOR_ID = 7;
const KEY_CODES = {
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
};
const BRICK_LAYOUT = [
  [
    [
      [1, 7, 7],
      [1, 1, 1],
      [7, 7, 7],
    ],
    [
      [7, 1, 1],
      [7, 1, 7],
      [7, 1, 7],
    ],
    [
      [7, 7, 7],
      [1, 1, 1],
      [7, 7, 1],
    ],
    [
      [7, 1, 7],
      [7, 1, 7],
      [1, 1, 7],
    ],
  ], 
  [
    [
      [7, 1, 7],
      [7, 1, 7],
      [7, 1, 1],
    ],
    [
      [7, 7, 7],
      [1, 1, 1],
      [1, 7, 7],
    ],
    [
      [1, 1, 7],
      [7, 1, 7],
      [7, 1, 7],
    ],
    [
      [7, 7, 1],
      [1, 1, 1],
      [7, 7, 7],
    ],
  ],
  [
    [
      [1, 7, 7],
      [1, 1, 7],
      [7, 1, 7],
    ],
    [
      [7, 1, 1],
      [1, 1, 7],
      [7, 7, 7],
    ],
    [
      [7, 1, 7],
      [7, 1, 1],
      [7, 7, 1],
    ],
    [
      [7, 7, 7],
      [7, 1, 1],
      [1, 1, 7],
    ],
  ],
  [
    [
      [7, 1, 7],
      [1, 1, 7],
      [1, 7, 7],
    ],
    [
      [1, 1, 7],
      [7, 1, 1],
      [7, 7, 7],
    ],
    [
      [7, 7, 1],
      [7, 1, 1],
      [7, 1, 7],
    ],
    [
      [7, 7, 7],
      [1, 1, 7],
      [7, 1, 1],
    ],
  ],
  [
    [
      [7, 7, 7, 7],
      [1, 1, 1, 1],
      [7, 7, 7, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 1, 7],
      [7, 7, 1, 7],
      [7, 7, 1, 7],
      [7, 7, 1, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 7, 7, 7],
      [1, 1, 1, 1],
      [7, 7, 7, 7],
    ],
    [
      [7, 1, 7, 7],
      [7, 1, 7, 7],
      [7, 1, 7, 7],
      [7, 1, 7, 7],
    ],
  ],
  [
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
  ],
  [
    [
      [7, 1, 7],
      [1, 1, 1],
      [7, 7, 7],
    ],
    [
      [7, 1, 7],
      [7, 1, 1],
      [7, 1, 7],
    ],
    [
      [7, 7, 7],
      [1, 1, 1],
      [7, 1, 7],
    ],
    [
      [7, 1, 7],
      [1, 1, 7],
      [7, 1, 7],
    ],
  ],
];

const canvas = document.getElementById('broad');
const ctx = canvas.getContext('2d'); // Đối tượng getContext(“2d”) trong HTML5 sở hữu nhiều hàm dành cho vẽ hình ảnh như hình hộp, hình tròn, chữ,… 

ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

class Broad {
    constructor(ctx) {
        this.ctx = ctx;
        this.grid = this.generateWhiteBroad();
        this.score = 0;
        this.gameOver = false;
    }
    // reset lại từ đầu khi nhấn nút bắt đầu
    reset() {
      this.score = 0;
      this.grid = this.generateWhiteBroad();
      this.gameOver = false;
      this.drawBroad();
      this.handleScore(this.score);
    }
    // tạo ra bảng
    generateWhiteBroad() {
        return Array.from({length: ROWS}, () => Array(COLS).fill(WHITE_COLOR_ID));
    }
    // vẽ ra mỗi Cell
    drawCell(xAxis, yAxis, colorId) {
        this.ctx.fillStyle = COLOR_MAPPING[colorId] || COLOR_MAPPING[WHITE_COLOR_ID]; // gán CSS mỗi Cell
        this.ctx.fillRect(xAxis * BLOCK_SIZE, yAxis * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE); // vẽ hình vuông với fillRect(x, y, width, height) x, y là tọa độ
        this.ctx.fillStyle = 'black'; // border cho mỗi cell
        this.ctx.strokeRect(xAxis * BLOCK_SIZE, yAxis * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    }
    // vẽ toàn bộ bảng với màu trắng
    drawBroad() {
        for(let row =0; row < this.grid.length; row++) {
            for(let col =0; col < this.grid[0].length; col++){
                this.drawCell(col, row, this.grid[row][col]);
            }
        }
    }
    // xử lý khi hàng full màu thì + 10 điểm và đổi thành màu trắng
    handleCompleteRows() {
        const latestGrid = broad.grid.filter((row) => {
            return row.some(col => col === WHITE_COLOR_ID);
        });

        const newScore = ROWS - latestGrid.length; 
        const newRows = Array.from({length: newScore}, () => Array(COLS).fill(WHITE_COLOR_ID));
        if (newScore) {
          broad.grid = [...newRows, ...latestGrid];
          this.handleScore(newScore * 10);
        }
    }
    // xữ lý cộng điểm
    handleScore(newScore) {
        this.score += newScore;
        document.getElementById('score').innerHTML = this.score;
    }
}

class Brick {
    constructor(id) {
        this.id = id; // id truyền màu theo color_mapping và kiểu hình khối theo brick_layout
        this.layout = BRICK_LAYOUT[id]; // hình dạng của khối
        this.activeIndex = 0; // hướng khối
        this.colPos = 4; // tọa độ vị trí khối theo cột
        this.rowPos = -2; // tọa độ vị trí khối theo hàng\
        
    }
    // vẽ khối theo brick_layout
    draw() {
        for(let row = 0; row < this.layout[this.activeIndex].length; row++) {
            for(let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
                if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) { 
                    broad.drawCell(col + this.colPos, row + this.rowPos, this.id)
                }
            }

        }
    }
    // xóa khối cũ
    clear() {
        for(let row = 0; row < this.layout[this.activeIndex].length; row++) {
            for(let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
                if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) { 
                    broad.drawCell(col + this.colPos, row + this.rowPos, WHITE_COLOR_ID)
                }
            }

        }
    }
    // duy chuyển khối sang trái
    moveLeft() {
        if (!this.checkCollsion(this.rowPos, this.colPos - 1, this.layout[this.activeIndex] )){
            this.clear();
            this.colPos--;
            this.draw();
        }  
    }
    // duy chuyển khối sang phải
    moveRight() {
        if (!this.checkCollsion(this.rowPos, this.colPos + 1, this.layout[this.activeIndex])){
            this.clear();
            this.colPos++;
            this.draw();
        }
    }
    // duy chuyển khối đi xuống
    moveDown() {
        if (!this.checkCollsion(this.rowPos + 1, this.colPos, this.layout[this.activeIndex])){
            this.clear();
            this.rowPos++;
            this.draw();
            return;
        }
        this.handleLanded();
        if(!broad.gameOver) {
          generateNewBrick();
        }
    }
    // xoay khối
    rotate() {
        if (!this.checkCollsion(this.rowPos + 1, this.colPos, this.layout[(this.activeIndex + 1) % 4])) {
            this.clear();
            this.activeIndex = (this.activeIndex + 1) % 4;
            this.draw();
        }
    }
    // kiểm tra xem có va chạm với bên ngoài bảng ko. Nếu có trả về true
    checkCollsion(nextRow, nextCol, nextLayout) {
        for(let row = 0; row < nextLayout.length; row++) {
            for(let col = 0; col < nextLayout[0].length; col++) {
                if (nextLayout[row][col] !== WHITE_COLOR_ID && nextRow >= 0) { 
                  if( col + nextCol < 0 ||
                     col + nextCol >= COLS || 
                     row + nextRow >= ROWS || 
                     broad.grid[row + this.rowPos + 1][col + this.colPos] !== WHITE_COLOR_ID
                    ) { 
                    return true;
                    }
                }
            }

        }
    }
    // xữ lý chạm đất
    handleLanded() {
        if (this.rowPos <= 0) {
          this.handleGameover();
          return;
        }

        for(let row = 0; row < this.layout[this.activeIndex].length; row++) {
            for(let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
                if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) { 
                    broad.grid[row + this.rowPos][col + this.colPos] = this.id;
                }
            }
        }
        broad.handleCompleteRows();
        broad.drawBroad();
    }
    // xử lý game over
    handleGameover() {
      broad.gameOver = true;
      alert('Game over!!!');
    }

}
// tạo hình khối ngẫu nhiên
function generateNewBrick() {
    brick = new Brick(Math.floor(Math.random() * 10) % BRICK_LAYOUT.length);
}
broad = new Broad(ctx); // khởi tạo đối tượng mới Broad
broad.drawBroad();

// thêm sự kiện khi nhấn nút bắt đầu chơi
document.getElementById('play').addEventListener('click', () =>{
  broad.reset();
  generateNewBrick();
  
  const refresh = setInterval(() => {
    if (!broad.gameOver) {
      brick.moveDown();
    }
    else {
      clearInterval(refresh);
    }
  }, 1000);
});
// thêm sự kiện khi nhấn nút điều khiển lên, xuống, trái, phải
document.addEventListener('keydown', (e) => {
  if(!broad.gameOver){
    switch(e.code) {
        case KEY_CODES.LEFT:
            brick.moveLeft();
            break;
        case KEY_CODES.RIGHT:
            brick.moveRight();
            break;
        case KEY_CODES.DOWN:
            brick.moveDown();
            break;
        case KEY_CODES.UP:
            brick.rotate();
            break;
        default: 
            break;
    }
  }
});
