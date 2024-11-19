package com.example.netflix_clone.dto;

import com.example.netflix_clone.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String email;
    private String role;
    private LocalDate dob;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
}
