window.custom_js = async function (name, ...args) {
  return new Promise(resolve => {
    $.getScript("https://dmitry-the-werkstudent.github.io/static/js/" + name + ".js", async () => {
      resolve(await run(...args));
    });
  });
}
