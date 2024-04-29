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
    location.reload();
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

window.onload = async function () {
  try {
      const comentariosSection = document.querySelector(".comentarios");
      const response = await fetch("/api/listarCalificar");
      const listaComentarios = await response.json();
      
      comentariosSection.innerHTML = "";

      listaComentarios.forEach(comentario => {
          // Create elements
          const nuevaDivision = document.createElement('div');
          const profileImg = document.createElement('img');
          const comentInfo = document.createElement('div');
          const dateSpan = document.createElement('span');
          const commentParagraph = document.createElement('p');
          const productImg = document.createElement('img');

          // Set attributes and classes
          profileImg.src = "../../../dist/imagenes/perfil.png";
          profileImg.id = "profileImg";
          nuevaDivision.id = "division";
          comentInfo.id = "comentInfo";

          nuevaDivision.appendChild(profileImg);
          
          // Create star icons for the rating
          for (let i = 0; i < 5; i++) {
              const star = document.createElement('span');
              star.classList.add('fa', 'fa-star');
              if (comentario.estrella && i < comentario.estrella) {
                  star.classList.add('checked');
              }
              comentInfo.appendChild(star);
          }

          // Set content
          dateSpan.textContent = comentario.date;
          commentParagraph.textContent = comentario.coment;
          productImg.src = "";

          // Append elements
          comentInfo.appendChild(dateSpan);
          comentInfo.appendChild(commentParagraph);
          comentInfo.appendChild(productImg);
          
          // Append elements to nuevaDivision
          nuevaDivision.appendChild(comentInfo);
          
          
          comentariosSection.appendChild(nuevaDivision);
      });
  } catch (error) {
      console.error("Error fetching comments:", error);
  }
}
