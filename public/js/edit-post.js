document.addEventListener('DOMContentLoaded', () => {
  // Function to handle the form submission
  const editFormHandler = async (event) => {
    event.preventDefault();

    // Get the updated title, content, and location values from the form
    const title = document.querySelector('#edit-post-title').value.trim();
    const content = document.querySelector('#edit-post-content').value.trim();
    const location = document.querySelector('#edit-post-location').value.trim();

    // Retrieve the post ID from the URL
    const postId = window.location.pathname.split('/').pop();

    // Send a PUT request to update the post
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content, location }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
    if (response.ok) {
      // Redirect to the updated post page
      window.location.href = `/post/${postId}`;
    } else {
      alert('Failed to update post');
    }
  };

  // Add an event listener for the form submission
  const editPostForm = document.querySelector('#edit-post-form');
  if (editPostForm) {
    editPostForm.addEventListener('submit', editFormHandler);
  }
});
