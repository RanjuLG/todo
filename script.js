const historyList = [];
currentList = [];

function addToList() {
    // Get the input value
    const inputElement = document.getElementById("listItemInput");
    const itemText = inputElement.value;

    if (itemText.trim() !== "") {
        // Create a new list
        const listItem = document.createElement("li");
        listItem.className = "list-group-item d-flex justify-content-between align-items-center";

        // Create a checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "form-check-input me-1";
        listItem.appendChild(checkbox);

        // Create a label for the checkbox
        const label = document.createElement("label");
        label.className = "form-check-label";
        label.innerText = itemText;
        label.style.fontSize = "20px";
        label.style.padding = "0.3em 0.3em 0.3em";
        listItem.appendChild(label);

        // Append the new item to the list
        const itemList = document.getElementById("itemList");
        itemList.appendChild(listItem);
        currentList.push(itemText);

        // Clear the input field after adding the item
        inputElement.value = "";
        


        // Add an event listener to the checkbox
        checkbox.addEventListener("change", function () {
            if (checkbox.checked) {
                label.style.textDecoration = "line-through";
            } else {
                label.style.textDecoration = "none";
            }
        
        });
        
    // Create a delete button for each list item
    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-close";
    deleteButton.style = "--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .25rem; --bs-btn-font-size: .50rem;"
    listItem.appendChild(deleteButton);

    // Add event listener to the delete button
    deleteButton.addEventListener("click", function () {
        // Remove the list item from the DOM when the delete button is clicked
        listItem.remove();
        currentList.pop(listItem);
    });

    
    }
    //Append the History List
    historyList.push(itemText);
}


//Add items buy pressing enter

function handleKeyPress(event) {
    if (event.key === "Enter") {
        addToList();
    }
}

// clear all items button
function clearAll() {
    const itemList = document.getElementById("itemList");
    itemList.innerHTML = ""; // Clear the list by removing all its content
};

// Flag to track the visibility of history.
let isHistoryShown = false;


function toggleHistory() {
    // Show the history by displaying the contents of the itemListHistory array
    const historyContainer = document.getElementById('history-container');

    if (isHistoryShown){
        historyContainer.style.display = 'none';
    } else {
        historyContainer.innerHTML = historyList.join('<br>'); // Display the history contents
        historyContainer.style.display = 'block'; // Show the history

    }
    //toggle the flag
    isHistoryShown = !isHistoryShown;
    
}

function downloadList() {
    // Create a Blob with the list data
    const listData = currentList.join('\n');
    const blob = new Blob([listData], { type: 'text/plain' });

    // Create a temporary link to trigger the download
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'list_history.txt';
    downloadLink.click();
}

localStorage.setItem('currentList', JSON.stringify(currentList));