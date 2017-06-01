/**
 * Constants enumerating the HTTP status codes.
 *
 * Ported from Bryce Neal's node-http-status.
 */

var statusCodes = {};

statusCodes[exports.ACCEPTED_202 = 202] = "Accepted";
statusCodes[exports.BAD_GATEWAY_502 = 502] = "Bad Gateway";
statusCodes[exports.BAD_REQUEST_400 = 400] = "Bad Request";
statusCodes[exports.CONFLICT_409 = 409] = "Conflict";
statusCodes[exports.CONTINUE_100 = 100] = "Continue";
statusCodes[exports.CREATED_201 = 201] = "Created";
statusCodes[exports.EXPECTATION_FAILED_417 = 417] = "Expectation Failed";
statusCodes[exports.FAILED_DEPENDENCY_424  = 424] = "Failed Dependency";
statusCodes[exports.FORBIDDEN_403 = 403] = "Forbidden"; // Authenticated, but not authorized.
statusCodes[exports.GATEWAY_TIMEOUT_504 = 504] = "Gateway Timeout";
statusCodes[exports.GONE_410 = 410] = "Gone";
statusCodes[exports.HTTP_VERSION_NOT_SUPPORTED_505 = 505] = "HTTP Version Not Supported";
statusCodes[exports.INSUFFICIENT_SPACE_ON_RESOURCE_419 = 419] = "Insufficient Space on Resource";
statusCodes[exports.INSUFFICIENT_STORAGE_507 = 507] = "Insufficient Storage";
statusCodes[exports.INTERNAL_SERVER_ERROR_500 = 500] = "Server Error";
statusCodes[exports.LENGTH_REQUIRED_411 = 411] = "Length Required";
statusCodes[exports.LOCKED_423 = 423] = "Locked";
statusCodes[exports.METHOD_FAILURE_420 = 420] = "Method Failure";
statusCodes[exports.METHOD_NOT_ALLOWED_405 = 405] = "Method Not Allowed";
statusCodes[exports.MOVED_PERMANENTLY_301 = 301] = "Moved Permanently";
statusCodes[exports.MOVED_TEMPORARILY_302 = 302] = "Moved Temporarily";
statusCodes[exports.MULTI_STATUS_207 = 207] = "Multi-Status";
statusCodes[exports.MULTIPLE_CHOICES_300 = 300] = "Multiple Choices";
statusCodes[exports.NETWORK_AUTHENTICATION_REQUIRED_511 = 511] = "Network Authentication Required";
statusCodes[exports.NO_CONTENT_204 = 204] = "No Content";
statusCodes[exports.NON_AUTHORITATIVE_INFORMATION_203 = 203] = "Non Authoritative Information";
statusCodes[exports.NOT_ACCEPTABLE_406 = 406] = "Not Acceptable";
statusCodes[exports.NOT_FOUND_404 = 404] = "Not Found";
statusCodes[exports.NOT_IMPLEMENTED_501 = 501] = "Not Implemented";
statusCodes[exports.NOT_MODIFIED_304 = 304] = "Not Modified";
statusCodes[exports.OK_200 = 200] = "OK";
statusCodes[exports.PARTIAL_CONTENT_206 = 206] = "Partial Content";
statusCodes[exports.PAYMENT_REQUIRED_402 = 402] = "Payment Required";
statusCodes[exports.PERMANENT_REDIRECT_308 = 308] = "Permanent Redirect";
statusCodes[exports.PRECONDITION_FAILED_412 = 412] = "Precondition Failed";
statusCodes[exports.PRECONDITION_REQUIRED_428 = 428] = "Precondition Required";
statusCodes[exports.PROCESSING_102 = 102] = "Processing";
statusCodes[exports.PROXY_AUTHENTICATION_REQUIRED_407 = 407] = "Proxy Authentication Required";
statusCodes[exports.REQUEST_HEADER_FIELDS_TOO_LARGE_431 = 431] = "Request Header Fields Too Large";
statusCodes[exports.REQUEST_TIMEOUT_408 = 408] = "Request Timeout";
statusCodes[exports.REQUEST_TOO_LONG_413 = 413] = "Request Entity Too Large";
statusCodes[exports.REQUEST_URI_TOO_LONG_414 = 414] = "Request-URI Too Long";
statusCodes[exports.REQUESTED_RANGE_NOT_SATISFIABLE_416 = 416] = "Requested Range Not Satisfiable";
statusCodes[exports.RESET_CONTENT_205 = 205] = "Reset Content";
statusCodes[exports.SEE_OTHER_303 = 303] = "See Other";
statusCodes[exports.SERVICE_UNAVAILABLE_503 = 503] = "Service Unavailable";
statusCodes[exports.SWITCHING_PROTOCOLS_101 = 101] = "Switching Protocols";
statusCodes[exports.TEMPORARY_REDIRECT_307 = 307] = "Temporary Redirect";
statusCodes[exports.TOO_MANY_REQUESTS_429 = 429] = "Too Many Requests";
statusCodes[exports.UNAUTHORIZED_401 = 401] = "Unauthorized"; // Technically, unauthenticated
statusCodes[exports.UNPROCESSABLE_ENTITY_422 = 422] = "Unprocessable Entity";
statusCodes[exports.UNSUPPORTED_MEDIA_TYPE_415 = 415] = "Unsupported Media Type";
statusCodes[exports.USE_PROXY_305 = 305] = "Use Proxy";

exports.getStatusText = function(statusCode) {
  if (statusCodes.hasOwnProperty(statusCode)) {
    return statusCodes[statusCode];
  } else {
    throw new Error("Status code does not exist: " + statusCode);
  }
};