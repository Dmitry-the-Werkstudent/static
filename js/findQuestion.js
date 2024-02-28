async function run(exactLabel) {
  return $(".customization2_attendee_further-data_custom-question").filter((i, q) => {
    const label = $(q).find(".customization2_attendee_further-data_custom-question_label");
    const allText = [...label.get(0).childNodes].map(c => $(c).text().trim()).join("");
    let match = exactLabel;
    if(label.find("vv-optional-text").length) match += label.find("vv-optional-text").text().trim();
    return allText == match;
  });
}
