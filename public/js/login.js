// Function to handle user login form submission
const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

// Function to handle user sign-up form submission
const signupFormHandler = async (event) => {
  event.preventDefault();

  // Get user input from the sign-up form
  const username = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  // Check if all required fields are filled
  if (username && email && password) {
    // Send a POST request to the '/api/users' endpoint with user data
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    // If the response is successful, redirect to the user's profile page
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      // Display an alert with the error message if the response is not ok
      alert(response.statusText);
    }
  }
};

// Event listener for the login form submission
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

// Event listener for the sign-up form submission
document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
