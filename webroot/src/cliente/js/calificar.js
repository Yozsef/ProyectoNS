function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

window.addEventListener('load', function() {
  closeForm();
});

document.getElementById("close").addEventListener("click", function(event) {
  event.preventDefault(); 
  closeForm(); 
});

document.getElementById("openform").addEventListener("click", function(event) {
  openForm(); 
});

// Event listener for form submission
document.getElementById("submit").addEventListener("click", async function(event) {
  event.preventDefault(); 
  console.log('Entro');
  if (validateInputs()) {
    console.log('valido');
    sendDataToServer();
    console.log('Data sent');
  }
});


function validateInputs() {
  var score = document.querySelector('input[name="punto"]:checked');
  var description = document.getElementById("rating").value;
  var errorDiv = document.querySelector('.error');

  errorDiv.innerHTML = "";

  if (!score) {
      errorDiv.innerHTML = "Please select a score.";
      return false;
  }

  if (description.trim() === "") {
      errorDiv.innerHTML = "Please enter a description.";
      return false;
  }

  return true;
}

function sendDataToServer() {
  // Get form data
  var formData = new FormData();
  var rating = document.getElementById("rating").value;
  var coment = document.querySelector('input[name="punto"]:checked').value;

  formData.append("coment", coment);
  formData.append("rating", rating);
  

  // Make a POST request to the server
  fetch("/api/agregarAlCalificar", {
    method: "POST",
    body: formData
  })
  .then(response => {
    if (response.ok) {
      console.log('Data sent');
    } else {
      throw new Error("Failed to send data to server");
    }
  })
  .catch(error => {
    console.error("Error:", error);
    // Handle error
  });
}
