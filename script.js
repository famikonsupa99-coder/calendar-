/* ページ全体 */
body {
  margin: 0;
  font-family: Arial, "Noto Sans JP", sans-serif;
  background: #f5f7fa;
  color: #333;
}

/* 上のタイトル */
header {
  text-align: center;
  background: #4f7cff;
  color: white;
  padding: 25px 10px;
}

header h1 {
  margin: 0;
  font-size: 30px;
}

header p {
  margin: 8px 0 0;
}


/* カレンダー全体 */
main {
  max-width: 1000px;
  margin: 25px auto;
  padding: 0 15px;
}


/* 月とボタン */
.calendar-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 15px;
}

.calendar-top h2 {
  margin: 0;
  font-size: 25px;
}


/* ボタン */
button {
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 16px;
  cursor: pointer;
  background: #4f7cff;
  color: white;
}

button:hover {
  opacity: 0.85;
}


/* 曜日 */
.week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background: #333;
  color: white;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
}

.week div {
  text-align: center;
  padding: 12px 5px;
  font-weight: bold;
}


/* カレンダーの日付 */
#calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background: white;
}


/* 1日分 */
.day {
  min-height: 90px;
  border: 1px solid #ddd;
  padding: 8px;
  box-sizing: border-box;
  cursor: pointer;
  background: white;
}

.day:hover {
  background: #eef3ff;
}


/* 日付の数字 */
.day-number {
  font-weight: bold;
  font-size: 17px;
}


/* 予定 */
.event {
  margin-top: 7px;
  padding: 5px;
  background: #ffe082;
  border-radius: 5px;
  font-size: 13px;
  word-break: break-word;
}


/* 予定追加 */
.event-box {
  margin-top: 25px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.event-box h2 {
  margin-top: 0;
}

.event-box label {
  display: block;
  margin-top: 12px;
  margin-bottom: 5px;
  font-weight: bold;
}

.event-box input {
  width: 100%;
  box-sizing: border-box;
  padding: 11px;
  border: 1px solid #ccc;
  border-radius: 7px;
  font-size: 16px;
}

#addEvent {
  margin-top: 15px;
}


/* 下 */
footer {
  text-align: center;
  padding: 25px;
  color: #777;
}


/* スマホ用 */
@media (max-width: 600px) {

  header h1 {
    font-size: 24px;
  }

  .calendar-top h2 {
    font-size: 20px;
  }

  .calendar-top button {
    padding: 8px 10px;
    font-size: 13px;
  }

  .day {
    min-height: 70px;
    padding: 5px;
  }

  .day-number {
    font-size: 14px;
  }

  .event {
    font-size: 11px;
    padding: 3px;
  }

  .week div {
    padding: 8px 2px;
    font-size: 13px;
  }
}
