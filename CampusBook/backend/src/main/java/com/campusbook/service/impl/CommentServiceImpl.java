package com.campusbook.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.campusbook.entity.Comment;
import com.campusbook.mapper.CommentMapper;
import com.campusbook.service.CommentService;
import org.springframework.stereotype.Service;

@Service
public class CommentServiceImpl extends ServiceImpl<CommentMapper, Comment> implements CommentService {
}
