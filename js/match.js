function run(match, allText) {
   const groups = match.split("{...}");
    let i = 0;
    for (const group of groups) {
      const sub = allText.slice(i);
      const idx = sub.indexOf(group);
      if (idx == -1) return false;
      i += idx + group.length;
    }
    return true;
}
