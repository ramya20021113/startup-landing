package com.example.startuplanding;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class ErrorHandler {

    // Handle 404 - Resource Not Found
    @ExceptionHandler(NoHandlerFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<Map<String, Object>> handleNotFound(NoHandlerFoundException ex, WebRequest request) {
        Map<String, Object> error = new HashMap<>();
        error.put("error", "NOT_FOUND");
        error.put("message", "Resource not found");
        error.put("path", request.getDescription(false));
        error.put("timestamp", System.currentTimeMillis());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    // Handle 400 - Bad Request
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<Map<String, Object>> handleBadRequest(MethodArgumentTypeMismatchException ex, WebRequest request) {
        Map<String, Object> error = new HashMap<>();
        error.put("error", "BAD_REQUEST");
        error.put("message", "Invalid request parameters");
        error.put("path", request.getDescription(false));
        error.put("timestamp", System.currentTimeMillis());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    // Handle 413 - Payload Too Large
    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<Map<String, Object>> handlePayloadTooLarge(IllegalStateException ex, WebRequest request) {
        if (ex.getMessage() != null && ex.getMessage().contains("too large")) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "FUNCTION_PAYLOAD_TOO_LARGE");
            error.put("message", "Request payload too large");
            error.put("path", request.getDescription(false));
            error.put("timestamp", System.currentTimeMillis());
            return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE).body(error);
        }
        return handleGenericError(ex, request);
    }

    // Handle 500 - Internal Server Error
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<Map<String, Object>> handleGenericError(Exception ex, WebRequest request) {
        Map<String, Object> error = new HashMap<>();
        error.put("error", "INTERNAL_SERVER_ERROR");
        error.put("message", "An unexpected error occurred");
        error.put("path", request.getDescription(false));
        error.put("timestamp", System.currentTimeMillis());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}




