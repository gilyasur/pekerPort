const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Source and destination directories
const sourceDir = 'out'; // Next.js now exports to 'out' by default
const deployDir = 'netlify-deploy';

// Copy function to recursively copy files
const copyDirectory = (source, destination) => {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  // Get all files in the source directory
  const files = fs.readdirSync(source);

  // Copy each file to the destination
  for (const file of files) {
    const sourcePath = path.join(source, file);
    const destPath = path.join(destination, file);

    const stats = fs.statSync(sourcePath);
    if (stats.isDirectory()) {
      // Recursively copy subdirectories
      copyDirectory(sourcePath, destPath);
    } else {
      // Copy files
      fs.copyFileSync(sourcePath, destPath);
    }
  }
};

// Create a README with instructions
const createReadme = () => {
  const readmeContent = `# Netlify Drag and Drop Deployment

## Instructions

1. Navigate to https://app.netlify.com/ and log in to your account
2. Drag and drop this entire folder onto the Netlify dashboard
3. Wait for the deployment to complete
4. Access your site at the URL provided by Netlify

## Environment Variables

This package includes a .env file with EmailJS configuration. Before deploying:

1. Open the .env file in this folder
2. Replace the placeholder values with your actual EmailJS credentials:
   - NEXT_PUBLIC_EMAILJS_SERVICE_ID
   - NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
   - NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

Alternatively, you can set these variables in the Netlify dashboard after deployment:
1. Go to Site settings > Environment variables
2. Add each variable with your actual values
3. Trigger a new deployment

## Important Notes

- This deployment method is separate from your GitHub-connected deployment
- Any changes will require generating a new package and redeploying
- To generate a new package, run \`npm run build-for-deploy\` in the main project

`;

  fs.writeFileSync(path.join(deployDir, 'README.md'), readmeContent);
  console.log('Created README.md with deployment instructions');
};

// Create _redirects file for SPA routing
const createRedirects = () => {
  const redirectsContent = `/*    /index.html   200
`;
  fs.writeFileSync(path.join(deployDir, '_redirects'), redirectsContent);
  console.log('Created _redirects file for SPA routing');
};

// Create netlify.toml configuration
const createNetlifyToml = () => {
  const tomlContent = `[build]
  publish = "/"

# Handle SPA routing
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
`;
  fs.writeFileSync(path.join(deployDir, 'netlify.toml'), tomlContent);
  console.log('Created netlify.toml configuration file');
};

// Create .env file with environment variables
const createEnvFile = () => {
  // Check if a .env.production file exists first
  let envContent = '';
  
  if (fs.existsSync('.env.production')) {
    // Use production env file if available
    envContent = fs.readFileSync('.env.production', 'utf8');
    console.log('Using .env.production for environment variables');
  } else if (fs.existsSync('.env')) {
    // Fallback to regular .env file
    envContent = fs.readFileSync('.env', 'utf8');
    console.log('Using .env for environment variables');
  } else {
    // Create minimal env with EmailJS variables if no env file exists
    console.log('No .env file found. Creating a template for EmailJS variables');
    envContent = `# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
`;
  }
  
  fs.writeFileSync(path.join(deployDir, '.env'), envContent);
  console.log('Created .env file for environment variables');
};

// Create a runtime config for environment variables
const createRuntimeConfig = () => {
  // Extract environment variables with NEXT_PUBLIC_ prefix
  const envVars = {};
  
  // Check .env file first
  if (fs.existsSync('.env')) {
    const envFile = fs.readFileSync('.env', 'utf8');
    const envLines = envFile.split('\n');
    
    envLines.forEach(line => {
      // Skip comments and empty lines
      if (line.startsWith('#') || !line.trim()) return;
      
      const match = line.match(/^NEXT_PUBLIC_([^=]+)=(.*)$/);
      if (match) {
        const [, key, value] = match;
        envVars[`NEXT_PUBLIC_${key}`] = value;
      }
    });
  }
  
  // Create the runtime config script
  const runtimeContent = `
// Runtime environment configuration
window.ENV = {
  ${Object.entries(envVars).map(([key, value]) => `"${key}": "${value}"`).join(',\n  ')}
};
`;

  fs.writeFileSync(path.join(deployDir, 'env-config.js'), runtimeContent);
  
  // Also add a script tag to the HTML to include this file
  const indexPath = path.join(deployDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    let indexContent = fs.readFileSync(indexPath, 'utf8');
    
    // Add the script tag before the closing </head> tag
    indexContent = indexContent.replace('</head>', `  <script src="/env-config.js"></script>\n</head>`);
    
    fs.writeFileSync(indexPath, indexContent);
    console.log('Added runtime environment configuration script');
  }
};

// Main function
const main = async () => {
  console.log('Preparing Netlify drag and drop deployment package...');
  
  // Check if the source directory exists
  if (!fs.existsSync(sourceDir)) {
    console.log(`The '${sourceDir}' directory doesn't exist. Build may have failed.`);
    process.exit(1);
  }
  
  // Create deploy directory if it doesn't exist
  if (!fs.existsSync(deployDir)) {
    fs.mkdirSync(deployDir, { recursive: true });
  } else {
    // Clear existing files in deploy directory
    console.log(`Clearing existing files in '${deployDir}'...`);
    fs.rmSync(deployDir, { recursive: true, force: true });
    fs.mkdirSync(deployDir, { recursive: true });
  }
  
  // Copy build files to deploy directory
  console.log(`Copying files from '${sourceDir}' to '${deployDir}'...`);
  copyDirectory(sourceDir, deployDir);
  
  // Create additional files
  createReadme();
  createRedirects();
  createNetlifyToml();
  createEnvFile();
  createRuntimeConfig();
  
  console.log('\nDeployment package created successfully!');
  console.log(`\nYou can now drag and drop the '${deployDir}' folder to Netlify.`);
};

// Run the script
main().catch(error => {
  console.error('Error creating deployment package:', error);
  process.exit(1);
}); 