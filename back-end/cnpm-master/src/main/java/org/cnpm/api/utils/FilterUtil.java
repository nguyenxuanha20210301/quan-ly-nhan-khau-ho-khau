package org.cnpm.api.utils;

public class FilterUtil {
    public static final String DESC = "DESC";
    public static final String ASC = "ASC";

    public static String toValidOrder(String orderBy){
        if (orderBy == null){
            return DESC;
        }
        orderBy = orderBy.toUpperCase();
        if (orderBy.equals(ASC)){
            return ASC;
        }else{
            return DESC;
        }

    }

    public static String toValidKeyword(String keyword){
        if (null == keyword){
            return null;
        }
        if(keyword.isBlank()){
            return null;
        }
        keyword = keyword.trim();
        return keyword;
    }
}
