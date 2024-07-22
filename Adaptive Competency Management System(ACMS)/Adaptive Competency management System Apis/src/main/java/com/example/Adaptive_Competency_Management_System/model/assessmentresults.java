package com.example.Adaptive_Competency_Management_System.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "assessment_results")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class assessmentresults {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "result_id")
    private Long resultId;

    @ManyToOne
    @JoinColumn(name = "enrollment_id")
    private enrollment enrollment;

    @ManyToOne
    @JoinColumn(name = "activity_id")
    private learningactivity learningActivity;

    @Column(name = "score", precision = 5, scale = 2)
    private BigDecimal score;

    @Column(name = "attempt_number")
    private Integer attemptNumber;

    @Column(name = "assessment_date")
    private Date assessmentDate;
}

