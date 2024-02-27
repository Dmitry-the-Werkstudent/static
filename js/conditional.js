function conditional(cond, show, dict) {
  show = show ?? true;
  dict = dict ?? { };

  if (cond.constructor === "".constructor) {
    // single question without further action
    if (show) {
      $(".customization2_attendee_further-data_custom-question:contains('" + cond + "')").parent().show();
    } else {
      $(".customization2_attendee_further-data_custom-question:contains('" + cond + "')").parent().hide();
    }
  
  } else if (cond.constructor === [].constructor) {
    // questions without further action
    cond.forEach(c => conditional(c, show, dict));

  } else {
    for (const question in cond) {
      const answers = cond[question] ?? { };
      const el = $(".customization2_attendee_further-data_custom-question:contains('" + question + "')");

      if (!(question in dict)) {
        function handle() {
          const selected = el.find("input:checked").next(".customization2_attendee_further-data_custom-question_radio-line_label")
            .find(".vv-radio__label-text").text().trim();
          for (const possible in answers) {
            const match = (
              possible == selected ||
              (possible.startsWith("{...}") && selected.endsWith(possible.slice(5))) ||
              (possible.endsWith("{...}") && selected.startsWith(possible.slice(0, -5)))
            );
            conditional(answers[possible], match, dict);
          }
        }
        el.on("change", handle);
        dict[question] = handle;
      }
      dict[question]();
      if (show) {
        el.parent().show();
      } else {
        el.parent().hide();
        for (const answer in answers) {
          conditional(answers[answer], false, dict);
        }
      }
    }
  }
}
