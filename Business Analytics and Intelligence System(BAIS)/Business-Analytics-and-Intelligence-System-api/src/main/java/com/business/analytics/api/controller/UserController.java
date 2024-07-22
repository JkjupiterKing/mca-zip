package com.business.analytics.api.controller;

import com.business.analytics.api.model.Role;
import com.business.analytics.api.model.User;
import com.business.analytics.api.repo.RoleRepo;
import com.business.analytics.api.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {

    private final UserRepo userRepository;
    private final RoleRepo roleRepository;

    @Autowired
    public UserController(UserRepo userRepository, RoleRepo roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    // Endpoint to create a new user
    @PostMapping("/adduser")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        try {
            Role role = roleRepository.findById(user.getRole().getRoleId())
                    .orElseThrow(() -> new RuntimeException("Role not found with ID: " + user.getRole().getRoleId()));
            user.setRole(role);
            User savedUser = userRepository.save(user);
            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null); // Handle specific exceptions as needed
        }
    }

    // Endpoint to retrieve all users
    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    // Endpoint to get a user by userId
    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        return userOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Endpoint to update a user by userId
    @PutMapping("/update/{userId}")
    public ResponseEntity<User> updateUser(@PathVariable Long userId, @RequestBody User updatedUser) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User existingUser = userOptional.get();
            existingUser.setUsername(updatedUser.getUsername());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setPhone(updatedUser.getPhone());
            existingUser.setAddress(updatedUser.getAddress());

            // Update role only if the roleId is provided in the updatedUser object
            if (updatedUser.getRole() != null && updatedUser.getRole().getRoleId() != null) {
                try {
                    Role role = roleRepository.findById(updatedUser.getRole().getRoleId())
                            .orElseThrow(() -> new RuntimeException("Role not found with ID: " + updatedUser.getRole().getRoleId()));
                    existingUser.setRole(role);
                } catch (Exception e) {
                    return ResponseEntity.badRequest().body(null); // Handle specific exceptions as needed
                }
            }

            User savedUser = userRepository.save(existingUser);
            return ResponseEntity.ok(savedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint to delete a user by userId
    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
        try {
            userRepository.deleteById(userId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build(); // Handle specific exceptions as needed
        }
    }
}