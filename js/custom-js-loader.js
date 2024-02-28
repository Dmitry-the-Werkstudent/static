const cache = { };

window.custom_js = async function (name, ...args) {
  if (name in cache) {
    return await cache[name](...args);
  }
  return new Promise(resolve => {
    $.getScript("https://dmitry-the-werkstudent.github.io/static/js/" + name + ".js", async () => {
      cache[name] = run;
      resolve(await run(...args));
    });
  });
}
