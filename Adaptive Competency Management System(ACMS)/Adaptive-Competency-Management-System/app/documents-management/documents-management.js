$('#mySidenav').load('../common/sidenav.html');

// Function to handle form submission (upload document)
document.getElementById('documentUploadForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting normally

    // Get form data
    const formData = new FormData(this);

    // Perform AJAX request to upload document
    fetch('YOUR_UPLOAD_ENDPOINT_URL', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log('Upload successful:', data);

      // Add uploaded document to the list
      const documentType = formData.get('documentType');
      const fileName = formData.get('documentFile').name;

      const documentsList = document.getElementById('documentsList');
      const card = document.createElement('div');
      card.classList.add('col-md-6', 'mb-4');
      card.innerHTML = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${documentType}</h5>
            <p class="card-text">${fileName}</p>
            <a href="#" class="btn btn-primary">View Document</a>
          </div>
        </div>
      `;
      documentsList.appendChild(card);

      // Clear form inputs after successful upload
      document.getElementById('select').value = '';
      document.getElementById('documentFile').value = '';
      document.querySelector('.custom-file-label').textContent = 'Choose File';
    })
    .catch(error => {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    });
  });