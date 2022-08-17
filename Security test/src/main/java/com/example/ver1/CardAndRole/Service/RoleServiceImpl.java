package com.example.ver1.CardAndRole.Service;

import com.example.ver1.CardAndRole.Model.Role;
import com.example.ver1.CardAndRole.Repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class RoleServiceImpl implements RoleService{
    @Autowired private RoleRepository roleRepository;

    @Override
    public List<Role> getAllRole() {
        return roleRepository.findAll();
    }

    @Override
    public Optional<Role> getRoleById(long id) {
        return roleRepository.findById(id);
    }

    @Override
    public int addRole(Role role) {
        List<Role> listAllRole = roleRepository.findAll();
        if(!listAllRole.contains(role)) {
            roleRepository.save(role);
            return 1;
        }
        return 0;
    }

    @Override
    public int updateRole(long id, Role role) {
        Optional<Role> found = roleRepository.findById(id);
        if(found.isPresent()){
            found.get().setTitle(role.getTitle());
            return 1;
        }
        return 0;
    }

    @Override
    public int deleteRole(long id) {
        Optional<Role> found = roleRepository.findById(id);
        if(found.isPresent()){
            roleRepository.delete(found.get());
            return 1;
        }
        return 0;
    }
}
