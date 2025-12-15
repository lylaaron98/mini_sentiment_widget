# Sentiment Widget - Development Documentation

## Project Overview

The Sentiment Widget is a React-based feedback collection application that allows users to submit ratings (1-5), optional names, and comments. The application provides real-time statistics including total submissions and average ratings, along with a comprehensive feedback log displayed in reverse chronological order.

## Features

### Core Features
1. **Rating Selection (1-5)**: Users can select a rating from 1 to 5 using clickable chip buttons
2. **Optional Name Input**: Users can optionally provide their name (displays as "Anonymous" if not provided)
3. **Feedback Comment**: Multi-line textarea for detailed feedback comments
4. **Form Validation**: Ensures a rating is selected before submission
5. **Submission Confirmation**: Displays success message for 3 seconds after submission
6. **Auto-Reset**: Form automatically resets after successful submission
7. **Dark/Light Theme Toggle**: Users can switch between light and dark themes
8. **Real-time Statistics**: 
   - Total submission count
   - Average rating (calculated to 2 decimal places)
9. **Feedback Logs**: All submitted feedback displayed in reverse chronological order with:
   - Name or "Anonymous"
   - Rating value
   - Comment (if provided)
   - Timestamp

### Accessibility Features
- ARIA labels for screen readers
- Semantic HTML structure
- Keyboard navigation support
- Form field labels properly associated
- Clear visual feedback for selected ratings
- Alert roles for error and confirmation messages

## Technology Stack

### Frontend Framework
- **React 18.3.1**: Core UI library with functional components and hooks
- **Vite 5.0.8**: Fast build tool and development server

### UI Components
- **Material-UI Icons 7.3.6**: Icon library for theme toggle (LightMode/DarkMode icons)

### Testing
- **Vitest 1.6.1**: Unit testing framework
- **Testing Library (@testing-library/react 14.1.2)**: React component testing utilities
- **jsdom 25.0.1**: DOM implementation for Node.js (test environment)
- **@testing-library/user-event 14.5.2**: User interaction simulation
- **@testing-library/jest-dom 6.6.3**: Custom Jest matchers for DOM testing

### Development Tools
- **@vitejs/plugin-react 4.2.1**: Vite plugin for React support
- **ESLint**: Code linting (configured via package.json)

## Project Structure

```
sentiment-widget/
├── index.html                    # Main HTML entry point
├── package.json                  # Project dependencies and scripts
├── vite.config.js               # Vite build configuration
├── vitest.config.js             # Vitest testing configuration
├── DEVELOPMENT.md               # This documentation file
├── README.md                    # Project README
├── src/
│   ├── main.jsx                 # React application entry point
│   ├── App.jsx                  # Main application component
│   ├── index.css                # Global styles
│   ├── components/              # Reusable React components
│   │   ├── RatingChips.jsx      # Rating selection (1-5)
│   │   ├── NameInput.jsx        # Optional name input field
│   │   ├── CommentBox.jsx       # Feedback comment textarea
│   │   ├── SubmitButton.jsx     # Form submission button
│   │   └── SummaryPanel.jsx     # Statistics and feedback logs
│   └── tests/                   # Unit test files
│       ├── setup.js             # Testing Library setup
│       ├── App.test.jsx         # Integration tests for App
│       ├── RatingChips.test.jsx # Unit tests for RatingChips
│       ├── NameInput.test.jsx   # Unit tests for NameInput
│       ├── CommentBox.test.jsx  # Unit tests for CommentBox
│       ├── SubmitButton.test.jsx # Unit tests for SubmitButton
│       └── SummaryPanel.test.jsx # Unit tests for SummaryPanel
```

## Component Architecture

### App.jsx (Main Component)
**Purpose**: Root component managing all application state and layout

**State Management**:
- `selectedRating`: Currently selected rating (1-5, null if unselected)
- `comment`: User's feedback comment text
- `name`: Optional user name
- `submissions`: Array of all submitted feedback objects
- `isSubmitting`: Boolean flag for 3-second form disable period
- `showConfirmation`: Boolean flag for success message display
- `validationError`: String for validation error messages
- `isDarkMode`: Boolean flag for theme toggle

**Key Functions**:
- `handleSubmit()`: Validates rating, creates submission object, updates state, shows confirmation, resets form after 3 seconds
- `toggleTheme()`: Switches between light and dark mode

