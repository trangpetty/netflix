package com.example.netflix_clone.entity.mapper;

import com.example.netflix_clone.dto.UserDto;
import com.example.netflix_clone.entity.User;

public class UserMapper {

    public static User mapToUser(UserDto userDto) {
        User user = new User();
        user.setEmail(userDto.getEmail());
        user.setDob(userDto.getDob());
        user.setCreateAt(userDto.getCreateAt());
        user.setUpdateAt(userDto.getUpdateAt());
        return user;
    }

    public static UserDto mapToUserDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setEmail(user.getEmail());
        userDto.setRole(user.getRole().name());
        userDto.setDob(user.getDob());
        userDto.setCreateAt(user.getCreateAt());
        userDto.setUpdateAt(user.getUpdateAt());
        return userDto;
    }
}
