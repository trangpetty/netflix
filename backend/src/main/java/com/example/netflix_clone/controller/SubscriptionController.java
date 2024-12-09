package com.example.netflix_clone.controller;

import com.example.netflix_clone.entity.Bill;
import com.example.netflix_clone.entity.Subscription;
import com.example.netflix_clone.entity.UserSubscription;
import com.example.netflix_clone.service.SubscriptionService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/subs")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    public SubscriptionController(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getSubs(
            @RequestParam(name = "name", required = false) String name,
            @RequestParam(name = "pageNo", defaultValue = "1") int pageNo,
            @RequestParam(name = "pageSize", defaultValue = "10") int pageSize) {

        Pageable pageable = PageRequest.of(pageNo - 1, pageSize);
        Page<Subscription> page = subscriptionService.getSubs(name, pageable);

        Map<String, Object> response = new HashMap<>();
        response.put("content", page.getContent());
        response.put("currentPage", page.getNumber() + 1);
        response.put("totalItems", page.getTotalElements());

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Subscription> updateSub(@PathVariable Long id, @RequestBody Subscription subscription) {
        return ResponseEntity.ok(subscriptionService.updateSubscription(id, subscription));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSub(@PathVariable Long id) {
       subscriptionService.deleteSubscription(id);
        return ResponseEntity.ok("success");
    }

    @PostMapping
    public ResponseEntity<Subscription> createSub(@RequestBody Subscription subscription) {
        return ResponseEntity.ok(subscriptionService.createSubscription(subscription));
    }

    @PostMapping("/user-sub")
    public ResponseEntity<UserSubscription> createUserSub(@RequestBody UserSubscription userSubscription) {
        return ResponseEntity.ok(subscriptionService.createUserSubscription(userSubscription));
    }

}
