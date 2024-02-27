window.custom_js = function (name, ...args) {
  $.getScript("https://dmitry-the-werkstudent.github.io/static/js/" + name + ".js", () => {
    run(...args);
  });
}
