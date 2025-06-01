// main.js - Main JavaScript for FS1 Engineering

// Dark mode toggle
function initDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const html = document.documentElement;
    
    // Check for saved user preference
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        html.setAttribute('data-theme', 'dark');
        if (darkModeToggle) darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                html.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            } else {
                html.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        });
    }
}

// Back to top button
function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initBackToTop();
    initSmoothScrolling();
    
    // Initialize any topic toggles on the page
    document.querySelectorAll('.topic-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !expanded);
            
            const content = this.nextElementSibling;
            content.classList.toggle('active');
        });
    });
    
    // Initialize solution toggles
    document.querySelectorAll('.practice-problem button').forEach(btn => {
        btn.addEventListener('click', function() {
            const solution = this.nextElementSibling;
            solution.classList.toggle('active');
            
            if (solution.classList.contains('active')) {
                this.textContent = 'Hide Solution';
            } else {
                this.textContent = 'Show Solution';
            }
        });
    });
});

// Flashcard system - can be used across pages
class FlashcardSystem {
    constructor(containerId, cards) {
        this.container = document.getElementById(containerId);
        this.cards = cards;
        this.currentIndex = 0;
        
        if (this.container) {
            this.init();
        }
    }
    
    init() {
        this.updateCard();
        
        // Add event listeners for navigation if elements exist
        const nextBtn = this.container.querySelector('.flashcard-nav .btn-primary');
        const prevBtn = this.container.querySelector('.flashcard-nav .btn-outline:first-child');
        const againBtn = this.container.querySelector('.flashcard-actions .btn-outline:first-child');
        const goodBtn = this.container.querySelector('.flashcard-actions .btn-outline:last-child');
        
        if (nextBtn) nextBtn.addEventListener('click', () => this.next());
        if (prevBtn) prevBtn.addEventListener('click', () => this.prev());
        if (againBtn) againBtn.addEventListener('click', () => this.mark('again'));
        if (goodBtn) goodBtn.addEventListener('click', () => this.mark('good'));
    }
    
    updateCard() {
        const flashcard = this.container.querySelector('.flashcard');
        const questionElement = this.container.querySelector('.flashcard-question');
        const answerElement = this.container.querySelector('.flashcard-answer');
        const progressElement = this.container.querySelector('.flashcard-progress');
        
        if (flashcard) flashcard.classList.remove('flipped');
        if (questionElement) questionElement.textContent = this.cards[this.currentIndex].question;
        if (answerElement) answerElement.textContent = this.cards[this.currentIndex].answer;
        if (progressElement) progressElement.textContent = `Card ${this.currentIndex + 1} of ${this.cards.length}`;
    }
    
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.cards.length;
        this.updateCard();
    }
    
    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
        this.updateCard();
    }
    
    mark(difficulty) {
        // In a real implementation, this would track spaced repetition data
        console.log(`Card marked as ${difficulty}`);
        this.next();
    }
}

// Initialize flashcards if they exist on the page
if (document.querySelector('.flashcard-container')) {
    const mathCards = [
        {
            question: "What is the derivative of sin(x)?",
            answer: "The derivative of sin(x) is cos(x)"
        },
        {
            question: "What is the integral of 1/x?",
            answer: "The integral of 1/x is ln|x| + C"
        },
        {
            question: "What is the product rule for differentiation?",
            answer: "d(uv)/dx = u(dv/dx) + v(du/dx)"
        }
    ];
    
    new FlashcardSystem('flashcard-container', mathCards);
}
