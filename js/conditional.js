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
      const answers = cond[q] ?? { };
      const el = findQuestion(question);

      // hide/show the actual question
      if (show) {
        el.parent().show();
        // setup handler for sub-answers
        if (!set.has(question)) {
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
          set.add(question);
        }
        handle();
      } else {
        el.parent().hide();
        // hide all sub-questions
        for (const answer in answers) { conditional(answers[answer], false, dict); }
      }
    }
  }
}

function findQuestion(exactLabel) {
  return $(".customization2_attendee_further-data_custom-question").filter(
    (i, q) => $(q).find(".customization2_attendee_further-data_custom-question_label").text().trim() == exactLabel
  );
}

function run(cond) {
  conditional(cond, true, { });
}
