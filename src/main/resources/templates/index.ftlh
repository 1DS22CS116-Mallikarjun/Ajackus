<#-- Employee Directory - Main Freemarker Template -->
<#-- This template demonstrates how data would be passed from server to client -->
<#-- In a real server setup, this would be processed by Freemarker engine -->

<#-- Assign mock data (simulating server-side data injection) -->
<#assign employees = [
    {
        "id": 1,
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@ajackus.com",
        "department": "HR",
        "role": "Manager"
    },
    {
        "id": 2,
        "firstName": "Jane",
        "lastName": "Smith",
        "email": "jane.smith@ajackus.com",
        "department": "IT",
        "role": "Developer"
    },
    {
        "id": 3,
        "firstName": "Michael",
        "lastName": "Johnson",
        "email": "michael.johnson@ajackus.com",
        "department": "Marketing",
        "role": "Manager"
    },
    {
        "id": 4,
        "firstName": "Sarah",
        "lastName": "Williams",
        "email": "sarah.williams@ajackus.com",
        "department": "IT",
        "role": "Designer"
    },
    {
        "id": 5,
        "firstName": "David",
        "lastName": "Brown",
        "email": "david.brown@ajackus.com",
        "department": "Sales",
        "role": "Manager"
    },
    {
        "id": 6,
        "firstName": "Emily",
        "lastName": "Davis",
        "email": "emily.davis@ajackus.com",
        "department": "Finance",
        "role": "Analyst"
    },
    {
        "id": 7,
        "firstName": "Robert",
        "lastName": "Miller",
        "email": "robert.miller@ajackus.com",
        "department": "IT",
        "role": "Developer"
    },
    {
        "id": 8,
        "firstName": "Lisa",
        "lastName": "Wilson",
        "email": "lisa.wilson@ajackus.com",
        "department": "HR",
        "role": "Coordinator"
    },
    {
        "id": 9,
        "firstName": "James",
        "lastName": "Taylor",
        "email": "james.taylor@ajackus.com",
        "department": "Operations",
        "role": "Specialist"
    },
    {
        "id": 10,
        "firstName": "Amanda",
        "lastName": "Anderson",
        "email": "amanda.anderson@ajackus.com",
        "department": "Marketing",
        "role": "Designer"
    },
    {
        "id": 11,
        "firstName": "Christopher",
        "lastName": "Thomas",
        "email": "christopher.thomas@ajackus.com",
        "department": "Sales",
        "role": "Coordinator"
    },
    {
        "id": 12,
        "firstName": "Jessica",
        "lastName": "Jackson",
        "email": "jessica.jackson@ajackus.com",
        "department": "Finance",
        "role": "Manager"
    },
    {
        "id": 13,
        "firstName": "Daniel",
        "lastName": "White",
        "email": "daniel.white@ajackus.com",
        "department": "IT",
        "role": "Developer"
    },
    {
        "id": 14,
        "firstName": "Ashley",
        "lastName": "Harris",
        "email": "ashley.harris@ajackus.com",
        "department": "HR",
        "role": "Analyst"
    },
    {
        "id": 15,
        "firstName": "Matthew",
        "lastName": "Clark",
        "email": "matthew.clark@ajackus.com",
        "department": "Operations",
        "role": "Specialist"
    }
]>

