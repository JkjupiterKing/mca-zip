package com.business.analytics.api.controller;

import com.business.analytics.api.model.Announcement;
import com.business.analytics.api.repo.AnnouncementRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/announcements")
@CrossOrigin
public class AnnouncementController {

    private final AnnouncementRepo announcementRepository;

    @Autowired
    public AnnouncementController(AnnouncementRepo announcementRepository) {
        this.announcementRepository = announcementRepository;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Announcement>> getAllAnnouncements() {
        List<Announcement> announcements = announcementRepository.findAll();
        return ResponseEntity.ok(announcements);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Announcement> getAnnouncementById(@PathVariable("id") Long id) {
        Optional<Announcement> announcementOptional = announcementRepository.findById(id);
        return announcementOptional.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/addAnnouncement")
    public ResponseEntity<Announcement> createAnnouncement(@RequestBody Announcement announcement) {
        Announcement savedAnnouncement = announcementRepository.save(announcement);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedAnnouncement);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Announcement> updateAnnouncement(@PathVariable("id") Long id, @RequestBody Announcement updatedAnnouncement) {
        Optional<Announcement> announcementOptional = announcementRepository.findById(id);
        if (announcementOptional.isPresent()) {
            updatedAnnouncement.setAnnouncementId(id); // Ensure the ID from path variable is set in the updated object
            Announcement savedAnnouncement = announcementRepository.save(updatedAnnouncement);
            return ResponseEntity.ok(savedAnnouncement);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnnouncement(@PathVariable("id") Long id) {
        Optional<Announcement> announcementOptional = announcementRepository.findById(id);
        if (announcementOptional.isPresent()) {
            announcementRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

