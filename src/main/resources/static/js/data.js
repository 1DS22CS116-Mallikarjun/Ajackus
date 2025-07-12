/**
 * Mock Employee Data and Data Management Functions
 * This file contains the initial employee data and functions for managing employee records
 */

// Mock employee data - simulating data passed from Freemarker template
const mockEmployees = [
    {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@ajackus.com',
        department: 'HR',
        role: 'Manager'
    },
    {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@ajackus.com',
        department: 'IT',
        role: 'Developer'
    },
    {
        id: 3,
        firstName: 'Michael',
        lastName: 'Johnson',
        email: 'michael.johnson@ajackus.com',
        department: 'Marketing',
        role: 'Manager'
    },
    {
        id: 4,
        firstName: 'Sarah',
        lastName: 'Williams',
        email: 'sarah.williams@ajackus.com',
        department: 'IT',
        role: 'Designer'
    },
    {
        id: 5,
        firstName: 'David',
        lastName: 'Brown',
        email: 'david.brown@ajackus.com',
        department: 'Sales',
        role: 'Manager'
    },
    {
        id: 6,
        firstName: 'Emily',
        lastName: 'Davis',
        email: 'emily.davis@ajackus.com',
        department: 'Finance',
        role: 'Analyst'
    },
    {
        id: 7,
        firstName: 'Robert',
        lastName: 'Miller',
        email: 'robert.miller@ajackus.com',
        department: 'IT',
        role: 'Developer'
    },
    {
        id: 8,
        firstName: 'Lisa',
        lastName: 'Wilson',
        email: 'lisa.wilson@ajackus.com',
        department: 'HR',
        role: 'Coordinator'
    },
    {
        id: 9,
        firstName: 'James',
        lastName: 'Taylor',
        email: 'james.taylor@ajackus.com',
        department: 'Operations',
        role: 'Specialist'
    },
    {
        id: 10,
        firstName: 'Amanda',
        lastName: 'Anderson',
        email: 'amanda.anderson@ajackus.com',
        department: 'Marketing',
        role: 'Designer'
    },
    {
        id: 11,
        firstName: 'Christopher',
        lastName: 'Thomas',
        email: 'christopher.thomas@ajackus.com',
        department: 'Sales',
        role: 'Coordinator'
    },
    {
        id: 12,
        firstName: 'Jessica',
        lastName: 'Jackson',
        email: 'jessica.jackson@ajackus.com',
        department: 'Finance',
        role: 'Manager'
    },
    {
        id: 13,
        firstName: 'Daniel',
        lastName: 'White',
        email: 'daniel.white@ajackus.com',
        department: 'IT',
        role: 'Developer'
    },
    {
        id: 14,
        firstName: 'Ashley',
        lastName: 'Harris',
        email: 'ashley.harris@ajackus.com',
        department: 'HR',
        role: 'Analyst'
    },
    {
        id: 15,
        firstName: 'Matthew',
        lastName: 'Clark',
        email: 'matthew.clark@ajackus.com',
        department: 'Operations',
        role: 'Specialist'
    }
];

/**
 * Data Manager Class
 * Handles all data operations for employees
 */
class DataManager {
    constructor() {
        this.employees = [...mockEmployees];
        this.nextId = Math.max(...this.employees.map(emp => emp.id)) + 1;
    }

    /**
     * Get all employees
     * @returns {Array} Array of employee objects
     */
    getAllEmployees() {
        return [...this.employees];
    }

    /**
     * Get employee by ID
     * @param {number} id - Employee ID
     * @returns {Object|null} Employee object or null if not found
     */
    getEmployeeById(id) {
        return this.employees.find(emp => emp.id === id) || null;
    }

    /**
     * Add new employee
     * @param {Object} employeeData - Employee data (without id)
     * @returns {Object} New employee object with generated ID
     */
    addEmployee(employeeData) {
        const newEmployee = {
            id: this.nextId++,
            ...employeeData
        };
        this.employees.push(newEmployee);
        return newEmployee;
    }

    /**
     * Update existing employee
     * @param {number} id - Employee ID
     * @param {Object} employeeData - Updated employee data
     * @returns {Object|null} Updated employee object or null if not found
     */
    updateEmployee(id, employeeData) {
        const index = this.employees.findIndex(emp => emp.id === id);
        if (index === -1) return null;
        
        this.employees[index] = { ...this.employees[index], ...employeeData };
        return this.employees[index];
    }

    /**
     * Delete employee
     * @param {number} id - Employee ID
     * @returns {boolean} True if deleted, false if not found
     */
    deleteEmployee(id) {
        const index = this.employees.findIndex(emp => emp.id === id);
        if (index === -1) return false;
        
        this.employees.splice(index, 1);
        return true;
    }

    /**
     * Search employees by text
     * @param {string} searchTerm - Search term
     * @returns {Array} Filtered array of employees
     */
    searchEmployees(searchTerm) {
        if (!searchTerm.trim()) return this.getAllEmployees();
        
        const term = searchTerm.toLowerCase();
        return this.employees.filter(emp => 
            emp.firstName.toLowerCase().includes(term) ||
            emp.lastName.toLowerCase().includes(term) ||
            emp.email.toLowerCase().includes(term)
        );
    }

    /**
     * Filter employees by department and role
     * @param {string} department - Department filter
     * @param {string} role - Role filter
     * @returns {Array} Filtered array of employees
     */
    filterEmployees(department = '', role = '') {
        return this.employees.filter(emp => {
            const deptMatch = !department || emp.department === department;
            const roleMatch = !role || emp.role === role;
            return deptMatch && roleMatch;
        });
    }

    /**
     * Sort employees
     * @param {string} sortBy - Sort field
     * @param {string} sortOrder - 'asc' or 'desc'
     * @returns {Array} Sorted array of employees
     */
    sortEmployees(sortBy, sortOrder = 'asc') {
        const sorted = [...this.employees];
        
        sorted.sort((a, b) => {
            let aVal = a[sortBy];
            let bVal = b[sortBy];
            
            // Handle string comparison
            if (typeof aVal === 'string') {
                aVal = aVal.toLowerCase();
                bVal = bVal.toLowerCase();
            }
            
            if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
        
        return sorted;
    }

    /**
     * Get paginated employees
     * @param {number} page - Current page (1-based)
     * @param {number} itemsPerPage - Items per page
     * @param {Array} employees - Array to paginate (optional)
     * @returns {Object} Object with paginated data and metadata
     */
    getPaginatedEmployees(page = 1, itemsPerPage = 10, employees = null) {
        const data = employees || this.employees;
        const totalItems = data.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        
        return {
            employees: data.slice(startIndex, endIndex),
            pagination: {
                currentPage: page,
                totalPages,
                totalItems,
                itemsPerPage,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        };
    }

    /**
     * Get unique departments
     * @returns {Array} Array of unique department names
     */
    getDepartments() {
        return [...new Set(this.employees.map(emp => emp.department))];
    }

    /**
     * Get unique roles
     * @returns {Array} Array of unique role names
     */
    getRoles() {
        return [...new Set(this.employees.map(emp => emp.role))];
    }

    /**
     * Reset data to initial state
     */
    resetData() {
        this.employees = [...mockEmployees];
        this.nextId = Math.max(...this.employees.map(emp => emp.id)) + 1;
    }
}

// Create global data manager instance
const dataManager = new DataManager(); 