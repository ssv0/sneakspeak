// paste and invoke this function in the debug console after the l10n="message key" to the HTML elements to translate has been added. Hint, you can use the span tag. Then call it in the console. Tested with chrome derived "brave browser"
function createTranslationFile() {
  const translations = {};
  document.querySelectorAll("[l10n]").forEach(element => {
    const key = element.getAttribute("l10n"); //key is the attribute value
    translations[key] = element.innerHTML; //default value is the default content
  });
  const json = JSON.stringify(translations, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "translations.json";
  link.click();
}

//or use this in console

function logTranslationFile() {
  const translations = {};
  document.querySelectorAll("[l10n]").forEach(element => {
    const key = element.getAttribute("l10n"); //key is the attribute value
    translations[key] = element.innerHTML; //default value is the default content
  });
  const json = JSON.stringify(translations, null, 2);
  console.log(json);
}
