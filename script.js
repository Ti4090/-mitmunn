// DOM Elements - with null checks
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const committeeCards = document.querySelectorAll('.committee-card');
const backToCommittees = document.getElementById('back-to-committees');
const faqItems = document.querySelectorAll('.faq-item');

// Device detection - moved to top for use throughout file
const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isLowEndDevice = navigator.hardwareConcurrency <= 4 || navigator.deviceMemory <= 4;

// Committee data - optimized without cover images
const committees = [
    {
        name: "SPECPOL",
        description: "Addressing Neo-Colonial Challenges to the Political Independence of Member States.",
        agenda: "Addressing Neo-Colonial Challenges to the Political Independence of Member States.",
        usg: "Muna Al ISA",
        coUsg: "Ela GÜL",
        usgImage: "muna.jpg",
        coUsgImage: "ELA.jpg"
    },
    {
        name: "DISEC",
        description: "Disec: Myanmar Civil War. The civil war in Myanmar, sparked by the military coup, has led to a deep humanitarian crisis, making civilian protection and regional stability urgent priorities for the international community.",
        agenda: "Myanmar Civil War.",
        usg: "Mustafa Aytuğ DİNÇER",
        coUsg: null,
        usgImage: "mustafa.jpg",
        coUsgImage: null
    },
    {
        name: "UNDP",
        description: "The UNDP committee focuses on promoting sustainable development, reducing poverty, and improving quality of life around the world. Through innovative programs and international cooperation, it addresses global challenges such as inequality, climate change, and economic development, striving to create a more just and resilient world.",
        agenda: "Preventing the adverse impacts of inadequate education on social development in low-income countries.Enhancing the role of innovative entrepreneurship on the economic development of middle-income developing countries in the Eurasia Region.",
        usg: "Esma Deniz",
        coUsg: "Yusuf Agah DOĞAN",
        usgImage: "esma.jpg",
        coUsgImage: "yusuf.jpg"
    },
    {
        name: "CGF",
        description: "The Consumer Goods Forum (CGF) committee and its company representatives will discuss possible improvement ideas to meet customer expectations and enhance the shopping experience, as well as identify and sanction companies that violate ethical and security standards..",
        agenda: "The possible improvments about increasing the consumer satisfaction and fitting the expectation with also detecting the companies that violates the ethical and security matters for the future.",
        usg: "Leyla ÇAYAN",
        coUsg: "Ali Said KIVANÇ",
        usgImage: "leyla.jpg",
        coUsgImage: "ali.jpg"
    },
    {
        name: "NATO",
        description: "Hybrid Thearts: GPS Jamming And Broader Security Risks to NATO Attacks on GPS signals create an invisible battlefield. These hybrid threats endanger not only navigation but also NATO’s operational security. How prepared are we for this new generation of risks?.",
        agenda: "Hybrid Threats:GPS Jamming Broader Security Risks to NATO.",
        usg: "Neşet Erdem AĞIRMAN",
        coUsg: null,
        usgImage: "erdem.jpg",
        coUsgImage: null
    },
    {
        name: "JCC",
        description: "This committee, where the religious and political conflicts that shook Europe in the 15th century will be discussed, offers the opportunity to reconstruct the flow of history..",
        agenda: "The Hussite Wars.",
        usg: "Mehmet Ekrem GÜNDÜZ",
        coUsg: "Ömer ÖZER",
        usgImage: "mehmet.jpg",
        coUsgImage: "ömer.jpg"
    },
    {
        name: "HCC",
        description: "HCC: The Fate Of French Republic 1792 A new republic born in the shadow of the revolution seeks its destiny among internal and external threats. Witness the turning point of history in this committee.",
        agenda: "The Fate of French Republic 1792.",
        usg: "Cemre Su ÖCAL",
        coUsg: null,
        usgImage: "cemre.jpg",
        coUsgImage: null
    },
    {
        name: "JCC-2",
        description: "II. In one of the most critical conflicts of the World War, strategic decisions that will determine the fate of Europe are brought to the table..",
        agenda: "Battele Of The Bulge:1944.",
        usg: "Enes NUGAYOĞLU",
        coUsg: "Ahmet HAYDAR",
        usgImage: "enes.jpg",
        coUsgImage: "ahmet1.jpg"
    }
];

// Performance optimization: Throttled functions
const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
};

