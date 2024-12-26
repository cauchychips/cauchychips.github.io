MathJax = {
  tex: {
    inlineMath: [["$", "$"], ["\\(", "\\)"]],
    displayMath: [["$$", "$$"], ["\\[", "\\]"]],
    processEscapes: true,
    processEnvironments: true
  },
  options: {
    ignoreHtmlClass: ".*|",
    processHtmlClass: "arithmatex"
  },
  startup: {
    ready() {
      MathJax.startup.defaultReady();
    }
  }
};

// Function to force reload with a timestamp query parameter
function forcePageReloadWithTimestamp() {
  const links = document.querySelectorAll("a.md-nav__link, a.md-tabs__link");
  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = event.currentTarget.getAttribute("href");
      if (target && !target.startsWith("http")) {
        event.preventDefault();
        const timestamp = new Date().getTime(); // Get current timestamp
        const urlWithTimestamp = `${target}?_=${timestamp}`; // Append timestamp to the URL
        window.location.href = urlWithTimestamp; // Redirect to the URL with the timestamp
      }
    });
  });
}

// Render MathJax on page load
function renderMathJax() {
  if (typeof MathJax !== "undefined") {
    MathJax.typesetClear(); // Clear previous typesetting
    MathJax.typesetPromise()
      .then(() => console.log("MathJax successfully rendered."))
      .catch((err) => console.error("MathJax rendering error:", err));
  }
}

// Initialize MathJax and force reload on navigation
function initializeMathJaxAndReload() {
  renderMathJax(); // Render math after the page has loaded
  forcePageReloadWithTimestamp(); // Force full page reload with timestamp on navigation
}

// Listen for MkDocs Material content updates
document$.subscribe(() => {
  initializeMathJaxAndReload();
});
