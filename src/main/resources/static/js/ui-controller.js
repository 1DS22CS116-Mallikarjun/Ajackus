/**
 * UI Controller
 * Manages UI state, form display, and navigation
 */

class UIController {
    constructor(employeeManager, uiValidator) {
        this.employeeManager = employeeManager;
        this.uiValidator = uiValidator;
        this.currentEditId = null;
        this.isFormOpen = false;
        this.isFilterPanelOpen = false;
        
        this.elements = {
            app: null,
            employeeGrid: null,
            searchInput: null,
            filterToggle: null,
            filterPanel: null,
            sortSelect: null,
            itemsPerPage: null,
            pagination: null,
            employeeCount: null,
            pageInfo: null,
            modal: null,
            modalTitle: null,
            modalClose: null,
            form: null,
            formCancel: null,
            formSave: null,
            addEmployeeBtn: null,
            loadingOverlay: null
        };
        
        this.init();
    }

    /**
     * Initialize UI controller
     */
    init() {
        console.log('UIController initializing...');
        this.cacheElements();
        this.setupEventListeners();
        this.renderEmployees();
        this.updateUI();
        console.log('UIController initialized successfully');
    }

    /**
     * Cache DOM elements
     */
    cacheElements() {
        console.log('Caching DOM elements...');
        this.elements.app = document.getElementById('app');
        this.elements.employeeGrid = document.getElementById('employee-grid');
        this.elements.searchInput = document.getElementById('search-input');
        this.elements.filterToggle = document.getElementById('filter-toggle');
        this.elements.filterPanel = document.getElementById('filter-panel');
        this.elements.sortSelect = document.getElementById('sort-select');
        this.elements.itemsPerPage = document.getElementById('items-per-page');
        this.elements.pagination = document.getElementById('pagination');
        this.elements.employeeCount = document.getElementById('employee-count');
        this.elements.pageInfo = document.getElementById('page-info');
        this.elements.modal = document.getElementById('employee-modal');
        this.elements.modalTitle = document.getElementById('modal-title');
        this.elements.modalClose = document.getElementById('modal-close');
        this.elements.form = document.getElementById('employee-form');
        this.elements.formCancel = document.getElementById('form-cancel');
        this.elements.formSave = document.getElementById('form-save');
        this.elements.addEmployeeBtn = document.getElementById('add-employee-btn');
        this.elements.loadingOverlay = document.getElementById('loading-overlay');
        
        console.log('Add employee button:', this.elements.addEmployeeBtn);
        console.log('Modal element:', this.elements.modal);
        console.log('Modal title element:', this.elements.modalTitle);
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Search functionality
        if (this.elements.searchInput) {
            this.elements.searchInput.addEventListener('input', this.handleSearch.bind(this));
        }

        // Filter panel toggle
        if (this.elements.filterToggle) {
            this.elements.filterToggle.addEventListener('click', this.toggleFilterPanel.bind(this));
        }

        // Sort functionality
        if (this.elements.sortSelect) {
            this.elements.sortSelect.addEventListener('change', this.handleSort.bind(this));
        }

        // Items per page
        if (this.elements.itemsPerPage) {
            this.elements.itemsPerPage.addEventListener('change', this.handleItemsPerPage.bind(this));
        }

        // Add employee button
        if (this.elements.addEmployeeBtn) {
            console.log('Add employee button found, adding event listener');
            this.elements.addEmployeeBtn.addEventListener('click', this.openAddForm.bind(this));
        } else {
            console.error('Add employee button not found!');
        }

        // Modal events
        if (this.elements.modalClose) {
            this.elements.modalClose.addEventListener('click', this.closeModal.bind(this));
        }

        if (this.elements.modal) {
            this.elements.modal.addEventListener('click', (e) => {
                if (e.target === this.elements.modal || e.target.classList.contains('modal__overlay')) {
                    this.closeModal();
                }
            });
        }

        // Form events
        if (this.elements.form) {
            this.elements.form.addEventListener('submit', this.handleFormSubmit.bind(this));
        }

        if (this.elements.formCancel) {
            this.elements.formCancel.addEventListener('click', this.closeModal.bind(this));
        }

        // Filter panel events
        this.setupFilterPanelEvents();
    }