// Debounced function for better performance
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Enhanced Dynamic Color System with better performance
let currentColorPhase = 0;
const colorPhases = [
    { textClass: 'text-phase-1', description: 'Burgundy background phase' },
    { textClass: 'text-phase-2', description: 'Black background phase' },
    { textClass: 'text-phase-3', description: 'White background phase' },
    { textClass: 'text-phase-4', description: 'Return to burgundy phase' }
];

// Optimized color application - reduced frequency
const applyDynamicTextColors = throttle(() => {
    const currentTime = Date.now();
    const cyclePosition = (currentTime / 1000) % 180; // 3 minute cycle for better performance
    
    let newPhase;
    if (cyclePosition < 45) {
        newPhase = 0;
    } else if (cyclePosition < 90) {
        newPhase = 1;
    } else if (cyclePosition < 135) {
        newPhase = 2;
    } else {
        newPhase = 3;
    }
    
    if (newPhase !== currentColorPhase) {
        currentColorPhase = newPhase;
        updateTextColors();
    }
}, 8000); // Even slower updates

function updateTextColors() {
    const dynamicElements = document.querySelectorAll('.page-title, .main-title, .nav-logo h2');
    const currentPhase = colorPhases[currentColorPhase];
    
    dynamicElements.forEach(element => {
        colorPhases.forEach(phase => {
            element.classList.remove(phase.textClass);
        });
        element.classList.add('dynamic-text', currentPhase.textClass);
    });
}

// Enhanced Navigation functionality
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Optimized page navigation - fixes back button and improves performance
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const targetPage = link.getAttribute('data-page');
        
        if (targetPage) {
            // Ensure only one page is active at a time
            showPage(targetPage);
            
            // Close mobile menu
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
            
            // Update URL and history properly
            const newUrl = window.location.pathname + '#' + targetPage;
            history.pushState({page: targetPage}, '', newUrl);
        }
        
        return false;
    });
});

// Handle browser back/forward buttons
window.addEventListener('popstate', (e) => {
    if (e.state && e.state.page) {
        showPage(e.state.page);
    } else {
        // If no state, check hash or default to home
        const hash = window.location.hash.substring(1);
        showPage(hash || 'home');
    }
});

function showPage(pageName) {
    // Hide ALL pages first to prevent multiple pages showing
    const allPages = document.querySelectorAll('.page');
    allPages.forEach(page => {
        page.classList.remove('active');
        page.style.display = 'none';
        page.style.opacity = '0';
    });
    
    // Show target page with smooth transition
    const targetPage = document.getElementById(pageName);
    if (targetPage) {
        targetPage.style.display = 'block';
        
        // Use requestAnimationFrame for smooth animation
        requestAnimationFrame(() => {
            targetPage.classList.add('active');
            targetPage.style.opacity = '1';
        });
    }
    
    // Update active nav link - ensure only one is active
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageName) {
            link.classList.add('active');
        }
    });
}

// Optimized committee cards functionality
committeeCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        showCommitteeDetail(index);
    });
});

function showCommitteeDetail(index) {
    const committee = committees[index];
    
    // Update committee detail content with null checks
    const detailTitle = document.getElementById('committee-detail-title');
    const descriptionText = document.getElementById('committee-description-text');
    const agendaText = document.getElementById('committee-agenda-text');
    
    if (detailTitle) detailTitle.textContent = committee.name;
    if (descriptionText) descriptionText.textContent = committee.description;
    if (agendaText) agendaText.textContent = committee.agenda;
    
    // Update USG information and images with null checks
    const usgImage = document.getElementById('usg-image');
    const coUsgImage = document.getElementById('co-usg-image');
    const usgName = document.getElementById('usg-name');
    const coUsgName = document.getElementById('co-usg-name');
    
    // Handle USG
    if (usgImage) {
        usgImage.src = committee.usgImage;
        usgImage.alt = `${committee.usg} Photo`;
    }
    if (usgName) usgName.textContent = committee.usg;
    
    // Handle Co-USG - hide if null
    const coUsgMember = document.getElementById('co-usg-member');
    if (committee.coUsg && committee.coUsg !== null) {
        if (coUsgImage) {
            coUsgImage.src = committee.coUsgImage;
            coUsgImage.alt = `${committee.coUsg} Photo`;
        }
        if (coUsgName) coUsgName.textContent = committee.coUsg;
        if (coUsgMember) coUsgMember.style.display = 'block';
    } else {
        if (coUsgMember) coUsgMember.style.display = 'none';
    }
    
    // Show committee detail page
    showPage('committee-detail');
    history.pushState({page: 'committee-detail'}, '', window.location.pathname + '#committee-detail');
}

