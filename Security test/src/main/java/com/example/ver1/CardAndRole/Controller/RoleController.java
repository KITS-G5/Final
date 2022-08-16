package com.example.ver1.CardAndRole.Controller;

import com.example.ver1.CardAndRole.Model.Role;
import com.example.ver1.CardAndRole.Service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "role")
public class RoleController {
    @Autowired private RoleService roleService;

    @GetMapping(path = "")
    List<Role> getAllRole(){
        return roleService.getAllRole();
    }

    @GetMapping(path = "{id}")
    Optional<Role> getRoleById(@PathVariable long id){
        return roleService.getRoleById(id);
    }

    @PostMapping(path = "")
    Role addNewRole(@RequestBody Role role){
        roleService.addRole(role);
        return role;
    }

    @DeleteMapping(path = "{id}")
    void deleteNewRole(@PathVariable long id){
        roleService.deleteRole(id);
    }
}
