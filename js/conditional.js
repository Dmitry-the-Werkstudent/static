function conditional(cond) {
  cond = {
    "Reiseorganisation": {
      "Ich bitte um Reiseorganisation": {
        "Wie planen Sie anzureisen?": {
          "Flug": "Abflug-Flughafen",
          "Bahn": {
            "Abfahrt-Bahnhof": null,
            "Ich habe eine BahnCard": {
              "Ja, {...}": ["BahnCard Nummer", "BahnCard Ablaufdatum"]
            }
          }
        }
      }
    }
  };

  if (cond.constructor === [].constructor) {
    
  }
  
  for (const question in cond) {
    const answers = cond[question] ?? { };
    
  }
  
}
