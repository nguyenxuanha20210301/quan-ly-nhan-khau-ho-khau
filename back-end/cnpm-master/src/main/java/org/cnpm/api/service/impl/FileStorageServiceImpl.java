package org.cnpm.api.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.cnpm.api.config.utils.exceptions.SERuntimeException;
import org.cnpm.api.config.utils.exceptions.SEValidateException;
import org.cnpm.api.persistence.dto.FileStorage;
import org.cnpm.api.persistence.mapper.FileStorageMapper;
import org.cnpm.api.service.FileStorageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
public class FileStorageServiceImpl implements FileStorageService {
    @Resource
    FileStorageMapper fileStorageMapper;

    @Value("${storage.storage_dir_nm}")
    private String storageDir;

    @Value("${storage.files_dir_nm}")
    private String filesDirNm;

    @Value("${storage.sample_dir_nm}")
    private String sampleDirNm;

    @Override
    public InputStreamResource readFile(String fileId) throws SERuntimeException {

        FileStorage req = new FileStorage();
        req.setFileId(fileId);
        FileStorage res = fileStorageMapper.select(req);
        if (null == res){
            throw new SEValidateException("file not found");
        }
        return readFile(res);
    }

    @Override
    public InputStreamResource readFile(String fileId, StringBuffer fileNmBuff) throws SERuntimeException {
        FileStorage req = new FileStorage();
        req.setFileId(fileId);
        FileStorage res = fileStorageMapper.select(req);
        if (null == res){
            throw new SERuntimeException("file not found");
        }
        if (null != fileNmBuff){
            fileNmBuff.append(res.getFileNm());
        }
        return readFile(res);
    }

    @Override
    public InputStreamResource readFile(FileStorage fileStorage) throws SERuntimeException {
        if (null == fileStorage){
            throw new SEValidateException("file not found");
        }
        return readFileFromRelLoc(fileStorage.getFileRelLoc());
    }

    @Override
    public InputStreamResource readFileFromRelLoc(String fileRelLoc) throws SERuntimeException{
        try {
            Path storagePath = Paths.get(storageDir);

            if (!Files.exists(storagePath)) {
                Files.createDirectories(storagePath);
            }

            Path fileStoragePath = storagePath.resolve(filesDirNm);

            if (!Files.exists(fileStoragePath)) {
                Files.createDirectories(fileStoragePath);
            }


            Path path = fileStoragePath.resolve(fileRelLoc);
            File file = path.toFile();

            InputStreamResource resource = new InputStreamResource(new FileInputStream(file));

            return resource;
        } catch (IOException ex) {
            throw new SERuntimeException("file not found");
        }
    }



    @Override
    public FileStorage writeFile(MultipartFile multipartFile) throws SERuntimeException{

        try {
            Path storagePath = Paths.get(storageDir);

            if (!Files.exists(storagePath)) {
                Files.createDirectories(storagePath);
            }

            Path fileStoragePath = storagePath.resolve(filesDirNm);

            if (!Files.exists(fileStoragePath)) {
                Files.createDirectories(fileStoragePath);
            }

            String fileName = "f_" + UUID.randomUUID().toString();

            Path pathFile = fileStoragePath.resolve(fileName);

            try (OutputStream os = Files.newOutputStream(pathFile)) {
                os.write(multipartFile.getBytes());
            }
            FileStorage fileStorage = new FileStorage();
            fileStorage.setFileNm(multipartFile.getOriginalFilename());
            fileStorage.setFileRelLoc(fileName);
            fileStorageMapper.insert(fileStorage);
            return fileStorage;
        } catch (IOException ex) {
            throw new SERuntimeException("Error when write file");
        }
    }

