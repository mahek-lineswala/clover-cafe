# Clover Cafe

A whimsical static website for the Dragonfly Inn café, featuring a guest book, AI-powered book recommendations, a pomodoro timer, and more.

## Features

- **Home** - Welcome page with ambient music
- **Guest Book** - Leave messages that save to a Supabase database
- **Book Nook** - Order items and get AI-powered book recommendations via Gemini
- **Workaholic** - Pomodoro timer for focused work sessions
- **Creator** - About the creator
- **Cattos** - Cat appreciation page with audio surprises

---

## Tech Stack

- **Frontend**: Static HTML, CSS, JavaScript
- **Styling**: Tailwind CSS (via CDN)
- **Backend**: Express.js server (see `../dragonfly-Inn-backend`)
- **Database**: Supabase
- **AI**: Google Gemini for book recommendations

---

## Getting Started

### Prerequisites

- A modern web browser
- (Optional) Python or Node.js for local development server
- Backend server running for guest book and book recommendations

### Running Locally

This is a static site. You can open HTML files directly in your browser, but for full functionality (API calls, proper MIME types) it's better to serve via HTTP.

**Option 1: Python (if installed)**

```bash
# Navigate to this folder
cd clover-cafe

# Start a simple HTTP server
python -m http.server 5500
```

Then open http://localhost:5500 in your browser.

**Option 2: Node.js http-server**

```bash
# Navigate to this folder
cd clover-cafe

# Use npx (no install needed)
npx http-server . -p 5500
```

Then open http://localhost:5500 in your browser.

**Option 3: VS Code Live Server**

- Install the "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

---

## Backend Integration

The guest book and book recommendations require the backend API to be running.

### Starting the Backend

```bash
# Navigate to backend folder
cd ../dragonfly-Inn-backend

# Install dependencies (first time only)
npm install

# Start the server
npm run dev
```

The backend will run on http://localhost:3000 by default.

### Connecting to a Different Backend

If you deploy the backend or change the port, update these files:

**For Guest Book:**
- File: `js/guest-book.js`
- Change: `const API_URL = "http://localhost:3000";`

**For Book Recommendations:**
- File: `book-nook.html`
- Search for: `http://localhost:3000/recommend-books-gemini`
- Update the URL in the `fetch()` call

---

## Project Structure

```
clover-cafe/
├── index.html              # Home page
├── guest-book.html         # Guest book with backend integration
├── book-nook.html          # Book recommendations
├── get-working.html        # Pomodoro timer
├── creator.html            # About page
├── cattos.html            # Cat appreciation
├── assets/
│   ├── images/            # All images
│   ├── audios/            # Background music and sounds
│   └── fonts/             # Custom fonts
├── css/
│   └── styles.css         # Additional styles
└── js/
    ├── script.js          # Shared utilities
    └── guest-book.js      # Guest book API integration
```

---

## Deployment

### Static Hosting (Netlify, Vercel, GitHub Pages)

1. Deploy this folder to any static hosting service
2. Deploy the backend separately (Railway, Render, Heroku, etc.)
3. Update the `API_URL` in `js/guest-book.js` and `book-nook.html` to point to your deployed backend

### Environment Variables (Backend)

The backend requires these environment variables:

```env
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
GEMINI_API_KEY=your-gemini-api-key
PORT=3000
```

See `../dragonfly-Inn-backend/README.md` for detailed backend setup.

---

## Features Details

### Guest Book

- Visitors can leave messages with their name
- Messages are stored in Supabase database
- Fallback to localStorage if backend is unavailable
- Real-time message display

### Book Nook (AI Recommendations)

- Select café items (desserts, drinks)
- Each item has a mood/theme
- Click "Get Book Recommendations" to receive 3 AI-curated book suggestions
- Powered by Google Gemini based on the mood of your order

### Background Music

- Ambient café music plays across pages
- Music position and play/pause state persist across navigation
- Click profile image to toggle playback

---

## Troubleshooting

**Images not loading:**
- Check `assets/images/` for correct filenames (case-sensitive on some servers)
- Ensure relative paths start with `./`

**Guest book shows "Could not connect to server":**
- Make sure backend is running at the configured `API_URL`
- Check CORS is enabled in backend
- Verify backend URL is correct

**Book recommendations not appearing:**
- Ensure backend is running
- Check `GEMINI_API_KEY` is set in backend `.env`
- Open browser DevTools → Console for error messages
- Verify Gemini API model name is correct (currently `gemini-1.5-flash`)

**Audio not playing:**
- Browsers block autoplay by default
- Audio will play after first user interaction (click/tap)

---

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (audio may require user interaction)
- Mobile browsers: Tested and working

---

## Development Tips

- Use browser DevTools → Network tab to inspect API calls
- Use Console tab to see JavaScript errors
- The site uses Tailwind CSS via CDN (no build step needed)
- All pages are independent and can be tested separately

---

## License

MIT