// Back to committees functionality
if (backToCommittees) {
    backToCommittees.addEventListener('click', (e) => {
        e.preventDefault();
        showPage('committees');
        history.pushState({page: 'committees'}, '', window.location.pathname + '#committees');
    });
}

// Optimized FAQ functionality
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                if (faqItem !== item) {
                    faqItem.classList.remove('active');
                    const otherAnswer = faqItem.querySelector('.faq-answer');
                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = '0';
                    }
                }
            });
            
            // Toggle clicked item
            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                if (answer) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            } else {
                item.classList.remove('active');
                const answer = item.querySelector('.faq-answer');
                if (answer) {
                    answer.style.maxHeight = '0';
                }
            }
        });
    }
});

// Enhanced countdown functionality with 3D number changes
function updateCountdown() {
    const targetDate = new Date('December 5, 2025 00:00:00').getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;
    
    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        // Update with enhanced 3D animation
        // Show days without leading zero on all devices
        updateTimeUnit('days', String(days));
        updateTimeUnit('hours', hours.toString().padStart(2, '0'));
        updateTimeUnit('minutes', minutes.toString().padStart(2, '0'));
        updateTimeUnit('seconds', seconds.toString().padStart(2, '0'));
        
        // Update countdown colors based on background phase
        updateCountdownColors();
    } else {
        // Countdown finished
        updateTimeUnit('days', '000');
        updateTimeUnit('hours', '00');
        updateTimeUnit('minutes', '00');
        updateTimeUnit('seconds', '00');
    }
}

function updateTimeUnit(unitId, newValue) {
    const element = document.getElementById(unitId);
    if (!element) return;
    
    // Simple animation on value change
    if (element.textContent !== newValue) {
        element.classList.remove('changing');
        void element.offsetWidth; // Force reflow
        element.classList.add('changing');
        
        // Simple glow effect
        const timeUnit = element.closest('.time-unit');
        if (timeUnit) {
            timeUnit.style.background = 'linear-gradient(135deg, rgba(122, 31, 43, 0.9), rgba(255, 255, 255, 0.4))';
            timeUnit.style.borderColor = 'rgba(255, 255, 255, 0.8)';
        }
        
        // Reset after animation
        setTimeout(() => {
            element.textContent = newValue;
            element.classList.remove('changing');
            if (timeUnit) {
                timeUnit.style.background = '';
                timeUnit.style.borderColor = '';
            }
        }, 400);
    } else {
        element.textContent = newValue;
    }
}

// Optimized countdown colors with better performance
const updateCountdownColors = throttle(() => {
    const timeUnits = document.querySelectorAll('.time-unit');
    
    timeUnits.forEach((unit, index) => {
        let backgroundColor, borderColor;
        
        // Simplified color scheme
        if (index % 2 === 0) {
            backgroundColor = 'linear-gradient(135deg, rgba(122, 31, 43, 0.6), rgba(255, 255, 255, 0.2))';
            borderColor = 'rgba(122, 31, 43, 0.8)';
        } else {
            backgroundColor = 'linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(255, 255, 255, 0.2))';
            borderColor = 'rgba(0, 0, 0, 0.8)';
        }
        
        unit.style.background = backgroundColor;
        unit.style.borderColor = borderColor;
        
        const timeNumber = unit.querySelector('.time-number');
        const timeLabel = unit.querySelector('.time-label');
        if (timeNumber) {
            timeNumber.style.color = '#FFFFFF';
            timeNumber.style.textShadow = '2px 2px 6px rgba(0, 0, 0, 0.6)';
        }
        if (timeLabel) {
            timeLabel.style.color = 'rgba(255, 255, 255, 0.9)';
        }
    });
}, 2000); // Much less frequent updates

// Optimized scroll handling with reduced frequency
const handleScroll = throttle(() => {
    const scrolled = window.pageYOffset;
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        if (scrolled > 50) {
            navbar.style.background = 'linear-gradient(135deg, rgba(122, 31, 43, 1), rgba(122, 31, 43, 0.98))';
            navbar.style.boxShadow = '0 12px 40px rgba(122, 31, 43, 0.6)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, rgba(122, 31, 43, 0.98), rgba(122, 31, 43, 0.92))';
            navbar.style.boxShadow = '0 8px 32px rgba(122, 31, 43, 0.4)';
        }
    }
}, 32); // ~30fps instead of 60fps for better performance

