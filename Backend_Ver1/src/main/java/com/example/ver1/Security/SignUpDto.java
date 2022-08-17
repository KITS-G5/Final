package com.example.ver1.Security;

import com.example.ver1.CardType.Model.CardType;
import lombok.Data;

@Data
public class SignUpDto {
    private double balance = 0;
    private String cardNum;
    private String cardCcv = generateCardCVV();
    private String cardPassword;
    private CardType cardType;

    //customer infomation
    private String name;
    private String address;
    private String phone;

    public String generateCardCVV(){
        StringBuilder stringBuffer = new StringBuilder();
        for(int i = 0; i < 3; i++){
            int x = (int)(Math.random() * 10);
            stringBuffer.append(String.valueOf(x));
        }
        return String.valueOf(stringBuffer);
    }
}