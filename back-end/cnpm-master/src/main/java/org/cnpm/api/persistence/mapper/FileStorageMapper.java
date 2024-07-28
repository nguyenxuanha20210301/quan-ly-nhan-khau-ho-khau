package org.cnpm.api.persistence.mapper;

import org.cnpm.api.persistence.dto.FileStorage;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface FileStorageMapper {
    int insert(FileStorage req);

    int insertList(List<FileStorage> list);

    FileStorage select(FileStorage req);

    int delete(FileStorage req);

    int updateFileNm(FileStorage req);
}
