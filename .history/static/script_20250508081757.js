document.addEventListener('DOMContentLoaded', function() {
    // Initialize animated background elements
    initSocialIconsAnimation();
    
    // Add hover effects to form sections
    document.querySelectorAll('.form-section').forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add smooth scrolling to form sections
    document.querySelectorAll('.form-section h2').forEach(heading => {
        heading.addEventListener('click', function() {
            const section = this.parentElement;
            section.classList.toggle('expanded');
        });
    });
    
    // Print result functionality
    const printButton = document.getElementById('printResult');
    if (printButton) {
        printButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.print();
            showToast('Preparing to print...');
        });
    }
    
    // Form validation
    const form = document.querySelector('form');
    if (form) {
        // Add animation when selecting options
        const allSelects = form.querySelectorAll('select');
        allSelects.forEach(select => {
            select.addEventListener('change', function() {
                this.classList.add('selected');
                const formSection = this.closest('.form-section');
                formSection.classList.add('answered');
                setTimeout(() => {
                    this.classList.remove('selected');
                }, 500);
            });
        });
        
        form.addEventListener('submit', function(e) {
            let isValid = true;
            
            allSelects.forEach(select => {
                if (!select.value) {
                    isValid = false;
                    select.classList.add('error');
                } else {
                    select.classList.remove('error');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                showToast('Please answer all questions');
            } else {
                showToast('Processing your assessment...');
            }
        });
    }
    
    // Add interactive effect to social media icons
    document.querySelectorAll('.social-icons i').forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.5) rotate(15deg)';
            this.style.color = 'rgba(255, 255, 255, 0.6)';
            this.style.transition = 'all 0.3s ease';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.color = '';
        });
    });
});

// Enhanced function for social icons animation
function initSocialIconsAnimation() {
    const socialIcons = document.querySelectorAll('.social-icons i');
    
    // Skip if no icons
    if (!socialIcons.length) return;
    
    // Add random extra movement to icons
    socialIcons.forEach(icon => {
        setInterval(() => {
            // Random transform adjustments
            const moveX = (Math.random() - 0.5) * 15;
            const moveY = (Math.random() - 0.5) * 15;
            const rotate = Math.random() * 20 - 10;
            const scale = 1 + Math.random() * 0.2;
            
            // Apply subtle random movement
            icon.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${rotate}deg) scale(${scale})`;
            
            // Reset after animation
            setTimeout(() => {
                icon.style.transform = '';
                icon.style.transition = 'all 2s ease';
            }, 2000);
        }, Math.random() * 5000 + 5000); // Random interval between 5-10 seconds
    });
    
    // Add new social icons occasionally for visual interest
    setInterval(() => {
        addRandomSocialIcon();
    }, 8000);
}

// Function to add random social icons that float across the screen
function addRandomSocialIcon() {
    const background = document.querySelector('.animated-background');
    if (!background) return;
    
    // Array of possible social media icon classes
    const iconClasses = [
        'fa-facebook', 'fa-twitter', 'fa-instagram', 'fa-tiktok',
        'fa-youtube', 'fa-snapchat', 'fa-linkedin', 'fa-reddit',
        'fa-pinterest', 'fa-whatsapp', 'fa-telegram', 'fa-discord'
    ];
    
    // Create new icon
    const icon = document.createElement('i');
    icon.className = 'fab ' + iconClasses[Math.floor(Math.random() * iconClasses.length)];
    icon.style.position = 'absolute';
    icon.style.fontSize = Math.random() * 1.5 + 1.5 + 'rem';
    icon.style.color = 'rgba(255, 255, 255, 0.15)';
    icon.style.zIndex = '-1';
    
    // Set starting position (either left or right side)
    const startFromLeft = Math.random() > 0.5;
    icon.style.top = Math.random() * 100 + '%';
    
    if (startFromLeft) {
        icon.style.left = '-5%';
    } else {
        icon.style.left = '105%';
    }
    
    // Add to background
    background.appendChild(icon);
    
    // Animate across screen
    setTimeout(() => {
        icon.style.transition = 'all 15s linear';
        icon.style.left = startFromLeft ? '105%' : '-5%';
        icon.style.top = Math.random() * 100 + '%';
    }, 100);
    
    // Remove after animation completes
    setTimeout(() => {
        background.removeChild(icon);
    }, 15500);
}

// Toast notification function
function showToast(message) {
    // Check if toast container exists, create if not
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    // Add to container
    toastContainer.appendChild(toast);
    
    // Animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toastContainer.removeChild(toast);
        }, 300);
    }, 3000);
}