async function run(exactLabel, dom) {
  const q = $(".customization2_attendee_further-data_custom-question").filter((i, q) => {
    const label = $(q).find(".customization2_attendee_further-data_custom-question_label");
    const allText = [...label.get(0).childNodes].map(c => $(c).text().trim()).join("");
    let match = exactLabel;
    if(label.find("vv-optional-text").length) match += label.find("vv-optional-text").text().trim();

    const groups = match.split("{...}");
    let i = 0;
    for (const group of groups) {
      const sub = allText.slice(i);
      const idx = sub.indexOf(group);
      if (idx == -1) return false;
      i += idx + group.length;
    }
    return true;

  }).parent();
  if (dom) return q.get(0);
  else return q;
}