    @Override
    public List<FileStorage> writeFile(List<MultipartFile> multipartFiles) throws SERuntimeException{
        List<FileStorage> res = new ArrayList<>();
        if (null == multipartFiles){
            return res;
        }
        for(MultipartFile multipartFile: multipartFiles){
            try {
                Path storagePath = Paths.get(storageDir);

                if (!Files.exists(storagePath)) {
                    Files.createDirectories(storagePath);
                }

                Path fileStoragePath = storagePath.resolve(filesDirNm);

                if (!Files.exists(fileStoragePath)) {
                    Files.createDirectories(fileStoragePath);
                }

                String fileName = "f_" + UUID.randomUUID().toString();

                Path pathFile = fileStoragePath.resolve(fileName);

                try (OutputStream os = Files.newOutputStream(pathFile)) {
                    os.write(multipartFile.getBytes());
                }
                FileStorage fileStorage = new FileStorage();
                fileStorage.setFileNm(multipartFile.getOriginalFilename());
                fileStorage.setFileRelLoc(fileName);
                res.add(fileStorage);
            } catch (IOException ex) {
                throw new SERuntimeException("Error when write file");
            }
        }
        if(!res.isEmpty()){
            fileStorageMapper.insertList(res);
        }
        return res;

    }

    @Override
    public boolean writeFileToRelPath(String fileRelPath, MultipartFile multipartFile) throws SERuntimeException{
        try {
            Path storagePath = Paths.get(storageDir);

            if (!Files.exists(storagePath)) {
                Files.createDirectories(storagePath);
            }

            Path fileStoragePath = storagePath.resolve(filesDirNm);

            if (!Files.exists(fileStoragePath)) {
                Files.createDirectories(fileStoragePath);
            }

            Path pathFile = fileStoragePath.resolve(fileRelPath);

            try (OutputStream os = Files.newOutputStream(pathFile)) {
                os.write(multipartFile.getBytes());
            }
            return true;
        } catch (IOException ex) {
            ex.printStackTrace();
            throw new SERuntimeException("Error when write file");
        }
    }


    @Override
    public boolean removeFile(String fileId) throws SERuntimeException{
        FileStorage req = new FileStorage();
        req.setFileId(fileId);
        FileStorage res = fileStorageMapper.select(req);
        if (null == res){
            throw new SEValidateException("file not found");
        }
        return removeFile(res);
    }

    @Override
    public boolean removeFile(FileStorage fileStorage) throws SERuntimeException {
        if (null == fileStorage) {
            throw new SEValidateException("file not found");
        }
        if (removeFileByRelLoc(fileStorage.getFileRelLoc())) {
            return fileStorageMapper.delete(fileStorage) == 1;
        }
        return false;
    }


    @Override
    public boolean removeFileByRelLoc(String fileRelLoc) throws SERuntimeException{
        try {
            Path storagePath = Paths.get(storageDir);
            Path fileStoragePath = storagePath.resolve(filesDirNm);
            if (!Files.exists(fileStoragePath)) {
                return false;
            }

            Path pathFile = fileStoragePath.resolve(fileRelLoc);
            Files.delete(pathFile);
            return true;
        } catch (IOException ex) {
            return false;
        }
    }

    @Override
    public boolean replace(String fileId, MultipartFile replaceFile) throws SERuntimeException{

        FileStorage req = new FileStorage();
        req.setFileId(fileId);
        FileStorage res = fileStorageMapper.select(req);
        if (null == res){
            throw new SERuntimeException("file not found");
        }

        return replace(res, replaceFile);
    }

    @Override
    public boolean replace(FileStorage fileStorage, MultipartFile replaceFile) throws SERuntimeException{

        if (null == fileStorage || null == replaceFile){
            throw new SERuntimeException("file not found");
        }
        removeFileByRelLoc(fileStorage.getFileRelLoc());

        writeFileToRelPath(fileStorage.getFileRelLoc(), replaceFile);
        //Update file name
        fileStorage.setFileNm(replaceFile.getOriginalFilename());

//        User currentUser = LoggedInUserUtil.getLoggedInUser();
//        fileStorage.setModId(currentUser.getUserId());
        //
        fileStorageMapper.updateFileNm(fileStorage);

        return false;
    }
}
