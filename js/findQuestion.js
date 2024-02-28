async function run(exactLabel) {
  return $(".customization2_attendee_further-data_custom-question").filter((i, q) => {
    const label = $(q).find(".customization2_attendee_further-data_custom-question_label");
    const allText = [...label.get(0).childNodes].map(c => $(c).text().trim()).join("");
    if (exactLabel.endsWith("{...}")) {
      return allText.startsWith(exactLabel.slice(0, -5));
    } else if (exactLabel.startsWith("{...}")) {
      let match = exactLabel.slice(5);
      if(label.find("vv-optional-text").length) match += label.find("vv-optional-text").text().trim();
      return allText.endsWith(match);
    } else {
      let match = exactLabel;
      if(label.find("vv-optional-text").length) match += label.find("vv-optional-text").text().trim();
      return allText == match;
    }
  }).parent();
}
