/**
 * Main Application Entry Point
 * Initializes the application and handles global events
 */

class EmployeeDirectoryApp {
    constructor() {
        this.isInitialized = false;
        this.init();
    }

    /**
     * Initialize the application
     */
    init() {
        try {
            // Initialize form validation
            const form = document.getElementById('employee-form');
            if (form) {
                uiValidator.init(form);
            }

            // Initialize UI controller
            if (uiController) {
                // UI controller is already initialized in its constructor
                console.log('UI Controller initialized successfully');
            }

            // Setup global event listeners
            this.setupGlobalEvents();

            // Mark as initialized
            this.isInitialized = true;
            
            console.log('Employee Directory Application initialized successfully');
            
            // Show initial loading state briefly
            this.showInitialLoading();
            
        } catch (error) {
            console.error('Failed to initialize application:', error);
            this.showErrorMessage('Failed to initialize application. Please refresh the page.');
        }
    }

    /**
     * Setup global event listeners
     */
    setupGlobalEvents() {
        // Handle keyboard shortcuts
        document.addEventListener('keydown', this.handleKeyboardShortcuts.bind(this));

        // Handle window resize for responsive design
        window.addEventListener('resize', this.handleWindowResize.bind(this));

        // Handle page visibility changes
        document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));

        // Handle beforeunload for unsaved changes
        window.addEventListener('beforeunload', this.handleBeforeUnload.bind(this));
    }

    /**
     * Handle keyboard shortcuts
     * @param {KeyboardEvent} event - Keyboard event
     */
    handleKeyboardShortcuts(event) {
        // Only handle shortcuts when not in form inputs
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'SELECT' || event.target.tagName === 'TEXTAREA') {
            return;
        }

        // Ctrl/Cmd + N: Add new employee
        if ((event.ctrlKey || event.metaKey) && event.key === 'n') {
            event.preventDefault();
            if (uiController) {
                uiController.openAddForm();
            }
        }

        // Ctrl/Cmd + F: Focus search
        if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
            event.preventDefault();
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
            }
        }

        // Escape: Close modal or filter panel
        if (event.key === 'Escape') {
            if (uiController && uiController.isFormOpen) {
                uiController.closeModal();
            } else if (uiController && uiController.isFilterPanelOpen) {
                uiController.toggleFilterPanel();
            }
        }
    }

    /**
     * Handle window resize
     */
    handleWindowResize() {
        // Debounce resize events
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            this.handleResponsiveLayout();
        }, 250);
    }

    /**
     * Handle responsive layout changes
     */
    handleResponsiveLayout() {
        const width = window.innerWidth;
        
        // Auto-close filter panel on mobile
        if (width < 768 && uiController && uiController.isFilterPanelOpen) {
            uiController.toggleFilterPanel();
        }
    }

    /**
     * Handle page visibility change
     */
    handleVisibilityChange() {
        if (document.hidden) {
            // Page is hidden - could save state here
            console.log('Page hidden');
        } else {
            // Page is visible - could refresh data here
            console.log('Page visible');
        }
    }

    /**
     * Handle before unload
     * @param {BeforeUnloadEvent} event - Before unload event
     */
    handleBeforeUnload(event) {
        // Check if there are unsaved changes in the form
        if (uiController && uiController.isFormOpen) {
            const form = document.getElementById('employee-form');
            if (form) {
                const formData = new FormData(form);
                let hasChanges = false;
                
                for (let [key, value] of formData.entries()) {
                    if (value.trim() !== '') {
                        hasChanges = true;
                        break;
                    }
                }
                
                if (hasChanges) {
                    event.preventDefault();
                    event.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
                    return 'You have unsaved changes. Are you sure you want to leave?';
                }
            }
        }
    }

    /**
     * Show initial loading state
     */
    showInitialLoading() {
        if (uiController) {
            uiController.showLoading();
            
            // Simulate loading time
            setTimeout(() => {
                uiController.hideLoading();
            }, 500);
        }
    }

    /**
     * Show error message
     * @param {string} message - Error message
     */
    showErrorMessage(message) {
        // Create error notification
        const notification = document.createElement('div');
        notification.className = 'notification notification--error';
        notification.innerHTML = `
            <div class="notification__content">
                <svg class="notification__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
                <span class="notification__message">${message}</span>
                <button class="notification__close">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);
        
        // Setup close button
        const closeBtn = notification.querySelector('.notification__close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            });
        }
    }

    /**
     * Show success message
     * @param {string} message - Success message
     */
    showSuccessMessage(message) {
        // Create success notification
        const notification = document.createElement('div');
        notification.className = 'notification notification--success';
        notification.innerHTML = `
            <div class="notification__content">
                <svg class="notification__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
                <span class="notification__message">${message}</span>
                <button class="notification__close">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
        
        // Setup close button
        const closeBtn = notification.querySelector('.notification__close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            });
        }
    }

    /**
     * Get application status
     * @returns {Object} Application status object
     */
    getStatus() {
        return {
            isInitialized: this.isInitialized,
            totalEmployees: employeeManager ? employeeManager.getTotalEmployeeCount() : 0,
            filteredEmployees: employeeManager ? employeeManager.getFilteredEmployeeCount() : 0,
            hasActiveFilters: employeeManager ? employeeManager.hasActiveFilters() : false,
            isFormOpen: uiController ? uiController.isFormOpen : false,
            isFilterPanelOpen: uiController ? uiController.isFilterPanelOpen : false
        };
    }

    /**
     * Reset application to initial state
     */
    reset() {
        if (employeeManager) {
            employeeManager.resetData();
        }
        if (uiController) {
            uiController.renderEmployees();
            uiController.updateUI();
        }
        this.showSuccessMessage('Application reset to initial state');
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing application...');
    
    // Create global app instance
    window.employeeDirectoryApp = new EmployeeDirectoryApp();
    
    // FAB Add Employee button (mobile)
    const fab = document.getElementById('fab-add-employee');
    if (fab && window.uiController) {
        fab.addEventListener('click', () => window.uiController.openAddForm());
    }

    // Dark mode toggle logic
    const darkToggle = document.getElementById('dark-mode-toggle');
    const iconMoon = document.getElementById('icon-moon');
    const iconSun = document.getElementById('icon-sun');
    function setDarkMode(enabled) {
        document.body.classList.toggle('dark-mode', enabled);
        if (iconMoon && iconSun) {
            iconMoon.style.display = enabled ? 'none' : '';
            iconSun.style.display = enabled ? '' : 'none';
        }
    }
    // Load preference
    const saved = localStorage.getItem('ajackus-dark-mode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(saved === 'true' || (saved === null && prefersDark));
    if (darkToggle) {
        darkToggle.addEventListener('click', () => {
            const enabled = !document.body.classList.contains('dark-mode');
            setDarkMode(enabled);
            localStorage.setItem('ajackus-dark-mode', enabled);
        });
    }
    
    // Expose useful functions globally for debugging
    window.appUtils = {
        getStatus: () => window.employeeDirectoryApp.getStatus(),
        reset: () => window.employeeDirectoryApp.reset(),
        showSuccess: (message) => window.employeeDirectoryApp.showSuccessMessage(message),
        showError: (message) => window.employeeDirectoryApp.showErrorMessage(message)
    };
    
    console.log('Employee Directory Application loaded successfully');
    console.log('Global app instance:', window.employeeDirectoryApp);
    console.log('Global app utils:', window.appUtils);
});

// Handle any unhandled errors
window.addEventListener('error', (event) => {
    console.error('Unhandled error:', event.error);
    if (window.employeeDirectoryApp) {
        window.employeeDirectoryApp.showErrorMessage('An unexpected error occurred. Please refresh the page.');
    }
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    if (window.employeeDirectoryApp) {
        window.employeeDirectoryApp.showErrorMessage('An unexpected error occurred. Please refresh the page.');
    }
}); 