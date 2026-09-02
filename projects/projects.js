/* ============================================================
   The projects that live in the book on the living-room shelf.
   This file is data only — edit it, reload the page, done.

   Order matters: the FIRST entry is the page the book opens to,
   and the rest follow in the order written here.

   Screenshots are not in yet. Drop a picture in projects/img/
   and put its path in `image` — until then each page falls back
   to the placeholder. The filename suggested in each comment is
   only a suggestion; any path that exists will do.

   Fields:
     title  — the headline on the right-hand page
     kicker — the small line above the title (year, client, context)
     body   — the story of the project, a short paragraph or two
     tech   — the stack line, shown quietly under the body
     image  — path to the picture on the left-hand page
     link   — optional URL; shows a "Visit" link when present
   ============================================================ */
window.PROJECTS = [
  {
    /* img: projects/img/medical-chatbot-bias.png */
    title: 'Medical Chatbot Bias Analysis',
    kicker: 'Honours thesis · University of Sydney · solo',
    body: 'Study of two deployed medical AI chatbots, Doctronic and Dr Khan, tested for response bias across patient demographics. A browser-automation pipeline collected 1,546 responses and 22,936 turn-level observations across a 5×2×3×10×3 factorial design. Mixed-effects models, ML classification at 0.999 macro-F1, trajectory modelling and PERMANOVA all named chatbot identity as the driver.',
    tech: 'Python · browser automation · mixed-effects models · scikit-learn · embeddings/PERMANOVA',
    image: 'images/projects/medical.png',
    link: 'https://github.com/raaannndddd/ELEC4713-Thesis-B'
  },
  {
    /* img: projects/img/advertising-effectiveness.png */
    title: 'Advertising Effectiveness Analysis',
    kicker: 'Capstone · WITS Consulting · 13 weeks',
    body: 'Client capstone with a six-person Extreme Programming team over thirteen weeks, measuring who actually looks at an advertisement. Owned the computer-vision pipeline: Dlib face detection feeding a PyTorch ResNet that classifies age and gender. Integrated live camera streaming into the React frontend, then processed real client footage across 92 tracked individuals.',
    tech: 'Python · Dlib · PyTorch (ResNet) · React · live video streaming',
    image: 'images/projects/advertise.png',
    link: 'https://drive.google.com/file/d/1Ofm27VoKBhMmX4QL8byoXmq000rmV_aB/view?usp=sharing'
  },
  {
    /* img: projects/img/jordan-language-academy.png */
    title: 'Jordan Language Academy',
    kicker: 'Freelance client · solo · paid',
    body: 'Rebuilt a Jordanian language academy\'s fifteen-year-old static site as a modern deployed product for a paying client. Sole developer across the full scope: information architecture, UX, front-end build, technical SEO and on-page optimisation. Shipped a live site structured to rank for local course searches and to be maintained by a non-technical owner.',
    tech: 'Full-stack build · technical SEO · IA & UX',
    image: 'images/projects/jla.png',
    link: 'https://jla-website-green.vercel.app/'
  },
  {
    /* img: projects/img/axiomchat.png */
    title: 'ChartChat',
    kicker: 'Chrome extension · solo',
    body: 'Chrome extension built on Next.js that layers a real-time chat assistant over live crypto market data. Socket.io carries the conversation, Dexscreener and CoinGecko supply pricing and token data, and a locally run Ollama model generates the answers, with Google Sign-In on the door. Built solo, from packaging to model integration.',
    tech: 'Next.js · Chrome extension · Socket.io · Ollama · Dexscreener / CoinGecko APIs',
    image: 'images/projects/chart_chat.png',
    link: 'https://github.com/raaannndddd/AxiomChat'
  },
  {
    /* img: projects/img/volume-control.png */
    title: 'VolumeControl',
    kicker: 'Personal project · solo · workshop demo',
    body: 'Gesture-controlled system volume tool for macOS. OpenCV captures webcam frames and MediaPipe tracks hand landmarks, mapping the pinch distance between thumb and index finger to system volume in real time. Taught the build as a two-hour hands-on workshop to more than 30 attendees as a practical introduction to computer vision.',
    tech: 'Python · OpenCV · MediaPipe · real-time CV',
    image: 'images/projects/vol_control.png',
    link: 'https://github.com/raaannndddd/VolumeControl'
  }
];
