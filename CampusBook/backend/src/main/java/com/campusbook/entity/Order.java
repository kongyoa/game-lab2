package com.campusbook.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@TableName("orders")
public class Order {
    @TableId(type = IdType.AUTO)
    private Long id;

    private Long buyerId;

    private Long sellerId;

    private Long bookId;

    private BigDecimal amount;

    private Integer status; // 0:待支付 1:已支付 2:待发货 3:已发货 4:已完成 5:已取消

    private Integer paymentMethod; // 1:支付宝 2:微信

    private Integer tradeType; // 1:面交 2:快递

    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
}
