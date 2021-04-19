package com.ruoyi.common.constant;

import java.util.HashMap;
import java.util.Map;

public class FileTypeConstant {

    public static Map<String, String> fileTypeMap = new HashMap<String, String>();
    static {
        fileTypeMap.put("jpg", "picture");
        fileTypeMap.put("jpeg", "picture");
        fileTypeMap.put("png", "picture");
    }
}
