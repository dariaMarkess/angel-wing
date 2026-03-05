// AngelWings Community — Enhanced Interactions
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initParallax();
    hideLoader();
    initTiltEffect();
    initDateTime();
});

// Hide loading screen
function hideLoader() {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 800);
}

// Create floating background particles
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }
    
    document.body.appendChild(particlesContainer);
}

// Parallax effect on mouse move
function initParallax() {
    const gifWrapper = document.querySelector('.gif-wrapper');
    const title = document.querySelector('.title');
    
    if (!gifWrapper || !title) return;
    
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
    
    function animate() {
        currentX += (mouseX - currentX) * 0.05;
        currentY += (mouseY - currentY) * 0.05;
        
        gifWrapper.style.transform = `translate(${currentX * 10}px, ${currentY * 10}px)`;
        title.style.transform = `translate(${-currentX * 5}px, ${-currentY * 5}px)`;
        
        requestAnimationFrame(animate);
    }
    animate();
}

// Tilt effect on GIF wrapper
function initTiltEffect() {
    const gifWrapper = document.querySelector('.gif-wrapper');
    if (!gifWrapper) return;
    
    gifWrapper.addEventListener('mousemove', (e) => {
        const rect = gifWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        gifWrapper.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    gifWrapper.addEventListener('mouseleave', () => {
        gifWrapper.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add ripple effect to social links
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            width: 100px;
            height: 100px;
            background: rgba(0,0,0,0.1);
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            left: ${x}px;
            top: ${y}px;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Date & Time functionality
function initDateTime() {
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');
    
    if (!timeElement || !dateElement) return;
    
    function updateDateTime() {
        const now = new Date();
        
        // Format time: HH:MM:SS
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes}:${seconds}`;
        
        // Format date: DD.MM.YYYY
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        dateElement.textContent = `${day}.${month}.${year}`;
    }
    
    updateDateTime();
    setInterval(updateDateTime, 1000);
}
