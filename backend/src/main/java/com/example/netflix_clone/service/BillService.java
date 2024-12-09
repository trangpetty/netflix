package com.example.netflix_clone.service;

import com.example.netflix_clone.dto.UserDto;
import com.example.netflix_clone.entity.Bill;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BillService {
    Bill createBill(Bill bill);

    Page<Bill> getBills(String email, String name, Pageable pageable);

}
