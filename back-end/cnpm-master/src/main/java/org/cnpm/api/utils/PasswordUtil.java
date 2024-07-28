package org.cnpm.api.utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.security.SecureRandom;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public final class PasswordUtil {

    private PasswordUtil(){

    }

    private static final Random secureRandom = new SecureRandom();

    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public static final String PW_REGEX = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[~!@#$%\\^\\*\\-_=\\+\\[\\{\\]\\}\\/;:,\\.\\?\\'\\\"\\(\\)&])[A-Za-z\\d~!@#\\$%\\^\\*-_=\\+\\[\\{\\]\\}\\/;:,\\.\\?\\'\\\"\\(\\)&]{8,15}$";

    public static boolean validatePassword(String password){
        if (null == password || password.length() < 8){
            return false;
        }

        return Pattern.compile(PW_REGEX)
                .matcher(password)
                .matches();
    }
    public static String genRandomPassword() {
        StringBuilder stringBuilder = new StringBuilder();

        //uppercase 'A' - 'Z' (2-3) 3
        int number = secureRandom.nextInt(2) + 2;
        stringBuilder.append(getRandomChar(65, 90, number));

        //lowercase
        // 'a' - 'z' (4-5)
        number = secureRandom.nextInt(2) + 4;
        stringBuilder.append(getRandomChar(97, 122, number));

        // '0' - '9' (2-3)
        number = secureRandom.nextInt(2) + 2;
        stringBuilder.append(getRandomChar(48, 57, number));

        //Special char (2-3)
        number = secureRandom.nextInt(2) + 2;
        stringBuilder.append(getRandomChar(33, 47, number));

        stringBuilder.append(randomAlphanumeric(1));

        String combinedChars = stringBuilder.toString();

        List<Character> pwdChars = combinedChars.chars()
                .mapToObj(c -> (char) c)
                .collect(Collectors.toList());
        Collections.shuffle(pwdChars);
        String password = pwdChars.stream()
                .collect(StringBuilder::new, StringBuilder::append, StringBuilder::append)
                .toString();
        return password;
    }

    public static String encodePassword(String plainPassword){
        return passwordEncoder.encode(plainPassword);
    }

    public static boolean isPasswordMatch(String pw, String hashedPw){
        return passwordEncoder.matches(pw, hashedPw);
    }


    private static String randomAlphanumeric(int count){
        //'a' - 'z'
        // 'A' - 'Z'
        // '0' - '9'
        StringBuilder stringBuilder = new StringBuilder();
        for(int i=0; i<count; i++){
            int type = secureRandom.nextInt(3);
            char c;
            if (type == 0){
                //'a' - 'z'
                c = (char) (97 + secureRandom.nextInt(122 - 97 + 1));

            }else if (type == 1){
                //'A' - 'Z'
                c = (char) (65 + secureRandom.nextInt(90 - 65 + 1));
            }else{
                //'0' - '9'
                c = (char) (48 + secureRandom.nextInt(57 - 48 + 1));
            }
            stringBuilder.append(c);
        }
        return  stringBuilder.toString();
    }

    private static String getRandomChar(int start, int end, int number) {
        if (start >= end){
            int tmp = start;
            start = end;
            end = tmp;
        }
        StringBuilder stringBuilder = new StringBuilder();
        for(int i=0; i<number; i++){
            //Generate lower case
            char c = (char) (start + secureRandom.nextInt(end - start + 1));
            stringBuilder.append(c);
        }
        return stringBuilder.toString();
    }

}
