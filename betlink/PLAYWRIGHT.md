# Playwright Setup for BetLink

Playwright is fully configured and working in WSL for both traditional testing and MCP integration.

## 🎯 What's Installed

- ✅ Playwright Test Runner with all browsers (Chromium, Firefox, WebKit)
- ✅ System dependencies for WSL
- ✅ Playwright MCP Server for AI integration
- ✅ Test configuration optimized for Next.js

## 🚀 Available Commands

### Traditional Testing
```bash
npm test                    # Run tests headlessly
npm run test:headed         # Run tests with visible browser
npm run test:ui            # Open Playwright UI mode  
npm run test:debug         # Debug mode
```

### MCP Server (for Claude integration)
```bash
npm run mcp:server         # Start MCP server with visible browser
npm run mcp:server:headless # Start MCP server headlessly
```

## 📁 File Structure

```
betlink/
├── tests/                          # Test files
│   ├── example.spec.ts             # Homepage tests
│   └── setup-verification.spec.ts  # Installation verification
├── playwright.config.ts            # Playwright configuration
├── .playwright-mcp-config.json     # MCP server configuration
└── playwright-output/              # Screenshots, traces, etc.
```

## 🔧 Configuration

### For Traditional Testing
- Tests run against `http://localhost:3000` when dev server is running
- Configured for Chromium, Firefox, and WebKit
- Screenshots and traces saved on failures
- HTML reports generated automatically

### For MCP Integration  
- Server runs on `localhost:8931`
- Browser launches in headed mode with 250ms slow motion
- 1280x720 viewport
- Supports all core capabilities: tabs, PDF, history, wait, files

## 🎬 Usage Examples

### Run a specific test
```bash
npm test -- tests/example.spec.ts
```

### Run tests with specific browser
```bash
npm test -- --project=chromium
```

### Generate and view HTML report
```bash
npm test
npx playwright show-report
```

### Start MCP server for Claude
```bash
npm run mcp:server
```

## 🐛 Troubleshooting

### System Dependencies Missing
If you get browser dependency errors:
```bash
sudo npx playwright install-deps
```

### WSL Display Issues
If browsers don't show in headed mode:
```bash
export DISPLAY=:0
npm run test:headed
```

### Update Browsers
```bash
npx playwright install
```

## 🤖 MCP Integration

The MCP server allows Claude to:
- Navigate web pages
- Click elements  
- Fill forms
- Take screenshots
- Generate PDFs
- Manage browser tabs
- Upload files
- Handle dialogs

Perfect for testing your BetLink application interactively!