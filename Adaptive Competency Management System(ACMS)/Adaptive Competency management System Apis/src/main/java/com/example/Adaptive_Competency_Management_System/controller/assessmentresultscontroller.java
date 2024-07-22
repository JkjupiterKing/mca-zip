package com.example.Adaptive_Competency_Management_System.controller;

import com.example.Adaptive_Competency_Management_System.model.assessmentresults;
import com.example.Adaptive_Competency_Management_System.repo.assessmentresultsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/assessment-results")
@CrossOrigin
public class assessmentresultscontroller {

    @Autowired
    private assessmentresultsRepo assessmentResultRepository;

    // Endpoint to retrieve all assessment results
    @GetMapping
    public ResponseEntity<List<assessmentresults>> getAllAssessmentResults() {
        try {
            List<assessmentresults> assessmentResultList = assessmentResultRepository.findAll();

            if (assessmentResultList.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(assessmentResultList, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Endpoint to retrieve assessment result by ID
    @GetMapping("/{id}")
    public ResponseEntity<assessmentresults> getAssessmentResultById(@PathVariable Long id) {
        Optional<assessmentresults> assessmentResultData = assessmentResultRepository.findById(id);

        return assessmentResultData.map(assessmentResult ->
                        new ResponseEntity<>(assessmentResult, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Endpoint to create a new assessment result
    @PostMapping
    public ResponseEntity<assessmentresults> createAssessmentResult(@RequestBody assessmentresults assessmentResult) {
        try {
            assessmentresults savedAssessmentResult = assessmentResultRepository.save(assessmentResult);
            return new ResponseEntity<>(savedAssessmentResult, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Endpoint to update assessment result
    @PutMapping("/{id}")
    public ResponseEntity<assessmentresults> updateAssessmentResult(@PathVariable Long id, @RequestBody assessmentresults assessmentResult) {
        Optional<assessmentresults> oldAssessmentResultData = assessmentResultRepository.findById(id);

        if (oldAssessmentResultData.isPresent()) {
            assessmentresults updatedAssessmentResult = oldAssessmentResultData.get();
            updatedAssessmentResult.setEnrollment(assessmentResult.getEnrollment());
            updatedAssessmentResult.setLearningActivity(assessmentResult.getLearningActivity());
            updatedAssessmentResult.setScore(assessmentResult.getScore());
            updatedAssessmentResult.setAttemptNumber(assessmentResult.getAttemptNumber());
            updatedAssessmentResult.setAssessmentDate(assessmentResult.getAssessmentDate());

            assessmentresults savedAssessmentResult = assessmentResultRepository.save(updatedAssessmentResult);
            return new ResponseEntity<>(savedAssessmentResult, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Endpoint to delete assessment result
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteAssessmentResult(@PathVariable Long id) {
        try {
            assessmentResultRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
