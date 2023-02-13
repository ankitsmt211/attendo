package com.springsecurity.attendance.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
//@Table(name="user")
public class UserEntity  {

    @Id
    @GeneratedValue
    @Column(name="id")
    private Integer id;
    @Column(name="username")
    private String username;
    @Column(name="password")
    private String password;

    @Column(name="email")
    private String email;

    @Column(name="role")
    private String role;

    @OneToMany(mappedBy = "userEntity",orphanRemoval = true,cascade = CascadeType.ALL)
    private List<Subject> subjects = new ArrayList<>();

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }


    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
