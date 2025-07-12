<#-- Employee Card Component -->
<#-- Usage: <@employeeCard employee=employeeData /> -->

<#macro employeeCard employee>
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
</#macro> 