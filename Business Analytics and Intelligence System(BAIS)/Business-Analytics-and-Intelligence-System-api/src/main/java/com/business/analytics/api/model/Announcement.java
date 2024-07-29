package com.business.analytics.api.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "Announcements")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class Announcement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Announcement_ID")
    private Long announcementId;

    @Column(name = "Name", nullable = false)
    private String name;

    @Column(name = "Description")
    private String description;

    @CreationTimestamp // Automatically sets the field on entity creation
    @Column(name = "Created_at", updatable = false)
    private LocalDateTime createdAt;
    }

