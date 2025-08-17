package com.example.startuplanding;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ApiController {
    
    @PostMapping("/subscribe")
    public ResponseEntity<Map<String, Object>> subscribe(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();
        String email = request.get("email");
        
        if (email != null && !email.isEmpty()) {
            // Here you would typically save to database or send to email service
            response.put("message", "Successfully subscribed");
            response.put("email", email);
            response.put("status", "success");
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Email is required");
            response.put("status", "error");
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PostMapping("/quote")
    public ResponseEntity<Map<String, Object>> requestQuote(@RequestBody Map<String, Object> request) {
        Map<String, Object> response = new HashMap<>();
        
        // Here you would typically process the quote request
        response.put("message", "Quote request received successfully");
        response.put("status", "success");
        response.put("timestamp", request.get("timestamp"));
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Hello");
        response.put("status", "healthy");
        response.put("timestamp", System.currentTimeMillis());
        
        return ResponseEntity.ok(response);
    }
}
