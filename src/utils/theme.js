const switchTheme = (darkTheme) => {
    if(darkTheme){
      document.documentElement.style.setProperty('--background-color', '#212121');
      document.documentElement.style.setProperty('--second-background-color', '#1f1d1d');
      document.documentElement.style.setProperty('--ex-dark-color', '#332f17');
    } else {
      document.documentElement.style.setProperty('--background-color', '#f3f2ec');
      document.documentElement.style.setProperty('--second-background-color', '#edebe4');
      document.documentElement.style.setProperty('--ex-dark-color', '#e5e3da');
    }
}

export default switchTheme