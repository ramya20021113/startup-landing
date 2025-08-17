# Startup Landing Page

A modern startup landing page with API endpoints, optimized for Vercel deployment.

## Features

- Responsive design
- Newsletter subscription
- Quote request functionality
- API endpoints for data handling
- Optimized for Vercel serverless deployment

## API Endpoints

- `GET /api/health` - Health check endpoint
- `POST /api/subscribe` - Newsletter subscription
- `POST /api/quote` - Quote request

## Deployment to Vercel

### Prerequisites

1. Install Vercel CLI:

```bash
npm i -g vercel
```

2. Make sure you have a Vercel account

### Deployment Steps

1. **Login to Vercel:**

```bash
vercel login
```

2. **Deploy the project:**

```bash
vercel
```

3. **For production deployment:**

```bash
vercel --prod
```

### Project Structure

```
startup-landing/
├── api/                    # Vercel serverless functions
│   ├── health.js          # Health check endpoint
│   ├── subscribe.js       # Newsletter subscription
│   └── quote.js          # Quote request
├── src/main/resources/
│   ├── static/            # Static assets (CSS, JS)
│   └── templates/         # HTML templates
├── vercel.json           # Vercel configuration
├── package.json          # Node.js dependencies
└── .vercelignore         # Files to exclude from deployment
```

## Error Solutions

### Common HTTP Errors:

- **400 Bad Request**: Invalid request data - check request body format
- **403 Forbidden**: CORS issues - API endpoints include CORS headers
- **404 Not Found**: Route not found - check vercel.json routing
- **405 Method Not Allowed**: Wrong HTTP method - check endpoint requirements
- **413 Payload Too Large**: Request too large - optimize data size
- **500 Internal Server Error**: Server error - check API function logs
- **502/503/504 Gateway Errors**: Vercel function timeout - optimize code
- **508 Loop Detected**: Infinite redirect - check routing configuration

### Troubleshooting:

1. **Check Vercel Function Logs:**

   - Go to Vercel dashboard
   - Select your project
   - Go to Functions tab
   - Check logs for errors

2. **Verify API Endpoints:**

   - Test endpoints locally: `vercel dev`
   - Check network tab in browser dev tools
   - Verify CORS headers are set

3. **Check File Structure:**
   - Ensure all files are in correct locations
   - Verify vercel.json configuration
   - Check .vercelignore exclusions

## Local Development

1. **Install dependencies:**

```bash
npm install
```

2. **Run locally:**

```bash
vercel dev
```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - API: http://localhost:3000/api/health

## Environment Variables

No environment variables are required for basic functionality. Add any needed variables in the Vercel dashboard under Settings > Environment Variables.

## Support

For issues with Vercel deployment, check:

- Vercel documentation: https://vercel.com/docs
- Vercel community: https://github.com/vercel/vercel/discussions


