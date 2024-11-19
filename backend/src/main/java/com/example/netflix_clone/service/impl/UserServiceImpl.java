package com.example.netflix_clone.service.impl;

import com.example.netflix_clone.dto.UserDto;
import com.example.netflix_clone.entity.User;
import com.example.netflix_clone.entity.mapper.UserMapper;
import com.example.netflix_clone.repository.UserRepository;
import com.example.netflix_clone.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    private static final Logger log = LoggerFactory.getLogger(UserServiceImpl.class);

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Page<UserDto> getUsers(String email, Pageable pageable) {
        try {
            Page<User> users = userRepository.getAllByEmail(email, pageable);
            log.info("Found {} users", users.getTotalElements());
            return users.map(UserMapper::mapToUserDto);
        } catch (Exception e) {
            log.error("Error retrieving users: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to retrieve users", e);
        }
    }
}
