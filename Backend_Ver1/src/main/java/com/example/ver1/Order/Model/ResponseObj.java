package com.example.ver1.Order.Model;

import lombok.*;
import org.springframework.web.bind.annotation.GetMapping;

import java.io.ObjectInputStream;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class ResponseObj {
    private String status;
    private String message;
    private Object object;
}
