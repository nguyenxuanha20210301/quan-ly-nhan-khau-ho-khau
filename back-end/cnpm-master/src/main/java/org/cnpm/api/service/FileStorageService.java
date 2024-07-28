package org.cnpm.api.service;

import org.cnpm.api.config.utils.exceptions.SERuntimeException;
import org.cnpm.api.persistence.dto.FileStorage;
import org.springframework.core.io.InputStreamResource;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FileStorageService {
    InputStreamResource readFile(String fileId) throws SERuntimeException;

    InputStreamResource readFile(String fileId, StringBuffer fileNmBuff) throws SERuntimeException;

    InputStreamResource readFile(FileStorage fileStorage) throws SERuntimeException;

    InputStreamResource readFileFromRelLoc(String fileRelLoc) throws SERuntimeException;

    FileStorage writeFile(MultipartFile multipartFile) throws SERuntimeException;

    List<FileStorage> writeFile(List<MultipartFile> multipartFiles) throws SERuntimeException;

    boolean writeFileToRelPath(String fileRelPath, MultipartFile multipartFile) throws SERuntimeException;

    boolean removeFile(String fileId) throws SERuntimeException;

    boolean removeFile(FileStorage fileStorage) throws SERuntimeException;

    boolean removeFileByRelLoc(String fileRelLoc) throws SERuntimeException;

    boolean replace(String fileId, MultipartFile replaceFile) throws SERuntimeException;

    boolean replace(FileStorage fileStorage, MultipartFile replaceFile) throws SERuntimeException;

}
