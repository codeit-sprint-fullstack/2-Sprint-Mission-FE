function validateData(data, key, type) {
  if (typeof data[key] !== type) {
    const currentType = typeof data[key];
    errors.push({
      path: key,
      message: `Expected a(an) ${type}, but received: ${currentType}`
    })
  }
}

export default validateData;