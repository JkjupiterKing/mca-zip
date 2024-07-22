package com.example.Adaptive_Competency_Management_System.repo;

import com.example.Adaptive_Competency_Management_System.model.enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface enrollmentRepo extends JpaRepository<enrollment, Long> {

    @Query("SELECT e FROM enrollment as e  WHERE e.employee.employeeId = :employeeId")
    List<enrollment> findByEmployeeId(@Param("employeeId") Long employeeId);

}