package com.example.Adaptive_Competency_Management_System.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Entity
@Table(name = "employee_progress")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class employeeprogress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "progress_id")
    private Long progressId;

    @ManyToOne
    @JoinColumn(name = "enrollment_id")
    private enrollment enrollment;

    @ManyToOne
    @JoinColumn(name = "activity_id")
    private learningactivity learningActivity;

    @Column(name = "completion_status")
    private Boolean completionStatus;

    @Column(name = "completion_date")
    private Date completionDate;

}

