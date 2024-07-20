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
