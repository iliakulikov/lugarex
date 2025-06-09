// Parse the URL parameters
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// get GCLID
window.onload = function getGclid() {
  var value = getParameterByName("gclid");
  var e = document.getElementById("gclid");
  e.value = value;
}

// Post to spreadsheets and redirect on success
const scriptURL = 'https://script.google.com/macros/s/AKfycbxiERz7EOJMyvBtpfU7DiLi4VqY-Emrvm56OYe4ohGUR1olGhEivD9u-U6gmzDD9xw/exec';
const form = document.forms['submit-to-google-sheet'];

document.forms['submit-to-google-sheet'].addEventListener('submit', function(event) {
  event.preventDefault();  // Prevent the default form submission action

  // Check if the form is valid
  if (this.checkValidity()) {

      // Show the spinner
      document.getElementById('spinner').style.display = 'block';

      // Send data to the spreadsheet
      fetch(scriptURL, { method: 'POST', body: new FormData(form) })
          .then(response => {
              // On success, redirect to thankyou page
              window.location.href = 'thankyou.html';
          })
          .catch(error => {
              document.getElementById('spinner').style.display = 'none';
              console.error('Error!', error.message);
          });
  }
});

// cookies close button
function cookieClose() {
  document.getElementById("cookie-message").style.display = "none";
}

// Video background functionality
function loadHeroVideo() {
  var heroVideo = document.getElementById("hero-video");
  if (heroVideo) {
    heroVideo.style.display = "block";
    heroVideo.load(); // Ensure video is loaded
  }
}

// Load video after page is fully loaded
window.addEventListener('load', loadHeroVideo);

