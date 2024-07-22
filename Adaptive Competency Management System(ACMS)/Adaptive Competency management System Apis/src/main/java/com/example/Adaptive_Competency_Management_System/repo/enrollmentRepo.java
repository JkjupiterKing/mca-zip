package com.example.Adaptive_Competency_Management_System.repo;

import com.example.Adaptive_Competency_Management_System.model.enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface enrollmentRepo extends JpaRepository<enrollment, Long> {

}