package com.campusbook.controller;

import com.campusbook.entity.Message;
import com.campusbook.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @GetMapping
    public List<Message> getAllMessages() {
        return messageService.list();
    }

    @GetMapping("/{id}")
    public Message getMessageById(@PathVariable Long id) {
        return messageService.getById(id);
    }

    @PostMapping
    public boolean createMessage(@RequestBody Message message) {
        return messageService.save(message);
    }

    @DeleteMapping("/{id}")
    public boolean deleteMessage(@PathVariable Long id) {
        return messageService.removeById(id);
    }
}