### RatingChips.jsx
**Purpose**: Displays 1-5 rating selection buttons

**Props**:
- `selectedRating`: Currently selected rating value
- `onRatingChange`: Callback function to update selected rating
- `disabled`: Boolean to disable during submission

**Features**:
- Visual feedback for selected rating
- Keyboard accessible
- ARIA labels for screen readers

### NameInput.jsx
**Purpose**: Optional text input for user's name

**Props**:
- `name`: Current name value
- `onNameChange`: Callback function to update name
- `disabled`: Boolean to disable during submission

### CommentBox.jsx
**Purpose**: Multi-line textarea for feedback comments

**Props**:
- `comment`: Current comment text
- `onCommentChange`: Callback function to update comment
- `disabled`: Boolean to disable during submission

### SubmitButton.jsx
**Purpose**: Form submission button with dynamic text

**Props**:
- `onClick`: Submit handler function
- `disabled`: Boolean to disable during submission

**Features**:
- Shows "Submitting..." when disabled
- Shows "Submit Feedback" when enabled

### SummaryPanel.jsx
**Purpose**: Displays statistics and all feedback submissions

**Props**:
- `submissions`: Array of all submission objects

**Features**:
- Shows empty state when no submissions exist
- Calculates total submissions count
- Calculates average rating (2 decimal places)
- Displays all feedback in reverse chronological order
- Shows "Anonymous" for submissions without names
- Formats timestamps using locale settings

## Development Process

### Phase 1: Project Setup
1. Created React + Vite project structure
2. Installed dependencies (React, Material-UI Icons)
3. Set up basic file structure

### Phase 2: Component Development
1. Built individual components (RatingChips, NameInput, CommentBox, SubmitButton, SummaryPanel)
2. Implemented component props and event handlers
3. Added inline comments for code documentation

### Phase 3: State Management
1. Set up useState hooks in App.jsx
2. Implemented form submission logic
3. Added validation for rating selection
4. Implemented 3-second confirmation and form reset

### Phase 4: UI/UX Enhancements
1. Added dark/light theme toggle
2. Implemented visual feedback for selected ratings
3. Added success and error messages
4. Styled components with CSS

### Phase 5: Testing Setup
1. Installed Vitest and Testing Library
2. Created test setup configuration
3. Configured jsdom environment
4. Excluded non-test directories from test runs

### Phase 6: Test Implementation
1. Wrote unit tests for all components (30 tests total)
2. Wrote integration tests for App.jsx
3. Fixed syntax errors and test failures
4. Achieved 100% test pass rate

### Phase 7: Code Cleanup
1. Removed Playwright E2E testing (simplified to Vitest only)
2. Added comprehensive inline comments to all source files
3. Created development documentation

## Testing Approach

### Testing Framework
- **Vitest**: Fast unit testing framework compatible with Vite
- **Testing Library**: User-centric testing utilities

### Test Coverage
**Total Tests: 30 (across 6 test files)**

1. **App.test.jsx (7 tests)**:
   - Theme toggle functionality
   - Form validation (rating required)
   - Successful submission flow
   - Confirmation message display
   - Form reset after submission
   - Multiple submissions handling
   - Feedback logs display in reverse chronological order

2. **RatingChips.test.jsx (5 tests)**:
   - Initial render with no selection
   - Rating selection functionality
   - Selected rating visual feedback
   - Multiple rating changes
   - Disabled state during submission

3. **NameInput.test.jsx (5 tests)**:
   - Initial render
   - Text input functionality
   - Parent state updates
   - Placeholder text display
   - Disabled state during submission

4. **CommentBox.test.jsx (4 tests)**:
   - Initial render
   - Text input functionality
   - Parent state updates
   - Disabled state during submission

5. **SubmitButton.test.jsx (4 tests)**:
   - Initial render with "Submit Feedback" text
   - Click event handling
   - Disabled state with "Submitting..." text
   - Disabled button is not clickable

6. **SummaryPanel.test.jsx (5 tests)**:
   - Empty state message
   - Statistics display (total and average)
   - Single submission display
   - Multiple submissions display
   - Name display (regular name and "Anonymous")

### Test Execution
```bash
# Run all tests once
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests and save output to TEST_RESULTS.log
npm run test:log
```

### Test Logging
The project includes automatic test result logging functionality:

