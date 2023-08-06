const historyList = [];
let currentList = [];

// Load saved tasks from local storage
if (localStorage.getItem('savedList')) {
    currentList = JSON.parse(localStorage.getItem('savedList'));
    updateList();
}

function updateList() {
    const itemList = document.getElementById("itemList");
        // Check if the itemList element exists
    if (!itemList) {
        console.error("Element with id 'itemList' not found.");
        return;
        }
      
    itemList.innerHTML = "";
    // Clear historyList before updating
    historyList.length = 0;


    currentList.forEach((itemText) => {
        const listItem = document.createElement("li");
        listItem.className = "list-group-item d-flex justify-content-between align-items-center";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "form-check-input me-1";
        listItem.appendChild(checkbox);

        const label = document.createElement("label");
        label.className = "form-check-label";
        label.innerText = itemText;
        label.style.fontSize = "20px";
        label.style.padding = "0.3em 0.3em 0.3em";
        listItem.appendChild(label);

        const deleteButton = document.createElement("button");
        deleteButton.className = "btn btn-close";
        deleteButton.style = "--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .25rem; --bs-btn-font-size: .50rem;"
        listItem.appendChild(deleteButton);

        checkbox.addEventListener("change", function () {
            if (checkbox.checked) {
                label.style.textDecoration = "line-through";
            } else {
                label.style.textDecoration = "none";
            }
        });

        deleteButton.addEventListener("click", function () {
            const index = currentList.indexOf(itemText);
            if (index > -1) {
                currentList.splice(index, 1);
                updateList();
            }
        });

        itemList.appendChild(listItem);
        // Update historyList with the saved tasks
        historyList.push(itemText);
    });
}

function addToList() {
    const inputElement = document.getElementById("listItemInput");
    const itemText = inputElement.value;

    if (itemText.trim() !== "") {
        currentList.push(itemText);
        updateList();

        inputElement.value = "";
    }
    // Append the History List
    historyList.push(itemText);
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        addToList();
    }
}

function clearAll() {
    const itemList = document.getElementById("itemList");
    itemList.innerHTML = "";
    currentList = [];
}

let isHistoryShown = false;

function toggleHistory() {
    const historyContainer = document.getElementById('history-container');
    // Check if the historyContainer element exists
    if (!historyContainer) {
        console.error("Element with id 'history-container' not found.");
        return;
      }

    if (isHistoryShown) {
        historyContainer.style.display = 'none';
    } else {
        historyContainer.innerHTML = historyList.join('<br>');
        historyContainer.style.display = 'block';
    }

    isHistoryShown = !isHistoryShown;
}

function saveList() {
    // Save the currentList to local storage
    localStorage.setItem('savedList', JSON.stringify(currentList));
}