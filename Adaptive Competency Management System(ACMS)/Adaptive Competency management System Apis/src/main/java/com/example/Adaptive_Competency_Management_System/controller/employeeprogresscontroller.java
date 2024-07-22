package com.example.Adaptive_Competency_Management_System.controller;

import com.example.Adaptive_Competency_Management_System.model.employeeprogress;
import com.example.Adaptive_Competency_Management_System.repo.employeeprogressRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/employee-progress")
@CrossOrigin
public class employeeprogresscontroller {

    @Autowired
    private employeeprogressRepo employeeProgressRepository;

    // Endpoint to retrieve all employee progress
    @GetMapping
    public ResponseEntity<List<employeeprogress>> getAllEmployeeProgress() {
        try {
            List<employeeprogress> employeeProgressList = employeeProgressRepository.findAll();

            if (employeeProgressList.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(employeeProgressList, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Endpoint to retrieve employee progress by ID
    @GetMapping("/{id}")
    public ResponseEntity<employeeprogress> getEmployeeProgressById(@PathVariable Long id) {
        Optional<employeeprogress> employeeProgressData = employeeProgressRepository.findById(id);

        return employeeProgressData.map(employeeProgress ->
                        new ResponseEntity<>(employeeProgress, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Endpoint to create a new employee progress entry
    @PostMapping
    public ResponseEntity<employeeprogress> createEmployeeProgress(@RequestBody employeeprogress employeeProgress) {
        try {
            employeeprogress savedEmployeeProgress = employeeProgressRepository.save(employeeProgress);
            return new ResponseEntity<>(savedEmployeeProgress, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Endpoint to update employee progress
    @PutMapping("/{id}")
    public ResponseEntity<employeeprogress> updateEmployeeProgress(@PathVariable Long id, @RequestBody employeeprogress employeeProgress) {
        Optional<employeeprogress> oldEmployeeProgressData = employeeProgressRepository.findById(id);

        if (oldEmployeeProgressData.isPresent()) {
            employeeprogress updatedEmployeeProgress = oldEmployeeProgressData.get();
            updatedEmployeeProgress.setEnrollment(employeeProgress.getEnrollment());
            updatedEmployeeProgress.setLearningActivity(employeeProgress.getLearningActivity());
            updatedEmployeeProgress.setCompletionStatus(employeeProgress.getCompletionStatus());
            updatedEmployeeProgress.setCompletionDate(employeeProgress.getCompletionDate());

            employeeprogress savedEmployeeProgress = employeeProgressRepository.save(updatedEmployeeProgress);
            return new ResponseEntity<>(savedEmployeeProgress, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Endpoint to delete employee progress
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteEmployeeProgress(@PathVariable Long id) {
        try {
            employeeProgressRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
