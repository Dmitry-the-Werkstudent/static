function conditional(cond, show, dict) {
  if (cond.constructor === "".constructor) {
    // single question without further action
    const el = findQuestion(cond);
    if (show) {
      el.parent().show();
    } else {
      el.parent().hide();
    }
  } else if (cond.constructor === [].constructor) {
    // multiple questions without further action
    cond.forEach(c => conditional(c, show, dict));
  } else {
    for (const q in cond) {
      const type = q[0];
      const question = q.slice(1);
      const answers = cond[q];
      if (answers == null || answers == "") {
        conditional(q, show, dict);
        continue;
      }

      const el = findQuestion(question);

      // setup handler for sub-answers
      if (!(question in dict)) {
        function handle() {
          let selected;
          if (type == "*") selected = el.find("input:checked").next(".customization2_attendee_further-data_custom-question_radio-line_label").find(".vv-radio__label-text").text().trim();
          if (type == "|") selected = el.find(".customization2_attendee_further-data_custom-question_dropdown .vv-selection-input__value").text().trim();

          for (const possible in answers) {
            const match = (
              possible == selected ||
              (possible.startsWith("{...}") && selected.endsWith(possible.slice(5))) ||
              (possible.endsWith("{...}") && selected.startsWith(possible.slice(0, -5)))
            );
            conditional(answers[possible], match, dict);
          }
        }
        // setup change listener
        el.on("change", handle);
        dict[question] = handle;
      }
      dict[question]();

      // hide/show the actual question
      if (show) {
        el.parent().show();
      } else {
        el.parent().hide();
        // hide all sub-questions
        for (const answer in answers) { conditional(answers[answer], false, dict); }
      }
    }
  }
}

function findQuestion(exactLabel) {
  return $(".customization2_attendee_further-data_custom-question").filter((i, q) => {
    const label = $(q).find(".customization2_attendee_further-data_custom-question_label");
    const allText = label.get(0).innerText.trim();
    let match = exactLabel;
    if(label.find("vv-optional-text").length) match += " " + label.find("vv-optional-text").get(0).innerText.trim();
    return allText == match;
  });
}

function run(cond) {
  conditional(cond, true, { });
}
