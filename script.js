// カレンダーに保存する予定
let events = JSON.parse(localStorage.getItem("schoolEvents")) || {};

// 今日の日付
let currentDate = new Date();


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

  // 今月の1日
  const firstDay = new Date(year, month, 1);

  // 今月の最後の日
  const lastDay = new Date(year, month + 1, 0);

  // 1日の曜日
  const startDay = firstDay.getDay();

  // 月の日数
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

    // 日付
    const number = document.createElement("div");
    number.className = "day-number";
    number.textContent = day;

    dayBox.appendChild(number);


    // 日付を YYYY-MM-DD にする
    const dateText =
      year + "-" +
      String(month + 1).padStart(2, "0") + "-" +
      String(day).padStart(2, "0");


    // その日の予定を表示
    if (events[dateText]) {

      events[dateText].forEach(function(eventText) {

        const event = document.createElement("div");
        event.className = "event";
        event.textContent = eventText;

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


  // ブラウザに保存
  localStorage.setItem(
    "schoolEvents",
    JSON.stringify(events)
  );


  // 入力欄を空にする
  document.getElementById("eventText").value = "";


  // カレンダーを更新
  showCalendar();


  alert("予定を追加しました！");
});


// 最初にカレンダーを表示
showCalendar();
