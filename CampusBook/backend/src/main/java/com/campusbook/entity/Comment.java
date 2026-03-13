package com.campusbook.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@TableName("comments")
public class Comment {
    @TableId(type = IdType.AUTO)
    private Long id;

    private Long orderId;

    private Long fromUserId;

    private Long toUserId;

    private Integer rating; // 1-5

    private String content;

    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;
}
