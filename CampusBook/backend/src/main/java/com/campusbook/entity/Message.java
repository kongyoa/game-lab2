package com.campusbook.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@TableName("messages")
public class Message {
    @TableId(type = IdType.AUTO)
    private Long id;

    private Long senderId;

    private Long receiverId;

    private String content;

    private Integer msgType; // 1:文本 2:图片 3:系统

    private Integer isRead; // 0:未读 1:已读

    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime sendTime;
}
