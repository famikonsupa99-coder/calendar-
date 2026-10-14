 script.js を置き換える
ここが機能を動かす大事な部分だよ。今のコードを全部置き換えてね。
// 予定の種類
const categories = {
  school: "学校行事",
  test: "テスト",
  holiday: "休み",
  other: "その他"
};

// 以前の予定データを読み込む
let events = {};

try {
  events = JSON.parse(localStorage.getItem("schoolEvents")) || {};
} catch (error) {
  events = {};
}

// 以前の文字列形式の予定を、新しい形式に変換する
// これまでの予定をできるだけ引き継ぐ
for (const date in events) {
  if (!Array.isArray(events[date])) {
    delete events[date];
    continue;
  }

  events[date] = events[date].map(function(event) {
    if (typeof event === "string") {
      return {
        text: event,
        category: "other"
      };
    }

    if (event && typeof event.text === "string") {
      return {
        text: event.text,
        category: categories[event.category]
          ? event.category
          : "other"
      };
    }

    return null;
  }).filter(Boolean);
}

function saveEvents() {
  localStorage.setItem("schoolEvents", JSON.stringify(events));
}

// 変換後の形式で保存
saveEvents();

let currentDate = new Date();

function getTodayText() {
  const now = new Date();

  return now.getFullYear() + "-" +
    String(now.getMonth() + 1).padStart(2, "0") + "-" +
    String(now.getDate()).padStart(2, "0");
}

// カレンダーを表示
function showCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = getTodayText();
  const searchText = document
    .getElementById("searchText")
    .value.trim().toLowerCase();

  document.getElementById("monthTitle").textContent =
    year + "年" + (month + 1) + "月";

  const calendar = document.getElementById("calendar");
  calendar.innerHTML = "";

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = firstDay.getDay();
  const days = lastDay.getDate();

  // 月初の空白
  for (let i = 0; i < startDay; i++) {
    const emptyDay = document.createElement("div");
    emptyDay.className = "day empty-day";
    emptyDay.style.background = "#eeeeee";
    emptyDay.style.cursor = "default";
    calendar.appendChild(emptyDay);
  }

  // 日付を作成
  for (let day = 1; day <= days; day++) {
    const dateText = year + "-" +
      String(month + 1).padStart(2, "0") + "-" +
      String(day).padStart(2, "0");

    const dayBox = document.createElement("div");
    dayBox.className = "day";

    // 今日を強調
    if (dateText === today) {
      dayBox.classList.add("today");
    }

    const number = document.createElement("div");
    number.className = "day-number";
    number.textContent = day;
    dayBox.appendChild(number);

    // 予定を表示
    const dayEvents = events[dateText] || [];

    dayEvents.forEach(function(event, index) {
      // 検索文字と一致しない予定は隠す
      if (
        searchText &&
        !event.text.toLowerCase().includes(searchText)
      ) {
        return;
      }

      const eventElement = document.createElement("div");
      eventElement.className =
        "event event-" + event.category;
      eventElement.textContent = event.text;
      eventElement.title = "クリックして編集・削除";

      eventElement.addEventListener("click", function(e) {
        e.stopPropagation();

        const action = confirm(
          "予定：「" + event.text + "」\n\n" +
          "OK：編集する\n" +
          "キャンセル：削除する"
        );

        if (action) {
          const newText = prompt(
            "新しい予定名を入力してください",
            event.text
          );

          if (newText === null) return;

          if (newText.trim() === "") {
            alert("予定を空欄にはできません！");
            return;
          }

          const currentCategory = event.category || "other";
          const categoryNumber = {
            school: "1",
            test: "2",
            holiday: "3",
            other: "4"
          }[currentCategory];

          const newCategory = prompt(
            "予定の種類を番号で選んでください\n\n" +
            "1：学校行事\n" +
            "2：テスト\n" +
            "3：休み\n" +
            "4：その他",
            categoryNumber
          );

          if (newCategory === null) return;

          const categoryMap = {
            "1": "school",
            "2": "test",
            "3": "holiday",
            "4": "other"
          };

          if (!categoryMap[newCategory.trim()]) {
            alert("1〜4の番号を入力してください。");
            return;
          }

          events[dateText][index] = {
            text: newText.trim(),
            category: categoryMap[newCategory.trim()]
          };

          saveEvents();
          showCalendar();
          alert("予定を編集しました！");
        } else {
          const remove = confirm(
            "この予定を削除してもいいですか？"
          );

          if (!remove) return;

          events[dateText].splice(index, 1);

          if (events[dateText].length === 0) {
            delete events[dateText];
          }

          saveEvents();
          showCalendar();
          alert("予定を削除しました！");
        }
      });

      dayBox.appendChild(eventElement);
    });

    // 日付をクリックすると入力欄に設定
    dayBox.addEventListener("click", function() {
      document.getElementById("eventDate").value = dateText;
      document.getElementById("eventText").focus();
    });

    calendar.appendChild(dayBox);
  }
}

