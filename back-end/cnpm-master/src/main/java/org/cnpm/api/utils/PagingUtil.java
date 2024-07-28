package org.cnpm.api.utils;

import org.cnpm.api.persistence.dto.BaseDTO;

public class PagingUtil {
    public static final int DEFAULT_PAGE_SIZE = 10;
    public static final int DEFAULT_PAGE_NUM = 1;
    public static int getLimit(int pageSize) {
        if (pageSize <= 0) {
            return DEFAULT_PAGE_SIZE;
        }
        return pageSize;

    }

    public static int getOffset(int pageSize, int pageNum) {
        if (pageSize <= 0) {
            pageSize = DEFAULT_PAGE_SIZE;
        }
        if (pageNum < 1) {
            return 0;
        }
        return ((pageNum - 1) * pageSize);
    }
    public static int getAvailablePageNum(int pageNum, int pageSize, int total){
        if (pageSize < 1 || pageNum < 1){
            return 1;
        }
        if (pageSize * (pageNum-1) >= total){
            return 1;
        }
        return pageNum;
    }

    public static void preparePaging(BaseDTO req, int pageSize, int pageNum){
        int limit = PagingUtil.getLimit(pageSize);
        int offset = PagingUtil.getOffset(pageSize, pageNum);
        req.setLimit(limit);
        req.setOffset(offset);
    }
}
