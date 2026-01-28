// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
});

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const submitButton = contactForm.querySelector('button[type="submit"]');

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Get form values
        const firstName = contactForm.querySelector('[name="firstName"]').value.trim();
        const lastName = contactForm.querySelector('[name="lastName"]').value.trim();
        const email = contactForm.querySelector('[name="email"]').value.trim();
        const message = contactForm.querySelector('[name="message"]').value.trim();

        // Simple validation
        if (!firstName || !lastName || !email || !message) {
            showNotification('Please fill all fields', 'error');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        try {
            // Show loading state
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            // Send data to Google Apps Script
            const response = await fetch('https://script.google.com/macros/s/AKfycbyT-nFoX76E4kJJF9po_V4nvdsDkNaUxZFf5nf7RZ0xkKrmZcing0r5poXCywXFMVY/exec', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    message,
                    timestamp: new Date().toISOString()
                })
            });

            showNotification('Message sent successfully! We will contact you soon.');
            contactForm.reset();
        } catch (error) {
            console.error('Error:', error);
            showNotification('Failed to send message. Please try again later.', 'error');
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
    });
}

// Global notification function
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type} animate-fade`;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.add('opacity-0', 'transition-opacity', 'duration-300');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Append data to sheet
    sheet.appendRow([
      data.firstName,
      data.lastName,
      data.email,
      data.message,
      data.timestamp
    ]);
    
    // Send email notification
    const emailBody = `
      New Contact Form Submission:
      Name: ${data.firstName} ${data.lastName}
      Email: ${data.email}
      Message: ${data.message}
      Time: ${data.timestamp}
    `;
    
    MailApp.sendEmail({
      to: "your-email@example.com",
      subject: "New Contact Form Submission",
      body: emailBody
    });
    
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success',
      'message': 'Data saved successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
} 