- **TEST_RESULTS.log**: Contains a detailed record of the most recent test execution
- **Update Command**: Run `npm run test:log` to execute tests and update the log file
- **Log Contents**: Includes test summary, detailed breakdown by file, performance metrics, and notes
- **Usage**: Useful for documentation, CI/CD integration, or historical test records

The log file is automatically overwritten each time you run `npm run test:log`, providing an up-to-date snapshot of test results.

### Test Results (Final Run)
```
✓ src/tests/CommentBox.test.jsx (4)
✓ src/tests/SubmitButton.test.jsx (4)
✓ src/tests/NameInput.test.jsx (5)
✓ src/tests/SummaryPanel.test.jsx (5)
✓ src/tests/RatingChips.test.jsx (5)
✓ src/tests/App.test.jsx (7)

Test Files  6 passed (6)
Tests       30 passed (30)
Duration    17.19s
```

## Configuration Files

### package.json Scripts
```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "test": "vitest",
  "test:log": "vitest run > TEST_RESULTS.log"
}
```

### vite.config.js
- Configures Vite build tool
- Enables React plugin
- Sets up development server

### vitest.config.js
- Enables global test functions
- Sets jsdom as test environment
- Configures test setup file
- Excludes e2e directory from tests

## Running the Application

### Development Mode
```bash
npm run dev
```
- Starts development server at http://localhost:5173
- Hot module replacement (HMR) enabled
- Fast refresh for React components

### Production Build
```bash
npm run build
```
- Creates optimized production build
- Output in `dist/` directory

### Preview Production Build
```bash
npm run preview
```
- Serves production build locally for testing

## Key Implementation Details

### Rating Calculation
Average rating is calculated using:
```javascript
const averageRating = (
  submissions.reduce((sum, sub) => sum + sub.rating, 0) / totalSubmissions
).toFixed(2)
```
- Sums all rating values
- Divides by total number of submissions
- Rounds to 2 decimal places

### Submission Object Structure
```javascript
{
  id: Date.now(),                    // Unique identifier (timestamp)
  name: name.trim(),                 // User's name (whitespace removed)
  rating: selectedRating,            // Rating value (1-5)
  comment: comment.trim(),           // Feedback comment (whitespace removed)
  timestamp: new Date().toISOString() // ISO format timestamp
}
```

### Form Submission Flow
1. User fills out form (rating required, name/comment optional)
2. Click "Submit Feedback" button
3. Validation checks if rating is selected
4. If invalid: Show error message
5. If valid:
   - Create submission object
   - Add to submissions array
   - Show success confirmation message
   - Disable form for 3 seconds
   - Reset all form fields after 3 seconds
   - Re-enable form

### Theme Toggle Implementation
- Uses CSS class switching: `.light-mode` or `.dark-mode` on root element
- Icons change based on current theme (sun icon in dark mode, moon in light mode)
- ARIA label updates for accessibility

## Future Enhancement Opportunities

1. **Persistent Storage**: Add localStorage to persist submissions across page refreshes
2. **Export Data**: Allow users to export feedback as CSV or JSON
3. **Filtering**: Add ability to filter feedback by rating or date range
4. **Charts**: Visualize rating distribution with charts (e.g., bar chart showing count per rating)
5. **Edit/Delete**: Allow users to edit or delete their submissions
6. **Backend Integration**: Connect to a backend API for server-side storage
7. **User Authentication**: Add user accounts for personalized feedback tracking
8. **Email Notifications**: Send email notifications for new feedback
9. **Advanced Analytics**: Track trends over time, sentiment analysis
10. **Multi-language Support**: Internationalization (i18n) for multiple languages

## Troubleshooting

### Common Issues

**Issue**: Tests fail with "act" warnings
- **Solution**: Use `vi.useRealTimers()` for async tests with setTimeout

**Issue**: Ambiguous selector errors (multiple elements match)
- **Solution**: Use more specific selectors (class names, test IDs) instead of text content

**Issue**: Average rating calculation seems incorrect
- **Solution**: Verify calculation logic: (sum of all ratings) / (total submissions)

## License

This project is open-source and available for educational purposes.

## Contact & Support

For questions or issues related to this project, please refer to the README.md file or contact the development team.

---

**Last Updated**: December 15, 2025
**Version**: 1.0.0
**Test Status**: All 30 tests passing ✓
