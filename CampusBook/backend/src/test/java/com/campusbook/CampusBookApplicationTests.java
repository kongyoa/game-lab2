package com.campusbook;

import com.campusbook.entity.User;
import com.campusbook.mapper.UserMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class CampusBookApplicationTests {

    @Autowired
    private UserMapper userMapper;

    @Test
    void contextLoads() {
        assertThat(userMapper).isNotNull();
    }

    @Test
    void testSelect() {
        System.out.println(("----- selectAll method test ------"));
        List<User> userList = userMapper.selectList(null);
        assertThat(userList).isNotNull();
        userList.forEach(System.out::println);
    }

}
