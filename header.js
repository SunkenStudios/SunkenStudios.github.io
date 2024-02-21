// Create a div element
const headerDiv = document.createElement('div');

// Set CSS styles for the div
headerDiv.style.position = 'fixed';
headerDiv.style.top = '0';
headerDiv.style.left = '0';
headerDiv.style.width = '100%';
headerDiv.style.zIndex = '1000'; // Ensure it's above other content

// Fetch header.html content
fetch('/header.html')
  .then(response => response.text())
  .then(html => {
    // Inject the header.html content into the div
    headerDiv.innerHTML = html;
  })
  .catch(error => {
    console.error('Error fetching header.html:', error);
  });

// Add the div to the body element
document.body.prepend(headerDiv);
