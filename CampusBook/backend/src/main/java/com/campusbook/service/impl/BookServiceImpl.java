package com.campusbook.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.campusbook.entity.Book;
import com.campusbook.mapper.BookMapper;
import com.campusbook.service.BookService;
import org.springframework.stereotype.Service;

@Service
public class BookServiceImpl extends ServiceImpl<BookMapper, Book> implements BookService {
}
