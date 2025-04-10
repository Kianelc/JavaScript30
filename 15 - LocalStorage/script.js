const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
const items = JSON.parse(localStorage.getItem("items")) || [];
const checkAll = document.querySelector("#checkAll");
const uncheckAll = document.querySelector("#uncheckAll");
const deleteAll = document.querySelector("#deleteAll");

function addItem(e) {
  e.preventDefault();

  const text = this.querySelector("[name=item]").value;
  const item = {
    text,
    done: false,
  };

  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem("items", JSON.stringify(items));
  this.reset();
}

function deleteAllItems() {
  items.length = 0;
  populateList(items, itemsList);
  localStorage.setItem("items", JSON.stringify(items));
}

function toggleAllItems(shouldCheck) {
  items.forEach((element) => {
    element.done = shouldCheck;
  });
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}

function populateList(plates = [], platesList) {
  platesList.innerHTML = plates
    .map((plate, index) => {
      return `
            <li>
                <input type="checkbox" data-index=${index} id="item${index}" ${
        plate.done ? "checked" : ""
      }/>
                <label for="item${index}">${plate.text}</label>
            </li>
        `;
    })
    .join("");
}

function toggleDone(e) {
  if (!e.target.matches("input")) return;
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}

addItems.addEventListener("submit", addItem);
deleteAll.addEventListener("click", deleteAllItems);
checkAll.addEventListener("click", () => toggleAllItems(true));
uncheckAll.addEventListener("click", () => toggleAllItems(false));
itemsList.addEventListener("click", toggleDone);
populateList(items, itemsList);
