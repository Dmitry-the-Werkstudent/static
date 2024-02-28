async function conditional(cond, show, dict) {
  if (cond.constructor === "".constructor) {
    // single question without further action
    const el = await custom_js("findQuestion", cond);
    if (show) {
      el.parent().show();
    } else {
      el.parent().hide();
    }
  } else if (cond.constructor === [].constructor) {
    // multiple questions without further action
    for (const c of cond) { await conditional(c, show, dict); }
  } else {
    for (const q in cond) {
      const type = q[0];
      const question = q.slice(1);
      const answers = cond[q];
      if (answers == null || answers == "") {
        await conditional(q, show, dict);
        continue;
      }

      const el = await custom_js("findQuestion", question);

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
            await conditional(answers[possible], match, dict);
          }
        }
        // setup change listener
        el.on("change", handle);
        dict[question] = handle;
      }
      if (show) {
        // show the actual question and handle how to show sub-questions
        el.parent().show();
        dict[question]();
      } else {
        // hide the question and all sub-questions
        el.parent().hide();
        for (const answer in answers) { await conditional(answers[answer], false, dict); }
      }
    }
  }
}

async function run(cond) {
  await conditional(cond, true, { });
}
