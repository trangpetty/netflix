package com.example.netflix_clone.repository;

import com.example.netflix_clone.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
    List<Profile> findByUserID(Long userId);
}
