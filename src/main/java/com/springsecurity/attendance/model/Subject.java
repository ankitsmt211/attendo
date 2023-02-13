package com.springsecurity.attendance.model;

import jakarta.persistence.*;

@Entity
//@Table(name="subject")
public class Subject {

    @Id
    @GeneratedValue
    private Integer subId;

    @Column(name="name")
    private String name;

    @Column(name="totalclasses")
    private int totalClasses;

    @Column(name="attendedclasses")
    private int attendedClasses;

    @ManyToOne
    @JoinColumn(name="id")
    private UserEntity userEntity;

    public Integer getSubId() {
        return subId;
    }

    public void setSubId(Integer subId) {
        this.subId = subId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getTotalClasses() {
        return totalClasses;
    }

    public void setTotalClasses(int totalClasses) {
        this.totalClasses = totalClasses;
    }

    public int getAttendedClasses() {
        return attendedClasses;
    }

    public void setAttendedClasses(int attendedClasses) {
        this.attendedClasses = attendedClasses;
    }



    public void setUserEntity(UserEntity userEntity) {
        this.userEntity = userEntity;
    }

    @Override
    public String toString() {
        return "Subject{" +
                "subId=" + subId +
                ", name='" + name + '\'' +
                ", totalClasses=" + totalClasses +
                ", attendedClasses=" + attendedClasses +
                '}';
    }
}
