interface CommonHeaders {
  [key: string]: string;
}

export function getCommonHeaders(additionalHeaders?: CommonHeaders): CommonHeaders {
  const commonHeaders: CommonHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (additionalHeaders) {
    return { ...commonHeaders, ...additionalHeaders };
  }

  return commonHeaders;
}
