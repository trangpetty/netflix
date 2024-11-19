package com.example.netflix_clone.service;

import com.example.netflix_clone.entity.Profile;

import java.util.List;

public interface ProfileService {

    List<Profile> getProfilesByUserId(Long userId);
}
