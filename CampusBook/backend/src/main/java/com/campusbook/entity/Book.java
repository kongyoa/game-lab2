package com.campusbook.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@TableName("books")
public class Book {
    @TableId(type = IdType.AUTO)
    private Long id;

    private Long userId;

    private String isbn;

    private String title;

    private String author;

    private String publisher;

    private BigDecimal originalPrice;

    private BigDecimal price;

    private Integer conditionLevel; // 1-10

    private Integer locationId;

    private Integer status; // 1:在售 2:已预订 3:已售出 0:下架

    private String images; // JSON string

    private String description;

    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
}
