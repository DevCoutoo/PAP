// Login Form Submission
document.getElementById('loginForm')?.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission

  // Get input values
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;

  // Simple validation
  if (!username || !password) {
    showError('Please fill in all fields.');
    return;
  }

  // Simulate login logic
  if (role === 'student') {
    alert(`Welcome, Student ${username}! Redirecting to Student Dashboard...`);
    window.location.href = 'student-dashboard.html'; // Redirect to student dashboard
  } else if (role === 'teacher') {
    alert(`Welcome, Teacher/Admin ${username}! Redirecting to Teacher/Admin Dashboard...`);
    window.location.href = 'teacher-dashboard.html'; // Redirect to teacher dashboard
  }
});

// Show Error Message
function showError(message) {
  const errorElement = document.getElementById('error-message');
  if (errorElement) {
    errorElement.textContent = message;
  }
}

// Logout Functionality
document.getElementById('logoutBtn')?.addEventListener('click', function () {
  alert('Logging out...');
  window.location.href = 'index.html'; // Redirect to login page
});

// Show/Hide Create Item Form
document.getElementById('createItemBtn')?.addEventListener('click', function () {
  const form = document.getElementById('itemForm');
  if (form) {
    form.classList.toggle('visible'); // Toggle form visibility
  }
});

// Handle Item Form Submission
document.getElementById('itemForm')?.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission

  // Get form values
  const itemName = document.getElementById('itemName').value;
  const itemImage = document.getElementById('itemImage').files[0];

  // Validate item name
  if (!itemName) {
    alert('Please enter an item name.');
    return;
  }

  // Create a new list item
  const newItem = document.createElement('li');

  // Add item name
  const itemNameSpan = document.createElement('span');
  itemNameSpan.textContent = itemName;
  newItem.appendChild(itemNameSpan);

  // Add item image if provided
  if (itemImage) {
    const image = document.createElement('img');
    image.src = URL.createObjectURL(itemImage);
    newItem.prepend(image); // Add image before the text
  }

  // Add Delete and Edit buttons
  const itemActions = document.createElement('div');
  itemActions.className = 'item-actions';

  const editButton = document.createElement('button');
  editButton.className = 'edit-btn';
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', function () {
    editItem(newItem);
  });

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-btn';
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', function () {
    newItem.remove(); // Remove the item from the list
  });

  itemActions.appendChild(editButton);
  itemActions.appendChild(deleteButton);
  newItem.appendChild(itemActions);

  // Add the new item to the list
  const createdItemsList = document.getElementById('createdItemsList');
  if (createdItemsList) {
    createdItemsList.appendChild(newItem);
  }

  // Reset the form
  document.getElementById('itemForm').reset();
  document.getElementById('itemForm').classList.remove('visible'); // Hide the form
});

// Edit Item Functionality
function editItem(item) {
  const itemNameSpan = item.querySelector('span');
  const itemImage = item.querySelector('img');

  // Prompt for new name
  const newName = prompt('Enter the new name for the item:', itemNameSpan.textContent);
  if (newName) {
    itemNameSpan.textContent = newName; // Update the item name
  }

  // Prompt for new image
  const newImage = confirm('Do you want to change the item image?');
  if (newImage) {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.addEventListener('change', function () {
      const file = fileInput.files[0];
      if (file) {
        if (itemImage) {
          itemImage.src = URL.createObjectURL(file); // Update the image
        } else {
          const newImageElement = document.createElement('img');
          newImageElement.src = URL.createObjectURL(file);
          item.prepend(newImageElement); // Add new image if it didn't exist
        }
      }
    });
    fileInput.click();
  }
}