// Intersection Observer for performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Event Listeners
window.addEventListener('scroll', () => {
    handleScroll();
});

// Initialize dynamic text colors with slower updates for better performance
setInterval(applyDynamicTextColors, 15000); // Much less frequent

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// Update countdown colors much less frequently
setInterval(updateCountdownColors, 30000); // Every 30 seconds

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
        
        faqItems.forEach(item => {
            item.classList.remove('active');
            const answer = item.querySelector('.faq-answer');
            if (answer) {
                answer.style.maxHeight = '0';
            }
        });
    }
});

// Initialize the application with proper history
function initializeApp() {
    try {
        // Show home page by default
        const hash = window.location.hash.substring(1);
        const initialPage = hash || 'home';
        
        showPage(initialPage);
        
        // Set initial history state
        if (!history.state) {
            history.replaceState({page: initialPage}, '', window.location.pathname + '#' + initialPage);
        }
        
        // Apply initial dynamic colors
        applyDynamicTextColors();
        
        // Observe elements for scroll animations with reduced frequency
        const observeElements = document.querySelectorAll('.committee-card, .executive-member, .study-guide-item, .application-card');
        observeElements.forEach(element => {
            observer.observe(element);
        });
        
        // Loading screen functionality removed
        
    } catch (error) {
        console.error('Error initializing app:', error);
        // Loading screen functionality removed
    }
}

// Multiple initialization attempts with mobile performance optimizations
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Mobile-specific performance settings
const enableGPUAcceleration = () => {
    const criticalElements = document.querySelectorAll('.countdown-container, .time-unit, .time-number, .main-title, .navbar');
    criticalElements.forEach(element => {
        element.style.willChange = 'transform';
        element.style.transform += ' translateZ(0)';
        element.style.backfaceVisibility = 'hidden';
        element.style.perspective = '1000px';
    });
};

// Optimized animation frame handling
const optimizedAnimationFrame = (callback) => {
    return requestAnimationFrame(() => {
        if (document.hidden) return;
        callback();
    });
};

// Preload critical images for better performance
const preloadCriticalImages = () => {
    const criticalImages = [
        'test4090.png',
        'specpol.jpg',
        'disec.jpg',
        'undp.jpg',
        'cgf.png',
        'nato.jpg'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
};

// Optimize CSS animations for better performance
const optimizeAnimations = () => {
    const style = document.createElement('style');
    style.textContent = `
        .time-unit, .time-number {
            will-change: transform, opacity;
            contain: layout style paint;
        }
        
        .countdown-container {
            contain: layout style;
        }
        
        /* Hardware acceleration for critical animations */
        .time-unit::before,
        .time-unit::after {
            will-change: transform, opacity;
            contain: strict;
        }
        
        /* Optimized 3D transforms */
        .time-unit {
            transform-origin: center center;
            contain: layout style paint;
        }
        
        /* Performance-friendly backdrop filters */
        @supports (backdrop-filter: blur(10px)) {
            .countdown-container {
                backdrop-filter: blur(15px);
            }
        }
        
        /* Reduce paint complexity on low-end devices */
        ${isLowEndDevice ? `
            .time-unit::before,
            .time-unit::after {
                display: none !important;
            }
            .countdown-container {
                backdrop-filter: none;
            }
        ` : ''}
    `;
    document.head.appendChild(style);
};

// Battery and performance aware optimizations
const setupBatteryOptimizations = () => {
    if ('getBattery' in navigator) {
        navigator.getBattery().then(battery => {
            const isLowBattery = battery.level < 0.2 || battery.charging === false;
            
            if (isLowBattery) {
                // Reduce animation complexity when battery is low
                const style = document.createElement('style');
                style.textContent = `
                    .time-unit::before,
                    .time-unit::after {
                        animation-duration: 8s !important;
                    }
                    .number3DFlip,
                    .number3DFlipMobile,
                    .number3DFlipSmall {
                        animation-duration: 0.3s !important;
                    }
                `;
                document.head.appendChild(style);
            }
        });
    }
};

// Intersection observer for performance-aware visibility
const setupPerformanceObserver = () => {
    const countdownObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const countdown = entry.target;
            if (entry.isIntersecting) {
                countdown.style.willChange = 'transform';
                countdown.classList.add('visible');
            } else {
                countdown.style.willChange = 'auto';
                countdown.classList.remove('visible');
            }
        });
    }, {
        rootMargin: '50px'
    });
    
    const countdownContainer = document.querySelector('.countdown-container');
    if (countdownContainer) {
        countdownObserver.observe(countdownContainer);
    }
};

