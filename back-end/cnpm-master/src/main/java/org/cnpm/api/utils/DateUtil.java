package org.cnpm.api.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtil {
    public static final String DATE_FORMAT = "yyyy-MM-dd";

    public static final String DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";

    public static final String DATE_TIME_M_SEC_FORMAT = "yyyy-MM-dd HH:mm";
    public static final String DATE_SHORT_DATE_FORMAT = "yyyyMMdd";

    public static boolean isDateValid(String dateStr) {

        if (null ==  dateStr || dateStr.isEmpty()){
            return false;
        }
        try {
            SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);
            sdf.setLenient(false);
            Date date = sdf.parse(dateStr);
            sdf.format(date);

        } catch (Exception e) {
            return false;
        }
        return true;
    }

    public static String toValidDate(String dateStr) {
        if (null ==  dateStr || dateStr.isEmpty()){
            return null;
        }
        try {
            SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);
            sdf.setLenient(false);
            Date date = sdf.parse(dateStr);
            return sdf.format(date);

        } catch (Exception e) {
            return null;
        }
    }


    public static String toValidDateTime(String dateStr) {
        if (null ==  dateStr || dateStr.isEmpty()){
            return null;
        }
        try {
            SimpleDateFormat sdf = new SimpleDateFormat(DATE_TIME_FORMAT);
            sdf.setLenient(false);
            Date date = sdf.parse(dateStr);
            return sdf.format(date);

        } catch (Exception e) {
            return null;
        }
    }

    public static String toValidDateTimeFromMissingSecond(String dateStr) {
        if (null ==  dateStr || dateStr.isEmpty()){
            return null;
        }
        try {
            SimpleDateFormat sdf = new SimpleDateFormat(DATE_TIME_M_SEC_FORMAT);
            SimpleDateFormat tsdf = new SimpleDateFormat(DATE_TIME_FORMAT);


            sdf.setLenient(false);
            Date date = sdf.parse(dateStr);
            return tsdf.format(date);

        } catch (Exception e) {
            return null;
        }
    }


    public static String toValidDateDefault(String dateStr) {
        if (null ==  dateStr || dateStr.isEmpty()){
            return "0000-00-00";
        }
        try {
            SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);
            sdf.setLenient(false);
            Date date = sdf.parse(dateStr);
            return sdf.format(date);

        } catch (Exception e) {
            return "0000-00-00";
        }
    }

    //Accept empty string as default
    public static String toValidDateDefaultEmpty(String dateStr) {
        if (null ==  dateStr || dateStr.isEmpty()){
            return "";
        }
        try {
            SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);
            sdf.setLenient(false);
            Date date = sdf.parse(dateStr);
            return sdf.format(date);

        } catch (Exception e) {
            return "";
        }
    }

    public static String toDateOnlyFromFormattedDt(String dt){
        if(null != dt && dt.length() > 10){
            return  dt.substring(0, 10);
        }
        return dt;
    }

    public static String toShotDate(String dt){
        if (null ==  dt || dt.isEmpty()){
            return null;
        }
        try {
            SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);
            sdf.setLenient(false);
            Date date = sdf.parse(dt);

            SimpleDateFormat nsdf = new SimpleDateFormat(DATE_SHORT_DATE_FORMAT);

            return nsdf.format(date);
        } catch (Exception e) {
            return null;
        }
    }
}
