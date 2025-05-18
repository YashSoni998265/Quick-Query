<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>QuickQuery README</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      color: #333;
    }
    h1, h2 {
      color: #2c3e50;
    }
    h1 {
      border-bottom: 2px solid #3498db;
      padding-bottom: 10px;
    }
    h2 {
      margin-top: 20px;
    }
    ul, ol {
      margin: 10px 0;
      padding-left: 20px;
    }
    li {
      margin-bottom: 8px;
    }
    .highlight {
      background-color: #e8f4f8;
      padding: 2px 5px;
      border-radius: 3px;
      font-weight: bold;
      color: #2c3e50;
    }
    .code {
      background-color: #f4f4f4;
      padding: 10px;
      border-radius: 5px;
      font-family: 'Courier New', Courier, monospace;
      overflow-x: auto;
    }
    .note {
      color: #e74c3c;
      font-style: italic;
    }
    a {
      color: #3498db;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <h1>QuickQuery</h1>

  <h2>1. Project Title</h2>
  <p><span class="highlight">QuickQuery</span>: A Natural Language Query Interface for Firestore</p>

  <h2>2. Short Description</h2>
  <p>
    QuickQuery is a web application that allows users to query a Firestore database using <span class="highlight">natural language</span> inputs. Users can enter queries like <span class="highlight">"show all users"</span>, <span class="highlight">"names"</span>, or <span class="highlight">"name = Olivia and city = San Diego"</span>, and the app translates them into Firestore queries, displaying results in a dynamic table. Built with a <span class="highlight">React</span> frontend and a <span class="highlight">Node.js/Express</span> backend, it provides an intuitive way to explore data without writing complex queries.
  </p>

  <h2>3. Tech Stack</h2>
  <ul>
    <li><span class="highlight">Frontend</span>:
      <ul>
        <li>React: For building the user interface.</li>
        <li>JavaScript (ES6+): For client-side logic.</li>
        <li>CSS: For styling the table and form.</li>
      </ul>
    </li>
    <li><span class="highlight">Backend</span>:
      <ul>
        <li>Node.js: Runtime for the server.</li>
        <li>Express: Web framework for API endpoints.</li>
        <li>Firebase Admin SDK: For Firestore database interactions.</li>
      </ul>
    </li>
    <li><span class="highlight">Database</span>:
      <ul>
        <li>Google Firestore: NoSQL database for storing user data.</li>
      </ul>
    </li>
    <li><span class="highlight">Deployment</span>:
      <ul>
        <li>Render: Hosts the Node.js server.</li>
        <li>Vercel: Hosts the React frontend.</li>
      </ul>
    </li>
    <li><span class="highlight">Tools</span>:
      <ul>
        <li>Git: Version control.</li>
        <li>npm: Package management.</li>
        <li>dotenv: For environment variables.</li>
      </ul>
    </li>
  </ul>

  <h2>4. Features</h2>
  <ul>
    <li><span class="highlight">Natural Language Queries</span>: Supports intuitive queries like:
      <ul>
        <li>"show all users" &rarr; Displays all user data.</li>
        <li>"names" &rarr; Shows only the name column.</li>
        <li>"name = Olivia" &rarr; Shows all details for Olivia.</li>
        <li>"age > 30 and city = Chicago" &rarr; Filters users by multiple conditions.</li>
        <li>"city contains Angeles" &rarr; Partial matches for city.</li>
        <li>"age >= 30 sorted by age desc" &rarr; Sorts results.</li>
      </ul>
    </li>
    <li><span class="highlight">Dynamic Table</span>: Automatically adjusts columns based on query (e.g., only names for "names").</li>
    <li><span class="highlight">Firestore Integration</span>: Securely queries a Firestore database using the Firebase Admin SDK.</li>
    <li><span class="highlight">Error Handling</span>: Displays user-friendly error messages for invalid queries or server issues.</li>
    <li><span class="highlight">Responsive Design</span>: Clean, simple UI for easy data exploration.</li>
  </ul>

  <h2>5. How to Run</h2>
  <p>Follow these steps to run QuickQuery locally or deploy it.</p>

  <h3>Prerequisites</h3>
  <ul>
    <li><span class="highlight">Node.js</span> (v18 or later recommended, v22.15.1 tested).</li>
    <li><span class="highlight">Firebase Project</span>: Set up a Firebase project with Firestore in Native Mode.</li>
    <li><span class="highlight">Git</span>: For cloning the repository.</li>
  </ul>

  <h3>Setup</h3>
  <ol>
    <li><span class="highlight">Clone the Repository</span>:
      <div class="code">
        git clone https://github.com/your-repo/quickquery.git<br>
        cd quickquery
      </div>
    </li>
    <li><span class="highlight">Set Up Firebase</span>:
      <ul>
        <li>Go to <a href="https://console.firebase.google.com/">Firebase Console</a> and create a project (e.g., <span class="highlight">quickquery-9243a</span>).</li>
        <li>Enable Firestore in <span class="highlight">Native Mode</span>.</li>
        <li>Download the service account key from Project Settings > Service Accounts > Generate new private key.</li>
      </ul>
    </li>
    <li><span class="highlight">Server Setup</span>:
      <div class="code">
        cd server<br>
        npm install<br>
        echo "FIREBASE_PROJECT_ID=quickquery-9243a" > .env<br>
        echo "FIREBASE_PRIVATE_KEY=\"YOUR_PRIVATE_KEY\"" >> .env<br>
        echo "FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@quickquery-9243a.iam.gserviceaccount.com" >> .env<br>
        echo "PORT=5000" >> .env
      </div>
      <p class="note">Replace YOUR_PRIVATE_KEY with the private_key from the service account JSON, including newlines.</p>
    </li>
    <li><span class="highlight">Client Setup</span>:
      <div class="code">
        cd ../client<br>
        npm install<br>
        echo "REACT_APP_API_URL=http://localhost:5000" > .env
      </div>
    </li>
  </ol>

  <h3>Running Locally</h3>
  <ol>
    <li><span class="highlight">Seed Firestore</span>:
      <div class="code">
        cd server<br>
        npm run init-db
      </div>
      <p>Populates the <span class="highlight">users</span> collection with 15 sample records.</p>
    </li>
    <li><span class="highlight">Start Server</span>:
      <div class="code">
        npm run dev
      </div>
      <p>Runs at <a href="http://localhost:5000">http://localhost:5000</a>.</p>
    </li>
    <li><span class="highlight">Start Client</span>:
      <div class="code">
        cd ../client<br>
        npm start
      </div>
      <p>Opens <a href="http://localhost:3000">http://localhost:3000</a> in your browser.</p>
    </li>
    <li><span class="highlight">Test Queries</span>:
      <ul>
        <li>Enter queries like <span class="highlight">"names"</span>, <span class="highlight">"name = Olivia"</span>, or <span class="highlight">"age > 30 sorted by age desc"</span>.</li>
        <li>View results in a dynamic table and the generated Firestore query.</li>
      </ul>
    </li>
  </ol>

  <h3>Deploying</h3>
  <ol>
    <li><span class="highlight">Server (Render)</span>:
      <ul>
        <li>Push <span class="highlight">server</span> folder to a GitHub repo.</li>
        <li>Create a Web Service on <a href="https://render.com">Render</a>.</li>
        <li>Set environment variables:
          <div class="code">
            FIREBASE_PROJECT_ID=quickquery-9243a<br>
            FIREBASE_PRIVATE_KEY="YOUR_PRIVATE_KEY"<br>
            FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@quickquery-9243a.iam.gserviceaccount.com<br>
            PORT=5000
          </div>
        </li>
        <li>Configure:
          <ul>
            <li>Runtime: Node</li>
            <li>Build Command: <span class="highlight">npm install</span></li>
            <li>Start Command: <span class="highlight">npm start</span></li>
          </ul>
        </li>
        <li>Run <span class="highlight">npm run init-db</span> via Render’s shell to seed Firestore.</li>
        <li>Note the Render URL (e.g., <span class="highlight">https://quickquery-server.onrender.com</span>).</li>
      </ul>
    </li>
    <li><span class="highlight">Client (Vercel)</span>:
      <ul>
        <li>Push <span class="highlight">client</span> folder to a GitHub repo.</li>
        <li>Create a project on <a href="https://vercel.com">Vercel</a>.</li>
        <li>Set environment variable:
          <div class="code">
            REACT_APP_API_URL=https://your-render-server-url
          </div>
        </li>
        <li>Deploy and access the Vercel URL (e.g., <span class="highlight">https://quickquery-client.vercel.app</span>).</li>
      </ul>
    </li>
  </ol>

  <h2>6. AI Usage Explanation</h2>
  <p>
    The development of QuickQuery leveraged <span class="highlight">Grok 3</span>, an AI model by xAI, to assist with:
  </p>
  <ul>
    <li><span class="highlight">Code Debugging</span>: Diagnosed and resolved issues like:
      <ul>
        <li>Missing Firebase environment variables causing <span class="highlight">TypeError</span>.</li>
        <li>Firestore API not enabled (<span class="highlight">PERMISSION_DENIED</span>).</li>
        <li>Database not initialized (<span class="highlight">NOT_FOUND</span>).</li>
        <li>Client-server interaction failures (Submit button not responding).</li>
      </ul></li>
    <li><span class="highlight">Feature Enhancement</span>: Designed a robust <span class="highlight">text-to-db.js</span> parser to support diverse queries:
      <ul>
        <li>Single-column selection (e.g., <span class="highlight">"names"</span>).</li>
        <li>Exact matches (e.g., <span class="highlight">"name = Olivia"</span>).</li>
        <li>Partial matches and sorting (e.g., <span class="highlight">"city contains Angeles sorted by age"</span>).</li>
      </ul>
    </li>
    <li><span class="highlight">Documentation</span>: Generated this README with structured, highlighted HTML for clarity.</li>
    <li><span class="highlight">Optimization</span>: Provided tailored setup instructions for Windows (PowerShell) and deployment on Render/Vercel.</li>
  </ul>
  <p>
    Grok 3 ensured the project aligned with the requirement for a <span class="highlight">database that works directly</span> (Firestore via Firebase Admin SDK) and offered iterative refinements based on error logs and user feedback.
  </p>

</body>
</html>
