package com.example.Adaptive_Competency_Management_System.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Entity
@Table(name = "learning_activities")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class learningactivity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "activity_id")
    private Long activityId;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private course course;

    @Column(name = "activity_name", length = 255)
    private String activityName;

    @Column(name = "activity_type", length = 50)
    private String activityType;

    @Column(name = "activity_order")
    private Integer activityOrder;

    @Column(name = "activity_content", columnDefinition = "TEXT")
    private String activityContent;

    @Column(name = "due_date")
    private java.sql.Date dueDate;
}

