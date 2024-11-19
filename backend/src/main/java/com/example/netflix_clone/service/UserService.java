package com.example.netflix_clone.service;

import com.example.netflix_clone.dto.UserDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {
    Page<UserDto> getUsers(String email, Pageable pageable);
}
