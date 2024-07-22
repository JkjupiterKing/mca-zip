package com.business.analytics.api.repo;

import com.business.analytics.api.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepo extends JpaRepository<Project, Long> {
    // You can define custom queries here if needed
}
