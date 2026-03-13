# Game Lab 🎮

Welcome to **Game Lab**! This project contains a collection of classic web-based games built with HTML, CSS, and JavaScript.

## 🕹️ Games List

### 1. Snake Game (贪吃蛇)
A classic implementation of the Snake game where you control a snake to eat food and grow longer. Be careful not to hit the walls or yourself!

- **Play**: Open `index.html` in your browser.
- **Controls**: Use arrow keys (⬆️ ⬇️ ⬅️ ➡️) to move.
- **Features**:
  - Score tracking
  - Game over detection (wall collision, self collision)
  - Simple and clean UI

### 2. Gomoku (五子棋)
A strategic two-player board game also known as Five in a Row. Players take turns placing black and white stones on a 15x15 grid. The first player to get five stones in a row wins.

- **Play**: Open `gomoku.html` in your browser.
- **Controls**: Click on the board to place your piece.
- **Features**:
  - 15x15 standard board
  - Two-player local multiplayer
  - Win detection (horizontal, vertical, diagonal)
  - Undo functionality
  - Restart game option

## 🚀 How to Run

You can simply open the HTML files directly in your web browser. Alternatively, for a better experience, you can serve the files using a local web server.

### Using Python (recommended)

If you have Python installed, run the following command in the project directory:

```bash
python -m http.server 8000
```

Then open your browser and navigate to:
- **Snake**: [http://localhost:8000/index.html](http://localhost:8000/index.html)
- **Gomoku**: [http://localhost:8000/gomoku.html](http://localhost:8000/gomoku.html)

## 🛠️ Tech Stack

- **HTML5**: Structure and semantics
- **CSS3**: Styling and layout (Flexbox)
- **JavaScript (ES6+)**: Game logic and interactivity
- **Canvas API**: Rendering game graphics

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
