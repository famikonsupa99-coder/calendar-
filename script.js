 // カレンダーに保存する予定
let events = JSON.parse(localStorage.getItem("schoolEvents")) || {};

// 今日の日付
let currentDate = new Date();


// 予定をブラウザに保存する
function saveEvents() {
  localStorage.setItem("schoolEvents", JSON.stringify(events));
}


// カレンダーを表示する
function showCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 月のタイトル
  document.getElementById("monthTitle").textContent =
    year + "年" + (month + 1) + "月";

  const calendar = document.getElementById("calendar");

  // 一度カレンダーを空にする
  calendar.innerHTML = "";

  // 今月の1日と最後の日
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // 1日の曜日と月の日数
  const startDay = firstDay.getDay();
  const days = lastDay.getDate();

  // 月の最初の空白
  for (let i = 0; i < startDay; i++) {
    const emptyDay = document.createElement("div");
    emptyDay.className = "day";
    emptyDay.style.background = "#eeeeee";
    calendar.appendChild(emptyDay);
  }

  // 日付を作る
  for (let day = 1; day <= days; day++) {
    const dayBox = document.createElement("div");
    dayBox.className = "day";

    // 日付の数字
    const number = document.createElement("div");
    number.className = "day-number";
    number.textContent = day;
    dayBox.appendChild(number);

    // 日付を YYYY-MM-DD にする
    const dateText =
      year + "-" +
      String(month + 1).padStart(2, "0") + "-" +
      String(day).padStart(2, "0");

    // その日の予定を表示する
    if (events[dateText]) {
      events[dateText].forEach(function(eventText, index) {
        const event = document.createElement("div");
        event.className = "event";
        event.textContent = eventText;

        // 予定をクリックしたら編集・削除できる
        event.style.cursor = "pointer";
        event.title = "クリックして編集・削除";

        event.addEventListener("click", function(e) {
          // 日付のクリック処理と分ける
          e.stopPropagation();

          const edit = confirm(
            "予定：「" + events[dateText][index] + "」\n\n" +
            "OK：編集する\n" +
            "キャンセル：削除する"
          );

          if (edit) {
            // 予定を編集する
            const newText = prompt(
              "新しい予定を入力してください",
              events[dateText][index]
            );

            // キャンセルなら何もしない
            if (newText === null) {
              return;
            }

            // 空欄なら変更しない
            if (newText.trim() === "") {
              alert("予定を空欄にはできません！");
              return;
            }

            events[dateText][index] = newText.trim();
            saveEvents();
            showCalendar();
            alert("予定を編集しました！");
          } else {
            // 削除してよいか確認する
            const remove = confirm(
              "この予定を削除してもいいですか？"
            );

            if (!remove) {
              return;
            }

            events[dateText].splice(index, 1);

            // 予定がなくなった日付を整理する
            if (events[dateText].length === 0) {
              delete events[dateText];
            }

            saveEvents();
            showCalendar();
            alert("予定を削除しました！");
          }
        });

        dayBox.appendChild(event);
      });
    }

    // 日付をクリックしたら入力欄に入れる
    dayBox.addEventListener("click", function() {
      document.getElementById("eventDate").value = dateText;
      document.getElementById("eventText").focus();
    });

    calendar.appendChild(dayBox);
  }
}


// 前の月
document.getElementById("prevMonth").addEventListener("click", function() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  showCalendar();
});


// 次の月
document.getElementById("nextMonth").addEventListener("click", function() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  showCalendar();
});


// 予定を追加する
document.getElementById("addEvent").addEventListener("click", function() {
  const date = document.getElementById("eventDate").value;
  const text = document.getElementById("eventText").value.trim();

  // 日付がない場合
  if (!date) {
    alert("日付を選んでください！");
    return;
  }

  // 予定がない場合
  if (!text) {
    alert("予定を入力してください！");
    return;
  }

  // まだその日に予定がなければ作る
  if (!events[date]) {
    events[date] = [];
  }

  // 予定を追加
  events[date].push(text);

  // 保存する
  saveEvents();

  // 入力欄を空にする
  document.getElementById("eventText").value = "";

  // カレンダーを更新
  showCalendar();

  alert("予定を追加しました！");
});


// 最初にカレンダーを表示
showCalendar();
