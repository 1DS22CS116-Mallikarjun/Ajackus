# Employee Directory Web Interface

A responsive web application for managing employee information with a clean, modern interface built using HTML, CSS, JavaScript, and Freemarker templates.

## Links

- **Git Repository**: [GitHub Repository](https://github.com/1DS22CS116-Mallikarjun/Ajackus.git)
- **Live Demo**: [Deployed Application](https://ajackus12.vercel.app/)
- **Demo Recording**: [Video Walkthrough](https://drive.google.com/file/d/17_y7VXq1zb2elHVwWdrtNHFHjLTSoos9/view?usp=sharing)

## Features

- **Employee Management**: Add, edit, and delete employee records
- **Search & Filter**: Search by name/email and filter by department/role
- **Sorting**: Sort employees by first name and department
- **Pagination**: Navigate through large datasets with configurable page sizes
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Form Validation**: Client-side validation for all required fields
- **Modern UI/UX**: Clean, intuitive interface with smooth interactions

## Project Structure

```
employee-directory/
├── src/
│   ├── main/
│   │   ├── resources/
│   │   │   ├── templates/
│   │   │   │   ├── index.ftlh          # Main Freemarker template
│   │   │   │   └── components/
│   │   │   │       ├── employee-card.ftlh
│   │   │   │       └── form.ftlh
│   │   │   └── static/
│   │   │       ├── css/
│   │   │       │   ├── style.css       # Main stylesheet
│   │   │       │   ├── components.css  # Component-specific styles
│   │   │       │   └── responsive.css  # Responsive design rules
│   │   │       └── js/
│   │   │           ├── app.js          # Main application logic
│   │   │           ├── data.js         # Mock employee data
│   │   │           ├── employee-manager.js  # Employee CRUD operations
│   │   │           ├── ui-controller.js     # UI state management
│   │   │           └── validators.js        # Form validation logic
├── index.html                          # Entry point (for direct browser access)
└── README.md                          # This file
```

## Setup and Run Instructions

### Option 1: Direct Browser Access (Recommended for Demo)
1. Clone or download this repository
2. Open `index.html` in your web browser
3. The application will load with mock data and all features will be functional

### Option 2: Freemarker Server Setup
1. Ensure you have Java and a compatible web server (Spring Boot, etc.)
2. Place the `src/main/resources/templates/` files in your server's template directory
3. Place the `src/main/resources/static/` files in your server's static resources directory
4. Configure your server to serve the `index.ftlh` template
5. Access the application through your server's URL

## Key Files and Their Purpose

- **`index.ftlh`**: Main Freemarker template that renders the employee directory
- **`data.js`**: Contains mock employee data and data management functions
- **`app.js`**: Main application entry point and event handling
- **`employee-manager.js`**: Handles all CRUD operations for employees
- **`ui-controller.js`**: Manages UI state, form display, and navigation
- **`style.css`**: Main stylesheet with modern, responsive design
- **`validators.js`**: Form validation logic and error handling

## Features Implementation

### Employee Management
- **Add**: Click "Add Employee" button to open the form
- **Edit**: Click "Edit" button on any employee card
- **Delete**: Click "Delete" button with confirmation dialog
- **View**: All employee information displayed in clean cards

### Search & Filter
- **Search**: Real-time search by name or email
- **Filter**: Filter by department and/or role
- **Sort**: Sort by first name or department (ascending/descending)

### Pagination
- Configurable items per page (10, 25, 50, 100)
- Navigation controls with page numbers
- Works seamlessly with search, filter, and sort

### Responsive Design
- **Desktop**: Full grid layout with sidebar filters
- **Tablet**: Adjusted grid with collapsible filters
- **Mobile**: Single column layout with mobile-optimized controls

## Technologies Used

- **HTML5**: Semantic markup and modern structure
- **CSS3**: Flexbox, Grid, custom properties, and responsive design
- **JavaScript (ES6+)**: Vanilla JS with modular architecture
- **Freemarker**: Template engine for server-side rendering
- **BEM Methodology**: CSS class naming convention for maintainability

## Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Development Notes

This project demonstrates:
- Clean, modular JavaScript architecture
- Responsive design principles
- Form validation and error handling
- Modern CSS techniques (Grid, Flexbox, Custom Properties)
- Freemarker template integration
- User experience best practices

## Future Improvements

If given more time, I would implement:
- Advanced filtering with multiple criteria
- Export functionality (CSV, PDF)
- Bulk operations (select multiple employees)
- Keyboard shortcuts for power users
- Animations and transitions
- Dark mode theme
- Local storage for user preferences
- More robust error handling
- Unit tests for JavaScript modules 
