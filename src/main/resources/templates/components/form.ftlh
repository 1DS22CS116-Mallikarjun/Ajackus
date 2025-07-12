<#-- Employee Form Component -->
<#-- Usage: <@employeeForm departments=departments roles=roles /> -->

<#macro employeeForm departments roles>
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
</#macro> 