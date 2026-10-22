# stage-ecms-frontend

Frontend application for Stage ECMS e-commerce platform.

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

## Usage

The application provides a simple shipping calculator that:
- Takes an order total as input
- Calculates shipping cost at 10% rate
- Displays the shipping details

## API Integration

The frontend communicates with the backend API at `http://localhost:5000/shipping` for shipping calculations.

## Testing

Run tests with:
```bash
npm test
```