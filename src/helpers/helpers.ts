export const buildQueryParams = (params: any) => {
  return Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(
          (value as string) || ""
        )}`
    )
    .join("&");
};

export const dynamicResultsCount = (nat: string, gender: string) => {
  const isStringEmpty = (value: string) => value === "";

  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  if (isStringEmpty(nat) && isStringEmpty(gender)) return 256;
  if (isStringEmpty(nat) && !isStringEmpty(gender)) return 128;
  if (!isStringEmpty(nat) && isStringEmpty(gender))
    return Math.floor(256 / getRandomInt(5, 20)) + 1;
  return Math.floor(256 / 2 / getRandomInt(5, 20)) + 1; //isStringEmpty(nat) && isStringEmpty(gender)
};

export const isString = (value: any) => {
  return typeof value === "string" || value instanceof String;
};

export const languageApp = () => {
  const getUserBrowserLanguage = () => {
    const lang = window.navigator.language;

    if (lang.includes("es")) return "es";
    if (lang.includes("en")) return "en";

    return "es";
  };

  return localStorage.getItem("language") || getUserBrowserLanguage();
};