// 前の月
document.getElementById("prevMonth").addEventListener("click", function() {
  currentDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    1
  );
  showCalendar();
});

// 次の月
document.getElementById("nextMonth").addEventListener("click", function() {
  currentDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    1
  );
  showCalendar();
});

// 予定を追加
document.getElementById("addEvent").addEventListener("click", function() {
  const date = document.getElementById("eventDate").value;
  const text = document.getElementById("eventText").value.trim();
  const category = document.getElementById("eventCategory").value;

  if (!date) {
    alert("日付を選んでください！");
    return;
  }

  if (!text) {
    alert("予定を入力してください！");
    return;
  }

  if (!events[date]) {
    events[date] = [];
  }

  events[date].push({
    text: text,
    category: categories[category] ? category : "other"
  });

  saveEvents();

  document.getElementById("eventText").value = "";

  // 追加した日付の月を表示
  const parts = date.split("-").map(Number);
  currentDate = new Date(parts[0], parts[1] - 1, 1);

  showCalendar();
  alert("予定を追加しました！");
});

// 予定を検索
document.getElementById("searchText").addEventListener("input", function() {
  showCalendar();
});

// バックアップをダウンロード
document.getElementById("backupButton").addEventListener("click", function() {
  const backupData = {
    format: "school-calendar-backup",
    version: 1,
    events: events
  };

  const blob = new Blob(
    [JSON.stringify(backupData, null, 2)],
    { type: "application/json" }
  );

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "学校カレンダー_backup.json";
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
});

// 復元ボタン
document.getElementById("restoreButton").addEventListener("click", function() {
  document.getElementById("restoreFile").click();
});

// バックアップファイルを読み込む
document.getElementById("restoreFile").addEventListener("change", function(e) {
  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = function() {
    try {
      const data = JSON.parse(reader.result);
      const importedEvents = data.events || data;

      if (
        !importedEvents ||
        typeof importedEvents !== "object" ||
        Array.isArray(importedEvents)
      ) {
        throw new Error("バックアップ形式が違います");
      }

      const cleanedEvents = {};

      for (const date in importedEvents) {
        // 日付形式を確認
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
          throw new Error("日付の形式が正しくありません");
        }

        if (!Array.isArray(importedEvents[date])) {
          throw new Error("予定データの形式が正しくありません");
        }

        cleanedEvents[date] = importedEvents[date].map(function(event) {
          // 古いバックアップにも対応
          if (typeof event === "string") {
            return {
              text: event,
              category: "other"
            };
          }

          if (
            !event ||
            typeof event.text !== "string" ||
            !event.text.trim()
          ) {
            throw new Error("予定のデータが正しくありません");
          }

          return {
            text: event.text.trim(),
            category: categories[event.category]
              ? event.category
              : "other"
          };
        });
      }

      if (!confirm(
        "現在の予定をバックアップの内容に置き換えます。\n" +
        "復元する前に、現在の予定もバックアップしておくことをおすすめします。\n\n" +
        "復元してもよいですか？"
      )) {
        return;
      }

      events = cleanedEvents;
      saveEvents();
      showCalendar();

      alert("バックアップから復元しました！");
    } catch (error) {
      alert(
        "復元できませんでした。\n" +
        "正しいバックアップファイルか確認してください。"
      );
    } finally {
      e.target.value = "";
    }
  };

  reader.readAsText(file);
});

// 最初に表示
showCalendar();
