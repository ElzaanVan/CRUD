class UI {
  constructor() {
    this.post = document.querySelector("#posts");
    this.titleInput = document.querySelector("#title");
    this.bodyInput = document.querySelector("#body");
    this.idImput = document.querySelector("#id");
    this.postSubmit = document.querySelector(".post-submit");
    this.forState = "add";
  }

  showChirps(chirps) {
    let output = "";

    chirps.forEach((chirp) => {
      output += `
    <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${chirp.title}</h4>
            <p class="card-text">${chirp.body}</p>
            <a href="#" class="edit card-link" data-id="${chirp.id}">
              <i class="fa fa-pencil"></i>
            </a>

            <a href="#" class="delete card-link" data-id="${chirp.id}">
            <i class="fa fa-remove"></i>
          </a>
          </div>
        </div>
      `;
    });
    this.post.innerHTML = output;
  }
  //Clear the inputs
  clearInputs() {
    this.titleInput.value = "";
    this.bodyInput.value = "";
  }
  //Fill input fields to edit the chirps
  fillInput(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idImput.value = data.id;

    this.changeState("edit");
  }
  //Clear ID hidden value
  clearIdInput() {
    this.idImput.value = "";
  }

  //Change the form state
  changeState(type) {
    if (type === "edit") {
      this.postSubmit.textContent = "Update Chirp";
      this.postSubmit.className = "post-submit btn btn-success btn-block";

      //create cancel button
      const button = document.createElement("button");
      button.className = "post-cancel btn btn-light btn-block";
      button.appendChild(document.createTextNode("Cancel edit"));

      //Get parent
      const cardForm = document.querySelector(".card-form");
      //Get element to insert before
      const formEnd = document.querySelector(".form-end");
      //Insert the cancel button
      cardForm.insertBefore(button, formEnd);
    } else {
      this.postSubmit.textContent = "Chirp It";
      this.postSubmit.className = "post-submit btn btn-warning btn-block";

      //Remove cancel button if it is there
      if (document.querySelector(".post-cancel")) {
        document.querySelector(".post-cancel").remove();
      }
      //Clear ID from hidden field
      this.clearIdInput();
      //Clear inputs
      this.clearInputs();
    }
  }
}

export const ui = new UI();
