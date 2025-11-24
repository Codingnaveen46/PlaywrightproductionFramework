# Playwright Hybrid Framework with Cucumber & TypeScript

This is a production-ready hybrid automation framework using **Playwright**, **Cucumber BDD**, and **TypeScript**. It follows the **Page Object Model (POM)** design pattern and includes **Allure Reporting** and **CI/CD** integration.

## Features

- **BDD Approach**: Write tests in plain English using Gherkin syntax (.feature files).
- **TypeScript**: Strong typing and modern JavaScript features.
- **Page Object Model**: Reusable and maintainable page objects.
- **Playwright**: Fast, reliable, and capable of cross-browser testing.
- **Allure Reporting**: Rich, interactive test reports with screenshots on failure.
- **CI/CD Ready**: GitHub Actions workflow included.
- **Custom World**: Shared context for cleaner step definitions.
- **Hooks**: Automatic browser management and screenshot capture.

## Folder Structure

```
├── .github/workflows   # CI/CD configurations
├── config              # Configuration files
├── features            # Cucumber feature files (.feature)
├── src
│   ├── hooks           # Cucumber hooks (Before/After)
│   ├── pages           # Page Object classes
│   ├── steps           # Step Definitions
│   ├── support         # Custom World and helper utilities
│   └── data            # Test data (JSON)
├── cucumber.js         # Cucumber configuration
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── README.md           # Documentation
```

## Configuration & Data

- **Config**: `config/environment.ts` manages environment-specific URLs.
  - Switch environments using `ENV=dev npm test` (defaults to `qa`).
- **Static Data**: `src/data/` contains JSON files for test data.
- **Data Loader**: `src/support/data-loader.ts` allows loading and saving data dynamically.
  ```typescript
  const users = DataLoader.load('users');
  ```

## Prerequisites

- Node.js (v14 or higher)
- npm

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Running Tests

### Run all tests
```bash
npm test
```

### Run specific tags
```bash
npm run test:tags -- "@smoke"
```

## Reporting

Generate and open the Allure report:
```bash
npm run report
```

## CI/CD

The framework is configured with GitHub Actions. On every push or pull request to `main` or `master`, the tests will run automatically, and the Allure report will be generated as an artifact.

## Docker Support

You can run the tests in a Docker container to ensure a consistent environment.

### Prerequisites
- Docker Desktop installed and running.

### Running Tests in Docker

1. Build and run the tests:
   ```bash
   docker-compose up --build
   ```
2. The tests will execute, and the Allure report will be generated in the `allure-report` directory on your local machine.
3. Open the report locally:
   ```bash
   npm run report:open
   ```

## AWS S3 Integration

Host your Allure reports on AWS S3 (Free Tier eligible).

### Setup
1. **Create an S3 Bucket**:
   - Go to AWS Console > S3 > Create bucket.
   - Uncheck "Block all public access".
   - Enable "Static website hosting" in Properties.
   - Add a Bucket Policy to allow public read access.

2. **Configure Credentials**:
   Create a `.env` file in the root directory:
   ```env
   AWS_ACCESS_KEY_ID=your_access_key
   AWS_SECRET_ACCESS_KEY=your_secret_key
   AWS_REGION=us-east-1
   AWS_S3_BUCKET=your_bucket_name
   ```

3. **Upload Report**:
   ```bash
   npm run report:upload
   ```

## Writing New Tests

1. Create a new `.feature` file in `features/`.
2. Create a new Page Object in `src/pages/` extending `BasePage`.
3. Create step definitions in `src/steps/`.
4. Run the test to verify.
