/**
 * Switches between dark and light theme by updating CSS variables
 * 
 * @param {boolean} darkTheme - Flag indicating whether to apply dark theme (true) or light theme (false)
 * 
 * Theme color variables:
 * --background-color: Main background color
 * --second-background-color: Secondary background color (for cards, panels, etc.)
 * --ex-dark-color: Extra dark color (used for accents or special elements)
 */
const switchTheme = (darkTheme) => {
  if(darkTheme) {
    // Apply dark theme colors
    document.documentElement.style.setProperty('--background-color', '#212121');        // Dark gray
    document.documentElement.style.setProperty('--second-background-color', '#1f1d1d'); // Slightly darker gray
    document.documentElement.style.setProperty('--ex-dark-color', '#332f17');          // Dark olive/muted green
  } else {
    // Apply light theme colors
    document.documentElement.style.setProperty('--background-color', '#f3f2ec');       // Off-white
    document.documentElement.style.setProperty('--second-background-color', '#edebe4'); // Slightly darker off-white
    document.documentElement.style.setProperty('--ex-dark-color', '#e5e3da');          // Light beige/gray
  }
}

export default switchTheme