// Memory management optimization
const setupMemoryManagement = () => {
    let memoryCleanupInterval = setInterval(() => {
        // Force garbage collection hint if available
        if (window.gc) {
            window.gc();
        }
        
        // Clean up unused event listeners
        const unusedElements = document.querySelectorAll('[data-cleanup="true"]');
        unusedElements.forEach(el => {
            el.remove();
        });
    }, 30000); // Every 30 seconds
    
    // Clear interval on page unload
    window.addEventListener('beforeunload', () => {
        clearInterval(memoryCleanupInterval);
    });
};

// Simple mobile optimizations - Keep animations working

// Loading screen management removed - no loading screen element exists

// Optimized image lazy loading
function setupImageLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Simple touch optimizations
function setupTouchOptimizations() {
    // Just add basic touch feedback
    const buttons = document.querySelectorAll('.apply-btn, .large-apply-btn, .application-btn, .download-btn, .venue-btn, .committee-card');
    buttons.forEach(btn => {
        btn.addEventListener('touchstart', () => {
            btn.style.transform = 'scale(0.98)';
        }, { passive: true });
        
        btn.addEventListener('touchend', () => {
            btn.style.transform = '';
        }, { passive: true });
    });
}

// Simple countdown for all devices
function optimizeCountdownForMobile() {
    // Just ensure countdown works on all devices
    updateCountdown();
}

// Network-aware optimizations
function setupNetworkOptimizations() {
    if ('connection' in navigator) {
        const connection = navigator.connection;
        
        // If on slow connection, disable expensive features
        if (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
            // Disable background animations
            document.body.style.animation = 'none';
            
            // Remove all backdrop filters
            const elements = document.querySelectorAll('[style*="backdrop-filter"], .navbar, .countdown-container, .committee-card');
            elements.forEach(el => {
                el.style.backdropFilter = 'none';
                el.style.webkitBackdropFilter = 'none';
            });
        }
    }
}

// Reduce motion for users who prefer it or are on low-end devices
function setupReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion || isLowEndDevice) {
        // Disable all animations
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Memory management for better mobile performance
function setupMemoryOptimization() {
    // Clear unused event listeners on page change
    const originalShowPage = showPage;
    showPage = function(pageName) {
        // Clean up any existing intervals or timeouts specific to previous page
        if (window.pageSpecificInterval) {
            clearInterval(window.pageSpecificInterval);
        }
        
        // Call original function
        originalShowPage(pageName);
        
        // Force garbage collection hint (if available)
        if (window.gc) {
            setTimeout(window.gc, 1000);
        }
    };
}

// Initialize all mobile optimizations
function initializeMobileOptimizations() {
    try {
        setupImageLazyLoading();
        setupTouchOptimizations();
        optimizeCountdownForMobile();
        setupNetworkOptimizations();
        setupReducedMotion();
        setupMemoryOptimization();
        
        // New performance optimizations
        enableGPUAcceleration();
        preloadCriticalImages();
        optimizeAnimations();
        setupBatteryOptimizations();
        setupPerformanceObserver();
        setupMemoryManagement();
        
        // Loading screen functionality removed
        
        // Loading screen functionality removed
        
    } catch (error) {
        console.error('Error in mobile optimizations:', error);
        // Loading screen functionality removed
    }
}

// Enhanced error handling
window.addEventListener('error', (e) => {
    console.warn('Performance: Error caught:', e.error);
    // Loading screen functionality removed
});

window.addEventListener('unhandledrejection', (e) => {
    console.warn('Performance: Unhandled promise rejection:', e.reason);
    // Loading screen functionality removed
});

// Run mobile optimizations after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMobileOptimizations);
} else {
    initializeMobileOptimizations();
}

// Simple viewport optimization
function optimizeViewport() {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, viewport-fit=cover');
    }
}

optimizeViewport();


// Backup initialization
setTimeout(() => {
    const homePage = document.getElementById('home');
    if (homePage && !homePage.classList.contains('active')) {
        initializeApp();
    }
}, 500);

// Performance monitoring and cleanup
let animationFrameId;
const cleanupAnimations = () => {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
};

// Cleanup on page unload
window.addEventListener('beforeunload', cleanupAnimations);

// PDF download function
function downloadPDF(pdfPath) {
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = pdfPath.split('/').pop(); // Dosya adını ayarlar
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}