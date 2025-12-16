# Sentiment Widget

A React-based sentiment feedback widget that allows users to submit ratings and comments. Features include real-time statistics, recent comments display, and light/dark mode theming.

**🚀 Live Demo**: [https://main.d1saof37xl3c4g.amplifyapp.com/](https://main.d1saof37xl3c4g.amplifyapp.com/)

## Features

### Core Functionality
- **Rating System**: Five rating chips (1-5) with visual selection feedback
- **Optional Name Input**: Users can provide their name (displays as "Anonymous" if not provided)
- **Comment Input**: Textarea for entering detailed feedback
- **Form Validation**: Ensures a rating is selected before submission
- **Spam Prevention**: 3-second form disable period after submission
- **Summary Panel**:
  - Total number of submissions
  - Average rating calculation (2 decimal places)
  - All feedback logs in reverse chronological order

### Enhancements
- **Light/Dark Mode**: Toggle between themes with Material-UI icons
- **Responsive Design**: Mobile-friendly layout
- **Accessibility**: ARIA labels and semantic HTML
- **Comprehensive Testing**: 30 unit tests with Vitest (100% pass rate)
- **Test Logging**: Automatic test result logging to TEST_RESULTS.log

## Tech Stack

- **React 18.3.1** - UI library with functional components and hooks
- **Vite 5.0.8** - Fast build tool and development server
- **Vitest 1.6.1** - Unit testing framework
- **Testing Library** - React component testing utilities (@testing-library/react 14.1.2)
- **Material-UI Icons** - Icon components for theme toggle (LightMode/DarkMode)
- **CSS3** - Styling with CSS custom properties for theming
- **AWS Amplify** - Deployment and hosting platform

## Project Structure

```
sentiment-widget/
├── src/
│   ├── components/
│   │   ├── RatingChips.jsx      # Rating selection component (1-5)
│   │   ├── NameInput.jsx        # Optional name input field
│   │   ├── CommentBox.jsx       # Comment textarea component
│   │   ├── SubmitButton.jsx     # Submit button component
│   │   └── SummaryPanel.jsx     # Statistics and all feedback logs
│   ├── tests/
│   │   ├── setup.js             # Test configuration
│   │   ├── App.test.jsx         # Integration tests (7 tests)
│   │   ├── CommentBox.test.jsx  # CommentBox unit tests (4 tests)
│   │   ├── NameInput.test.jsx   # NameInput unit tests (5 tests)
│   │   ├── RatingChips.test.jsx # RatingChips unit tests (5 tests)
│   │   ├── SubmitButton.test.jsx# SubmitButton unit tests (4 tests)
│   │   └── SummaryPanel.test.jsx# SummaryPanel unit tests (5 tests)
│   ├── App.jsx                  # Main application component
│   ├── index.css                # Global styles and theme variables
│   └── main.jsx                 # React entry point
├── .gitignore                   # Git ignore rules
├── amplify.yml                  # AWS Amplify build configuration
├── DEVELOPMENT.md               # Comprehensive development documentation
├── index.html                   # HTML entry point
├── package.json                 # Dependencies and scripts
├── TEST_RESULTS.log             # Test execution log (auto-generated)
├── vite.config.js               # Vite configuration
└── vitest.config.js             # Vitest configuration
```

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mini_sentiment_widget/sentiment-widget
```

2. Install dependencies:
```bash
npm install
```

### Available Scripts

#### Development
Start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173` with hot module replacement (HMR) enabled.

#### Testing
Run all unit tests:
```bash
npm run test
```

Run tests and save output to TEST_RESULTS.log:
```bash
npm run test:log
```

Run tests with UI:
```bash
npm run test:ui
```

#### Production
Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Testing

The project includes comprehensive unit tests using Vitest and Testing Library.

### Test Suite Overview
- **Total Tests**: 30 tests across 6 test files
- **Test Framework**: Vitest 1.6.1
- **Pass Rate**: 100% (30/30 passing)

### Running Tests

Run all tests:
```bash
npm run test
```

Run tests and save output to log file:
```bash
npm run test:log
```

Run tests with UI:
```bash
npm run test:ui
```

### Test Coverage
- **App.test.jsx** (7 tests): Integration tests for main App component
- **RatingChips.test.jsx** (5 tests): Rating selection functionality
- **NameInput.test.jsx** (5 tests): Name input field functionality
- **CommentBox.test.jsx** (4 tests): Comment textarea functionality
- **SubmitButton.test.jsx** (4 tests): Submit button behavior
- **SummaryPanel.test.jsx** (5 tests): Statistics and feedback log display

For detailed test results, see `TEST_RESULTS.log` after running `npm run test:log`.

## Usage

1. **Enter Your Name** (optional): Type your name in the input field (displays as "Anonymous" if not provided)
2. **Select a Rating**: Click on one of the five rating chips (1-5) - **Required**
3. **Enter a Comment** (optional): Type your feedback in the textarea
4. **Submit**: Click the "Submit Feedback" button
5. **View Results**: See your submission reflected in the Summary Panel with real-time statistics

### Features in Action

- **Theme Toggle**: Click the sun/moon icon in the header to switch themes
- **Validation**: Try submitting without selecting a rating to see validation
- **Spam Prevention**: After submitting, the form is disabled for 3 seconds
- **Real-time Updates**: Statistics and recent comments update immediately

## Component Details

### RatingChips
- Props: `selectedRating`, `onRatingChange`, `disabled`
- Displays 5 clickable rating buttons (1-5)
- Highlights selected rating with visual feedback
- ARIA labels for accessibility

### NameInput
- Props: `name`, `onNameChange`, `disabled`
- Optional text input for user's name
- Displays "Anonymous" in submissions if not provided

### CommentBox
- Props: `comment`, `onCommentChange`, `disabled`
- Provides textarea for user comments
- Respects disabled state during submission

### SubmitButton
- Props: `onClick`, `disabled`
- Changes text when disabled ("Submitting...")
- Prevents multiple submissions during 3-second timeout

### SummaryPanel
- Props: `submissions`
- Calculates and displays real-time statistics:
  - Total submissions count
  - Average rating (2 decimal places)
- Shows all feedback logs in reverse chronological order
- Displays name, rating, comment, and formatted timestamp for each submission

## Design Decisions

1. **State Management**: Used React's built-in useState for simplicity (no external state management needed)
2. **Component Structure**: Separated concerns into logical, reusable components (5 components + 1 main App component)
3. **Accessibility**: Added ARIA labels and semantic HTML for screen reader support
4. **Testing**: 30 comprehensive unit tests with Vitest ensure functionality and prevent regressions
5. **Styling**: CSS custom properties for easy theme switching without JavaScript overhead
6. **Test Logging**: Automated test result logging for documentation and CI/CD integration
7. **Code Documentation**: Inline comments throughout all source files for maintainability
8. **Deployment**: AWS Amplify for seamless CI/CD and hosting with automatic builds on push

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

MIT

## Author

Built using React and Vite by Aaron Lee
