// Function to handle user logout
const logout = async () => {
  // Send a POST request to the '/api/users/logout' endpoint to log the user out
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    // If the logout is successful, redirect the browser to the home page
    document.location.replace('/');
  } else {
    // Display an alert with the error message if the logout fails
    alert(response.statusText);
  }
};

// Add a click event listener to the 'Logout' button to trigger the logout function
document.querySelector('#logout').addEventListener('click', logout);