    /**
     * Setup filter panel event listeners
     */
    setupFilterPanelEvents() {
        const applyFiltersBtn = document.getElementById('apply-filters');
        const clearFiltersBtn = document.getElementById('clear-filters');
        const filterDepartment = document.getElementById('filter-department');
        const filterRole = document.getElementById('filter-role');

        if (applyFiltersBtn) {
            applyFiltersBtn.addEventListener('click', this.handleApplyFilters.bind(this));
        }

        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', this.handleClearFilters.bind(this));
        }

        if (filterDepartment) {
            filterDepartment.addEventListener('change', this.handleFilterChange.bind(this));
        }

        if (filterRole) {
            filterRole.addEventListener('change', this.handleFilterChange.bind(this));
        }
    }

    /**
     * Handle search input
     */
    handleSearch() {
        const searchTerm = this.elements.searchInput.value;
        this.employeeManager.setSearchFilter(searchTerm);
        this.renderEmployees();
        this.updateUI();
    }

    /**
     * Handle sort selection
     */
    handleSort() {
        const sortValue = this.elements.sortSelect.value;
        if (sortValue) {
            const [sortBy, sortOrder] = sortValue.split('-');
            this.employeeManager.setSort(sortBy, sortOrder);
        } else {
            this.employeeManager.setSort('', 'asc');
        }
        this.renderEmployees();
        this.updateUI();
    }

    /**
     * Handle items per page change
     */
    handleItemsPerPage() {
        const itemsPerPage = parseInt(this.elements.itemsPerPage.value);
        this.employeeManager.setPagination(1, itemsPerPage);
        this.renderEmployees();
        this.updateUI();
    }

    /**
     * Handle filter panel toggle
     */
    toggleFilterPanel() {
        this.isFilterPanelOpen = !this.isFilterPanelOpen;
        this.elements.filterPanel.classList.toggle('filter-panel--hidden', !this.isFilterPanelOpen);
        this.elements.filterToggle.classList.toggle('btn--active', this.isFilterPanelOpen);
    }

    /**
     * Handle filter changes
     */
    handleFilterChange() {
        const department = document.getElementById('filter-department').value;
        const role = document.getElementById('filter-role').value;
        
        this.employeeManager.setDepartmentFilter(department);
        this.employeeManager.setRoleFilter(role);
    }

    /**
     * Handle apply filters
     */
    handleApplyFilters() {
        this.renderEmployees();
        this.updateUI();
        this.toggleFilterPanel();
    }

    /**
     * Handle clear filters
     */
    handleClearFilters() {
        this.employeeManager.clearFilters();
        this.resetFilterForm();
        this.renderEmployees();
        this.updateUI();
    }

    /**
     * Reset filter form
     */
    resetFilterForm() {
        const filterDepartment = document.getElementById('filter-department');
        const filterRole = document.getElementById('filter-role');
        
        if (filterDepartment) filterDepartment.value = '';
        if (filterRole) filterRole.value = '';
    }

    /**
     * Open add employee form
     */
    openAddForm() {
        console.log('openAddForm called');
        this.currentEditId = null;
        this.openModal('Add Employee');
        this.resetForm();
    }

    /**
     * Open edit employee form
     * @param {number} employeeId - Employee ID to edit
     */
    openEditForm(employeeId) {
        const employee = this.employeeManager.getEmployeeById(employeeId);
        if (!employee) return;

        this.currentEditId = employeeId;
        this.openModal('Edit Employee');
        this.populateForm(employee);
    }

    /**
     * Open modal
     * @param {string} title - Modal title
     */
    openModal(title) {
        console.log('openModal called with title:', title);
        console.log('Modal element:', this.elements.modal);
        console.log('Modal title element:', this.elements.modalTitle);
        
        this.elements.modalTitle.textContent = title;
        this.elements.modal.classList.remove('modal--hidden');
        this.isFormOpen = true;
        
        // Focus first input
        const firstInput = this.elements.form.querySelector('input, select');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }

    /**
     * Close modal
     */
    closeModal() {
        this.elements.modal.classList.add('modal--hidden');
        this.isFormOpen = false;
        this.currentEditId = null;
        this.uiValidator.reset();
    }

    /**
     * Reset form
     */
    resetForm() {
        this.elements.form.reset();
        this.uiValidator.reset();
    }

    /**
     * Populate form with employee data
     * @param {Object} employee - Employee object
     */
    populateForm(employee) {
        const fields = ['firstName', 'lastName', 'email', 'department', 'role'];
        fields.forEach(field => {
            const input = document.getElementById(field);
            if (input) {
                input.value = employee[field] || '';
            }
        });
    }

    /**
     * Handle form submission
     * @param {Event} event - Form submit event
     */
    handleFormSubmit(event) {
        event.preventDefault();
        
        if (!this.uiValidator.validateForm()) {
            return;
        }

        const formData = this.uiValidator.getFormData();
        this.showLoading();
        setTimeout(() => { // Simulate async save
            try {
                if (this.currentEditId) {
                    // Update existing employee
                    const updatedEmployee = this.employeeManager.updateEmployee(this.currentEditId, formData);
                    if (updatedEmployee) {
                        this.showSuccessMessage('Employee updated successfully!');
                    } else {
                        this.showErrorMessage('Failed to update employee.');
                    }
                } else {
                    // Add new employee
                    const newEmployee = this.employeeManager.addEmployee(formData);
                    this.showSuccessMessage('Employee added successfully!');
                }
                this.closeModal();
                this.renderEmployees();
                this.updateUI();
            } catch (error) {
                this.showErrorMessage('An error occurred. Please try again.');
                console.error('Form submission error:', error);
            } finally {
                this.hideLoading();
            }
        }, 700);
    }

    /**
     * Handle employee deletion
     * @param {number} employeeId - Employee ID to delete
     */
    handleDeleteEmployee(employeeId) {
        const employee = this.employeeManager.getEmployeeById(employeeId);
        if (!employee) return;

        const confirmMessage = `Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`;
        if (confirm(confirmMessage)) {
            this.showLoading();
            setTimeout(() => { // Simulate async delete
                const deleted = this.employeeManager.deleteEmployee(employeeId);
                if (deleted) {
                    this.showSuccessMessage('Employee deleted successfully!');
                    this.renderEmployees();
                    this.updateUI();
                } else {
                    this.showErrorMessage('Failed to delete employee.');
                }
                this.hideLoading();
            }, 700);
        }
    }

    /**
     * Render employee grid
     */
    renderEmployees() {
        const result = this.employeeManager.getEmployees();
        const employees = result.employees;
        const pagination = result.pagination;

        // Render employee cards
        this.elements.employeeGrid.innerHTML = employees.length > 0 
            ? employees.map(employee => this.createEmployeeCard(employee)).join('')
            : '<div class="no-results">No employees found matching your criteria.</div>';

        // Setup employee card event listeners
        this.setupEmployeeCardEvents();

        // Render pagination
        this.renderPagination(pagination);

        // Update counts
        this.updateCounts(pagination);
    }

    /**
     * Generate avatar color from employee name
     * @param {string} name
     * @returns {string} CSS color
     */
    getAvatarColor(name) {
        // Simple hash to pick a color
        const colors = [
            '#3b82f6', '#6366f1', '#10b981', '#f59e42', '#f43f5e', '#a21caf', '#eab308', '#0ea5e9', '#14b8a6', '#f472b6'
        ];
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    }

    /**
     * Get initials from name
     * @param {string} firstName
     * @param {string} lastName
     * @returns {string}
     */
    getInitials(firstName, lastName) {
        return (
            (firstName ? firstName[0] : '') + (lastName ? lastName[0] : '')
        ).toUpperCase();
    }

    /**
     * Highlight search matches in text
     * @param {string} text
     * @param {string} searchTerm
     * @returns {string}
     */
    highlightMatch(text, searchTerm) {
        if (!searchTerm) return text;
        const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        return text.replace(regex, '<mark class="search-highlight">$1</mark>');
    }

    /**
     * Create employee card HTML
     * @param {Object} employee - Employee object
     * @returns {string} HTML string for employee card
     */
    createEmployeeCard(employee) {
        const initials = this.getInitials(employee.firstName, employee.lastName);
        const avatarColor = this.getAvatarColor(employee.firstName + employee.lastName);
        const searchTerm = this.employeeManager.currentFilters.search;
        const name = this.highlightMatch(employee.firstName + ' ' + employee.lastName, searchTerm);
        const email = this.highlightMatch(employee.email, searchTerm);
        return `
            <div class="employee-card" data-employee-id="${employee.id}">
                <div class="employee-card__header">
                    <div class="employee-card__avatar" style="background:${avatarColor}">${initials}</div>
                    <div>
                        <h3 class="employee-card__name">${name}</h3>
                        <div class="employee-card__id">ID: ${employee.id}</div>
                    </div>
                </div>
                
                <div class="employee-card__content">
                    <div class="employee-card__info">
                        <div class="employee-card__email">
                            <svg class="employee-card__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                            ${email}
                        </div>
                        <div class="employee-card__department">
                            <svg class="employee-card__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                <line x1="8" y1="21" x2="16" y2="21"></line>
                                <line x1="12" y1="17" x2="12" y2="21"></line>
                            </svg>
                            ${employee.department}
                        </div>
                        <div class="employee-card__role">
                            <svg class="employee-card__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            ${employee.role}
                        </div>
                    </div>
                </div>
                
                <div class="employee-card__actions">
                    <button class="btn btn--small btn--secondary edit-btn" data-employee-id="${employee.id}">
                        <svg class="btn__icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                        Edit
                    </button>
                    <button class="btn btn--small btn--danger delete-btn" data-employee-id="${employee.id}">
                        <svg class="btn__icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3,6 5,6 21,6"></polyline>
                            <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
                        </svg>
                        Delete
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Setup employee card event listeners
     */
    setupEmployeeCardEvents() {
        // Edit buttons
        const editButtons = this.elements.employeeGrid.querySelectorAll('.edit-btn');
        editButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const employeeId = parseInt(button.dataset.employeeId);
                this.openEditForm(employeeId);
            });
        });

        // Delete buttons
        const deleteButtons = this.elements.employeeGrid.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const employeeId = parseInt(button.dataset.employeeId);
                this.handleDeleteEmployee(employeeId);
            });
        });
    }

    /**
     * Render pagination controls
     * @param {Object} pagination - Pagination object
     */
    renderPagination(pagination) {
        if (pagination.totalPages <= 1) {
            this.elements.pagination.innerHTML = '';
            return;
        }

        const { currentPage, totalPages, hasNextPage, hasPrevPage } = pagination;
        
        let paginationHTML = '<div class="pagination__controls">';
        
        // Previous button
        if (hasPrevPage) {
            paginationHTML += `<button class="pagination__btn pagination__btn--prev" data-page="${currentPage - 1}">Previous</button>`;
        }
        
        // Page numbers
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, currentPage + 2);
        
        if (startPage > 1) {
            paginationHTML += `<button class="pagination__btn" data-page="1">1</button>`;
            if (startPage > 2) {
                paginationHTML += '<span class="pagination__ellipsis">...</span>';
            }
        }
        
        for (let i = startPage; i <= endPage; i++) {
            const isActive = i === currentPage;
            paginationHTML += `<button class="pagination__btn ${isActive ? 'pagination__btn--active' : ''}" data-page="${i}">${i}</button>`;
        }
        
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                paginationHTML += '<span class="pagination__ellipsis">...</span>';
            }
            paginationHTML += `<button class="pagination__btn" data-page="${totalPages}">${totalPages}</button>`;
        }
        
        // Next button
        if (hasNextPage) {
            paginationHTML += `<button class="pagination__btn pagination__btn--next" data-page="${currentPage + 1}">Next</button>`;
        }
        
        paginationHTML += '</div>';
        
        this.elements.pagination.innerHTML = paginationHTML;
        
        // Setup pagination event listeners
        this.setupPaginationEvents();
    }

    /**
     * Setup pagination event listeners
     */
    setupPaginationEvents() {
        const paginationButtons = this.elements.pagination.querySelectorAll('.pagination__btn');
        paginationButtons.forEach(button => {
            button.addEventListener('click', () => {
                const page = parseInt(button.dataset.page);
                this.employeeManager.setPagination(page, this.employeeManager.getCurrentPagination().itemsPerPage);
                this.renderEmployees();
                this.updateUI();
            });
        });
    }

    /**
     * Update counts display
     * @param {Object} pagination - Pagination object
     */
    updateCounts(pagination) {
        if (this.elements.employeeCount) {
            const totalCount = this.employeeManager.getTotalEmployeeCount();
            const filteredCount = pagination.totalItems;
            this.elements.employeeCount.textContent = `${filteredCount} of ${totalCount} employees`;
        }
        
        if (this.elements.pageInfo) {
            const { currentPage, totalPages } = pagination;
            this.elements.pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
        }
    }

    /**
     * Update UI state
     */
    updateUI() {
        // Update filter button state
        if (this.elements.filterToggle) {
            this.elements.filterToggle.classList.toggle('btn--active', this.employeeManager.hasActiveFilters());
        }
        
        // Update sort select
        if (this.elements.sortSelect) {
            const filters = this.employeeManager.getCurrentFilters();
            if (filters.sortBy) {
                this.elements.sortSelect.value = `${filters.sortBy}-${filters.sortOrder}`;
            } else {
                this.elements.sortSelect.value = '';
            }
        }
        
        // Update filter form
        this.updateFilterForm();
    }

    /**
     * Update filter form with current values
     */
    updateFilterForm() {
        const filters = this.employeeManager.getCurrentFilters();
        const filterDepartment = document.getElementById('filter-department');
        const filterRole = document.getElementById('filter-role');
        
        if (filterDepartment) filterDepartment.value = filters.department;
        if (filterRole) filterRole.value = filters.role;
    }

    /**
     * Show toast notification
     * @param {string} message - Message to display
     * @param {string} type - 'success' or 'error'
     */
    showToast(message, type = 'success') {
        // Remove existing toast if present
        const existing = document.querySelector('.toast-notification');
        if (existing) existing.remove();
        
        const toast = document.createElement('div');
        toast.className = `toast-notification toast-notification--${type}`;
        toast.innerHTML = `
            <div class="toast-notification__icon">
                ${type === 'success' ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20,6 9,17 4,12"></polyline></svg>' : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>'}
            </div>
            <span class="toast-notification__message">${message}</span>
            <button class="toast-notification__close" aria-label="Close notification">&times;</button>
        `;
        document.body.appendChild(toast);
        setTimeout(() => toast.classList.add('toast-notification--visible'), 10);
        // Auto-remove after 3s
        const timeout = setTimeout(() => {
            toast.classList.remove('toast-notification--visible');
            setTimeout(() => toast.remove(), 400);
        }, 3000);
        // Manual close
        toast.querySelector('.toast-notification__close').onclick = () => {
            clearTimeout(timeout);
            toast.classList.remove('toast-notification--visible');
            setTimeout(() => toast.remove(), 400);
        };
    }

    /**
     * Show success message
     * @param {string} message - Success message
     */
    showSuccessMessage(message) {
        this.showToast(message, 'success');
    }

    /**
     * Show error message
     * @param {string} message - Error message
     */
    showErrorMessage(message) {
        this.showToast(message, 'error');
    }

    /**
     * Show loading overlay
     */
    showLoading() {
        if (this.elements.loadingOverlay) {
            this.elements.loadingOverlay.classList.remove('loading-overlay--hidden');
        }
    }

    /**
     * Hide loading overlay
     */
    hideLoading() {
        if (this.elements.loadingOverlay) {
            this.elements.loadingOverlay.classList.add('loading-overlay--hidden');
        }
    }
}

// Create global UI controller instance
window.uiController = new UIController(employeeManager, uiValidator); 