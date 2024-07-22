package com.example.Adaptive_Competency_Management_System.controller;

import com.example.Adaptive_Competency_Management_System.model.learningactivity;
import com.example.Adaptive_Competency_Management_System.repo.learningactivityRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/learning-activities")
@CrossOrigin
public class learningactivitycontroller {

    @Autowired
    private learningactivityRepo learningActivityRepository;

    // Endpoint to retrieve all learning activities
    @GetMapping
    public ResponseEntity<List<learningactivity>> getAllLearningActivities() {
        try {
            List<learningactivity> learningActivityList = learningActivityRepository.findAll();

            if (learningActivityList.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(learningActivityList, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Endpoint to retrieve a specific learning activity by ID
    @GetMapping("/{id}")
    public ResponseEntity<learningactivity> getLearningActivityById(@PathVariable Long id) {
        Optional<learningactivity> learningActivityData = learningActivityRepository.findById(id);

        return learningActivityData.map(learningActivity ->
                        new ResponseEntity<>(learningActivity, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Endpoint to create a new learning activity
    @PostMapping
    public ResponseEntity<learningactivity> createLearningActivity(@RequestBody learningactivity learningActivity) {
        try {
            learningactivity savedLearningActivity = learningActivityRepository.save(learningActivity);
            return new ResponseEntity<>(savedLearningActivity, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Endpoint to update an existing learning activity
    @PutMapping("/{id}")
    public ResponseEntity<learningactivity> updateLearningActivity(@PathVariable Long id, @RequestBody learningactivity learningActivity) {
        Optional<learningactivity> oldLearningActivityData = learningActivityRepository.findById(id);

        if (oldLearningActivityData.isPresent()) {
            learningactivity updatedLearningActivity = oldLearningActivityData.get();
            updatedLearningActivity.setCourse(learningActivity.getCourse());
            updatedLearningActivity.setActivityName(learningActivity.getActivityName());
            updatedLearningActivity.setActivityType(learningActivity.getActivityType());
            updatedLearningActivity.setActivityOrder(learningActivity.getActivityOrder());
            updatedLearningActivity.setActivityContent(learningActivity.getActivityContent());
            updatedLearningActivity.setDueDate(learningActivity.getDueDate());

            learningactivity savedLearningActivity = learningActivityRepository.save(updatedLearningActivity);
            return new ResponseEntity<>(savedLearningActivity, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Endpoint to delete a learning activity
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteLearningActivity(@PathVariable Long id) {
        try {
            learningActivityRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
