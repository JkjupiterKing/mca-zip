package com.business.analytics.api.repo;

import com.business.analytics.api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    // You can define custom queries or methods here if needed
}
