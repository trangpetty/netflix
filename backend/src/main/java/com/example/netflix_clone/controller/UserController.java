package com.example.netflix_clone.controller;

import com.example.netflix_clone.dto.UserDto;
import com.example.netflix_clone.entity.Profile;
import com.example.netflix_clone.service.ProfileService;
import com.example.netflix_clone.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    private final ProfileService profileService;

    public UserController(UserService userService, ProfileService profileService) {
        this.userService = userService;
        this.profileService = profileService;
    }

    @GetMapping
    public ResponseEntity<Page<UserDto>> getUsers(
            @RequestParam(name = "email", required = false) String email,
            @RequestParam(name = "pageNo", defaultValue = "1") int pageNo,
            @RequestParam(name = "pageSize", defaultValue = "10") int pageSize) {

        Pageable pageable = PageRequest.of(pageNo - 1, pageSize);

        return ResponseEntity.ok(userService.getUsers(email, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<Profile>> getDetailUser(@PathVariable Long id) {
        return ResponseEntity.ok(profileService.getProfilesByUserId(id));
    }
}
