package com.campusbook.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.campusbook.entity.User;
import com.campusbook.mapper.UserMapper;
import com.campusbook.service.UserService;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {
}
