async function run(exactLabel, dom) {
  const qu = $(".customization2_attendee_further-data_custom-question");
  const results = await Promise.all(qu.map(async (i, q) => {
    const label = $(q).find(".customization2_attendee_further-data_custom-question_label");
    const allText = [...label.get(0).childNodes].map(c => $(c).text().trim()).join("");
    let match = exactLabel;
    if(label.find("vv-optional-text").length) match += label.find("vv-optional-text").text().trim();
    return await custom_js("match", match, allText);
  }));
  const filtered = qu.filter((i, q) => results[i]).parent();
  if (dom) return filtered.get(0);
  else return filtered;
}
