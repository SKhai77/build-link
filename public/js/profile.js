// Function to handle the submission of a new post form
const newFormHandler = async (event) => {
  event.preventDefault();

  // Get the title and content values from the form
  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-desc').value.trim();

  // Get the user_id from the hidden input field
  const user_id = document.querySelector('#user-id').value;

  if (title && content) {
    // Send a POST request to create a new post
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title, content, user_id }), // Include user_id
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // If successful, redirect to the user's profile page
      document.location.replace('/profile');
    } else {
      alert('Failed to create post');
    }
  }
};

// Function to handle the click event on delete and edit buttons
const buttonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const action = event.target.getAttribute('data-action');

    if (action === 'delete') {
      // Send a DELETE request to delete a post by its ID
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // If successful, reload the page to refresh the post list
        location.reload();
      } else {
        // Display an alert if post deletion fails
        alert('Failed to delete post');
      }
    } else if (action === 'edit') {
      // Redirect to the edit post page
      document.location.href = `/edit-post/${id}`;
    }
  }
};

// Add event listeners for form submission and button clicks
document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.post-list')
  .addEventListener('click', buttonHandler);

// Add an event listener for the edit post form submission
document
  .querySelector('#edit-post-form')
  .addEventListener('submit', async (event) => {
    event.preventDefault();

    // Get the updated title and content values from the form
    const title = document.querySelector('#edit-post-title').value.trim();
    const content = document.querySelector('#edit-post-content').value.trim();

    // Get the post ID from the URL
    const postId = window.location.pathname.split('/').pop();

    if (title && content) {
      // Send a PUT request to update the post
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // If successful, redirect to the post page
        document.location.replace(`/post/${postId}`);
      } else {
        alert('Failed to update post');
      }
    }
  });
