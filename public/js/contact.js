document.addEventListener('DOMContentLoaded', () => {
    // Function to handle the form submission
    const contactFormHandler = async (event) => {
      event.preventDefault();
  
      // Get the updated title, content, and location values from the form
      const email = document.querySelector('#email-contact').value.trim();
      const name = document.querySelector('#name-contact').value.trim();
      const message = document.querySelector('#message-contact').value.trim();
  
      // Retrieve the post ID from the URL
      const postId = window.location.pathname.split('/').pop();
  
      // Send a PUT request to update the post
      const response = await fetch(`/api/contact/`, {
        method: 'POST',
        body: JSON.stringify({ email, name, message }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        // Redirect to thank you page
        window.location.href = '/thankyou';
      } else {
        alert('Failed to update post');
      }
    };
  
    // Add an event listener for the form submission
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', contactFormHandler);
    }
  });
  