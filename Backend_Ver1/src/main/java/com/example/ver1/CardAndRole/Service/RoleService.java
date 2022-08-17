package com.example.ver1.CardAndRole.Service;
import com.example.ver1.CardAndRole.Model.Role;
import java.util.List;
import java.util.Optional;

public interface RoleService {
    List<Role> getAllRole();
    Optional<Role> getRoleById(long id);
    int addRole(Role role);
    int updateRole(long id, Role role);
    int deleteRole(long id);
}
