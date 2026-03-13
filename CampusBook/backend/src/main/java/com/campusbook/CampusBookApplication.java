package com.campusbook;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.mybatis.spring.annotation.MapperScan;

@SpringBootApplication
@MapperScan("com.campusbook.mapper")
public class CampusBookApplication {

    public static void main(String[] args) {
        SpringApplication.run(CampusBookApplication.class, args);
    }

}
