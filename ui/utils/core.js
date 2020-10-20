// https://stackoverflow.com/a/6394168/2715720
export function getPropertyViaPath(path, obj = self, separator = '.') {
  const properties = Array.isArray(path) ? path : path.split(separator);
  return properties.reduce((prev, curr) => prev && prev[curr], obj);
}

export function getPropertiesViaPath(path, obj = self, separator = '.') {
  const properties = Array.isArray(path) ? path : path.split(separator);
  return properties.reduce((prev, curr) => {
    return prev && Array.isArray(prev) ?
      prev.flatMap(entry => getPropertiesViaPath(curr, entry, separator)) :
      prev && prev[curr];
  }, obj);
}
