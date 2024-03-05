async function conditional(cond, show, dict) {
  if (cond.constructor === "".constructor) {
    // single question without further action
    const el = await custom_js("findQuestion", cond);
    if (show) {
      el.show();
    } else {
      el.hide();
    }
  } else if (cond.constructor === [].constructor) {
    // multiple questions without further action
    for (const c of cond) { await conditional(c, show, dict); }
  } else {
    for (const question in cond) {
      const answers = cond[question];
      if (answers == null || answers == "") {
        await conditional(question, show, dict);
        continue;
      }

      const el = await custom_js("findQuestion", question);

      // setup handler for sub-answers
      if (!(question in dict)) {
        async function handle() {
          let selected;
          if (el.is("vv-additional-question-radio")) selected = el.find("input:checked").next(".customization2_attendee_further-data_custom-question_radio-line_label").find(".vv-radio__label-text").text().trim();
          if (el.is("vv-additional-question-dropdown")) selected = el.find(".customization2_attendee_further-data_custom-question_dropdown .vv-selection-input__value").text().trim();
          
          for (const possible in answers) {
            const match = await custom_js("match", possible, selected);
            await conditional(answers[possible], match, dict);
          }
        }
        // setup change listener
        el.on("change", handle);
        dict[question] = handle;
      }
      if (show) {
        // show the actual question and handle how to show sub-questions
        el.show();
        await dict[question]();
      } else {
        // hide the question and all sub-questions
        el.hide();
        for (const answer in answers) { await conditional(answers[answer], false, dict); }
      }
    }
  }
}

async function run(cond) {
  await conditional(cond, true, { });
}
