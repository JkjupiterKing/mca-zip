package com.example.Adaptive_Competency_Management_System.repo;

import com.example.Adaptive_Competency_Management_System.model.learningactivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface learningactivityRepo extends JpaRepository<learningactivity, Long> {
    // You can add custom query methods here if needed
}
