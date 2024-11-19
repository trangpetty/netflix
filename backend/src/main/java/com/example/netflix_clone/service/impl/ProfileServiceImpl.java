package com.example.netflix_clone.service.impl;

import com.example.netflix_clone.entity.Profile;
import com.example.netflix_clone.repository.ProfileRepository;
import com.example.netflix_clone.service.ProfileService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfileServiceImpl implements ProfileService {

    private final ProfileRepository profileRepository;

    public ProfileServiceImpl(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    @Override
    public List<Profile> getProfilesByUserId(Long userId) {
        return profileRepository.findByUserID(userId);
    }
}