<#-- Get unique departments and roles for filter dropdowns -->
<#assign departments = employees?map(emp -> emp.department)?sequence?sort?unique>
<#assign roles = employees?map(emp -> emp.role)?sequence?sort?unique>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee Directory - AJACKUS</title>
    <link rel="stylesheet" href="/static/css/style.css">
    <link rel="stylesheet" href="/static/css/components.css">
    <link rel="stylesheet" href="/static/css/responsive.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <div id="app" class="app">
        <!-- Header -->
        <header class="header">
            <div class="header__container">
                <h1 class="header__title">Employee Directory</h1>
                <button id="add-employee-btn" class="btn btn--primary">
                    <svg class="btn__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Add Employee
                </button>
            </div>
        </header>

        <!-- Main Content -->
        <main class="main">
            <div class="main__container">
                <!-- Controls Section -->
                <section class="controls">
                    <div class="controls__search">
                        <div class="search-box">
                            <svg class="search-box__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.35-4.35"></path>
                            </svg>
                            <input type="text" id="search-input" class="search-box__input" placeholder="Search employees...">
                        </div>
                    </div>
                    
                    <div class="controls__filters">
                        <button id="filter-toggle" class="btn btn--secondary">
                            <svg class="btn__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"></polygon>
                            </svg>
                            Filters
                        </button>
                        
                        <div class="sort-controls">
                            <select id="sort-select" class="select">
                                <option value="">Sort by...</option>
                                <option value="firstName-asc">First Name (A-Z)</option>
                                <option value="firstName-desc">First Name (Z-A)</option>
                                <option value="department-asc">Department (A-Z)</option>
                                <option value="department-desc">Department (Z-A)</option>
                            </select>
                        </div>
                    </div>
                </section>

                <!-- Filter Panel -->
                <section id="filter-panel" class="filter-panel filter-panel--hidden">
                    <div class="filter-panel__content">
                        <h3 class="filter-panel__title">Filter Employees</h3>
                        <div class="filter-panel__filters">
                            <div class="form-group">
                                <label for="filter-department" class="form-group__label">Department</label>
                                <select id="filter-department" class="select">
                                    <option value="">All Departments</option>
                                    <#list departments as dept>
                                        <option value="${dept}">${dept}</option>
                                    </#list>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label for="filter-role" class="form-group__label">Role</label>
                                <select id="filter-role" class="select">
                                    <option value="">All Roles</option>
                                    <#list roles as role>
                                        <option value="${role}">${role}</option>
                                    </#list>
                                </select>
                            </div>
                        </div>
                        
                        <div class="filter-panel__actions">
                            <button id="apply-filters" class="btn btn--primary">Apply Filters</button>
                            <button id="clear-filters" class="btn btn--secondary">Clear All</button>
                        </div>
                    </div>
                </section>

                <!-- Employee Grid -->
                <section class="employee-section">
                    <div class="employee-section__header">
                        <div class="employee-section__info">
                            <span id="employee-count" class="employee-count">${employees?size} employees</span>
                            <span id="page-info" class="page-info">Page 1 of 1</span>
                        </div>
                        
                        <div class="pagination-controls">
                            <select id="items-per-page" class="select select--small">
                                <option value="10">10 per page</option>
                                <option value="25">25 per page</option>
                                <option value="50">50 per page</option>
                                <option value="100">100 per page</option>
                            </select>
                        </div>
                    </div>
                    
                    <div id="employee-grid" class="employee-grid">
                        <#-- Initial employee list rendered by Freemarker -->
                        <#list employees as employee>
                            <div class="employee-card" data-employee-id="${employee.id}">
                                <div class="employee-card__header">
                                    <h3 class="employee-card__name">${employee.firstName} ${employee.lastName}</h3>
                                    <div class="employee-card__id">ID: ${employee.id}</div>
                                </div>
                                
                                <div class="employee-card__content">
                                    <div class="employee-card__info">
                                        <div class="employee-card__email">
                                            <svg class="employee-card__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                                <polyline points="22,6 12,13 2,6"></polyline>
                                            </svg>
                                            ${employee.email}
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
                        </#list>
                    </div>
                    
                    <div id="pagination" class="pagination">
                        <!-- Pagination controls will be dynamically inserted here -->
                    </div>
                </section>
            </div>
        </main>

        <!-- Employee Form Modal -->
        <div id="employee-modal" class="modal modal--hidden">
            <div class="modal__overlay"></div>
            <div class="modal__content">
                <div class="modal__header">
                    <h2 id="modal-title" class="modal__title">Add Employee</h2>
                    <button id="modal-close" class="modal__close">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                
                <form id="employee-form" class="employee-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="first-name" class="form-group__label">First Name *</label>
                            <input type="text" id="first-name" name="firstName" class="form-group__input" required>
                            <span class="form-group__error" id="first-name-error"></span>
                        </div>
                        
                        <div class="form-group">
                            <label for="last-name" class="form-group__label">Last Name *</label>
                            <input type="text" id="last-name" name="lastName" class="form-group__input" required>
                            <span class="form-group__error" id="last-name-error"></span>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="email" class="form-group__label">Email *</label>
                        <input type="email" id="email" name="email" class="form-group__input" required>
                        <span class="form-group__error" id="email-error"></span>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="department" class="form-group__label">Department *</label>
                            <select id="department" name="department" class="form-group__input" required>
                                <option value="">Select Department</option>
                                <#list departments as dept>
                                    <option value="${dept}">${dept}</option>
                                </#list>
                            </select>
                            <span class="form-group__error" id="department-error"></span>
                        </div>
                        
                        <div class="form-group">
                            <label for="role" class="form-group__label">Role *</label>
                            <select id="role" name="role" class="form-group__input" required>
                                <option value="">Select Role</option>
                                <#list roles as role>
                                    <option value="${role}">${role}</option>
                                </#list>
                            </select>
                            <span class="form-group__error" id="role-error"></span>
                        </div>
                    </div>
                    
                    <div class="form-actions">
                        <button type="button" id="form-cancel" class="btn btn--secondary">Cancel</button>
                        <button type="submit" id="form-save" class="btn btn--primary">Save Employee</button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Loading Overlay -->
        <div id="loading-overlay" class="loading-overlay loading-overlay--hidden">
            <div class="loading-spinner"></div>
        </div>
    </div>

    <!-- Scripts -->
    <script>
        // Pass Freemarker data to JavaScript
        window.freemarkerData = {
            employees: <#noescape>${employees?string}</#noescape>,
            departments: <#noescape>${departments?string}</#noescape>,
            roles: <#noescape>${roles?string}</#noescape>
        };
    </script>
    <script src="/static/js/data.js"></script>
    <script src="/static/js/validators.js"></script>
    <script src="/static/js/employee-manager.js"></script>
    <script src="/static/js/ui-controller.js"></script>
    <script src="/static/js/app.js"></script>
</body>
</html> 