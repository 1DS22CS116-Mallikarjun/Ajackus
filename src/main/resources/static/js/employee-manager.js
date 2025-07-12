/**
 * Employee Manager
 * Handles all CRUD operations for employees
 */

class EmployeeManager {
    constructor(dataManager) {
        this.dataManager = dataManager;
        this.currentFilters = {
            search: '',
            department: '',
            role: '',
            sortBy: '',
            sortOrder: 'asc'
        };
        this.pagination = {
            currentPage: 1,
            itemsPerPage: 10
        };
    }

    /**
     * Get filtered and paginated employees
     * @returns {Object} Object with employees and pagination info
     */
    getEmployees() {
        let employees = this.dataManager.getAllEmployees();

        // Apply search filter
        if (this.currentFilters.search) {
            employees = this.dataManager.searchEmployees(this.currentFilters.search);
        }

        // Apply department and role filters
        if (this.currentFilters.department || this.currentFilters.role) {
            employees = this.dataManager.filterEmployees(
                this.currentFilters.department,
                this.currentFilters.role
            );
        }

        // Apply sorting
        if (this.currentFilters.sortBy) {
            employees = this.dataManager.sortEmployees(
                this.currentFilters.sortBy,
                this.currentFilters.sortOrder
            );
        }

        // Apply pagination
        return this.dataManager.getPaginatedEmployees(
            this.pagination.currentPage,
            this.pagination.itemsPerPage,
            employees
        );
    }

    /**
     * Add new employee
     * @param {Object} employeeData - Employee data
     * @returns {Object} New employee object
     */
    addEmployee(employeeData) {
        const newEmployee = this.dataManager.addEmployee(employeeData);
        this.resetPagination();
        return newEmployee;
    }

    /**
     * Update existing employee
     * @param {number} id - Employee ID
     * @param {Object} employeeData - Updated employee data
     * @returns {Object|null} Updated employee object or null
     */
    updateEmployee(id, employeeData) {
        const updatedEmployee = this.dataManager.updateEmployee(id, employeeData);
        return updatedEmployee;
    }

    /**
     * Delete employee
     * @param {number} id - Employee ID
     * @returns {boolean} True if deleted successfully
     */
    deleteEmployee(id) {
        const deleted = this.dataManager.deleteEmployee(id);
        if (deleted) {
            this.resetPagination();
        }
        return deleted;
    }

    /**
     * Get employee by ID
     * @param {number} id - Employee ID
     * @returns {Object|null} Employee object or null
     */
    getEmployeeById(id) {
        return this.dataManager.getEmployeeById(id);
    }

    /**
     * Set search filter
     * @param {string} searchTerm - Search term
     */
    setSearchFilter(searchTerm) {
        this.currentFilters.search = searchTerm;
        this.resetPagination();
    }

    /**
     * Set department filter
     * @param {string} department - Department filter
     */
    setDepartmentFilter(department) {
        this.currentFilters.department = department;
        this.resetPagination();
    }

    /**
     * Set role filter
     * @param {string} role - Role filter
     */
    setRoleFilter(role) {
        this.currentFilters.role = role;
        this.resetPagination();
    }

    /**
     * Set sort parameters
     * @param {string} sortBy - Sort field
     * @param {string} sortOrder - Sort order ('asc' or 'desc')
     */
    setSort(sortBy, sortOrder = 'asc') {
        this.currentFilters.sortBy = sortBy;
        this.currentFilters.sortOrder = sortOrder;
        this.resetPagination();
    }

    /**
     * Set pagination parameters
     * @param {number} page - Page number
     * @param {number} itemsPerPage - Items per page
     */
    setPagination(page, itemsPerPage) {
        this.pagination.currentPage = page;
        this.pagination.itemsPerPage = itemsPerPage;
    }

    /**
     * Reset pagination to first page
     */
    resetPagination() {
        this.pagination.currentPage = 1;
    }

    /**
     * Clear all filters
     */
    clearFilters() {
        this.currentFilters = {
            search: '',
            department: '',
            role: '',
            sortBy: '',
            sortOrder: 'asc'
        };
        this.resetPagination();
    }

    /**
     * Get current filters
     * @returns {Object} Current filter state
     */
    getCurrentFilters() {
        return { ...this.currentFilters };
    }

    /**
     * Get current pagination
     * @returns {Object} Current pagination state
     */
    getCurrentPagination() {
        return { ...this.pagination };
    }

    /**
     * Get departments for filter dropdown
     * @returns {Array} Array of department names
     */
    getDepartments() {
        return this.dataManager.getDepartments();
    }

    /**
     * Get roles for filter dropdown
     * @returns {Array} Array of role names
     */
    getRoles() {
        return this.dataManager.getRoles();
    }

    /**
     * Get total employee count
     * @returns {number} Total number of employees
     */
    getTotalEmployeeCount() {
        return this.dataManager.getAllEmployees().length;
    }

    /**
     * Get filtered employee count
     * @returns {number} Number of employees after filtering
     */
    getFilteredEmployeeCount() {
        const result = this.getEmployees();
        return result.pagination.totalItems;
    }

    /**
     * Check if any filters are active
     * @returns {boolean} True if any filters are applied
     */
    hasActiveFilters() {
        return !!(this.currentFilters.search || 
                 this.currentFilters.department || 
                 this.currentFilters.role || 
                 this.currentFilters.sortBy);
    }

    /**
     * Reset data to initial state
     */
    resetData() {
        this.dataManager.resetData();
        this.clearFilters();
        this.resetPagination();
    }
}

// Create global employee manager instance
const employeeManager = new EmployeeManager(dataManager); 