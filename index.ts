interface Item {
  firstName: string;
  lastName: string;
  email: string;
}

const card1Body = document.getElementById(
  "card1-body"
) as HTMLTableSectionElement;
const form = document.getElementById("my-form") as HTMLFormElement;
const data: Item[] = [];

function renderData() {
  card1Body.innerHTML = "";
  data.forEach(function (item, index) {
    const row = document.createElement("tr");
    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = item.firstName;
    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = item.lastName;
    const emailCell = document.createElement("td");
    emailCell.textContent = item.email;
    const editButtonCell = document.createElement("td");
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function () {
      return editItem(index);
    });
    editButtonCell.appendChild(editButton);
    const deleteButtonCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      return deleteItem(index);
    });
    deleteButtonCell.appendChild(deleteButton);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(emailCell);
    row.appendChild(editButtonCell);
    row.appendChild(deleteButtonCell);
    card1Body.appendChild(row);
  });
}

function addItem(firstName: string, lastName: string, email: string) {
  data.unshift({ firstName, lastName, email });
  renderData();
}

function editItem(index: number) {
  const item = data[index];
  const form = document.getElementById("my-form") as HTMLFormElement;
  (form.elements.namedItem("fname") as HTMLInputElement).value = item.firstName;
  (form.elements.namedItem("lname") as HTMLInputElement).value = item.lastName;
  (form.elements.namedItem("email") as HTMLInputElement).value = item.email;
  const submitButton = form.elements.namedItem("submit") as HTMLButtonElement;
  submitButton.textContent = "Update";
  submitButton.onclick = function () {
    const newFirstName = (form.elements.namedItem("fname") as HTMLInputElement)
      .value;
    const newLastName = (form.elements.namedItem("lname") as HTMLInputElement)
      .value;
    const newEmail = (form.elements.namedItem("email") as HTMLInputElement)
      .value;
    if (newFirstName && newLastName && newEmail) {
      data[index].firstName = newFirstName;
      data[index].lastName = newLastName;
      data[index].email = newEmail;
      const row = card1Body.children[index] as HTMLTableRowElement;
      row.children[0].textContent = newFirstName;
      row.children[1].textContent = newLastName;
      row.children[2].textContent = newEmail;
      submitButton.textContent = "Add";
      submitButton.onclick = function () {
        const firstName = (form.elements.namedItem("fname") as HTMLInputElement)
          .value;
        const lastName = (form.elements.namedItem("lname") as HTMLInputElement)
          .value;
        const email = (form.elements.namedItem("email") as HTMLInputElement)
          .value;
        if (firstName && lastName && email) {
          addItem(firstName, lastName, email);
          form.reset();
        } else {
          alert("Please fill out all fields.");
        }
      };
    }
  };
}
function showDeleteConfirmationModal(index: number) {
  const modal = document.getElementById(
    "delete-confirmation-modal"
  ) as HTMLElement;
  modal.style.display = "block";
  const confirmButton = document.getElementById(
    "delete-confirmation-modal-confirm-button"
  ) as HTMLButtonElement;
  confirmButton.onclick = () => {
    deleteItem(index);
    modal.style.display = "none";
    data.splice(index, 1);
    renderData();
  };
  const cancelButton = document.getElementById(
    "delete-confirmation-modal-cancel-button"
  ) as HTMLButtonElement;
  cancelButton.onclick = () => {
    modal.style.display = "none";
  };
}
function deleteItem(index: number) {
  showDeleteConfirmationModal(index);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const firstName = (form.elements.namedItem("fname") as HTMLInputElement)
    .value;
  const lastName = (form.elements.namedItem("lname") as HTMLInputElement).value;
  const email = (form.elements.namedItem("email") as HTMLInputElement).value;
  if (firstName && lastName && email) {
    addItem(firstName, lastName, email);
    form.reset();
  } else {
    alert("Please fill out all fields.");
  }
});
