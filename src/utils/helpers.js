export const transformServerErrors = serverErrors => serverErrors.reduce((transformedServerErrors, {param, msg}) => {
  transformedServerErrors[param] = msg

  return transformedServerErrors
}, {})
