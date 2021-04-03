import { http } from "./http";
import { ui } from "./ui";

//Get posts on DOM load
document.addEventListener("DOMContentLoaded", getPosts);

//Event listener for submit button
document.querySelector(".post-submit").addEventListener("click", addPosts);

//Event listener for delete icon
document.querySelector("#posts").addEventListener("click", deletePosts);

//Event listener for edit icon
document.querySelector("#posts").addEventListener("click", editPosts);

//Event listener for cancel button
document.querySelector(".card-form").addEventListener("click", cancelEdit);

function getPosts() {
  http
    .get("http://localhost:3000/chirps")
    .then((data) => ui.showChirps(data))
    .catch((err) => console.log(err));
}

function addPosts() {
  const title = document.querySelector("#title").value;
  const body = document.querySelector("#body").value;
  const id = document.querySelector("#id").value;

  const data = {
    title,
    body,
  };
  //Validation of input
  if (title === "" || body === "") {
    Swal.fire(
      "Nothing to chirp about?",
      "Please fill in all fields",
      "question"
    );
  } else {
    //Check for id
    if (id === "") {
      //Create Post if ID is equal to nothing
      http
        .post("http://localhost:3000/chirps", data)
        .then((data) => {
          Swal.fire({
            icon: "success",
            title: "Your Chirp has been added",
            showConfirmButton: false,
            timer: 1000,
          });
          ui.clearInputs();
          getPosts();
        })
        .catch((err) => console.log(err));
    } else {
      //Update post
      http
        .put(`http://localhost:3000/chirps/${id}`, data)
        .then((data) => {
          Swal.fire({
            icon: "success",
            title: "Your Chirp has been updated",
            showConfirmButton: false,
            timer: 1000,
          });
          ui.changeState("add");
          getPosts();
        })
        .catch((err) => console.log(err));
    }
  }
}

function deletePosts(e) {
  if (e.target.parentElement.classList.contains("delete")) {
    const id = e.target.parentElement.dataset.id;
    http
      .delete(`http://localhost:3000/chirps/${id}`)
      .then((data) =>
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            getPosts();
          }
        })
      )
      .catch((err) => console.log(err));
    e.preventDefault();
  }
}

function editPosts(e) {
  if (e.target.parentElement.classList.contains("edit")) {
    const id = e.target.parentElement.dataset.id;
    const title =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;

    const data = {
      id,
      title,
      body,
    };

    //Fill the input with current values
    ui.fillInput(data);
  }

  e.preventDefault();
}

// Cancel Edit State
function cancelEdit(e) {
  if (e.target.classList.contains("post-cancel")) {
    ui.changeState("add");
  }

  e.preventDefault();
}
