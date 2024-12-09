package com.example.netflix_clone.controller;

import com.example.netflix_clone.dto.UserDto;
import com.example.netflix_clone.entity.Bill;
import com.example.netflix_clone.service.BillService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/bill")
public class BillController {

    private final BillService billService;

    public BillController(BillService billService) {
        this.billService = billService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getBills(
            @RequestParam(name = "email", required = false) String email,
            @RequestParam(name = "name", required = false) String name,
            @RequestParam(name = "pageNo", defaultValue = "1") int pageNo,
            @RequestParam(name = "pageSize", defaultValue = "10") int pageSize) {

        Pageable pageable = PageRequest.of(pageNo - 1, pageSize);
        Page<Bill> page = billService.getUsers(email, pageable);

        Map<String, Object> response = new HashMap<>();
        response.put("content", page.getContent());
        response.put("currentPage", page.getNumber() + 1);
        response.put("totalItems", page.getTotalElements());

        return ResponseEntity.ok(response);
    }

    @PostMapping()
    public ResponseEntity<Bill> createBill(@RequestBody Bill bill) {
        return ResponseEntity.ok(billService.createBill(bill));
    }
}
