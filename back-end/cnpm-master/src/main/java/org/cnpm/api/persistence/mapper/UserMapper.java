package org.cnpm.api.persistence.mapper;

import org.cnpm.api.persistence.dto.User;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {
    User selectByEmail(User req);

    List<User> listUser();
}
