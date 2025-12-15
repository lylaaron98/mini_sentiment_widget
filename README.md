# Sentiment Widget

A React-based sentiment feedback widget that allows users to submit ratings and comments. Features include real-time statistics, recent comments display, and light/dark mode theming.

## Features

### Core Functionality
- **Rating System**: Five rating chips (1-5) with visual selection feedback
- **Comment Input**: Textarea for entering detailed feedback
- **Form Validation**: Ensures a rating is selected before submission
- **Spam Prevention**: 3-second form disable period after submission
- **Summary Panel**:
  - Total number of submissions
  - Average rating calculation
  - Three most recent comments with timestamps

### Enhancements
- **Light/Dark Mode**: Toggle between themes with persistent visual feedback
- **Responsive Design**: Mobile-friendly layout
- **Accessibility**: ARIA labels and semantic HTML
- **Comprehensive Testing**: Unit tests and E2E tests included

## Tech Stack

- **React 18** - UI library with functional components and hooks
- **Vite** - Build tool and dev server
- **Vitest** - Unit testing framework
- **Testing Library** - React component testing utilities
- **Playwright** - End-to-end testing
- **CSS3** - Styling with CSS custom properties for theming

## Project Structure

```
sentiment-widget/
├── src/
│   ├── components/
│   │   ├── RatingChips.jsx      # Rating selection component
│   │   ├── CommentBox.jsx       # Comment textarea component
│   │   ├── SubmitButton.jsx     # Submit button component
│   │   └── SummaryPanel.jsx     # Statistics and recent comments
│   ├── tests/
│   │   ├── setup.js             # Test configuration
│   │   ├── RatingChips.test.jsx # RatingChips unit tests
│   │   ├── CommentBox.test.jsx  # CommentBox unit tests
│   │   ├── SubmitButton.test.jsx# SubmitButton unit tests
│   │   ├── SummaryPanel.test.jsx# SummaryPanel unit tests
│   │   └── App.test.jsx         # Integration tests
│   ├── App.jsx                  # Main application component
│   ├── main.jsx                 # React entry point
│   └── index.css                # Global styles and theme variables
├── e2e/
│   └── sentiment-widget.spec.js # E2E tests
├── index.html                   # HTML entry point
├── package.json                 # Dependencies and scripts
├── vite.config.js               # Vite configuration
├── vitest.config.js             # Vitest configuration
└── playwright.config.js         # Playwright configuration
```

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd sentiment-widget
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Testing

### Unit Tests

Run all unit tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm test -- --watch
```

Run tests with UI:
```bash
npm run test:ui
```

### End-to-End Tests

Install Playwright browsers (first time only):
```bash
npx playwright install
```

Run E2E tests:
```bash
npm run test:e2e
```

Run E2E tests in headed mode:
```bash
npx playwright test --headed
```

Run E2E tests in UI mode:
```bash
npx playwright test --ui
```

## Usage

1. **Select a Rating**: Click on one of the five rating chips (1-5)
2. **Enter a Comment** (optional): Type your feedback in the textarea
3. **Submit**: Click the "Submit Feedback" button
4. **View Results**: See your submission reflected in the Summary Panel

### Features in Action

- **Theme Toggle**: Click the sun/moon icon in the header to switch themes
- **Validation**: Try submitting without selecting a rating to see validation
- **Spam Prevention**: After submitting, the form is disabled for 3 seconds
- **Real-time Updates**: Statistics and recent comments update immediately

## Component Details

### RatingChips
- Props: `selectedRating`, `onRatingChange`, `disabled`
- Displays 5 clickable rating buttons
- Highlights selected rating with visual feedback

### CommentBox
- Props: `comment`, `onCommentChange`, `disabled`
- Provides textarea for user comments
- Respects disabled state during submission

### SubmitButton
- Props: `onClick`, `disabled`
- Changes text when disabled ("Submitting...")
- Prevents multiple submissions

### SummaryPanel
- Props: `submissions`
- Calculates and displays statistics
- Shows up to 3 most recent comments in reverse chronological order
- Filters out empty comments

## Design Decisions

1. **State Management**: Used React's built-in useState for simplicity (no external state management needed)
2. **Component Structure**: Separated concerns into logical, reusable components
3. **Accessibility**: Added ARIA labels and semantic HTML for screen reader support
4. **Testing**: Comprehensive unit and E2E tests ensure functionality and prevent regressions
5. **Styling**: CSS custom properties for easy theme switching without JavaScript overhead

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

MIT

## Author

Built using React and Vite
