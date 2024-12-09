package com.example.netflix_clone.service.impl;

import com.example.netflix_clone.dto.UserDto;
import com.example.netflix_clone.entity.Bill;
import com.example.netflix_clone.entity.Subscription;
import com.example.netflix_clone.entity.User;
import com.example.netflix_clone.entity.mapper.UserMapper;
import com.example.netflix_clone.repository.BillRepository;
import com.example.netflix_clone.repository.UserRepository;
import com.example.netflix_clone.service.BillService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class BillServiceImpl implements BillService {
    private final BillRepository billRepository;
    private final UserRepository userRepository;

    public BillServiceImpl(BillRepository billRepository, UserRepository userRepository) {
        this.billRepository = billRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Page<Bill> getBills(String email, String name, Pageable pageable) {
        try {
            if(email != null) {
                User user = userRepository.findByEmail(email);
            }
            if(name != null) {
                Subscription sub = 
            }
            Page<User> users = billRepository.getAllByEmail(email, pageable);
            log.info("Found {} users", users.getTotalElements());
            return users.map(UserMapper::mapToUserDto);
        } catch (Exception e) {
            log.error("Error retrieving users: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to retrieve users", e);
        }
    }

    @Override
    public Bill createBill(Bill bill) {
        return billRepository.save(bill);
    }
}
