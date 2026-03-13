package com.campusbook.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.campusbook.entity.Order;
import com.campusbook.mapper.OrderMapper;
import com.campusbook.service.OrderService;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl extends ServiceImpl<OrderMapper, Order> implements OrderService {
}
